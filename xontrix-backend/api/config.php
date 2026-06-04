<?php
declare(strict_types=1);

// Update these values to match your local MySQL setup.
const DB_HOST = '127.0.0.1';
const DB_NAME = 'xontrix_store';
const DB_USER = 'root';
const DB_PASS = '';

// Frontend dev server origins allowed to call this API.
const ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

// Set this to false after local setup so install.php cannot be re-run.
const ENABLE_INSTALLER = true;
