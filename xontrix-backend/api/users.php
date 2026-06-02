<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

function public_user(array $row): array
{
    return [
        'id' => $row['id'],
        'name' => $row['name'],
        'email' => $row['email'],
        'role' => $row['role'],
        'created_at' => $row['created_at'],
    ];
}

try {
    $pdo = db();
    $method = $_SERVER['REQUEST_METHOD'];
    $action = (string) ($_GET['action'] ?? '');

    if ($method === 'GET' && $action === 'me') {
        $user = current_user();
        respond_json(['user' => $user ? public_user($user) : null]);
    }

    if ($method === 'GET') {
        $viewer = require_admin();

        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare('SELECT * FROM users WHERE id = :id');
            $stmt->execute([':id' => (string) $_GET['id']]);
            $user = $stmt->fetch();

            if (!$user) {
                respond_error('User not found', 404);
            }

            respond_json(public_user($user));
        }

        $stmt = $pdo->query('SELECT * FROM users ORDER BY created_at DESC');
        respond_json(array_map('public_user', $stmt->fetchAll()));
    }

    if ($method === 'POST' && $action === 'register') {
        $data = input_json();
        require_fields($data, ['name', 'email', 'password']);

        $email = strtolower(trim((string) $data['email']));
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            respond_error('Invalid email address', 422);
        }

        if (strlen((string) $data['password']) < 6) {
            respond_error('Password must be at least 6 characters', 422);
        }

        $id = bin2hex(random_bytes(16));
        $stmt = $pdo->prepare(
            'INSERT INTO users (id, name, email, password_hash, role)
             VALUES (:id, :name, :email, :password_hash, :role)'
        );

        try {
            $stmt->execute([
                ':id' => $id,
                ':name' => trim((string) $data['name']),
                ':email' => $email,
                ':password_hash' => password_hash((string) $data['password'], PASSWORD_DEFAULT),
                ':role' => 'user',
            ]);
        } catch (PDOException $error) {
            if ($error->getCode() === '23000') {
                respond_error('Email already registered', 409);
            }
            throw $error;
        }

        $created = $pdo->prepare('SELECT * FROM users WHERE id = :id');
        $created->execute([':id' => $id]);
        respond_json(public_user($created->fetch()), 201);
    }

    if ($method === 'POST' && $action === 'login') {
        $data = input_json();
        require_fields($data, ['email', 'password']);

        $stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
        $stmt->execute([':email' => strtolower(trim((string) $data['email']))]);
        $user = $stmt->fetch();

        if (!$user || !password_verify((string) $data['password'], (string) $user['password_hash'])) {
            respond_error('Invalid email or password', 401);
        }

        session_regenerate_id(true);
        $_SESSION['user'] = public_user($user);

        respond_json(public_user($user));
    }

    if ($method === 'POST' && $action === 'logout') {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', (bool) $params['secure'], (bool) $params['httponly']);
        }
        session_destroy();
        respond_json(['ok' => true]);
    }

    if ($method === 'PUT') {
        require_admin();

        $id = (string) ($_GET['id'] ?? '');
        if ($id === '') {
            respond_error('Missing user id', 422);
        }

        $data = input_json();
        $role = (string) ($data['role'] ?? '');
        if (!in_array($role, ['admin', 'user'], true)) {
            respond_error('Invalid role', 422);
        }

        $stmt = $pdo->prepare('UPDATE users SET role = :role WHERE id = :id');
        $stmt->execute([':role' => $role, ':id' => $id]);

        $updated = $pdo->prepare('SELECT * FROM users WHERE id = :id');
        $updated->execute([':id' => $id]);
        $user = $updated->fetch();

        if (!$user) {
            respond_error('User not found', 404);
        }

        respond_json(public_user($user));
    }

    if ($method === 'DELETE') {
        require_admin();

        $id = (string) ($_GET['id'] ?? '');
        if ($id === '') {
            respond_error('Missing user id', 422);
        }

        $stmt = $pdo->prepare('DELETE FROM users WHERE id = :id');
        $stmt->execute([':id' => $id]);
        respond_json(['deleted' => $stmt->rowCount() > 0]);
    }

    respond_error('Method not allowed', 405);
} catch (Throwable $error) {
    respond_error($error->getMessage(), 500);
}
