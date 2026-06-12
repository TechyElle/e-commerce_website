# Xontrix PHP/MySQL Backend

This folder contains the PHP API expected by the React frontend in `src/app/lib/api.ts`.

## Install with XAMPP

1. Copy or move the `xontrix-backend` folder into:

   ```txt
   C:\xampp\htdocs\xontrix-backend
   ```

2. Start Apache and MySQL in XAMPP.

3. Open this URL once in your browser:

   ```txt
   http://localhost/xontrix-backend/api/install.php
   ```

4. The frontend already points to:

   ```txt
   http://localhost/xontrix-backend/api
   ```

## Default Login

After running `install.php`, you can sign in with:

```txt
Email: admin@xontrix.local
Password: admin123
```

## Files

- `api/config.php` - MySQL credentials and CORS origins.
- `api/schema.sql` - Database tables.
- `api/install.php` - Creates the database, tables, sample products, and admin account.
- `api/products.php` - Product CRUD.
- `api/orders.php` - Order list/create/status update.
- `api/users.php` - User list/register/login/role update/delete.
- `api/sales.php` - Sales summary and chart data.

For production, delete or protect `api/install.php` after setup.

