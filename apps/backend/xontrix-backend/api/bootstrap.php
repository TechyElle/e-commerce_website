<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

function start_app_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    session_set_cookie_params([
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'path' => '/',
    ]);
    session_start();
}

function apply_cors(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, ALLOWED_ORIGINS, true)) {
        header("Access-Control-Allow-Origin: {$origin}");
        header('Vary: Origin');
    }

    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function db(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', DB_HOST, DB_NAME);
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}

function input_json(): array
{
    $raw = file_get_contents('php://input');

    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $data = json_decode($raw, true);
    if (!is_array($data)) {
        respond_error('Invalid JSON body', 400);
    }

    return $data;
}

function respond_json(mixed $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function respond_error(string $message, int $status = 400): never
{
    respond_json(['error' => $message], $status);
}

function current_user(): ?array
{
    start_app_session();
    $user = $_SESSION['user'] ?? null;

    return is_array($user) ? $user : null;
}

function require_login(): array
{
    $user = current_user();
    if (!$user) {
        respond_error('Login required', 401);
    }

    return $user;
}

function require_admin(): array
{
    $user = require_login();
    if (($user['role'] ?? '') !== 'admin') {
        respond_error('Admin access required', 403);
    }

    return $user;
}

function require_fields(array $data, array $fields): void
{
    foreach ($fields as $field) {
        if (!array_key_exists($field, $data) || $data[$field] === '') {
            respond_error("Missing required field: {$field}", 422);
        }
    }
}

function normalize_bool(mixed $value): int
{
    return filter_var($value, FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
}

function encode_specs(mixed $specs): string
{
    if (is_string($specs)) {
        json_decode($specs);
        return json_last_error() === JSON_ERROR_NONE ? $specs : '{}';
    }

    return json_encode(is_array($specs) ? $specs : [], JSON_UNESCAPED_SLASHES);
}

function decode_product(array $row): array
{
    $row['price'] = (float) $row['price'];
    $row['stock'] = (int) $row['stock'];
    $row['in_stock'] = (bool) $row['in_stock'];
    $row['rating'] = (float) $row['rating'];
    $row['reviews'] = (int) $row['reviews'];
    $row['is_new'] = (bool) $row['is_new'];
    $row['specs'] = json_decode((string) $row['specs'], true) ?: [];

    return $row;
}

apply_cors();
start_app_session();
