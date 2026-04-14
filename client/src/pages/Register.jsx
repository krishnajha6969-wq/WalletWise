import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { RiWallet3Line } from 'react-icons/ri';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineChartBar, HiOutlineCurrencyDollar, HiOutlineBell } from 'react-icons/hi';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = () => {
    if (!password) return { level: 0, label: '', color: '' };
    if (password.length < 6) return { level: 1, label: 'Weak', color: 'bg-expense' };
    if (password.length < 10) return { level: 2, label: 'Moderate', color: 'bg-yellow-500' };
    return { level: 3, label: 'Strong', color: 'bg-income' };
  };
  const strength = passwordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) { toast.error('Please fill in all fields'); return; }
    if (password !== confirmPassword) { toast.error('Passwords do not match'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try { await register(name, email, password); toast.success('Account created! 🎉'); navigate('/dashboard'); }
    catch (err) { toast.error(err.response?.data?.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`, duration: `${10 + Math.random() * 20}s`,
    tx: `${(Math.random() - 0.5) * 400}px`, ty: `${(Math.random() - 0.5) * 400}px`,
    size: `${2 + Math.random() * 5}px`,
  }));

  const benefits = [
    { icon: HiOutlineChartBar, text: 'Visual spending analytics', color: '#818cf8' },
    { icon: HiOutlineCurrencyDollar, text: 'Budget management tools', color: '#34d399' },
    { icon: HiOutlineBell, text: 'Budget alerts & warnings', color: '#fbbf24' },
    { icon: HiOutlineShieldCheck, text: '100% free, no hidden fees', color: '#f472b6' },
  ];

  const InputField = ({ id, label, icon: Icon, type = 'text', value, onChange, placeholder, children }) => (
    <div className="group">
      <label htmlFor={id} className="label flex items-center gap-2">
        <Icon className={`text-lg transition-colors duration-300 ${focusedField === id ? 'text-primary-400' : 'text-dark-500'}`} />
        {label}
      </label>
      <div className="relative">
        <input id={id} type={type} value={value} onChange={onChange}
          onFocus={() => setFocusedField(id)} onBlur={() => setFocusedField(null)}
          className="input-field text-lg" placeholder={placeholder} required />
        {focusedField === id && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full" style={{ animation: 'fadeIn 0.3s ease' }} />
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen flex relative">
      <div className="auth-bg">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
        <div className="grid-overlay" />
        <div className="particles">
          {particles.map((p) => <div key={p.id} className="particle" style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.duration, '--tx': p.tx, '--ty': p.ty }} />)}
        </div>
      </div>

      {/* LEFT: HERO */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 px-12 xl:px-20">
        <div style={{ animation: 'slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <div className="flex items-center gap-5 mb-10">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #7c3aed 100%)', boxShadow: '0 12px 40px rgba(99, 102, 241, 0.5)', animation: 'float 4s ease-in-out infinite' }}
            >
              <RiWallet3Line className="text-white text-5xl" />
            </div>
            <span className="text-5xl font-display font-bold gradient-text">WalletWise</span>
          </div>

          <h1 className="text-5xl xl:text-6xl font-display font-extrabold text-white leading-tight mb-6">
            Start your{' '}<span className="gradient-text-income">financial</span>{' '}journey
          </h1>
          <p className="text-xl text-dark-300 mb-12 max-w-lg leading-relaxed">
            Join thousands of users managing their money smarter with real-time insights and beautiful analytics.
          </p>

          {/* Benefits list */}
          <div className="space-y-4 max-w-lg">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={b.text} className="hero-3d-card" style={{ animation: `slideUp 0.5s ease-out ${0.3 + i * 0.1}s both` }}>
                  <div className="hero-3d-inner flex items-center gap-4 glass-card px-6 py-4 group cursor-default">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
                      style={{ background: `${b.color}15` }}>
                      <Icon className="text-xl" style={{ color: b.color }} />
                    </div>
                    <p className="text-base text-dark-200 font-medium">{b.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="hero-floating-card glass-card px-6 py-4 text-center">
              <p className="text-3xl font-display font-bold gradient-text">10K+</p>
              <p className="text-xs text-dark-400 mt-1">Users</p>
            </div>
            <div className="hero-floating-card glass-card px-6 py-4 text-center" style={{ animationDelay: '2s' }}>
              <p className="text-3xl font-display font-bold gradient-text-income">₹50Cr+</p>
              <p className="text-xs text-dark-400 mt-1">Tracked</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: REGISTER FORM */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-6 sm:px-12 lg:px-16 xl:px-20 py-8">
        <div className="w-full max-w-xl" style={{ animation: 'slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both' }}>
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-5"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)', boxShadow: '0 12px 40px rgba(99, 102, 241, 0.5)', animation: 'float 4s ease-in-out infinite' }}>
              <RiWallet3Line className="text-white text-5xl" />
            </div>
            <h1 className="text-4xl font-display font-bold gradient-text">WalletWise</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Create your account</h2>
            <p className="text-lg text-dark-400">Get started in less than a minute</p>
          </div>

          <div className="glass-card p-10 relative overflow-hidden" style={{ animation: 'borderGlow 4s ease-in-out infinite' }}>
            <div className="shimmer absolute inset-0 pointer-events-none" />
            <form onSubmit={handleSubmit} className="space-y-5 relative">
              <InputField id="reg-name" label="Full Name" icon={HiOutlineUser} value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Johnson" />
              <InputField id="reg-email" label="Email Address" icon={HiOutlineMail} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              <InputField id="reg-password" label="Password" icon={HiOutlineLockClosed} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters">
                {password && (
                  <div className="mt-2 space-y-1" style={{ animation: 'fadeIn 0.3s ease' }}>
                    <div className="flex gap-1.5">{[1,2,3].map((l) => <div key={l} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${strength.level >= l ? strength.color : 'bg-dark-700'}`} />)}</div>
                    <p className={`text-xs font-medium ${strength.level === 1 ? 'text-expense' : strength.level === 2 ? 'text-yellow-400' : 'text-income'}`}>{strength.label}</p>
                  </div>
                )}
              </InputField>
              <InputField id="reg-confirm" label="Confirm Password" icon={HiOutlineShieldCheck} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password">
                {confirmPassword && password && (
                  <p className={`text-sm mt-2 font-medium ${confirmPassword === password ? 'text-income' : 'text-expense'}`} style={{ animation: 'fadeIn 0.3s ease' }}>
                    {confirmPassword === password ? '✓ Passwords match' : '✗ Passwords don\'t match'}
                  </p>
                )}
              </InputField>
              <button type="submit" disabled={loading} className="btn-primary w-full text-center py-4 text-lg flex items-center justify-center gap-3 group mt-3">
                {loading ? (
                  <span className="flex items-center gap-3"><svg className="animate-spin h-6 w-6" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Creating account...</span>
                ) : (<>Create Account<HiOutlineArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-2" /></>)}
              </button>
            </form>
          </div>

          <p className="text-center text-dark-400 mt-8 text-base">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold transition-all hover:underline underline-offset-4 decoration-primary-500/30">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
