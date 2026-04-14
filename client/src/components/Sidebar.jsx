import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HiOutlineHome,
  HiOutlineCreditCard,
  HiOutlineChartPie,
  HiOutlineDocumentReport,
  HiOutlineLogout,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
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

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  const sidebarWidth = collapsed ? 'w-20' : 'w-[260px]';

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 pt-6 pb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)',
          }}
        >
          <RiWallet3Line className="text-dark-900 text-xl" />
        </div>
        {(!collapsed || isMobile) && (
          <span className="text-xl font-display font-bold text-white whitespace-nowrap">
            WalletWise
          </span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 space-y-1">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => isMobile && setMobileOpen(false)}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              title={collapsed && !isMobile ? link.label : undefined}
            >
              <Icon className="text-xl flex-shrink-0" />
              {(!collapsed || isMobile) && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-3 pb-4 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className={`flex items-center gap-3 px-4 py-4 ${collapsed && !isMobile ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-dark-900 font-bold text-sm flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          {(!collapsed || isMobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm text-dark-200 font-medium truncate">{user?.name}</p>
              <p className="text-xs text-dark-500 truncate">{user?.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`sidebar-link w-full text-dark-500 hover:text-red-400 hover:bg-red-500/5 ${collapsed && !isMobile ? 'justify-center' : ''}`}
          title="Logout"
        >
          <HiOutlineLogout className="text-xl flex-shrink-0" />
          {(!collapsed || isMobile) && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse toggle — desktop only */}
      {!isMobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-7 -right-3 w-6 h-6 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-dark-400 hover:text-accent-400 hover:border-accent-500/30 transition-all duration-200 z-50"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
        >
          {collapsed ? <HiOutlineChevronRight className="text-xs" /> : <HiOutlineChevronLeft className="text-xs" />}
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`sidebar hidden lg:flex ${sidebarWidth}`}>
        <SidebarContent />
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-dark-800/90 backdrop-blur-lg text-dark-300 hover:text-white transition-all"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <HiOutlineMenu className="text-xl" />
      </button>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="lg:hidden fixed top-0 left-0 h-full w-[280px] z-50 bg-dark-900/98 backdrop-blur-xl"
            style={{ borderRight: '1px solid rgba(255,255,255,0.04)', animation: 'slideRight 0.3s ease-out' }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-dark-400 hover:text-white transition-all"
            >
              <HiOutlineX className="text-xl" />
            </button>
            <SidebarContent isMobile={true} />
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
