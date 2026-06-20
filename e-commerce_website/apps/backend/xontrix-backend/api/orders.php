<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

function fetch_order(PDO $pdo, string $id): ?array
{
    $stmt = $pdo->prepare('SELECT * FROM orders WHERE id = :id');
    $stmt->execute([':id' => $id]);
    $order = $stmt->fetch();

    if (!$order) {
        return null;
    }

    $items = $pdo->prepare('SELECT * FROM order_items WHERE order_id = :id ORDER BY id ASC');
    $items->execute([':id' => $id]);

    $order['subtotal'] = (float) $order['subtotal'];
    $order['shipping'] = (float) $order['shipping'];
    $order['total'] = (float) $order['total'];
    $order['items'] = array_map(static function (array $item): array {
        $item['id'] = (int) $item['id'];
        $item['price'] = (float) $item['price'];
        $item['quantity'] = (int) $item['quantity'];
        return $item;
    }, $items->fetchAll());

    return $order;
}

try {
    $pdo = db();
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        if (isset($_GET['id'])) {
            require_admin();

            $order = fetch_order($pdo, (string) $_GET['id']);
            if (!$order) {
                respond_error('Order not found', 404);
            }
            respond_json($order);
        }

        if (isset($_GET['email']) && $_GET['email'] !== '') {
            $viewer = require_login();
            $email = strtolower(trim((string) $_GET['email']));
            if (($viewer['role'] ?? '') !== 'admin' && strtolower((string) ($viewer['email'] ?? '')) !== $email) {
                respond_error('You can only view your own orders', 403);
            }

            $stmt = $pdo->prepare('SELECT id FROM orders WHERE customer_email = :email ORDER BY created_at DESC');
            $stmt->execute([':email' => $email]);
        } else {
            require_admin();
            $stmt = $pdo->query('SELECT id FROM orders ORDER BY created_at DESC');
        }

        $orders = [];
        foreach ($stmt->fetchAll() as $row) {
            $order = fetch_order($pdo, (string) $row['id']);
            if ($order) {
                $orders[] = $order;
            }
        }

        respond_json($orders);
    }

    if ($method === 'POST') {
        $data = input_json();
        require_fields($data, ['items', 'paymentMethod']);

        if (!is_array($data['items']) || count($data['items']) === 0) {
            respond_error('Order must contain at least one item', 422);
        }

        $id = bin2hex(random_bytes(16));
        $customerName = trim((string) ($data['customerName'] ?? 'Walk-in Customer'));
        $customerEmail = strtolower(trim((string) ($data['customerEmail'] ?? 'guest@xontrix.local')));
        $paymentMethod = (string) $data['paymentMethod'];
        $subtotal = 0.0;

        $pdo->beginTransaction();

        foreach ($data['items'] as $item) {
            $quantity = max(1, (int) ($item['quantity'] ?? 1));
            $price = (float) ($item['price'] ?? 0);
            $subtotal += $price * $quantity;
        }

        $shipping = $subtotal >= 1000 ? 0.0 : 80.0;
        $total = $subtotal + $shipping;

        $orderStmt = $pdo->prepare(
            'INSERT INTO orders (id, customer_name, customer_email, payment_method, status, subtotal, shipping, total)
             VALUES (:id, :customer_name, :customer_email, :payment_method, :status, :subtotal, :shipping, :total)'
        );
        $orderStmt->execute([
            ':id' => $id,
            ':customer_name' => $customerName,
            ':customer_email' => $customerEmail,
            ':payment_method' => $paymentMethod,
            ':status' => 'pending',
            ':subtotal' => $subtotal,
            ':shipping' => $shipping,
            ':total' => $total,
        ]);

        $itemStmt = $pdo->prepare(
            'INSERT INTO order_items (order_id, product_id, name, price, quantity, image)
             VALUES (:order_id, :product_id, :name, :price, :quantity, :image)'
        );
        $stockStmt = $pdo->prepare(
            'UPDATE products
             SET in_stock = CASE WHEN stock - :quantity > 0 THEN 1 ELSE 0 END,
                 stock = stock - :quantity
             WHERE id = :product_id AND stock >= :quantity AND in_stock = 1'
        );

        foreach ($data['items'] as $item) {
            $productId = (string) ($item['id'] ?? $item['product_id'] ?? '');
            if ($productId === '') {
                throw new RuntimeException('Order item is missing product id');
            }

            $quantity = max(1, (int) ($item['quantity'] ?? 1));
            $itemStmt->execute([
                ':order_id' => $id,
                ':product_id' => $productId,
                ':name' => (string) ($item['name'] ?? 'Product'),
                ':price' => (float) ($item['price'] ?? 0),
                ':quantity' => $quantity,
                ':image' => isset($item['image']) ? (string) $item['image'] : null,
            ]);
            $stockStmt->execute([':quantity' => $quantity, ':product_id' => $productId]);
            if ($stockStmt->rowCount() === 0) {
                $pdo->rollBack();
                respond_error('Insufficient stock for one or more items', 409);
            }
        }

        $pdo->commit();
        respond_json(fetch_order($pdo, $id), 201);
    }

    if ($method === 'PUT') {
        require_admin();

        $id = (string) ($_GET['id'] ?? '');
        if ($id === '') {
            respond_error('Missing order id', 422);
        }

        $data = input_json();
        $status = (string) ($data['status'] ?? '');
        if (!in_array($status, ['pending', 'shipped', 'delivered'], true)) {
            respond_error('Invalid order status', 422);
        }

        $stmt = $pdo->prepare('UPDATE orders SET status = :status WHERE id = :id');
        $stmt->execute([':status' => $status, ':id' => $id]);

        $order = fetch_order($pdo, $id);
        if (!$order) {
            respond_error('Order not found', 404);
        }

        respond_json($order);
    }

    respond_error('Method not allowed', 405);
} catch (Throwable $error) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    respond_error($error->getMessage(), 500);
}
