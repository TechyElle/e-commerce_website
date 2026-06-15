<?php
// api/upload.php
// POST /api/upload.php  — accepts an image file, saves it, returns the URL
// Used by the admin Add/Edit Product form

require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse('Method not allowed', 405);
}

// Check file was sent
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    $errorCodes = [
        1 => 'File too large (server limit)',
        2 => 'File too large (form limit)',
        3 => 'File only partially uploaded',
        4 => 'No file uploaded',
        6 => 'Missing temp folder',
        7 => 'Failed to write file',
    ];
    $code = $_FILES['image']['error'] ?? 4;
    errorResponse($errorCodes[$code] ?? 'Upload failed');
}

$file     = $_FILES['image'];
$maxSize  = 5 * 1024 * 1024; // 5MB
$allowed  = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// Validate size
if ($file['size'] > $maxSize) {
    errorResponse('Image must be under 5MB');
}

// Validate type
$finfo    = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowed, true)) {
    errorResponse('Only JPG, PNG, WebP, or GIF images are allowed');
}

// Create uploads directory if it doesn't exist
$uploadDir = __DIR__ . '/../uploads/products/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Generate unique filename
$ext      = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid('product-', true) . '.' . strtolower($ext);
$destPath = $uploadDir . $filename;

// Move file
if (!move_uploaded_file($file['tmp_name'], $destPath)) {
    errorResponse('Failed to save image. Check folder permissions.');
}

// Return the public URL
$baseUrl  = (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];
$imageUrl = $baseUrl . '/xontrix-backend/uploads/products/' . $filename;

jsonResponse([
    'url'      => $imageUrl,
    'filename' => $filename,
]);
