import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HiOutlineHome,
  HiOutlineCreditCard,
  HiOutlineChartPie,
  HiOutlineDocumentReport,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi';
import { RiWallet3Line } from 'react-icons/ri';

const navLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
  { path: '/transactions', label: 'Transactions', icon: HiOutlineCreditCard },
  { path: '/budgets', label: 'Budgets', icon: HiOutlineChartPie },
  { path: '/reports', label: 'Reports', icon: HiOutlineDocumentReport },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="sticky top-0 z-40 bg-dark-950/60 backdrop-blur-2xl" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="mx-auto px-6 sm:px-8 lg:px-12" style={{ maxWidth: '1600px' }}>
        <div className="flex items-center justify-between h-20">
          {/* Logo — BIGGER */}
          <Link to="/dashboard" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #7c3aed 100%)',
                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
              }}
            >
              <RiWallet3Line className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-display font-bold gradient-text hidden sm:inline">
              WalletWise
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1.5 p-2 rounded-2xl" style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.04)' }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium transition-all duration-300 relative text-[0.95rem]
                    ${isActive ? 'text-white' : 'text-dark-400 hover:text-dark-200'}`}
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl" style={{
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 100%)',
                      border: '1px solid rgba(99,102,241,0.2)',
                      animation: 'fadeIn 0.3s ease',
                    }} />
                  )}
                  <Icon className={`text-xl relative z-10 transition-all duration-300 ${isActive ? 'text-primary-400' : ''}`} />
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User section */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all duration-300 hover:bg-dark-800/40 cursor-default">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-base"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="text-[0.95rem] text-dark-200 font-medium block">{user?.name}</span>
                <span className="text-xs text-dark-500">{user?.email}</span>
              </div>
            </div>
            <button onClick={handleLogout} title="Logout"
              className="p-3 rounded-xl text-dark-400 transition-all duration-300 relative group"
              style={{ border: '1px solid rgba(255,255,255,0.04)' }}
            >
              <HiOutlineLogout className="text-xl group-hover:text-expense transition-colors duration-300" />
              <div className="absolute inset-0 rounded-xl bg-expense/0 group-hover:bg-expense/5 transition-all duration-300" />
            </button>
          </div>

          {/* Mobile button */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-3 rounded-xl text-dark-400 hover:text-white transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.04)' }}
          >
            {mobileOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-950/95 backdrop-blur-2xl" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', animation: 'slideDown 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <div className="px-6 py-5 space-y-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl font-medium transition-all duration-300 text-base
                    ${isActive ? 'text-primary-400' : 'text-dark-400 hover:text-dark-100 hover:bg-dark-800/40'}`}
                  style={isActive ? { background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)' } : {}}
                >
                  <Icon className="text-xl" />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 mt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <button onClick={handleLogout}
                className="flex items-center gap-3 px-5 py-4 rounded-xl font-medium text-expense hover:bg-expense/5 transition-all w-full text-base"
              >
                <HiOutlineLogout className="text-xl" />Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
