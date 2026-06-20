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

    // Seed mock users for loyalty ranks
    $userStmt = $pdo->prepare(
        'INSERT INTO users (id, name, email, password_hash, role)
         VALUES (:id, :name, :email, :password_hash, :role)
         ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role)'
    );
    $mockUsers = [
        ['user-001', 'Maren Dikidis', 'maren@example.com', password_hash('user123', PASSWORD_DEFAULT), 'user'],
        ['user-002', 'Carter Lipshutz', 'carter@example.com', password_hash('user123', PASSWORD_DEFAULT), 'user'],
        ['user-003', 'Adison Philips', 'adison@example.com', password_hash('user123', PASSWORD_DEFAULT), 'user'],
        ['user-004', 'Juan dela Cruz', 'juan@example.com', password_hash('user123', PASSWORD_DEFAULT), 'user'],
        ['user-005', 'Maria Santos', 'maria@example.com', password_hash('user123', PASSWORD_DEFAULT), 'user'],
    ];
    foreach ($mockUsers as $mu) {
        $userStmt->execute([
            ':id' => $mu[0],
            ':name' => $mu[1],
            ':email' => $mu[2],
            ':password_hash' => $mu[3],
            ':role' => $mu[4],
        ]);
    }

    // Seed customer satisfaction feedback
    $pdo->exec('DELETE FROM feedback');
    $feedbackStmt = $pdo->prepare(
        'INSERT INTO feedback (customer_name, customer_email, rating, comment, created_at)
         VALUES (:name, :email, :rating, :comment, :created_at)'
    );
    $feedbacks = [
        ['Maren Dikidis', 'maren@example.com', 5, 'Talagang napakabilis ng shipping! Ang Arduino Uno ay gumagana nang maayos. Bibili ulit ako rito!', '2026-06-15 14:22:00'],
        ['Carter Lipshutz', 'carter@example.com', 5, 'Highly recommended ang ESP32 board! Stable ang wifi at bluetooth connectivity.', '2026-06-16 09:12:00'],
        ['Adison Philips', 'adison@example.com', 5, 'Ang ganda ng OLED displays! Malinaw ang screen kahit maliit. Sobrang solid.', '2026-06-17 11:45:00'],
        ['Juan dela Cruz', 'juan@example.com', 4, 'Kumpleto ang resistors pack at maayos ang package. Matagal lang nang konti ang pagdating.', '2026-06-18 16:30:00'],
        ['Maria Santos', 'maria@example.com', 5, 'Napaka-accommodating ng support team nang magka-issue ako sa payment method.', '2026-06-19 10:05:00'],
    ];
    foreach ($feedbacks as $fb) {
        $feedbackStmt->execute([
            ':name' => $fb[0],
            ':email' => $fb[1],
            ':rating' => $fb[2],
            ':comment' => $fb[3],
            ':created_at' => $fb[4],
        ]);
    }

    // Seed historical orders across 6 months
    $pdo->exec('SET FOREIGN_KEY_CHECKS = 0');
    $pdo->exec('DELETE FROM order_items');
    $pdo->exec('DELETE FROM orders');
    $pdo->exec('SET FOREIGN_KEY_CHECKS = 1');

    $orderInsert = $pdo->prepare(
        'INSERT INTO orders (id, customer_name, customer_email, payment_method, status, subtotal, shipping, total, created_at)
         VALUES (:id, :customer_name, :customer_email, :payment_method, :status, :subtotal, :shipping, :total, :created_at)'
    );
    $itemInsert = $pdo->prepare(
        'INSERT INTO order_items (order_id, product_id, name, price, quantity, image)
         VALUES (:order_id, :product_id, :name, :price, :quantity, :image)'
    );

    $createOrderSeeder = function(string $date, string $name, string $email, string $payment, string $status, array $items) use ($orderInsert, $itemInsert) {
        $id = bin2hex(random_bytes(16));
        $subtotal = 0.0;
        foreach ($items as $item) {
            $subtotal += $item['price'] * $item['qty'];
        }
        $shipping = $subtotal >= 999 ? 0.0 : 80.0;
        $total = $subtotal + $shipping;

        $orderInsert->execute([
            ':id' => $id,
            ':customer_name' => $name,
            ':customer_email' => $email,
            ':payment_method' => $payment,
            ':status' => $status,
            ':subtotal' => $subtotal,
            ':shipping' => $shipping,
            ':total' => $total,
            ':created_at' => $date,
        ]);

        foreach ($items as $item) {
            $itemInsert->execute([
                ':order_id' => $id,
                ':product_id' => $item['id'],
                ':name' => $item['name'],
                ':price' => $item['price'],
                ':quantity' => $item['qty'],
                ':image' => $item['image'],
            ]);
        }
    };

    // Product helper references
    $p1 = ['id' => '1', 'name' => 'Arduino Uno R3', 'price' => 320, 'image' => '/src/imports/Products/10.png'];
    $p2 = ['id' => '2', 'name' => 'ESP32 Dev Board', 'price' => 285, 'image' => '/src/imports/Products/11.png'];
    $p6 = ['id' => '6', 'name' => 'OLED Display 0.96"', 'price' => 95, 'image' => '/src/imports/Products/15.png'];
    $p15 = ['id' => '15', 'name' => 'Resistor Pack 600pcs', 'price' => 49, 'image' => '/src/imports/Products/24.png'];

    // Seeding orders:
    // January 2026: Total Revenue ~ ₱15,000
    $createOrderSeeder('2026-01-05 10:00:00', 'Maren Dikidis', 'maren@example.com', 'E-Wallet', 'delivered', [
        array_merge($p1, ['qty' => 15]),
        array_merge($p2, ['qty' => 10]),
    ]);
    $createOrderSeeder('2026-01-12 14:30:00', 'Carter Lipshutz', 'carter@example.com', 'Credit Card', 'delivered', [
        array_merge($p1, ['qty' => 8]),
        array_merge($p6, ['qty' => 12]),
    ]);
    $createOrderSeeder('2026-01-20 16:15:00', 'Adison Philips', 'adison@example.com', 'COD', 'delivered', [
        array_merge($p2, ['qty' => 6]),
        array_merge($p15, ['qty' => 10]),
    ]);
    $createOrderSeeder('2026-01-28 09:00:00', 'Juan dela Cruz', 'juan@example.com', 'E-Wallet', 'delivered', [
        array_merge($p1, ['qty' => 3]),
        array_merge($p15, ['qty' => 5]),
    ]);

    // February 2026: Total Revenue ~ ₱18,500
    $createOrderSeeder('2026-02-04 11:20:00', 'Maren Dikidis', 'maren@example.com', 'E-Wallet', 'delivered', [
        array_merge($p1, ['qty' => 20]),
        array_merge($p6, ['qty' => 25]),
    ]);
    $createOrderSeeder('2026-02-10 15:40:00', 'Carter Lipshutz', 'carter@example.com', 'Credit Card', 'delivered', [
        array_merge($p2, ['qty' => 15]),
        array_merge($p15, ['qty' => 15]),
    ]);
    $createOrderSeeder('2026-02-18 10:10:00', 'Maria Santos', 'maria@example.com', 'COD', 'delivered', [
        array_merge($p1, ['qty' => 4]),
    ]);
    $createOrderSeeder('2026-02-25 13:00:00', 'Adison Philips', 'adison@example.com', 'E-Wallet', 'delivered', [
        array_merge($p2, ['qty' => 5]),
        array_merge($p6, ['qty' => 10]),
    ]);

    // March 2026: Total Revenue ~ ₱21,000
    $createOrderSeeder('2026-03-05 09:30:00', 'Maren Dikidis', 'maren@example.com', 'Credit Card', 'delivered', [
        array_merge($p1, ['qty' => 15]),
        array_merge($p2, ['qty' => 15]),
        array_merge($p6, ['qty' => 10]),
    ]);
    $createOrderSeeder('2026-03-15 14:00:00', 'Carter Lipshutz', 'carter@example.com', 'E-Wallet', 'delivered', [
        array_merge($p1, ['qty' => 10]),
        array_merge($p2, ['qty' => 10]),
    ]);
    $createOrderSeeder('2026-03-24 16:45:00', 'Juan dela Cruz', 'juan@example.com', 'COD', 'delivered', [
        array_merge($p1, ['qty' => 3]),
    ]);
    $createOrderSeeder('2026-03-30 11:20:00', 'Maria Santos', 'maria@example.com', 'E-Wallet', 'delivered', [
        array_merge($p15, ['qty' => 8]),
    ]);

    // April 2026: Total Revenue ~ ₱26,000
    $createOrderSeeder('2026-04-03 10:15:00', 'Maren Dikidis', 'maren@example.com', 'E-Wallet', 'delivered', [
        array_merge($p1, ['qty' => 25]),
        array_merge($p2, ['qty' => 20]),
    ]);
    $createOrderSeeder('2026-04-12 15:30:00', 'Carter Lipshutz', 'carter@example.com', 'Credit Card', 'delivered', [
        array_merge($p6, ['qty' => 30]),
        array_merge($p15, ['qty' => 20]),
    ]);
    $createOrderSeeder('2026-04-20 12:00:00', 'Adison Philips', 'adison@example.com', 'COD', 'delivered', [
        array_merge($p1, ['qty' => 5]),
        array_merge($p15, ['qty' => 10]),
    ]);
    $createOrderSeeder('2026-04-27 14:10:00', 'Maren Dikidis', 'maren@example.com', 'E-Wallet', 'delivered', [
        array_merge($p6, ['qty' => 35]),
    ]);

    // May 2026: Total Revenue ~ ₱31,500
    $createOrderSeeder('2026-05-02 11:00:00', 'Maren Dikidis', 'maren@example.com', 'COD', 'delivered', [
        array_merge($p1, ['qty' => 20]),
        array_merge($p2, ['qty' => 10]),
    ]);
    $createOrderSeeder('2026-05-10 13:20:00', 'Carter Lipshutz', 'carter@example.com', 'E-Wallet', 'delivered', [
        array_merge($p1, ['qty' => 15]),
        array_merge($p2, ['qty' => 15]),
        array_merge($p6, ['qty' => 15]),
    ]);
    $createOrderSeeder('2026-05-18 16:00:00', 'Adison Philips', 'adison@example.com', 'Credit Card', 'delivered', [
        array_merge($p2, ['qty' => 8]),
        array_merge($p6, ['qty' => 10]),
    ]);
    $createOrderSeeder('2026-05-26 09:40:00', 'Maren Dikidis', 'maren@example.com', 'E-Wallet', 'delivered', [
        array_merge($p15, ['qty' => 60]),
    ]);

    // June 2026 (Current month): Total Revenue ~ ₱48,500
    $createOrderSeeder('2026-06-02 10:15:00', 'Maren Dikidis', 'maren@example.com', 'E-Wallet', 'delivered', [
        array_merge($p1, ['qty' => 30]),
        array_merge($p2, ['qty' => 25]),
        array_merge($p6, ['qty' => 30]),
    ]);
    $createOrderSeeder('2026-06-05 14:00:00', 'Carter Lipshutz', 'carter@example.com', 'Credit Card', 'delivered', [
        array_merge($p1, ['qty' => 15]),
        array_merge($p2, ['qty' => 15]),
        array_merge($p6, ['qty' => 20]),
    ]);
    $createOrderSeeder('2026-06-08 11:30:00', 'Adison Philips', 'adison@example.com', 'E-Wallet', 'delivered', [
        array_merge($p1, ['qty' => 10]),
        array_merge($p2, ['qty' => 10]),
        array_merge($p15, ['qty' => 30]),
    ]);
    $createOrderSeeder('2026-06-12 16:45:00', 'Juan dela Cruz', 'juan@example.com', 'COD', 'shipped', [
        array_merge($p1, ['qty' => 6]),
        array_merge($p6, ['qty' => 10]),
    ]);
    $createOrderSeeder('2026-06-15 09:10:00', 'Maria Santos', 'maria@example.com', 'E-Wallet', 'pending', [
        array_merge($p2, ['qty' => 8]),
        array_merge($p15, ['qty' => 20]),
    ]);
    $createOrderSeeder('2026-06-18 13:00:00', 'Maren Dikidis', 'maren@example.com', 'E-Wallet', 'pending', [
        array_merge($p1, ['qty' => 5]),
        array_merge($p2, ['qty' => 5]),
    ]);
    $createOrderSeeder('2026-06-19 11:15:00', 'Carter Lipshutz', 'carter@example.com', 'COD', 'pending', [
        array_merge($p1, ['qty' => 3]),
        array_merge($p6, ['qty' => 5]),
    ]);

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

