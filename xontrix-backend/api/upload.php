<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

try {
    require_admin();

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        respond_error('Method not allowed', 405);
    }

    if (!isset($_FILES['image']) || !is_uploaded_file($_FILES['image']['tmp_name'])) {
        respond_error('Missing image upload', 422);
    }

    $file = $_FILES['image'];
    if (($file['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
        respond_error('Upload failed', 400);
    }

    if (($file['size'] ?? 0) > 5 * 1024 * 1024) {
        respond_error('Image must be 5MB or smaller', 422);
    }

    $info = getimagesize((string) $file['tmp_name']);
    if ($info === false) {
        respond_error('Uploaded file is not a valid image', 422);
    }

    $mimeToExt = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif',
    ];
    $mime = (string) ($info['mime'] ?? '');
    if (!isset($mimeToExt[$mime])) {
        respond_error('Only JPG, PNG, WebP, and GIF images are allowed', 422);
    }

    $uploadDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'uploads';
    if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) {
        respond_error('Could not create upload folder', 500);
    }

    $filename = bin2hex(random_bytes(16)) . '.' . $mimeToExt[$mime];
    $target = $uploadDir . DIRECTORY_SEPARATOR . $filename;

    if (!move_uploaded_file((string) $file['tmp_name'], $target)) {
        respond_error('Could not save uploaded image', 500);
    }

    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $basePath = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'] ?? '')), '/\\');
    respond_json([
        'url' => $scheme . '://' . $host . $basePath . '/uploads/' . $filename,
    ], 201);
} catch (Throwable $error) {
    respond_error($error->getMessage(), 500);
}
