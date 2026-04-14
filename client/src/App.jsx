import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Reports from './pages/Reports';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <div className="flex flex-col items-center gap-5">
          <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          <p className="text-dark-400 text-base font-medium">Loading WalletWise...</p>
        </div>
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

// 3D floating background shapes for authenticated pages
const AppBackground = () => (
  <div className="app-3d-bg">
    {/* Morphing blobs */}
    <div className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-[0.03]"
      style={{
        background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
        animation: 'morphBlob 15s ease-in-out infinite',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      }}
    />
    <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] opacity-[0.02]"
      style={{
        background: 'linear-gradient(135deg, #10b981, #06b6d4)',
        animation: 'morphBlob 20s ease-in-out infinite 5s',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      }}
    />
    {/* Floating 3D shapes */}
    <div className="bg-shape" style={{ width: '120px', height: '120px', top: '12%', left: '5%', animationDelay: '0s', transform: 'rotate(20deg)' }} />
    <div className="bg-shape" style={{ width: '80px', height: '80px', top: '60%', right: '3%', animationDelay: '-5s', borderRadius: '50%', borderColor: 'rgba(16,185,129,0.05)' }} />
    <div className="bg-shape" style={{ width: '60px', height: '60px', bottom: '15%', left: '8%', animationDelay: '-10s', transform: 'rotate(45deg)' }} />
    <div className="bg-shape" style={{ width: '100px', height: '100px', top: '30%', right: '10%', animationDelay: '-15s', borderRadius: '30%', borderColor: 'rgba(139,92,246,0.05)' }} />
    <div className="bg-shape" style={{ width: '90px', height: '90px', bottom: '40%', left: '50%', animationDelay: '-8s', transform: 'rotate(15deg)', borderColor: 'rgba(244,63,94,0.04)' }} />
  </div>
);

const AppLayout = ({ children }) => (
  <div className="min-h-screen bg-dark-950 relative">
    <AppBackground />
    <div className="relative z-10">
      <Navbar />
      <main>{children}</main>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#e2e8f0',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '14px',
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              padding: '14px 18px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            },
            success: { iconTheme: { primary: '#10b981', secondary: '#1e293b' } },
            error: { iconTheme: { primary: '#f43f5e', secondary: '#1e293b' } },
          }}
        />
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><AppLayout><Transactions /></AppLayout></ProtectedRoute>} />
          <Route path="/budgets" element={<ProtectedRoute><AppLayout><Budgets /></AppLayout></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><AppLayout><Reports /></AppLayout></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
