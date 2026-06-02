// src/app/context/StoreContext.tsx
// Gold San Luis — DB-backed version (replaces localStorage)
// Swap: localStorage → PHP+MySQL via api.ts

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { productsApi, ordersApi, usersApi, type ApiProduct, type ApiOrder, type ApiUser } from '../lib/api';
import type { CartItem } from './CartContext';

// ── Re-export types so existing imports keep working ─────────────────────────

export type StoreProduct = ApiProduct & {
  // Keep frontend aliases for compatibility with existing components
  inStock: boolean;    // alias for in_stock
  isNew: boolean;      // alias for is_new
};

export type OrderStatus = 'pending' | 'shipped' | 'delivered';

export interface StoreOrder extends Omit<ApiOrder, 'items'> {
  items: CartItem[];
  // camelCase aliases
  customerName: string;
  customerEmail: string;
  paymentMethod: string;
  createdAt: string;
}

export type StoreUser = ApiUser & {
  createdAt: string;  // alias for created_at
};

// ── Normalizers — snake_case DB → camelCase frontend ─────────────────────────

function normalizeProduct(p: ApiProduct): StoreProduct {
  return {
    ...p,
    price: Number(p.price),
    rating: Number(p.rating),
    reviews: Number(p.reviews),
    stock: Number(p.stock),
    inStock: p.in_stock,
    isNew: p.is_new,
  };
}

function normalizeOrder(o: ApiOrder): StoreOrder {
  return {
    ...o,
    subtotal: Number(o.subtotal),
    shipping: Number(o.shipping),
    total: Number(o.total),
    customerName: o.customer_name,
    customerEmail: o.customer_email,
    paymentMethod: o.payment_method,
    createdAt: o.created_at,
    items: o.items.map((item) => ({
      id: item.product_id,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
      image: item.image ?? '',
      category: '',
      description: '',
      rating: 0,
      reviews: 0,
      inStock: true,
      isNew: false,
      specs: {},
    })),
  };
}

function normalizeUser(u: ApiUser): StoreUser {
  return { ...u, createdAt: u.created_at };
}

// ── Context type (same surface as before) ────────────────────────────────────

interface StoreContextType {
  products: StoreProduct[];
  orders: StoreOrder[];
  users: StoreUser[];
  loading: boolean;
  error: string | null;
  // Product CRUD
  addProduct: (product: Omit<StoreProduct, 'id' | 'inStock' | 'in_stock' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<StoreProduct>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  // Order ops
  createOrder: (input: {
    items: CartItem[];
    paymentMethod: string;
    customerName?: string;
    customerEmail?: string;
  }) => Promise<StoreOrder>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  // Refresh helpers
  refreshProducts: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  refreshUsers: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// ── Provider ─────────────────────────────────────────────────────────────────

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [orders,   setOrders]   = useState<StoreOrder[]>([]);
  const [users,    setUsers]    = useState<StoreUser[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  // ── Initial load ───────────────────────────────────────────

  const refreshProducts = useCallback(async () => {
    const data = await productsApi.list();
    setProducts(data.map(normalizeProduct));
  }, []);

  const refreshOrders = useCallback(async () => {
    const data = await ordersApi.list();
    setOrders(data.map(normalizeOrder));
  }, []);

  const refreshUsers = useCallback(async () => {
    const data = await usersApi.list();
    setUsers(data.map(normalizeUser));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([refreshProducts(), refreshOrders(), refreshUsers()])
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // ── Product CRUD ───────────────────────────────────────────

  const addProduct: StoreContextType['addProduct'] = useCallback(async (product) => {
    await productsApi.create({
      name:        product.name,
      price:       product.price,
      category:    product.category,
      description: product.description,
      image:       product.image,
      stock:       product.stock,
      rating:      product.rating ?? 0,
      reviews:     product.reviews ?? 0,
      is_new:      product.is_new ?? false,
      specs:       product.specs ?? {},
    });
    await refreshProducts();
  }, [refreshProducts]);

  const updateProduct: StoreContextType['updateProduct'] = useCallback(async (id, updates) => {
    // Map camelCase fields back to snake_case for the API
    const payload: Record<string, unknown> = {};
    if (updates.name        !== undefined) payload.name        = updates.name;
    if (updates.price       !== undefined) payload.price       = updates.price;
    if (updates.category    !== undefined) payload.category    = updates.category;
    if (updates.description !== undefined) payload.description = updates.description;
    if (updates.image       !== undefined) payload.image       = updates.image;
    if (updates.stock       !== undefined) payload.stock       = updates.stock;
    if (updates.rating      !== undefined) payload.rating      = updates.rating;
    if (updates.reviews     !== undefined) payload.reviews     = updates.reviews;
    if (updates.isNew       !== undefined) payload.isNew       = updates.isNew;
    if (updates.specs       !== undefined) payload.specs       = updates.specs;

    await productsApi.update(id, payload as Parameters<typeof productsApi.update>[1]);
    await refreshProducts();
  }, [refreshProducts]);

  const deleteProduct = useCallback(async (id: string) => {
    await productsApi.delete(id);
    await refreshProducts();
  }, [refreshProducts]);

  // ── Order ops ──────────────────────────────────────────────

  const createOrder: StoreContextType['createOrder'] = useCallback(async ({
    items,
    paymentMethod,
    customerName  = 'Walk-in Customer',
    customerEmail = 'guest@xontrix.local',
  }) => {
    const apiOrder = await ordersApi.create({
      items: items.map((item) => ({
        id:       item.id,
        name:     item.name,
        price:    item.price,
        quantity: item.quantity,
        image:    item.image,
      })),
      paymentMethod,
      customerName,
      customerEmail,
    });

    const normalized = normalizeOrder(apiOrder);

    // Optimistically update local state + refresh products (stock changed)
    setOrders((prev) => [normalized, ...prev]);
    await refreshProducts();

    return normalized;
  }, [refreshProducts]);

  const updateOrderStatus = useCallback(async (id: string, status: OrderStatus) => {
    const updated = await ordersApi.updateStatus(id, status);
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? normalizeOrder(updated) : o))
    );
  }, []);

  // ── Context value ──────────────────────────────────────────

  const value = useMemo<StoreContextType>(() => ({
    products,
    orders,
    users,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    createOrder,
    updateOrderStatus,
    refreshProducts,
    refreshOrders,
    refreshUsers,
  }), [
    products, orders, users, loading, error,
    addProduct, updateProduct, deleteProduct,
    createOrder, updateOrderStatus,
    refreshProducts, refreshOrders, refreshUsers,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
}
