<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

try {
    require_admin();

    $pdo = db();
    $period = (string) ($_GET['period'] ?? 'summary');

    if ($period === 'summary') {
        $summary = $pdo->query(
            "SELECT
                COUNT(*) AS total_orders,
                COALESCE(SUM(total), 0) AS total_revenue,
                SUM(status = 'pending') AS pending_count,
                SUM(status = 'shipped') AS shipped_count,
                SUM(status = 'delivered') AS delivered_count,
                COALESCE(SUM(CASE WHEN DATE(created_at) = CURRENT_DATE THEN total ELSE 0 END), 0) AS today_revenue,
                COALESCE(SUM(CASE WHEN DATE_FORMAT(created_at, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m') THEN total ELSE 0 END), 0) AS month_revenue
             FROM orders"
        )->fetch();

        $best = $pdo->query(
            'SELECT product_id, name, SUM(quantity) AS total_sold, SUM(price * quantity) AS revenue
             FROM order_items
             GROUP BY product_id, name
             ORDER BY total_sold DESC
             LIMIT 5'
        )->fetchAll();

        $low = $pdo->query(
            'SELECT id, name, stock FROM products WHERE stock <= 5 ORDER BY stock ASC, name ASC LIMIT 10'
        )->fetchAll();

        respond_json([
            'total_orders' => (int) ($summary['total_orders'] ?? 0),
            'total_revenue' => (float) ($summary['total_revenue'] ?? 0),
            'pending_count' => (int) ($summary['pending_count'] ?? 0),
            'shipped_count' => (int) ($summary['shipped_count'] ?? 0),
            'delivered_count' => (int) ($summary['delivered_count'] ?? 0),
            'today_revenue' => (float) ($summary['today_revenue'] ?? 0),
            'month_revenue' => (float) ($summary['month_revenue'] ?? 0),
            'best_sellers' => array_map(static fn (array $row): array => [
                'product_id' => $row['product_id'],
                'name' => $row['name'],
                'total_sold' => (int) $row['total_sold'],
                'revenue' => (float) $row['revenue'],
            ], $best),
            'low_stock' => array_map(static fn (array $row): array => [
                'id' => $row['id'],
                'name' => $row['name'],
                'stock' => (int) $row['stock'],
            ], $low),
        ]);
    }

    if ($period === 'daily') {
        $rows = $pdo->query(
            "SELECT DATE(created_at) AS date, COUNT(*) AS orders, COALESCE(SUM(total), 0) AS revenue
             FROM orders
             GROUP BY DATE(created_at)
             ORDER BY date DESC
             LIMIT 30"
        )->fetchAll();

        respond_json(array_map(static fn (array $row): array => [
            'date' => $row['date'],
            'orders' => (int) $row['orders'],
            'revenue' => (float) $row['revenue'],
        ], $rows));
    }

    if ($period === 'weekly') {
        $rows = $pdo->query(
            "SELECT YEARWEEK(created_at, 1) AS week,
                    DATE_SUB(DATE(created_at), INTERVAL WEEKDAY(created_at) DAY) AS week_start,
                    COUNT(*) AS orders,
                    COALESCE(SUM(total), 0) AS revenue
             FROM orders
             GROUP BY YEARWEEK(created_at, 1), week_start
             ORDER BY week_start DESC
             LIMIT 12"
        )->fetchAll();

        respond_json(array_map(static fn (array $row): array => [
            'week' => (string) $row['week'],
            'week_start' => $row['week_start'],
            'orders' => (int) $row['orders'],
            'revenue' => (float) $row['revenue'],
        ], $rows));
    }

    if ($period === 'monthly') {
        $rows = $pdo->query(
            "SELECT DATE_FORMAT(created_at, '%Y-%m') AS month,
                    COUNT(*) AS orders,
                    COALESCE(SUM(total), 0) AS revenue
             FROM orders
             GROUP BY DATE_FORMAT(created_at, '%Y-%m')
             ORDER BY month DESC
             LIMIT 12"
        )->fetchAll();

        respond_json(array_map(static fn (array $row): array => [
            'month' => $row['month'],
            'orders' => (int) $row['orders'],
            'revenue' => (float) $row['revenue'],
        ], $rows));
    }

    respond_error('Invalid sales period', 422);
} catch (Throwable $error) {
    respond_error($error->getMessage(), 500);
}
