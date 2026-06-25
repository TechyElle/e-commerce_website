// @ts-nocheck
import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, MapPin, Plus, Trash2, Edit3, Check, X } from 'lucide-react';

const INITIAL_ADDRESSES = [
  { id: 1, label: 'Home', name: 'Ghani Regina Gold', phone: '09171234567', street: '123 Mabini Street', city: 'Quezon City', province: 'Metro Manila', zip: '1100', isDefault: true },
  { id: 2, label: 'School', name: 'Ghani Regina Gold', phone: '09171234567', street: 'PUP Main Campus, Anonas Street', city: 'Sta. Mesa, Manila', province: 'Metro Manila', zip: '1008', isDefault: false },
];

const EMPTY_FORM = { label: 'Home', name: '', phone: '', street: '', city: '', province: '', zip: '', isDefault: false };

export function UserAddresses() {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saved, setSaved] = useState(false);

  const handleEdit = (addr) => {
    setEditId(addr.id);
    setForm({ ...addr });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.street || !form.city) return;
    if (editId) {
      setAddresses(prev => prev.map(a => a.id === editId ? { ...form, id: editId } : a));
    } else {
      setAddresses(prev => [...prev, { ...form, id: Date.now() }]);
    }
    if (form.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === (editId || Date.now()) })));
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowForm(false); }, 1200);
  };

  const handleDelete = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/profile" className="text-[#7d8184] hover:text-[#db4444] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-[#111111]">My Addresses</h1>
          <button onClick={handleNew} className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: '#db4444' }}>
            <Plus className="w-3.5 h-3.5" /> Add New
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-[#111111]">{editId ? 'Edit Address' : 'New Address'}</p>
              <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-[#7d8184]" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* Label */}
              <div className="col-span-2">
                <label className="text-xs font-semibold text-[#7d8184] uppercase mb-1 block">Label</label>
                <div className="flex gap-2">
                  {['Home', 'School', 'Work', 'Other'].map(l => (
                    <button key={l} onClick={() => setForm(p => ({ ...p, label: l }))}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={{ background: form.label === l ? '#db4444' : '#f5f5f5', color: form.label === l ? 'white' : '#4f4f4f' }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Juan dela Cruz', span: 1 },
                { key: 'phone', label: 'Phone Number', placeholder: '09XXXXXXXXX', span: 1 },
                { key: 'street', label: 'Street Address', placeholder: '123 Rizal Street', span: 2 },
                { key: 'city', label: 'City / Municipality', placeholder: 'Quezon City', span: 1 },
                { key: 'province', label: 'Province', placeholder: 'Metro Manila', span: 1 },
                { key: 'zip', label: 'ZIP Code', placeholder: '1100', span: 1 },
              ].map(field => (
                <div key={field.key} className={field.span === 2 ? 'col-span-2' : ''}>
                  <label className="text-xs font-semibold text-[#7d8184] uppercase mb-1 block">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                    className="w-full h-10 px-3 bg-[#f5f5f5] border border-transparent rounded-lg text-sm text-[#111111] placeholder:text-[#ccc] focus:border-[#db4444] focus:outline-none"
                  />
                </div>
              ))}
              <div className="col-span-2 flex items-center gap-2">
                <input type="checkbox" id="default" checked={form.isDefault} onChange={e => setForm(p => ({ ...p, isDefault: e.target.checked }))} className="accent-[#db4444]" />
                <label htmlFor="default" className="text-xs text-[#4f4f4f]">Set as default address</label>
              </div>
            </div>
            <button onClick={handleSave}
              className="mt-4 w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all"
              style={{ background: saved ? '#22c55e' : '#db4444' }}>
              {saved ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Address'}
            </button>
          </div>
        )}

        {/* Address List */}
        <div className="space-y-3">
          {addresses.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm">
              <MapPin className="w-10 h-10 text-[#ccc] mx-auto mb-3" />
              <p className="text-sm text-[#7d8184]">No addresses saved yet</p>
            </div>
          ) : addresses.map(addr => (
            <div key={addr.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: '#db4444' }}>{addr.label}</span>
                  {addr.isDefault && <span className="px-2 py-0.5 rounded-full text-xs font-bold text-green-600 bg-green-50">Default</span>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(addr)} className="text-[#7d8184] hover:text-[#db4444] transition-colors"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(addr.id)} className="text-[#7d8184] hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-sm font-semibold text-[#111111]">{addr.name}</p>
              <p className="text-xs text-[#7d8184]">{addr.phone}</p>
              <p className="text-xs text-[#4f4f4f] mt-1">{addr.street}, {addr.city}, {addr.province} {addr.zip}</p>
              {!addr.isDefault && (
                <button onClick={() => handleSetDefault(addr.id)} className="mt-2 text-xs text-[#db4444] font-semibold hover:underline">
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}