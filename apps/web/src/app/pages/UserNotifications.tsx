// @ts-nocheck
import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Bell, ShoppingBag, Tag, Truck, Star, Check } from 'lucide-react';


const NOTIFICATION_SETTINGS = [
  {
    category: 'Orders',
    icon: <ShoppingBag className="w-4 h-4" />,
    color: '#db4444',
    items: [
      { id: 'order_confirmed', label: 'Order Confirmed', desc: 'When your order is successfully placed', email: true, sms: true },
      { id: 'order_shipped', label: 'Order Shipped', desc: 'When your order is on its way', email: true, sms: true },
      { id: 'order_delivered', label: 'Order Delivered', desc: 'When your order has been delivered', email: true, sms: false },
      { id: 'order_cancelled', label: 'Order Cancelled', desc: 'When an order is cancelled', email: true, sms: false },
    ],
  },
  {
    category: 'Promotions',
    icon: <Tag className="w-4 h-4" />,
    color: '#f59e0b',
    items: [
      { id: 'promo_flash', label: 'Flash Sales', desc: 'Limited-time deals and flash sales', email: true, sms: false },
      { id: 'promo_new', label: 'New Arrivals', desc: 'New products added to the store', email: false, sms: false },
      { id: 'promo_codes', label: 'Promo Codes', desc: 'Exclusive discount codes for you', email: true, sms: true },
    ],
  },
  {
    category: 'Delivery',
    icon: <Truck className="w-4 h-4" />,
    color: '#6366f1',
    items: [
      { id: 'delivery_update', label: 'Delivery Updates', desc: 'Real-time updates on your delivery', email: true, sms: true },
      { id: 'delivery_attempt', label: 'Failed Delivery Attempt', desc: 'When delivery was unsuccessful', email: true, sms: true },
    ],
  },
  {
    category: 'Reviews',
    icon: <Star className="w-4 h-4" />,
    color: '#22c55e',
    items: [
      { id: 'review_reminder', label: 'Review Reminder', desc: 'Reminder to review purchased items', email: false, sms: false },
      { id: 'review_reply', label: 'Review Replies', desc: 'When someone replies to your review', email: true, sms: false },
    ],
  },
];


export function UserNotifications() {
  const [settings, setSettings] = useState(() => {
    const flat = {};
    NOTIFICATION_SETTINGS.forEach(cat =>
      cat.items.forEach(item => {
        flat[item.id] = { email: item.email, sms: item.sms };
      })
    );
    return flat;
  });
  const [saved, setSaved] = useState(false);


  const toggle = (id, type) => {
    setSettings(prev => ({ ...prev, [id]: { ...prev[id], [type]: !prev[id][type] } }));
  };


  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };


  return (
    <div className="min-h-screen bg-[#f5f5f5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/profile" className="text-[#7d8184] hover:text-[#db4444] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-[#111111]">Notifications</h1>
        </div>


        {/* Channel legend */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#db4444]" />
            <span className="text-xs font-semibold text-[#111111]">Notification Preferences</span>
          </div>
          <div className="ml-auto flex items-center gap-4 text-xs text-[#7d8184] font-semibold">
            <span>Email</span>
            <span>SMS</span>
          </div>
        </div>


        {/* Settings */}
        <div className="space-y-4">
          {NOTIFICATION_SETTINGS.map(cat => (
            <div key={cat.category} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[#f5f5f5] flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ background: cat.color }}>
                  {cat.icon}
                </div>
                <p className="text-sm font-bold text-[#111111]">{cat.category}</p>
              </div>
              {cat.items.map((item, i) => (
                <div key={item.id} className={`px-4 py-3.5 flex items-center gap-3 ${i < cat.items.length - 1 ? 'border-b border-[#f5f5f5]' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111111]">{item.label}</p>
                    <p className="text-xs text-[#7d8184] truncate">{item.desc}</p>
                  </div>
                  {/* Email toggle */}
                  <button
                    onClick={() => toggle(item.id, 'email')}
                    className="w-11 h-6 rounded-full transition-all relative shrink-0"
                    style={{ background: settings[item.id]?.email ? '#db4444' : '#e5e5e5' }}
                  >
                    <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                      style={{ left: settings[item.id]?.email ? '22px' : '2px' }} />
                  </button>
                  {/* SMS toggle */}
                  <button
                    onClick={() => toggle(item.id, 'sms')}
                    className="w-11 h-6 rounded-full transition-all relative shrink-0"
                    style={{ background: settings[item.id]?.sms ? '#db4444' : '#e5e5e5' }}
                  >
                    <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                      style={{ left: settings[item.id]?.sms ? '22px' : '2px' }} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>


        {/* Save button */}
        <button
          onClick={handleSave}
          className="mt-6 w-full py-3.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all"
          style={{ background: saved ? '#22c55e' : '#db4444' }}
        >
          {saved ? <><Check className="w-4 h-4" /> Preferences Saved!</> : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
}

