import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineChartBar, HiOutlineBell } from 'react-icons/hi';

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
    if (password.length < 6) return { level: 1, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 10) return { level: 2, label: 'Moderate', color: 'bg-yellow-500' };
    return { level: 3, label: 'Strong', color: 'bg-accent-500' };
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

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 15}s`, duration: `${10 + Math.random() * 20}s`,
    tx: `${(Math.random() - 0.5) * 300}px`, ty: `${(Math.random() - 0.5) * 300}px`,
    size: `${2 + Math.random() * 3}px`,
  }));

  const benefits = [
    { icon: HiOutlineChartBar, text: 'Visual spending analytics', color: '#22c55e' },
    { icon: HiOutlineShieldCheck, text: 'Budget management tools', color: '#4ade80' },
    { icon: HiOutlineBell, text: 'Budget alerts & warnings', color: '#10b981' },
  ];

  const FloatingInput = ({ id, label, type = 'text', value, onChange, children }) => (
    <div className="relative">
      <input
        id={id} type={type} value={value} onChange={onChange}
        onFocus={() => setFocusedField(id)} onBlur={() => setFocusedField(null)}
        className={`input-field peer pt-8 pb-3 px-6 text-lg ${type === 'password' ? 'tracking-widest' : ''}`} placeholder=" " required
      />
      <label htmlFor={id}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-dark-500 text-base tracking-normal transition-all duration-200 pointer-events-none
          peer-focus:top-4 peer-focus:text-sm peer-focus:text-accent-400
          peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-dark-400"
      >
        {label}
      </label>
      {focusedField === id && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-500 to-transparent rounded-full" />}
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

      {/* Left: Hero */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 px-12 xl:px-16">
        <div style={{ animation: 'slideUp 0.8s ease-out' }} className="max-w-2xl xl:scale-110">
          {/* SVG illustration */}
          <div className="mb-10" style={{ animation: 'walletBounce 4s ease-in-out infinite' }}>
            <svg viewBox="0 0 300 250" fill="none" className="w-full max-w-sm mx-auto">
              <rect x="60" y="80" width="180" height="120" rx="18" fill="#1e293b" stroke="#22c55e" strokeWidth="2" opacity="0.9" />
              <rect x="60" y="80" width="180" height="40" rx="18" fill="#22c55e" opacity="0.12" />
              <circle cx="200" cy="140" r="15" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" />
              <text x="200" y="145" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold" fontFamily="Inter">₹</text>
              <g style={{ animation: 'coinFloat1 3s ease-in-out infinite' }}>
                <circle cx="50" cy="60" r="18" fill="#22c55e" opacity="0.12" stroke="#22c55e" strokeWidth="1.5" />
                <text x="50" y="65" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold" fontFamily="Inter">₹</text>
              </g>
              <g style={{ animation: 'coinFloat2 3.5s ease-in-out infinite 0.5s' }}>
                <circle cx="260" cy="50" r="14" fill="#4ade80" opacity="0.1" stroke="#4ade80" strokeWidth="1" />
                <text x="260" y="55" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold" fontFamily="Inter">₹</text>
              </g>
            </svg>
          </div>

          <h1 className="text-5xl xl:text-6xl font-display font-extrabold text-white leading-tight mb-5">
            Start your{' '}<span className="gradient-text">financial</span>{' '}journey
          </h1>
          <p className="text-xl text-dark-400 leading-relaxed mb-10 max-w-lg">
            Join thousands tracking their money smarter with real-time insights.
          </p>

          <div className="space-y-3">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={b.text} className="flex items-center gap-3 glass-card px-5 py-3.5" style={{ animation: `slideUp 0.4s ease-out ${0.3 + i * 0.1}s both` }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${b.color}15` }}>
                    <Icon className="text-lg" style={{ color: b.color }} />
                  </div>
                  <p className="text-sm text-dark-200 font-medium">{b.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex items-center gap-5">
            <div className="glass-card px-5 py-3 text-center" style={{ animation: 'heroFloat 6s ease-in-out infinite' }}>
              <p className="text-2xl font-display font-bold gradient-text">10K+</p>
              <p className="text-xs text-dark-500 mt-0.5">Users</p>
            </div>
            <div className="glass-card px-5 py-3 text-center" style={{ animation: 'heroFloat 6s ease-in-out infinite 2s' }}>
              <p className="text-2xl font-display font-bold gradient-text-income">₹50Cr+</p>
              <p className="text-xs text-dark-500 mt-0.5">Tracked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Register Form */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-6 sm:px-12 lg:px-16 py-8">
        <div className="w-full max-w-lg" style={{ animation: 'slideUp 0.8s ease-out 0.15s both' }}>
          {/* Header with Logo */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 30px rgba(34,197,94,0.4)' }}>
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="14" rx="3" /><path d="M16 10h.01" /><path d="M2 10h20" />
                </svg>
              </div>
              <h1 className="text-4xl font-display font-black tracking-tight text-white">Wallet<span className="text-accent-500">Wise</span></h1>
            </div>
            <h2 className="text-4xl font-display font-bold text-white mb-2">Create your account</h2>
            <p className="text-xl text-dark-400">Get started in less than a minute</p>
          </div>

          <div className="glass-card p-10" style={{ animation: 'borderGlow 4s ease-in-out infinite' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <FloatingInput id="reg-name" label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              <FloatingInput id="reg-email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <FloatingInput id="reg-password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}>
                {password && (
                  <div className="mt-2 space-y-1 px-1">
                    <div className="flex gap-1">{[1,2,3].map((l) => <div key={l} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${strength.level >= l ? strength.color : 'bg-dark-700'}`} />)}</div>
                    <p className={`text-xs font-medium ${strength.level === 1 ? 'text-red-400' : strength.level === 2 ? 'text-yellow-400' : 'text-accent-400'}`}>{strength.label}</p>
                  </div>
                )}
              </FloatingInput>
              <FloatingInput id="reg-confirm" label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                {confirmPassword && password && (
                  <p className={`text-xs mt-2 font-medium px-1 ${confirmPassword === password ? 'text-accent-400' : 'text-red-400'}`}>
                    {confirmPassword === password ? '✓ Passwords match' : '✗ Passwords don\'t match'}
                  </p>
                )}
              </FloatingInput>
              <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center gap-3 group mt-4 relative overflow-hidden">
                {loading ? (
                  <span className="flex items-center gap-3"><svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Creating account...</span>
                ) : (<>Create Account<HiOutlineArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-2" /></>)}
              </button>
            </form>
          </div>

          <p className="text-center text-dark-400 mt-10 text-lg">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-400 hover:text-accent-300 font-semibold transition-colors underline-offset-4 decoration-accent-500/30">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
