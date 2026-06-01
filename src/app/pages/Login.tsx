import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import logoImg from '../../imports/Logo & QR/LOGO.png';
import { useAuth } from '../context/AuthContext';
import { usersApi } from '../lib/api';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();
  const { signInDemo } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!isLogin && !formData.name.trim())
      newErrors.name = 'Pangalan ay kailangan.';
    if (!formData.email.trim())
      newErrors.email = 'Email ay kailangan.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Maglagay ng valid na email address.';
    if (!formData.password.trim())
      newErrors.password = 'Password ay kailangan.';
    else if (formData.password.length < 6)
      newErrors.password = 'Ang password ay dapat hindi bababa sa 6 characters.';
    if (!isLogin && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Hindi magkatugma ang password.';
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      if (isLogin) {
        // Login (MySQL)
        const res = await usersApi.login({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });

        // backend returns: { id, name, email, role, created_at }
        signInDemo(res.email, res.name ?? 'Xontrix User', res.role);
        toast.success('Maligayang pagbabalik!');
        navigate(res.role === 'admin' ? '/admin' : '/');
      } else {
        // Register (MySQL)
        await usersApi.register({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });

        toast.success('Account created successfully!');
        setSubmitted(true);
      }
    } catch (error: any) {
      console.error(error);
      // normalize backend error
      const messageFromBackend = error?.message || error?.error;
      let message = messageFromBackend || 'May mali sa pag-login. Pakisubukang muli.';

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-3">
            <img src={logoImg} alt="Xontrix Logo" className="w-16 h-16" />
            <span
              className="text-2xl text-white"
              style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
            >
              XONTRIX
            </span>
          </Link>
        </div>

        {/* Card */}
        <div
          className="bg-[#1e1e1e] border border-[rgba(255,255,255,0.1)] p-8"
          style={{ boxShadow: '0 0 40px rgba(0,191,223,0.08)' }}
        >
          {/* Toggle Login / Register */}
          <div className="flex mb-8 border border-[rgba(255,255,255,0.1)]">
            <button
              onClick={() => { setIsLogin(true); setErrors({}); setSubmitted(false); }}
              className={`flex-1 py-3 text-sm transition-all ${
                isLogin
                  ? 'bg-[#00BFDF] text-black font-bold'
                  : 'bg-transparent text-[#aaaaaa] hover:text-white'
              }`}
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              LOGIN
            </button>
            <button
              onClick={() => { setIsLogin(false); setErrors({}); setSubmitted(false); }}
              className={`flex-1 py-3 text-sm transition-all ${
                !isLogin
                  ? 'bg-[#00BFDF] text-black font-bold'
                  : 'bg-transparent text-[#aaaaaa] hover:text-white'
              }`}
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              REGISTER
            </button>
          </div>

          {submitted ? (
            /* Success Message */
            <div className="text-center py-8">
              <div
                className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: 'rgba(16,185,129,0.1)',
                  border: '2px solid #10b981',
                }}
              >
                <span className="text-3xl">✓</span>
              </div>
              <h3
                className="text-xl text-white mb-2"
                style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700 }}
              >
                {isLogin ? 'WELCOME BACK!' : 'ACCOUNT CREATED!'}
              </h3>
              <p
                className="text-[#aaaaaa] mb-6"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                {isLogin
                  ? 'Maligayang pagbabalik sa Xontrix!'
                  : 'Maligayang pagdating sa Xontrix!'}
              </p>
              <Link to="/">
                <button className="cyber-button px-8 py-3">
                  GO TO HOME
                  <ArrowRight className="ml-2 w-4 h-4 inline" />
                </button>
              </Link>
            </div>
          ) : (
            /* Form */
            <div className="space-y-5">

              {/* Name field - Register only */}
              {!isLogin && (
                <div>
                  <label
                    className="block text-sm mb-2 text-[#aaaaaa]"
                    style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
                  >
                    FULL NAME
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 pl-10 pr-4 bg-[#111111] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[#555] focus:border-[#00BFDF] focus:outline-none focus:ring-1 focus:ring-[rgba(0,191,223,0.3)] transition-all"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[#dc2626] text-xs mt-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {errors.name}
                    </p>
                  )}
                </div>
              )}

              {/* Email */}
              <div>
                <label
                  className="block text-sm mb-2 text-[#aaaaaa]"
                  style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
                >
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 pl-10 pr-4 bg-[#111111] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[#555] focus:border-[#00BFDF] focus:outline-none focus:ring-1 focus:ring-[rgba(0,191,223,0.3)] transition-all"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  />
                </div>
                {errors.email && (
                  <p className="text-[#dc2626] text-xs mt-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  className="block text-sm mb-2 text-[#aaaaaa]"
                  style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
                >
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full h-11 pl-10 pr-10 bg-[#111111] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[#555] focus:border-[#00BFDF] focus:outline-none focus:ring-1 focus:ring-[rgba(0,191,223,0.3)] transition-all"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaaaaa] hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[#dc2626] text-xs mt-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password - Register only */}
              {!isLogin && (
                <div>
                  <label
                    className="block text-sm mb-2 text-[#aaaaaa]"
                    style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
                  >
                    CONFIRM PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full h-11 pl-10 pr-4 bg-[#111111] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[#555] focus:border-[#00BFDF] focus:outline-none focus:ring-1 focus:ring-[rgba(0,191,223,0.3)] transition-all"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[#dc2626] text-xs mt-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Forgot Password - Login only */}
              {isLogin && (
                <div className="text-right">
                  <button
                    className="text-sm text-[#00BFDF] hover:text-white transition-colors"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full cyber-button py-3 mt-2"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 inline animate-spin" />
                    PLEASE WAIT
                  </>
                ) : (
                  <>
                    {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
                    <ArrowRight className="ml-2 w-4 h-4 inline" />
                  </>
                )}
              </button>

            </div>
          )}
        </div>

        {/* Bottom link */}
        <p
          className="text-center text-[#aaaaaa] text-sm mt-6"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          {isLogin && (
            <span className="block mb-3 text-[#00BFDF]">
              Demo instructions removed. Use your MySQL account credentials.
            </span>
          )}
          {isLogin ? "Wala pang account? " : "May account na? "}
          <button
            onClick={() => { setIsLogin(!isLogin); setErrors({}); setSubmitted(false); }}
            className="text-[#00BFDF] hover:text-white transition-colors font-bold"
          >
            {isLogin ? 'Mag-Register' : 'Mag-Login'}
          </button>
        </p>

      </div>
    </div>
  );
}
