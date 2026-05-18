import React, { createContext, useContext, useMemo, useState } from 'react';
import { products as seedProducts } from '../data/products';
import type { CartItem, Product } from './CartContext';

export type StoreProduct = Product & { stock: number };
export type OrderStatus = 'pending' | 'shipped' | 'delivered';

export interface StoreOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  paymentMethod: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  items: CartItem[];
}

export interface StoreUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

interface StoreContextType {
  products: StoreProduct[];
  orders: StoreOrder[];
  users: StoreUser[];
  addProduct: (product: Omit<StoreProduct, 'id' | 'inStock'>) => void;
  updateProduct: (id: string, updates: Partial<StoreProduct>) => void;
  deleteProduct: (id: string) => void;
  createOrder: (input: {
    items: CartItem[];
    paymentMethod: string;
    customerName?: string;
    customerEmail?: string;
  }) => StoreOrder;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

const productStock = (product: Product, index: number) => {
  if (!product.inStock) return 0;
  if (typeof product.saleStock === 'number') return product.saleStock;
  return [42, 18, 7, 29, 15, 34, 21, 16][index % 8];
};

const initialProducts = seedProducts.map((product, index) => {
  const stock = productStock(product, index);
  return { ...product, stock, inStock: stock > 0 };
});

const initialUsers: StoreUser[] = [
  {
    id: 'admin-demo',
    name: 'Xontrix Admin',
    email: 'admin@xontrix.local',
    role: 'admin',
    createdAt: '2026-05-01T08:00:00.000Z',
  },
  {
    id: 'user-demo',
    name: 'Juan Dela Cruz',
    email: 'juan@example.com',
    role: 'user',
    createdAt: '2026-05-10T09:30:00.000Z',
  },
];

const load = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const save = <T,>(key: string, value: T) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<StoreProduct[]>(() =>
    load('xontrix-products', initialProducts)
  );
  const [orders, setOrders] = useState<StoreOrder[]>(() => load('xontrix-orders', []));
  const [users] = useState<StoreUser[]>(() => load('xontrix-users', initialUsers));

  const persistProducts = (next: StoreProduct[]) => {
    setProducts(next);
    save('xontrix-products', next);
  };

  const persistOrders = (next: StoreOrder[]) => {
    setOrders(next);
    save('xontrix-orders', next);
  };

  const addProduct: StoreContextType['addProduct'] = (product) => {
    const id = `${Date.now()}`;
    persistProducts([{ ...product, id, inStock: product.stock > 0 }, ...products]);
  };

  const updateProduct: StoreContextType['updateProduct'] = (id, updates) => {
    persistProducts(
      products.map((product) => {
        if (product.id !== id) return product;
        const stock = updates.stock ?? product.stock;
        return { ...product, ...updates, stock, inStock: stock > 0 };
      })
    );
  };

  const deleteProduct = (id: string) => {
    persistProducts(products.filter((product) => product.id !== id));
  };

  const createOrder: StoreContextType['createOrder'] = ({
    items,
    paymentMethod,
    customerName = 'Walk-in Customer',
    customerEmail = 'guest@xontrix.local',
  }) => {
    // Prevent overselling: if requested qty exceeds available stock, reject order.
    const productById = new Map(products.map((p) => [p.id, p] as const));
    for (const item of items) {
      const product = productById.get(item.id);
      if (!product) {
        throw new Error(`Product not found for item ${item.id}`);
      }
      if (item.quantity > product.stock) {
        throw new Error(`Out of stock for ${product.name}. Requested ${item.quantity}, available ${product.stock}.`);
      }
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 999 ? 0 : 50;
    const order: StoreOrder = {
      id: `XTX-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName,
      customerEmail,
      paymentMethod,
      status: 'pending',
      subtotal,
      shipping,
      total: subtotal + shipping,
      createdAt: new Date().toISOString(),
      items,
    };

    persistOrders([order, ...orders]);
    persistProducts(
      products.map((product) => {
        const ordered = items.find((item) => item.id === product.id);
        if (!ordered) return product;
        const stock = Math.max(0, product.stock - ordered.quantity);
        return { ...product, stock, inStock: stock > 0 };
      })
    );

    return order;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    persistOrders(orders.map((order) => (order.id === id ? { ...order, status } : order)));
  };

  const value = useMemo(
    () => ({
      products,
      orders,
      users,
      addProduct,
      updateProduct,
      deleteProduct,
      createOrder,
      updateOrderStatus,
    }),
    [products, orders, users]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
