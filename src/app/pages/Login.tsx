import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from 'lucide-react';
import logoImg from '../../imports/Logo & QR/LOGO.png';
import { useAuth } from '../context/AuthContext';
import { usersApi } from '../lib/api';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

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
    if (!isLogin && !formData.name.trim()) newErrors.name = 'Pangalan ay kailangan.';
    if (!formData.email.trim()) newErrors.email = 'Email ay kailangan.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Maglagay ng valid na email address.';
    }
    if (!formData.password.trim()) newErrors.password = 'Password ay kailangan.';
    else if (formData.password.length < 6) {
      newErrors.password = 'Ang password ay dapat hindi bababa sa 6 characters.';
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Hindi magkatugma ang password.';
    }
    return newErrors;
  };

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      if (isLogin) {
        const res = await usersApi.login({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });

        signIn({ id: res.id, email: res.email, name: res.name ?? 'Xontrix User', role: res.role });
        toast.success('Maligayang pagbabalik!');
        navigate(res.role === 'admin' ? '/admin' : '/');
      } else {
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
      const messageFromBackend = error?.message || error?.error;
      const message = messageFromBackend || 'May mali sa pag-login. Pakisubukang muli.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (nextIsLogin: boolean) => {
    setIsLogin(nextIsLogin);
    setErrors({});
    setSubmitted(false);
  };

  const passwordMeta = useMemo(() => {
    const pwd = formData.password;
    const lengthScore = Math.min(4, Math.floor(pwd.length / 4));
    const variety =
      (/[a-z]/.test(pwd) ? 1 : 0) + (/[A-Z]/.test(pwd) ? 1 : 0) + (/[0-9]/.test(pwd) ? 1 : 0) + (/[^A-Za-z0-9]/.test(pwd) ? 1 : 0);
    const total = Math.min(8, lengthScore + variety);

    if (!pwd) return { label: '', score: 0, hintColor: 'text-white/60' } as const;

    if (total <= 2) return { label: 'Weak', score: total, hintColor: 'text-[#ff7a7a]' } as const;
    if (total <= 5) return { label: 'Fair', score: total, hintColor: 'text-[#ffd166]' } as const;
    if (total <= 7) return { label: 'Strong', score: total, hintColor: 'text-[#00bfdf]' } as const;
    return { label: 'Very strong', score: total, hintColor: 'text-[#10b981]' } as const;
  }, [formData.password]);

  return (
      <div className="relative min-h-screen bg-[#0a0f1b] px-4 py-8 text-white sm:px-6 lg:px-10">

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Left: Benefits panel (hidden on mobile) */}
        <aside className="hidden lg:flex lg:min-h-[640px] lg:flex-col lg:justify-center lg:rounded-lg lg:p-8">
          <div className="flex items-center gap-3 mb-8">
            <img src={logoImg} alt="Xontrix Logo" className="h-12 w-12 object-contain" />
            <span className="text-2xl font-black tracking-normal text-white">XONTRIX</span>
          </div>

          <div className="relative rounded-lg bg-gradient-to-br from-[#c85353] to-[#a63d3d] p-8 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-4xl font-black leading-tight mb-4">
                Manage orders and shop faster with your Xontrix account.
              </h2>
              <p className="text-base font-semibold leading-6 text-white/90 mb-8">
                Sign in to continue checkout, save your details, and reach admin tools when your account has access.
              </p>

              <div className="flex gap-4">
                <div className="flex flex-col items-center justify-center rounded-lg border border-white/20 bg-black/20 px-4 py-4 flex-1">
                  <span className="text-lg font-bold">Fast</span>
                  <span className="text-xs font-semibold text-white/70 uppercase">Checkout</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border border-white/20 bg-black/20 px-4 py-4 flex-1">
                  <span className="text-lg font-bold">Local</span>
                  <span className="text-xs font-semibold text-white/70 uppercase">Support</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border border-white/20 bg-black/20 px-4 py-4 flex-1">
                  <span className="text-lg font-bold">Secure</span>
                  <span className="text-xs font-semibold text-white/70 uppercase">Access</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right: Login form panel */}
        <main className="w-full max-w-xl justify-self-center lg:justify-self-end">
          <div className="rounded-lg border border-white/20 bg-[#0f1623] p-6 shadow-sm shadow-black/5 sm:p-8 lg:p-10">
            <div className="lg:hidden">
              <Link to="/" className="mb-6 inline-flex items-center gap-3">
                <img src={logoImg} alt="Xontrix Logo" className="h-12 w-12 object-contain" />
                <span className="text-2xl font-black tracking-normal text-white">XONTRIX</span>
              </Link>

              <h1 className="text-3xl font-black leading-tight tracking-normal text-white">
                XONTRIX <span className="text-[#00bfdf]">ELECTRONICS</span>
              </h1>
              <p className="mt-2 max-w-md text-sm font-semibold leading-6 text-white/70">
                Quality components. Fast delivery.
              </p>
            </div>

            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-md border-2 border-[#10b981] bg-[#10b981]/10">
                  <CheckCircle2 className="h-8 w-8 text-[#10b981]" />
                </div>
                <h3 className="mb-2 text-xl font-black text-white">ACCOUNT CREATED!</h3>
                <p className="mb-6 text-white/70">Maligayang pagdating sa Xontrix!</p>
                <Link to="/">
                  <button className="min-h-[46px] px-8 py-3 rounded-lg bg-[#00bfdf] font-bold text-black hover:bg-[#00a5c1] transition-colors">
                    GO TO HOME
                    <ArrowRight className="ml-2 inline h-4 w-4" />
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <div className="mb-7">
                  <p className="text-sm font-bold uppercase text-[#00bfdf]">
                    {isLogin ? 'Welcome back' : 'Create account'}
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-normal text-white sm:text-4xl">
                    {isLogin ? 'Login to Xontrix' : 'Join Xontrix'}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {isLogin
                      ? 'Use your account credentials to continue shopping or access admin tools.'
                      : 'Create your account once and continue to checkout faster next time.'}
                  </p>
                </div>

                {/* Mode switching buttons */}
                {isLogin && (
                  <div className="mb-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => switchMode(true)}
                      className="flex-1 rounded-lg bg-[#00bfdf] py-3 font-bold text-black hover:bg-[#00a5c1] transition-colors"
                    >
                      LOGIN
                    </button>
                    <button
                      type="button"
                      onClick={() => switchMode(false)}
                      className="flex-1 rounded-lg border border-white/20 bg-transparent py-3 font-bold text-white hover:bg-white/10 transition-colors"
                    >
                      REGISTER
                    </button>
                  </div>
                )}

                {/* Mode switching: replace tabs/buttons with single primary action (Login) + register link */}
                <form className="space-y-5" noValidate onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div>
                      <div className="mb-2 block text-sm font-semibold text-white">FULL NAME</div>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}

                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className="h-[52px] w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 text-white placeholder:text-white/40 transition-all focus:border-[#00BFDF] focus:outline-none focus:ring-2 focus:ring-[#00BFDF]/25"
                        />
                      </div>
                      {errors.name && (
                        <p id="name-error" role="alert" className="mt-2 text-sm text-[#ff7a7a]">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Floating label: Email */}
                  <div>
                    <div className="mb-2 block text-sm font-semibold text-white">EMAIL ADDRESS</div>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}

                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className="h-[52px] w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 text-white placeholder:text-white/40 transition-all focus:border-[#00BFDF] focus:outline-none focus:ring-2 focus:ring-[#00BFDF]/25"
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" role="alert" className="mt-2 text-sm text-[#ff7a7a]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Floating label: Password */}
                  <div>
                    <div className="mb-2 block text-sm font-semibold text-white">PASSWORD</div>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete={isLogin ? 'current-password' : 'new-password'}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}

                        aria-describedby={errors.password ? 'password-error' : undefined}
                        className="h-[52px] w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-12 text-white placeholder:text-white/40 transition-all focus:border-[#00BFDF] focus:outline-none focus:ring-2 focus:ring-[#00BFDF]/25"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFDF]"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* Password strength hint on focus */}
                    <div className={`mt-2 text-xs font-semibold ${passwordMeta.hintColor} opacity-0 focus-within:opacity-100`}>
                      <span className="mr-2">Strength:</span>
                      <span>{passwordMeta.label || '—'}</span>
                    </div>

                    {errors.password && (
                      <p id="password-error" role="alert" className="mt-2 text-sm text-[#ff7a7a]">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {!isLogin && (
                    <div>
                      <div className="mb-2 block text-sm font-semibold text-white">CONFIRM PASSWORD</div>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                        <input
                          id="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}

                          aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                          className="h-[52px] w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 text-white placeholder:text-white/40 transition-all focus:border-[#00BFDF] focus:outline-none focus:ring-2 focus:ring-[#00BFDF]/25"
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p id="confirm-password-error" role="alert" className="mt-2 text-sm text-[#ff7a7a]">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  )}

                  {isLogin && (
                    <div className="text-right">
                      <button
                        type="button"
                        className="min-h-[44px] text-sm font-semibold text-[#00BFDF] transition-colors hover:text-[#00d4f5]"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="min-h-[52px] w-full rounded-lg bg-[#ff6b5b] py-3 font-bold text-white hover:bg-[#ff5347] transition-colors disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        PLEASE WAIT
                      </>
                    ) : (
                      <>
                        {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>

                  {/* Register link below the primary login button */}
                  <div className="pt-1 text-center">
                    {isLogin ? (
                      <span className="text-sm font-semibold text-white/70">
                        Wala pang account?{' '}
                        <button
                          type="button"
                          onClick={() => switchMode(false)}
                          className="font-bold text-[#00bfdf] transition-colors hover:text-[#00d4f5]"
                        >
                          Register
                        </button>
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-white/70">
                        May account na?{' '}
                        <button
                          type="button"
                          onClick={() => switchMode(true)}
                          className="font-bold text-[#00bfdf] transition-colors hover:text-[#00d4f5]"
                        >
                          Login
                        </button>
                      </span>
                    )}
                  </div>

                  {isLogin && (
                    <div className="mt-6 space-y-2 border-t border-white/10 pt-6 text-center">
                      <p className="text-xs font-medium text-[#00bfdf]">Demo instructions removed. Use your MySQL account credentials.</p>
                      <p className="text-xs font-medium text-white/50">
                        Wala pang account?{' '}
                        <button
                          type="button"
                          onClick={() => switchMode(false)}
                          className="font-bold text-[#00bfdf] hover:text-[#00d4f5]"
                        >
                          Mag-Register
                        </button>
                      </p>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </main>

        {/* Mobile: full-bleed light hero panel (form only on small screens) */}
        <section className="relative col-span-2 -mx-4 mt-8 block overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#c85353] to-[#a63d3d] px-4 py-10 lg:hidden">
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative mb-4">
              <span className="absolute -inset-6 rounded-full bg-white/10 blur-2xl" />
              <img src={logoImg} alt="Xontrix Logo" className="relative h-20 w-20 object-contain" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Manage orders and shop faster</h3>
            <p className="text-sm font-semibold text-white/90 text-center">with your Xontrix account</p>
          </div>
        </section>
      </div>
    </div>
  );
}

