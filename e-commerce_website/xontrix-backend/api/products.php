<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

function fetch_product(PDO $pdo, string $id): ?array
{
    $stmt = $pdo->prepare('SELECT * FROM products WHERE id = :id');
    $stmt->execute([':id' => $id]);
    $product = $stmt->fetch();

    return $product ? decode_product($product) : null;
}

try {
    $pdo = db();
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        if (isset($_GET['id'])) {
            $product = fetch_product($pdo, (string) $_GET['id']);

            if (!$product) {
                respond_error('Product not found', 404);
            }

            respond_json($product);
        }

        if (isset($_GET['category']) && $_GET['category'] !== '') {
            $stmt = $pdo->prepare('SELECT * FROM products WHERE category = :category ORDER BY created_at DESC');
            $stmt->execute([':category' => (string) $_GET['category']]);
        } else {
            $stmt = $pdo->query('SELECT * FROM products ORDER BY created_at DESC');
        }

        respond_json(array_map('decode_product', $stmt->fetchAll()));
    }

    if ($method === 'POST') {
        require_admin();

        $data = input_json();
        require_fields($data, ['name', 'price', 'category', 'description', 'image', 'stock']);

        $id = $data['id'] ?? bin2hex(random_bytes(16));
        $stock = (int) $data['stock'];

        $stmt = $pdo->prepare(
            'INSERT INTO products
              (id, name, price, category, description, image, stock, in_stock, rating, reviews, is_new, specs)
             VALUES
              (:id, :name, :price, :category, :description, :image, :stock, :in_stock, :rating, :reviews, :is_new, :specs)'
        );
        $stmt->execute([
            ':id' => $id,
            ':name' => (string) $data['name'],
            ':price' => (float) $data['price'],
            ':category' => (string) $data['category'],
            ':description' => (string) $data['description'],
            ':image' => (string) $data['image'],
            ':stock' => $stock,
            ':in_stock' => $stock > 0 ? 1 : 0,
            ':rating' => (float) ($data['rating'] ?? 0),
            ':reviews' => (int) ($data['reviews'] ?? 0),
            ':is_new' => normalize_bool($data['is_new'] ?? $data['isNew'] ?? false),
            ':specs' => encode_specs($data['specs'] ?? []),
        ]);

        respond_json(fetch_product($pdo, (string) $id), 201);
    }

    if ($method === 'PUT') {
        require_admin();

        $id = (string) ($_GET['id'] ?? '');
        if ($id === '') {
            respond_error('Missing product id', 422);
        }

        $data = input_json();
        $allowed = [
            'name' => 'name',
            'price' => 'price',
            'category' => 'category',
            'description' => 'description',
            'image' => 'image',
            'stock' => 'stock',
            'rating' => 'rating',
            'reviews' => 'reviews',
            'is_new' => 'is_new',
            'isNew' => 'is_new',
            'specs' => 'specs',
        ];

        $sets = [];
        $params = [':id' => $id];

        foreach ($allowed as $inputKey => $column) {
            if (!array_key_exists($inputKey, $data)) {
                continue;
            }

            $placeholder = ':' . $column;
            $sets[$column] = "{$column} = {$placeholder}";
            $params[$placeholder] = match ($column) {
                'price', 'rating' => (float) $data[$inputKey],
                'stock', 'reviews' => (int) $data[$inputKey],
                'is_new' => normalize_bool($data[$inputKey]),
                'specs' => encode_specs($data[$inputKey]),
                default => (string) $data[$inputKey],
            };
        }

        if (array_key_exists(':stock', $params)) {
            $sets['in_stock'] = 'in_stock = :in_stock';
            $params[':in_stock'] = ((int) $params[':stock']) > 0 ? 1 : 0;
        }

        if (!$sets) {
            respond_error('No update fields provided', 422);
        }

        $stmt = $pdo->prepare('UPDATE products SET ' . implode(', ', $sets) . ' WHERE id = :id');
        $stmt->execute($params);

        if ($stmt->rowCount() === 0) {
            $exists = $pdo->prepare('SELECT 1 FROM products WHERE id = :id');
            $exists->execute([':id' => $id]);
            if (!$exists->fetchColumn()) {
                respond_error('Product not found', 404);
            }
        }

        respond_json(fetch_product($pdo, $id));
    }

    if ($method === 'DELETE') {
        require_admin();

        $id = (string) ($_GET['id'] ?? '');
        if ($id === '') {
            respond_error('Missing product id', 422);
        }

        $stmt = $pdo->prepare('DELETE FROM products WHERE id = :id');
        $stmt->execute([':id' => $id]);
        respond_json(['deleted' => $stmt->rowCount() > 0]);
    }

    respond_error('Method not allowed', 405);
} catch (Throwable $error) {
    respond_error($error->getMessage(), 500);
}
