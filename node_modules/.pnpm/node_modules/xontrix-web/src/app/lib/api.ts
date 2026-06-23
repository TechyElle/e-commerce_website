// src/app/lib/api.ts
// Thin API client — wraps all PHP backend endpoints
// Change BASE_URL to match your XAMPP/server setup

export const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost/backend/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const data = await res.json();
  if (!res.ok) throw new Error((data as { error?: string }).error ?? `HTTP ${res.status}`);
  return data as T;
}

// ── Types (mirrors DB shape) ──────────────────────────────────────────────────

export interface ApiProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
  in_stock: boolean;
  rating: number;
  reviews: number;
  is_new: boolean;
  specs: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface ApiOrderItem {
  id: number;
  order_id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
}

export interface ApiOrder {
  id: string;
  customer_name: string;
  customer_email: string;
  payment_method: string;
  status: 'pending' | 'shipped' | 'delivered';
  subtotal: number;
  shipping: number;
  total: number;
  created_at: string;
  updated_at: string;
  items: ApiOrderItem[];
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface ApiFeedback {
  customer_name: string;
  customer_email: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ApiLoyaltyCustomer {
  name: string;
  email: string;
  total_spent: number;
  order_count: number;
  badge: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

export interface ApiCalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'success' | 'warning' | 'info' | 'danger';
  desc: string;
}

export interface SalesSummary {
  total_orders: number;
  total_revenue: number;
  pending_count: number;
  shipped_count: number;
  delivered_count: number;
  today_revenue: number;
  month_revenue: number;
  growth_rate: number;
  target_achievement: number;
  active_deals: number;
  best_sellers: { product_id: string; name: string; total_sold: number; revenue: number }[];
  low_stock: { id: string; name: string; stock: number }[];
  feedback: ApiFeedback[];
  loyalty_customers: ApiLoyaltyCustomer[];
  calendar_events: ApiCalendarEvent[];
}

// ── Products ─────────────────────────────────────────────────────────────────

export const productsApi = {
  list: (category?: string) =>
    request<ApiProduct[]>(category ? `/products.php?category=${encodeURIComponent(category)}` : '/products.php'),

  get: (id: string) =>
    request<ApiProduct>(`/products.php?id=${id}`),

  create: (data: Omit<ApiProduct, 'id' | 'created_at' | 'updated_at' | 'in_stock'>) =>
    request<ApiProduct>('/products.php', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, updates: Partial<Omit<ApiProduct, 'id' | 'created_at' | 'updated_at'>>) =>
    request<ApiProduct>(`/products.php?id=${id}`, { method: 'PUT', body: JSON.stringify(updates) }),

  delete: (id: string) =>
    request<{ deleted: boolean }>(`/products.php?id=${id}`, { method: 'DELETE' }),
};

// ── Orders ───────────────────────────────────────────────────────────────────

export const ordersApi = {
  list: (email?: string) =>
    request<ApiOrder[]>(email ? `/orders.php?email=${encodeURIComponent(email)}` : '/orders.php'),

  get: (id: string) =>
    request<ApiOrder>(`/orders.php?id=${id}`),

  create: (data: {
    items: { id: string; name: string; price: number; quantity: number; image?: string }[];
    paymentMethod: string;
    customerName?: string;
    customerEmail?: string;
  }) =>
    request<ApiOrder>('/orders.php', { method: 'POST', body: JSON.stringify(data) }),

  updateStatus: (id: string, status: ApiOrder['status']) =>
    request<ApiOrder>(`/orders.php?id=${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

// ── Users ────────────────────────────────────────────────────────────────────

export const usersApi = {
  me: () =>
    request<{ user: ApiUser | null }>('/users.php?action=me'),

  list: () =>
    request<ApiUser[]>('/users.php'),

  get: (id: string) =>
    request<ApiUser>(`/users.php?id=${id}`),

  register: (data: { name: string; email: string; password: string }) =>
    request<ApiUser>('/users.php?action=register', { method: 'POST', body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    request<ApiUser>('/users.php?action=login', { method: 'POST', body: JSON.stringify(data) }),

  googleLogin: (data: { name: string; email: string; providerUid: string }) =>
    request<ApiUser>('/users.php?action=google', { method: 'POST', body: JSON.stringify(data) }),

  logout: () =>
    request<{ ok: boolean }>('/users.php?action=logout', { method: 'POST', body: JSON.stringify({}) }),

  updateRole: (id: string, role: 'admin' | 'user') =>
    request<ApiUser>(`/users.php?id=${id}`, { method: 'PUT', body: JSON.stringify({ role }) }),

  delete: (id: string) =>
    request<{ deleted: boolean }>(`/users.php?id=${id}`, { method: 'DELETE' }),
};

// ── Sales ────────────────────────────────────────────────────────────────────

export const salesApi = {
  summary: () =>
    request<SalesSummary>('/sales.php?period=summary'),

  daily: () =>
    request<{ date: string; orders: number; revenue: number }[]>('/sales.php?period=daily'),

  weekly: () =>
    request<{ week: string; week_start: string; orders: number; revenue: number }[]>('/sales.php?period=weekly'),

  monthly: () =>
    request<{ month: string; orders: number; revenue: number }[]>('/sales.php?period=monthly'),

  loyalty: async (): Promise<ApiLoyaltyCustomer[]> => {
    const s = await request<SalesSummary>('/sales.php?period=summary');
    return s.loyalty_customers ?? [];
  },

  feedback: async (): Promise<ApiFeedback[]> => {
    const s = await request<SalesSummary>('/sales.php?period=summary');
    return s.feedback ?? [];
  },

  calendarEvents: async (): Promise<ApiCalendarEvent[]> => {
    const s = await request<SalesSummary>('/sales.php?period=summary');
    return s.calendar_events ?? [];
  },
};