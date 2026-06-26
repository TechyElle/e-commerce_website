// @ts-nocheck
import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Shield, Lock, Eye, EyeOff, Check, AlertCircle, Smartphone, Mail } from 'lucide-react';


export function UserSecurity() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [twoFA, setTwoFA] = useState({ email: true, sms: false });


  const validate = () => {
    const e = {};
    if (!form.current) e.current = 'Current password is required.';
    if (!form.newPass) e.newPass = 'New password is required.';
    else if (form.newPass.length < 8) e.newPass = 'Password must be at least 8 characters.';
    else if (!/[A-Z]/.test(form.newPass)) e.newPass = 'Must contain at least one uppercase letter.';
    else if (!/[0-9]/.test(form.newPass)) e.newPass = 'Must contain at least one number.';
    if (!form.confirm) e.confirm = 'Please confirm your new password.';
    else if (form.newPass !== form.confirm) e.confirm = 'Passwords do not match.';
    return e;
  };


  const getStrength = (pass) => {
    if (!pass) return { level: 0, label: '', color: '#e5e5e5' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    if (score <= 1) return { level: 1, label: 'Weak', color: '#ef4444' };
    if (score === 2) return { level: 2, label: 'Fair', color: '#f59e0b' };
    if (score === 3) return { level: 3, label: 'Good', color: '#3b82f6' };
    return { level: 4, label: 'Strong', color: '#22c55e' };
  };


  const strength = getStrength(form.newPass);


  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setSaved(true);
    setForm({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setSaved(false), 3000);
  };


  return (
    <div className="min-h-screen bg-[#f5f5f5]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/profile" className="text-[#7d8184] hover:text-[#db4444] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-[#111111]">Security</h1>
        </div>


        {/* Success banner */}
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 flex items-center gap-3">
            <Check className="w-5 h-5 text-green-500 shrink-0" />
            <p className="text-sm font-semibold text-green-700">Password changed successfully!</p>
          </div>
        )}


        {/* Change Password */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          <div className="px-4 py-3 border-b border-[#f5f5f5] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ background: '#db4444' }}>
              <Lock className="w-4 h-4" />
            </div>
            <p className="text-sm font-bold text-[#111111]">Change Password</p>
          </div>


          <div className="p-5 space-y-4">
            {/* Current Password */}
            <div>
              <label className="text-xs font-semibold text-[#7d8184] uppercase mb-1.5 block">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  placeholder="Enter current password"
                  value={form.current}
                  onChange={e => setForm(p => ({ ...p, current: e.target.value }))}
                  className="w-full h-11 px-4 pr-10 bg-[#f5f5f5] border rounded-xl text-sm text-[#111111] placeholder:text-[#ccc] focus:outline-none transition-colors"
                  style={{ borderColor: errors.current ? '#ef4444' : 'transparent' }}
                />
                <button onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7d8184]">
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.current && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.current}</p>}
            </div>


            {/* New Password */}
            <div>
              <label className="text-xs font-semibold text-[#7d8184] uppercase mb-1.5 block">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={form.newPass}
                  onChange={e => setForm(p => ({ ...p, newPass: e.target.value }))}
                  className="w-full h-11 px-4 pr-10 bg-[#f5f5f5] border rounded-xl text-sm text-[#111111] placeholder:text-[#ccc] focus:outline-none transition-colors"
                  style={{ borderColor: errors.newPass ? '#ef4444' : 'transparent' }}
                />
                <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7d8184]">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength meter */}
              {form.newPass && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex-1 h-1.5 rounded-full transition-all"
                        style={{ background: i <= strength.level ? strength.color : '#e5e5e5' }} />
                    ))}
                  </div>
                  <p className="text-xs font-semibold" style={{ color: strength.color }}>{strength.label} password</p>
                </div>
              )}
              {errors.newPass && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.newPass}</p>}
            </div>


            {/* Confirm Password */}
            <div>
              <label className="text-xs font-semibold text-[#7d8184] uppercase mb-1.5 block">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={form.confirm}
                  onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
                  className="w-full h-11 px-4 pr-10 bg-[#f5f5f5] border rounded-xl text-sm text-[#111111] placeholder:text-[#ccc] focus:outline-none transition-colors"
                  style={{ borderColor: errors.confirm ? '#ef4444' : 'transparent' }}
                />
                <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7d8184]">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirm && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.confirm}</p>}
            </div>


            {/* Password requirements */}
            <div className="bg-[#f5f5f5] rounded-xl p-3 space-y-1.5">
              <p className="text-xs font-semibold text-[#7d8184] uppercase">Password Requirements</p>
              {[
                { text: 'At least 8 characters', met: form.newPass.length >= 8 },
                { text: 'One uppercase letter', met: /[A-Z]/.test(form.newPass) },
                { text: 'One number', met: /[0-9]/.test(form.newPass) },
                { text: 'One special character (recommended)', met: /[^A-Za-z0-9]/.test(form.newPass) },
              ].map((req, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: req.met ? '#22c55e' : '#e5e5e5' }}>
                    {req.met && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <p className="text-xs" style={{ color: req.met ? '#22c55e' : '#7d8184' }}>{req.text}</p>
                </div>
              ))}
            </div>


            <button onClick={handleSave}
              className="w-full py-3 rounded-xl text-white text-sm font-bold transition-all"
              style={{ background: '#db4444' }}>
              Update Password
            </button>
          </div>
        </div>


        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-[#f5f5f5] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ background: '#6366f1' }}>
              <Shield className="w-4 h-4" />
            </div>
            <p className="text-sm font-bold text-[#111111]">Two-Factor Authentication</p>
          </div>
          <div className="p-5 space-y-3">
            <p className="text-xs text-[#7d8184]">Add an extra layer of security to your account.</p>
            {[
              { id: 'email', icon: <Mail className="w-4 h-4" />, label: 'Email Authentication', desc: 'Receive a code via email' },
              { id: 'sms', icon: <Smartphone className="w-4 h-4" />, label: 'SMS Authentication', desc: 'Receive a code via text message' },
            ].map(method => (
              <div key={method.id} className="flex items-center gap-3 p-3 bg-[#f5f5f5] rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#7d8184] shrink-0">
                  {method.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#111111]">{method.label}</p>
                  <p className="text-xs text-[#7d8184]">{method.desc}</p>
                </div>
                <button
                  onClick={() => setTwoFA(p => ({ ...p, [method.id]: !p[method.id] }))}
                  className="w-11 h-6 rounded-full transition-all relative shrink-0"
                  style={{ background: twoFA[method.id] ? '#db4444' : '#e5e5e5' }}>
                  <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                    style={{ left: twoFA[method.id] ? '22px' : '2px' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

