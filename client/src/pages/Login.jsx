import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { RiWallet3Line } from 'react-icons/ri';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineArrowRight, HiOutlineChartPie, HiOutlineTrendingUp, HiOutlineShieldCheck, HiOutlineLightningBolt, HiOutlineStar, HiOutlineGlobe } from 'react-icons/hi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back! 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`,
    duration: `${10 + Math.random() * 20}s`,
    tx: `${(Math.random() - 0.5) * 300}px`,
    ty: `${(Math.random() - 0.5) * 300}px`,
    size: `${2 + Math.random() * 3}px`,
  }));

  const features = [
    { icon: HiOutlineChartPie, title: 'Smart Analytics', desc: 'Visualize your spending patterns with beautiful interactive charts and real-time category breakdowns.', color: '#818cf8' },
    { icon: HiOutlineTrendingUp, title: 'Budget Tracking', desc: 'Set monthly budgets per category and get visual warnings when approaching your spending limits.', color: '#34d399' },
    { icon: HiOutlineShieldCheck, title: 'Secure & Private', desc: 'Your financial data stays private with JWT-based authentication and encrypted connections.', color: '#f472b6' },
    { icon: HiOutlineLightningBolt, title: 'Instant Reports', desc: 'Generate detailed yearly reports with income vs expense trends and category-wise breakdowns.', color: '#fbbf24' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', role: 'Freelancer', text: 'WalletWise helped me understand where my money goes each month. The budget alerts are a game changer!', avatar: 'PS' },
    { name: 'Rahul Verma', role: 'Software Engineer', text: 'Clean interface, powerful analytics. I\'ve saved ₹15,000 more per month since I started tracking.', avatar: 'RV' },
    { name: 'Anita Desai', role: 'Small Business Owner', text: 'The category breakdown charts are incredible. Finally, I can see my spending habits clearly.', avatar: 'AD' },
  ];

  const stats = [
    { value: '10K+', label: 'Active Users', color: 'gradient-text' },
    { value: '₹50Cr+', label: 'Money Tracked', color: 'gradient-text-income' },
    { value: '99.9%', label: 'Uptime', color: 'gradient-text' },
    { value: '4.8★', label: 'User Rating', color: 'gradient-text-expense' },
  ];

  return (
    <div className="min-h-screen overflow-y-auto">
      {/* Animated background — clean orbs only, no confusing shapes */}
      <div className="auth-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
        <div className="particles">
          {particles.map((p) => (
            <div key={p.id} className="particle" style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.duration, '--tx': p.tx, '--ty': p.ty }} />
          ))}
        </div>
      </div>

      {/* ===== SECTION 1: HERO + LOGIN (viewport height) ===== */}
      <section className="min-h-screen flex relative z-10">
        {/* LEFT: HERO */}
        <div className="hidden lg:flex flex-1 items-center justify-center px-12 xl:px-20">
          <div style={{ animation: 'slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }} className="max-w-xl">
            {/* Logo */}
            <div className="flex items-center gap-5 mb-12">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center relative"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #7c3aed 100%)',
                  boxShadow: '0 12px 40px rgba(99, 102, 241, 0.5)',
                }}
              >
                <RiWallet3Line className="text-white text-5xl" />
                <div className="absolute inset-0 rounded-3xl" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }} />
              </div>
              <span className="text-5xl font-display font-bold gradient-text">WalletWise</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl xl:text-6xl font-display font-extrabold text-white leading-[1.15] mb-6">
              Your money,{' '}
              <span className="gradient-text">your rules.</span>
            </h1>
            <p className="text-xl text-dark-300 mb-14 leading-relaxed">
              Track every rupee, set smart budgets, and see exactly where your money goes — with beautiful charts and instant insights.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4 mb-14">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-dark-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-3 text-dark-500 text-sm">
              <HiOutlineShieldCheck className="text-income text-lg" />
              <span>256-bit Encryption</span>
              <span className="text-dark-700">•</span>
              <HiOutlineGlobe className="text-primary-400 text-lg" />
              <span>Works Offline</span>
              <span className="text-dark-700">•</span>
              <HiOutlineStar className="text-yellow-400 text-lg" />
              <span>Free Forever</span>
            </div>
          </div>
        </div>

        {/* RIGHT: LOGIN FORM */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16 xl:px-20">
          <div className="w-full max-w-xl" style={{ animation: 'slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both' }}>
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-5"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)', boxShadow: '0 12px 40px rgba(99, 102, 241, 0.5)' }}>
                <RiWallet3Line className="text-white text-5xl" />
              </div>
              <h1 className="text-4xl font-display font-bold gradient-text mb-2">WalletWise</h1>
              <p className="text-dark-400">Your money, your rules.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-white mb-2">Welcome back</h2>
              <p className="text-lg text-dark-400">Sign in to your account to continue</p>
            </div>

            <div className="glass-card p-10 relative overflow-hidden" style={{ animation: 'borderGlow 4s ease-in-out infinite' }}>
              <div className="shimmer absolute inset-0 pointer-events-none" />
              <form onSubmit={handleSubmit} className="space-y-7 relative">
                <div>
                  <label htmlFor="login-email" className="label flex items-center gap-2">
                    <HiOutlineMail className={`text-lg transition-colors duration-300 ${focusedField === 'email' ? 'text-primary-400' : 'text-dark-500'}`} />
                    Email Address
                  </label>
                  <div className="relative">
                    <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                      className="input-field text-lg" placeholder="you@example.com" required />
                    {focusedField === 'email' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full" style={{ animation: 'fadeIn 0.3s ease' }} />}
                  </div>
                </div>

                <div>
                  <label htmlFor="login-password" className="label flex items-center gap-2">
                    <HiOutlineLockClosed className={`text-lg transition-colors duration-300 ${focusedField === 'password' ? 'text-primary-400' : 'text-dark-500'}`} />
                    Password
                  </label>
                  <div className="relative">
                    <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)}
                      className="input-field text-lg" placeholder="••••••••" required />
                    {focusedField === 'password' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full" style={{ animation: 'fadeIn 0.3s ease' }} />}
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="btn-primary w-full text-center py-4 text-lg flex items-center justify-center gap-3 group">
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Signing in...
                    </span>
                  ) : (<>Sign In<HiOutlineArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-2" /></>)}
                </button>
              </form>
            </div>

            <p className="text-center text-dark-400 mt-8 text-base">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-400 hover:text-primary-300 font-semibold transition-all duration-300 hover:underline underline-offset-4 decoration-primary-500/30">
                Create one →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: FEATURES ===== */}
      <section className="relative z-10 py-24 px-6 sm:px-12 lg:px-20" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" style={{ animation: 'slideUp 0.6s ease-out' }}>
            <p className="text-primary-400 font-semibold text-sm uppercase tracking-[0.2em] mb-3">Why WalletWise?</p>
            <h2 className="text-4xl xl:text-5xl font-display font-bold text-white mb-4">
              Everything you need to{' '}<span className="gradient-text">manage money</span>
            </h2>
            <p className="text-lg text-dark-400 max-w-2xl mx-auto">
              Simple but powerful tools to track, budget, and understand your finances — all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="glass-card-hover p-8 group cursor-default"
                  style={{ animation: `slideUp 0.6s ease-out ${0.1 + i * 0.1}s both` }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                    style={{ background: `${f.color}12` }}>
                    <Icon className="text-2xl" style={{ color: f.color }} />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white mb-3">{f.title}</h3>
                  <p className="text-dark-400 leading-relaxed text-[0.95rem]">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: TESTIMONIALS ===== */}
      <section className="relative z-10 py-24 px-6 sm:px-12 lg:px-20" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-income font-semibold text-sm uppercase tracking-[0.2em] mb-3">Loved by users</p>
            <h2 className="text-4xl xl:text-5xl font-display font-bold text-white mb-4">
              What our <span className="gradient-text-income">users</span> say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.name} className="glass-card-hover p-8 cursor-default"
                style={{ animation: `slideUp 0.5s ease-out ${i * 0.1}s both` }}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', boxShadow: '0 4px 12px rgba(99,102,241,0.25)' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-[0.95rem]">{t.name}</p>
                    <p className="text-dark-500 text-sm">{t.role}</p>
                  </div>
                </div>
                <p className="text-dark-300 leading-relaxed text-[0.95rem] italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: CTA ===== */}
      <section className="relative z-10 py-24 px-6 sm:px-12 lg:px-20" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl xl:text-5xl font-display font-bold text-white mb-5">
            Ready to take control?
          </h2>
          <p className="text-lg text-dark-400 mb-10">
            Sign up in seconds and start tracking your finances today. No credit card needed.
          </p>
          <Link to="/register" className="btn-primary inline-flex items-center gap-3 text-lg px-10 py-5 group">
            Get Started Free
            <HiOutlineArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
          <p className="text-dark-600 text-sm mt-6">Free forever • No credit card • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <p className="text-dark-600 text-sm">© 2026 WalletWise. Built with ❤️ for smart money management.</p>
      </footer>
    </div>
  );
};

export default Login;
