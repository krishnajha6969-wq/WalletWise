import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineArrowRight, HiOutlineChartPie, HiOutlineTrendingUp, HiOutlineShieldCheck, HiOutlineLightningBolt, HiOutlineStar, HiOutlineGlobe } from 'react-icons/hi';

const FinancialSVG = () => (
  <div className="relative w-full max-w-xl mx-auto" style={{ animation: 'walletBounce 4s ease-in-out infinite' }}>
    <svg viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Wallet body */}
      <rect x="100" y="120" width="200" height="140" rx="20" fill="#1e293b" stroke="#22c55e" strokeWidth="2" opacity="0.9" />
      <rect x="100" y="120" width="200" height="50" rx="20" fill="#22c55e" opacity="0.15" />
      <rect x="250" y="170" width="60" height="40" rx="10" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" />
      <circle cx="280" cy="190" r="8" fill="#22c55e" opacity="0.8" />

      {/* Wallet flap */}
      <path d="M110 140 L200 125 L290 140" stroke="#22c55e" strokeWidth="1.5" opacity="0.4" fill="none" />

      {/* Graph line rising */}
      <polyline
        points="120,230 160,210 200,220 240,190 280,170"
        stroke="#4ade80" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="200" strokeDashoffset="0"
        style={{ animation: 'graphDraw 2s ease-out forwards' }}
      />
      {/* Graph dots */}
      <circle cx="120" cy="230" r="3" fill="#22c55e" opacity="0.8" />
      <circle cx="160" cy="210" r="3" fill="#22c55e" opacity="0.8" />
      <circle cx="200" cy="220" r="3" fill="#22c55e" opacity="0.8" />
      <circle cx="240" cy="190" r="4" fill="#22c55e" />
      <circle cx="280" cy="170" r="4" fill="#4ade80" />

      {/* Floating coin 1 */}
      <g style={{ animation: 'coinFloat1 3s ease-in-out infinite' }}>
        <circle cx="80" cy="100" r="22" fill="#22c55e" opacity="0.15" stroke="#22c55e" strokeWidth="1.5" />
        <text x="80" y="106" textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold" fontFamily="Inter">₹</text>
      </g>

      {/* Floating coin 2 */}
      <g style={{ animation: 'coinFloat2 4s ease-in-out infinite 0.5s' }}>
        <circle cx="330" cy="90" r="18" fill="#4ade80" opacity="0.12" stroke="#4ade80" strokeWidth="1.5" />
        <text x="330" y="96" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold" fontFamily="Inter">₹</text>
      </g>

      {/* Floating coin 3 */}
      <g style={{ animation: 'coinFloat1 3.5s ease-in-out infinite 1s' }}>
        <circle cx="150" cy="70" r="15" fill="#22c55e" opacity="0.1" stroke="#22c55e" strokeWidth="1" />
        <text x="150" y="75" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold" fontFamily="Inter">₹</text>
      </g>

      {/* Arrow up indicator */}
      <g style={{ animation: 'float 2s ease-in-out infinite' }}>
        <polygon points="285,155 280,165 290,165" fill="#4ade80" />
        <line x1="285" y1="165" x2="285" y2="175" stroke="#4ade80" strokeWidth="2" />
      </g>

      {/* Small sparkles */}
      <circle cx="320" cy="140" r="2" fill="#22c55e" opacity="0.6" style={{ animation: 'fadeIn 1s ease-in-out infinite alternate' }} />
      <circle cx="110" cy="160" r="1.5" fill="#4ade80" opacity="0.5" style={{ animation: 'fadeIn 1.5s ease-in-out infinite alternate 0.5s' }} />
      <circle cx="260" cy="100" r="2" fill="#22c55e" opacity="0.4" style={{ animation: 'fadeIn 2s ease-in-out infinite alternate 1s' }} />
    </svg>
  </div>
);

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

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`, duration: `${10 + Math.random() * 20}s`,
    tx: `${(Math.random() - 0.5) * 300}px`, ty: `${(Math.random() - 0.5) * 300}px`,
    size: `${2 + Math.random() * 3}px`,
  }));

  const features = [
    { icon: HiOutlineChartPie, title: 'Smart Analytics', desc: 'Beautiful interactive charts and real-time category breakdowns.', color: '#22c55e' },
    { icon: HiOutlineTrendingUp, title: 'Budget Tracking', desc: 'Set budgets per category with visual warnings.', color: '#4ade80' },
    { icon: HiOutlineShieldCheck, title: 'Secure & Private', desc: 'JWT authentication and encrypted connections.', color: '#10b981' },
    { icon: HiOutlineLightningBolt, title: 'Instant Reports', desc: 'Detailed yearly reports with trend analysis.', color: '#86efac' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', role: 'Freelancer', text: 'WalletWise helped me understand where my money goes. The budget alerts are a game changer!', avatar: 'PS' },
    { name: 'Rahul Verma', role: 'Software Engineer', text: 'Clean interface, powerful analytics. I\'ve saved ₹15,000 more per month since tracking.', avatar: 'RV' },
    { name: 'Anita Desai', role: 'Small Business Owner', text: 'The category breakdown charts are incredible. I can finally see my spending habits clearly.', avatar: 'AD' },
  ];

  return (
    <div className="min-h-screen overflow-y-auto">
      {/* Top Navbar */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 lg:px-16 py-6 font-display">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 30px rgba(34,197,94,0.4)' }}>
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="14" rx="3" /><path d="M16 10h.01" /><path d="M2 10h20" />
            </svg>
          </div>
          <span className="text-3xl font-black text-white tracking-tight">Wallet<span className="text-accent-500">Wise</span></span>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/login" className="text-dark-300 hover:text-white font-semibold transition-colors text-lg">Log In</Link>
          <Link to="/register" className="btn-primary px-7 py-3 text-lg font-semibold rounded-xl">Get Started</Link>
        </div>
      </header>

      {/* Background */}
      <div className="auth-bg">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
        <div className="grid-overlay" />
        <div className="particles">
          {particles.map((p) => (
            <div key={p.id} className="particle" style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.duration, '--tx': p.tx, '--ty': p.ty }} />
          ))}
        </div>
      </div>

      {/* HERO + LOGIN */}
      <section className="min-h-screen flex relative z-10">
        {/* Left: SVG Illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center px-12 xl:px-16">
          <div style={{ animation: 'slideUp 0.8s ease-out' }} className="max-w-3xl w-full xl:scale-110">
            <FinancialSVG />
            <div className="text-center mt-12">
              <h1 className="text-5xl xl:text-6xl font-display font-extrabold text-white leading-tight mb-5">
                Your money,{' '}<span className="gradient-text">your rules.</span>
              </h1>
              <p className="text-xl text-dark-400 leading-relaxed max-w-lg mx-auto">
                Track every rupee, set smart budgets, and see exactly where your money goes.
              </p>
              <div className="flex items-center justify-center gap-5 mt-8 text-dark-500 text-sm">
                <span className="flex items-center gap-1.5"><HiOutlineShieldCheck className="text-accent-400" />Encrypted</span>
                <span className="text-dark-700">•</span>
                <span className="flex items-center gap-1.5"><HiOutlineGlobe className="text-accent-400" />Works Offline</span>
                <span className="text-dark-700">•</span>
                <span className="flex items-center gap-1.5"><HiOutlineStar className="text-yellow-400" />Free Forever</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16">
          <div className="w-full max-w-lg" style={{ animation: 'slideUp 0.8s ease-out 0.15s both' }}>
            {/* Header with Logo */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 30px rgba(34,197,94,0.4)' }}>
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="14" rx="3" /><path d="M16 10h.01" /><path d="M2 10h20" />
                  </svg>
                </div>
                <h1 className="text-4xl font-display font-black tracking-tight text-white">Wallet<span className="text-accent-500">Wise</span></h1>
              </div>
              <h2 className="text-4xl font-display font-bold text-white mb-2">Welcome back</h2>
              <p className="text-xl text-dark-400">Sign in to continue to your account</p>
            </div>

            <div className="glass-card p-10" style={{ animation: 'borderGlow 4s ease-in-out infinite' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email — floating label style */}
                <div className="relative">
                  <input
                    id="login-email" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="input-field peer pt-8 pb-3 px-6 text-lg" placeholder=" " required
                  />
                  <label htmlFor="login-email"
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-dark-500 text-base transition-all duration-200 pointer-events-none
                      peer-focus:top-4 peer-focus:text-sm peer-focus:text-accent-400
                      peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-dark-400"
                  >
                    Email Address
                  </label>
                  {focusedField === 'email' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-500 to-transparent rounded-full" />}
                </div>

                {/* Password — floating label style */}
                <div className="relative">
                  <input
                    id="login-password" type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="input-field peer pt-8 pb-3 px-6 text-lg tracking-widest" placeholder=" " required
                  />
                  <label htmlFor="login-password"
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-dark-500 text-base tracking-normal transition-all duration-200 pointer-events-none
                      peer-focus:top-4 peer-focus:text-sm peer-focus:text-accent-400
                      peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-dark-400"
                  >
                    Password
                  </label>
                  {focusedField === 'password' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-500 to-transparent rounded-full" />}
                </div>

                <button type="submit" disabled={loading}
                  className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center gap-3 group mt-4 relative overflow-hidden">
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Signing in...
                    </span>
                  ) : (<>Sign In<HiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-2" /></>)}
                </button>
              </form>
            </div>

            <p className="text-center text-dark-400 mt-10 text-lg">
              Don't have an account?{' '}
              <Link to="/register" className="text-accent-400 hover:text-accent-300 font-semibold transition-colors underline-offset-4 decoration-accent-500/30">
                Create one →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 py-20 px-6 sm:px-12 lg:px-16" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-accent-400 font-semibold text-xs uppercase tracking-[0.2em] mb-3">Why WalletWise?</p>
            <h2 className="text-3xl xl:text-4xl font-display font-bold text-white mb-3">
              Everything you need to{' '}<span className="gradient-text">manage money</span>
            </h2>
            <p className="text-dark-400 max-w-xl mx-auto">
              Simple but powerful tools to track, budget, and understand your finances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="glass-card-hover p-10 group cursor-default"
                  style={{ animation: `slideUp 0.5s ease-out ${0.1 + i * 0.08}s both` }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${f.color}15` }}>
                    <Icon className="text-3xl" style={{ color: f.color }} />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-white mb-3">{f.title}</h3>
                  <p className="text-dark-400 text-lg leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 py-20 px-6 sm:px-12 lg:px-16" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-accent-400 font-semibold text-xs uppercase tracking-[0.2em] mb-3">Loved by users</p>
            <h2 className="text-3xl xl:text-4xl font-display font-bold text-white">
              What our <span className="gradient-text">users</span> say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={t.name} className="glass-card-hover p-10 cursor-default"
                style={{ animation: `slideUp 0.5s ease-out ${i * 0.08}s both` }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-dark-900 font-bold text-lg"
                    style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">{t.name}</p>
                    <p className="text-dark-500 text-sm mt-0.5">{t.role}</p>
                  </div>
                </div>
                <p className="text-dark-300 text-lg leading-relaxed italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl xl:text-5xl font-display font-bold text-white mb-6">Ready to take control?</h2>
          <p className="text-dark-400 text-xl max-w-xl mx-auto mb-10">Sign up in seconds and start tracking your finances today.</p>
          <Link to="/register" className="btn-primary inline-flex items-center gap-3 text-xl px-12 py-5 group">
            Get Started Free
            <HiOutlineArrowRight className="text-2xl transition-transform duration-300 group-hover:translate-x-3" />
          </Link>
          <p className="text-dark-600 text-sm mt-8">Free forever • No credit card • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <p className="text-dark-600 text-xs">© 2026 WalletWise. Built with ❤️ for smart money management.</p>
      </footer>
    </div>
  );
};

export default Login;
