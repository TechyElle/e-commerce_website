<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

if (!ENABLE_INSTALLER) {
    http_response_code(403);
    echo json_encode([
        'ok' => false,
        'error' => 'Installer is disabled.',
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

try {
    $pdo = new PDO(sprintf('mysql:host=%s;charset=utf8mb4', DB_HOST), DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $schema = file_get_contents(__DIR__ . '/schema.sql');
    if ($schema === false) {
        throw new RuntimeException('Unable to read schema.sql');
    }

    $pdo->exec($schema);
    $pdo->exec('USE `' . DB_NAME . '`');

    $adminId = 'admin-001';
    $adminEmail = 'admin@xontrix.local';
    $adminPassword = password_hash('admin123', PASSWORD_DEFAULT);

    $stmt = $pdo->prepare(
        'INSERT INTO users (id, name, email, password_hash, role)
         VALUES (:id, :name, :email, :password_hash, :role)
         ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role)'
    );
    $stmt->execute([
        ':id' => $adminId,
        ':name' => 'Xontrix Admin',
        ':email' => $adminEmail,
        ':password_hash' => $adminPassword,
        ':role' => 'admin',
    ]);

    $products = [
        [
            '1',
            'Arduino Uno R3',
            320,
            'Microcontrollers',
            'Arduino Uno R3 with ATmega328P microcontroller for electronics projects.',
            '/src/imports/Products/10.png',
            24,
            1,
            4.8,
            1250,
            0,
            ['Microcontroller' => 'ATmega328P', 'Operating Voltage' => '5V'],
        ],
        [
            '2',
            'ESP32 Dev Board',
            285,
            'Microcontrollers',
            'ESP32 development board with integrated WiFi and Bluetooth.',
            '/src/imports/Products/11.png',
            30,
            1,
            4.9,
            980,
            0,
            ['WiFi' => '802.11 b/g/n', 'Bluetooth' => 'BLE'],
        ],
        [
            '6',
            'OLED Display 0.96"',
            95,
            'Displays',
            'Compact 128x64 OLED display with I2C interface.',
            '/src/imports/Products/15.png',
            40,
            1,
            4.8,
            1450,
            0,
            ['Resolution' => '128x64', 'Interface' => 'I2C'],
        ],
        [
            '15',
            'Resistor Pack 600pcs',
            49,
            'Passive Components',
            'Assorted resistor pack for prototyping and circuit work.',
            '/src/imports/Products/24.png',
            75,
            1,
            4.7,
            2100,
            0,
            ['Quantity' => '600 pieces', 'Tolerance' => '1%'],
        ],
    ];

    $productStmt = $pdo->prepare(
        'INSERT INTO products
          (id, name, price, category, description, image, stock, in_stock, rating, reviews, is_new, specs)
         VALUES
          (:id, :name, :price, :category, :description, :image, :stock, :in_stock, :rating, :reviews, :is_new, :specs)
         ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          price = VALUES(price),
          category = VALUES(category),
          description = VALUES(description),
          image = VALUES(image),
          stock = VALUES(stock),
          in_stock = VALUES(in_stock),
          rating = VALUES(rating),
          reviews = VALUES(reviews),
          is_new = VALUES(is_new),
          specs = VALUES(specs)'
    );

    foreach ($products as $product) {
        $productStmt->execute([
            ':id' => $product[0],
            ':name' => $product[1],
            ':price' => $product[2],
            ':category' => $product[3],
            ':description' => $product[4],
            ':image' => $product[5],
            ':stock' => $product[6],
            ':in_stock' => $product[7],
            ':rating' => $product[8],
            ':reviews' => $product[9],
            ':is_new' => $product[10],
            ':specs' => json_encode($product[11], JSON_UNESCAPED_SLASHES),
        ]);
    }

    echo json_encode([
        'ok' => true,
        'database' => DB_NAME,
        'admin_email' => $adminEmail,
        'admin_password' => 'admin123',
        'message' => 'Database installed. Delete or protect install.php before production.',
    ], JSON_UNESCAPED_SLASHES);
} catch (Throwable $error) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $error->getMessage()], JSON_UNESCAPED_SLASHES);
}

