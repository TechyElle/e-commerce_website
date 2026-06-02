import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import {
  BarChart3,
  Box,
  Edit3,
  ImagePlus,
  Package,
  Save,
  ShoppingCart,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useStore, type OrderStatus, type StoreProduct } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { BASE_URL } from '../lib/api';

const money = (value: number) => `PHP ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

const emptyProduct = {
  name: '',
  price: 0,
  image: '',
  category: 'Components',
  description: '',
  rating: 4.8,
  reviews: 0,
  stock: 10,
};

export function Admin() {
  const {
    products,
    orders,
    users,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    refreshOrders,
    refreshUsers,
  } = useStore();
  const { user, isAdmin, signOut } = useAuth();
  const [draft, setDraft] = useState(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);

  // ── Image upload state ───────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    refreshOrders().catch(() => undefined);
    refreshUsers().catch(() => undefined);
  }, [isAdmin, refreshOrders, refreshUsers]);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    setPreviewUrl(URL.createObjectURL(file));
    setUploadError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${BASE_URL}/upload.php`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');

      setDraft((prev) => ({ ...prev, image: data.url }));
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    setDraft((prev) => ({ ...prev, image: '' }));
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const analytics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const today = new Date().toISOString().slice(0, 10);
    const dailyRevenue = orders
      .filter((order) => order.createdAt.slice(0, 10) === today)
      .reduce((sum, order) => sum + order.total, 0);
    const month = new Date().toISOString().slice(0, 7);
    const monthlyRevenue = orders
      .filter((order) => order.createdAt.slice(0, 7) === month)
      .reduce((sum, order) => sum + order.total, 0);
    const lowStock = products.filter((product) => product.stock <= 5).length;
    return { totalRevenue, dailyRevenue, monthlyRevenue, lowStock };
  }, [orders, products]);

  const beginEdit = (product: StoreProduct) => {
    setEditingId(product.id);
    setPreviewUrl(product.image || null);
    setDraft({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      rating: product.rating,
      reviews: product.reviews,
      stock: product.stock,
    });
  };

  const resetDraft = () => {
    setEditingId(null);
    setDraft(emptyProduct);
    setPreviewUrl(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const saveProduct = () => {
    if (!draft.name.trim() || !draft.category.trim()) return;
    if (editingId) {
      updateProduct(editingId, draft);
    } else {
      addProduct(draft);
    }
    resetDraft();
  };

  const statCards = [
    { label: 'Total Revenue', value: money(analytics.totalRevenue), icon: BarChart3 },
    { label: 'Daily Sales', value: money(analytics.dailyRevenue), icon: ShoppingCart },
    { label: 'Monthly Sales', value: money(analytics.monthlyRevenue), icon: Save },
    { label: 'Low Stock Items', value: `${analytics.lowStock}`, icon: Package },
  ];

  return (
    <div className="min-h-screen bg-[#111111] px-4 py-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="text-[#00BFDF] text-sm" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700 }}>
              ADMIN ONLY
            </p>
            <h1 className="text-3xl sm:text-4xl" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900 }}>
              XONTRIX DASHBOARD
            </h1>
            <p className="text-[#aaaaaa] text-sm mt-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Signed in as {user?.email}
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/products" className="px-4 py-2 border border-[#00BFDF] text-[#00BFDF] hover:bg-[#00BFDF] hover:text-black transition-all text-sm">
              View Store
            </Link>
            <button
              onClick={signOut}
              className="px-4 py-2 border border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white transition-all text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {statCards.map((card) => (
            <div key={card.label} className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#aaaaaa] text-xs uppercase tracking-wider">{card.label}</span>
                <card.icon className="w-5 h-5 text-[#00BFDF]" />
              </div>
              <div className="text-2xl text-white" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
                {card.value}
              </div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="orders">
          <TabsList className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] h-auto flex-wrap">
            {[
              { tab: 'orders', Icon: ShoppingCart },
              { tab: 'products', Icon: Box },
              { tab: 'inventory', Icon: Package },
              { tab: 'users', Icon: Users },
            ].map(({ tab, Icon }) => (
              <TabsTrigger key={tab} value={tab} className="capitalize data-[state=active]:bg-[#00BFDF] data-[state=active]:text-black">
                <Icon className="w-4 h-4 mr-2" />
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <DataPanel title="Order Management">
              <ResponsiveTable headers={['Order', 'Customer', 'Payment', 'Total', 'Status']}>
                {orders.length === 0 ? (
                  <EmptyRow colSpan={5} text="No orders yet. Checkout from the cart to create one." />
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b border-[rgba(255,255,255,0.05)]">
                      <Cell>{order.id}</Cell>
                      <Cell>{order.customerName}</Cell>
                      <Cell>{order.paymentMethod}</Cell>
                      <Cell>{money(order.total)}</Cell>
                      <Cell>
                        <select
                          value={order.status}
                          onChange={(event) => updateOrderStatus(order.id, event.target.value as OrderStatus)}
                          className="bg-[#111111] border border-[rgba(255,255,255,0.12)] text-white px-3 py-2"
                        >
                          <option value="pending">pending</option>
                          <option value="shipped">shipped</option>
                          <option value="delivered">delivered</option>
                        </select>
                      </Cell>
                    </tr>
                  ))
                )}
              </ResponsiveTable>
            </DataPanel>
          </TabsContent>

          <TabsContent value="products" className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <DataPanel title={editingId ? 'Edit Product' : 'Add Product'}>
              <div className="space-y-3">
                <AdminInput label="Name" value={draft.name} onChange={(value) => setDraft({ ...draft, name: value })} />
                <AdminInput label="Category" value={draft.category} onChange={(value) => setDraft({ ...draft, category: value })} />

                {/* ── Image Upload ── */}
                <div>
                  <span className="block text-[#aaaaaa] text-xs uppercase tracking-wider mb-1">Product Image</span>

                  {/* Preview */}
                  {(previewUrl || draft.image) && (
                    <div className="relative mb-2 w-full h-36 bg-[#111111] border border-[rgba(255,255,255,0.12)] flex items-center justify-center overflow-hidden">
                      <img
                        src={previewUrl || draft.image}
                        alt="Preview"
                        className="max-h-full max-w-full object-contain p-2"
                      />
                      <button
                        onClick={clearImage}
                        className="absolute top-1 right-1 bg-[#dc2626] text-white rounded-full p-0.5 hover:bg-red-700"
                        title="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Upload button */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full py-2 border border-dashed border-[#00BFDF] text-[#00BFDF] hover:bg-[rgba(0,191,223,0.08)] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    <ImagePlus className="w-4 h-4" />
                    {uploading ? 'Uploading...' : (previewUrl || draft.image) ? 'Change Image' : 'Upload Image'}
                  </button>

                  {uploadError && (
                    <p className="text-[#dc2626] text-xs mt-1">{uploadError}</p>
                  )}
                </div>

                <AdminInput label="Description" value={draft.description} onChange={(value) => setDraft({ ...draft, description: value })} />
                <div className="grid grid-cols-2 gap-3">
                  <AdminNumber label="Price" value={draft.price} onChange={(value) => setDraft({ ...draft, price: value })} />
                  <AdminNumber label="Stock" value={draft.stock} onChange={(value) => setDraft({ ...draft, stock: value })} />
                </div>
                <button onClick={saveProduct} disabled={uploading} className="w-full cyber-button py-3 disabled:opacity-50">
                  <Save className="w-4 h-4 mr-2 inline" />
                  {editingId ? 'Save Product' : 'Add Product'}
                </button>
                {editingId && (
                  <button onClick={resetDraft} className="w-full py-3 border border-[rgba(255,255,255,0.15)] text-[#aaaaaa]">
                    Cancel Edit
                  </button>
                )}
              </div>
            </DataPanel>

            <DataPanel title="Product Management" className="xl:col-span-2">
              <ResponsiveTable headers={['Image', 'Product', 'Category', 'Price', 'Stock', 'Actions']}>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-[rgba(255,255,255,0.05)]">
                    <Cell>
                      <div className="w-10 h-10 bg-[#111] flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                        ) : (
                          <ImagePlus className="w-4 h-4 text-[#555]" />
                        )}
                      </div>
                    </Cell>
                    <Cell>{product.name}</Cell>
                    <Cell>{product.category}</Cell>
                    <Cell>{money(product.price)}</Cell>
                    <Cell>{product.stock}</Cell>
                    <Cell>
                      <div className="flex gap-2">
                        <button onClick={() => beginEdit(product)} className="p-2 border border-[#00BFDF] text-[#00BFDF]">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteProduct(product.id)} className="p-2 border border-[#dc2626] text-[#dc2626]">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Cell>
                  </tr>
                ))}
              </ResponsiveTable>
            </DataPanel>
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <DataPanel title="Inventory Monitoring">
              <ResponsiveTable headers={['Product', 'Category', 'Stock', 'Status']}>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-[rgba(255,255,255,0.05)]">
                    <Cell>{product.name}</Cell>
                    <Cell>{product.category}</Cell>
                    <Cell>{product.stock}</Cell>
                    <Cell>
                      <span className={product.stock === 0 ? 'text-[#dc2626]' : product.stock <= 5 ? 'text-[#f59e0b]' : 'text-[#10b981]'}>
                        {product.stock === 0 ? 'Out of Stock' : product.stock <= 5 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </Cell>
                  </tr>
                ))}
              </ResponsiveTable>
            </DataPanel>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <DataPanel title="User Management">
              <ResponsiveTable headers={['Name', 'Email', 'Role', 'Created']}>
                {users.map((storeUser) => (
                  <tr key={storeUser.id} className="border-b border-[rgba(255,255,255,0.05)]">
                    <Cell>{storeUser.name}</Cell>
                    <Cell>{storeUser.email}</Cell>
                    <Cell>{storeUser.role}</Cell>
                    <Cell>{new Date(storeUser.createdAt).toLocaleDateString()}</Cell>
                  </tr>
                ))}
              </ResponsiveTable>
            </DataPanel>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function DataPanel({ title, className = '', children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <section className={`bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] ${className}`}>
      <h2 className="px-5 py-4 border-b border-[rgba(255,255,255,0.08)] text-lg" style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}>
        {title}
      </h2>
      <div className="p-5">{children}</div>
    </section>
  );
}

function ResponsiveTable({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-[rgba(255,255,255,0.08)]">
            {headers.map((header) => (
              <th key={header} className="text-left text-[#777] px-3 py-3 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-3 text-[#dddddd]">{children}</td>;
}

function EmptyRow({ colSpan, text }: { colSpan: number; text: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-3 py-8 text-center text-[#777]">
        {text}
      </td>
    </tr>
  );
}

function AdminInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="block text-[#aaaaaa] text-xs uppercase tracking-wider mb-1">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-[#111111] border border-[rgba(255,255,255,0.12)] text-white px-3 py-2 focus:border-[#00BFDF] outline-none"
      />
    </label>
  );
}

function AdminNumber({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="block text-[#aaaaaa] text-xs uppercase tracking-wider mb-1">{label}</span>
      <input
        type="number"
        value={value}
        min={0}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full bg-[#111111] border border-[rgba(255,255,255,0.12)] text-white px-3 py-2 focus:border-[#00BFDF] outline-none"
      />
    </label>
  );
}
