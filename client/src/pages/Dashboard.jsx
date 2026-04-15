import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import useCountUp from '../hooks/useCountUp';
import SpendingPieChart from '../components/Charts/SpendingPieChart';
import MonthlyBarChart from '../components/Charts/MonthlyBarChart';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import {
  HiOutlineTrendingUp,
  HiOutlineTrendingDown,
  HiOutlineCash,
  HiOutlinePlus,
  HiOutlineSparkles,
} from 'react-icons/hi';

const StatCard = ({ label, rawValue, prefix, icon: Icon, colorClass, iconBg, iconColor, glowColor, delay }) => {
  const animatedValue = useCountUp(rawValue, 1500);
  const formatted = `₹${Math.abs(animatedValue).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div
      className="glass-card-hover p-7 relative"
      style={{
        animation: `slideUp 0.5s ease-out ${delay}s both`,
        boxShadow: glowColor ? `0 0 40px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.04)` : undefined,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-dark-500 font-medium tracking-wider uppercase">{label}</span>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: iconBg }}>
          <Icon className={`text-2xl ${iconColor}`} />
        </div>
      </div>
      <p className={`text-4xl lg:text-5xl font-display font-bold ${colorClass}`} style={{ letterSpacing: '-0.02em' }}>
        {prefix}{formatted}
      </p>
      <div className="mt-2 flex items-center gap-1.5">
        <HiOutlineSparkles className="text-accent-400 text-xs" />
        <span className="text-xs text-dark-500">This year</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [txRes, monthlyRes, categoryRes] = await Promise.all([
        api.get('/transactions', { params: { limit: 5 } }),
        api.get('/reports/monthly-summary', { params: { year: new Date().getFullYear() } }),
        api.get('/reports/category-breakdown', { params: { year: new Date().getFullYear() } }),
      ]);
      setRecentTransactions(txRes.data.transactions);
      setMonthlyData(monthlyRes.data.data);
      setCategoryBreakdown(categoryRes.data.breakdown);
      const totals = monthlyRes.data.data.reduce(
        (acc, m) => ({ income: acc.income + m.income, expense: acc.expense + m.expense }),
        { income: 0, expense: 0 }
      );
      setStats({ income: totals.income, expense: totals.expense, balance: totals.income - totals.expense });
    } catch {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return { text: 'Good morning', emoji: '☀️' };
    if (h < 17) return { text: 'Good afternoon', emoji: '🌤️' };
    return { text: 'Good evening', emoji: '🌙' };
  };
  const g = greeting();

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-8" style={{ animation: 'slideUp 0.5s ease-out' }}>
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-4xl">{g.emoji}</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white">
              {g.text},{' '}<span className="gradient-text">{user?.name?.split(' ')[0]}</span>
            </h1>
          </div>
          <p className="text-dark-500 text-base ml-12">Here's your financial overview for {new Date().getFullYear()}</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 group px-8 py-4">
          <HiOutlinePlus className="text-xl transition-transform duration-300 group-hover:rotate-90" />
          <span className="hidden sm:inline text-lg">Add Transaction</span>
        </button>
      </div>

      {/* Stat Cards with count-up */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <StatCard
          label="Total Balance" rawValue={stats.balance} prefix={stats.balance >= 0 ? '+' : '-'}
          icon={HiOutlineCash}
          colorClass={stats.balance >= 0 ? 'gradient-text-income' : 'gradient-text-expense'}
          iconBg={stats.balance >= 0 ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'}
          iconColor={stats.balance >= 0 ? 'text-accent-500' : 'text-red-400'}
          glowColor={stats.balance >= 0 ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)'}
          delay={0}
        />
        <StatCard
          label="Total Income" rawValue={stats.income} prefix="+"
          icon={HiOutlineTrendingUp}
          colorClass="gradient-text-income"
          iconBg="rgba(34,197,94,0.1)" iconColor="text-accent-500"
          delay={0.1}
        />
        <StatCard
          label="Total Expenses" rawValue={stats.expense} prefix="-"
          icon={HiOutlineTrendingDown}
          colorClass="gradient-text-expense"
          iconBg="rgba(239,68,68,0.1)" iconColor="text-red-400"
          delay={0.2}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          <div style={{ animation: 'slideUp 0.5s ease-out 0.3s both' }}>
            <MonthlyBarChart data={monthlyData} />
          </div>

          <div style={{ animation: 'slideUp 0.5s ease-out 0.5s both' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-display font-semibold text-white">Recent Transactions</h2>
              <span className="text-sm text-dark-600 font-medium px-3 py-1.5 rounded-lg" style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.04)' }}>
                Last 5
              </span>
            </div>
            <TransactionList transactions={recentTransactions} loading={loading} onEdit={() => {}} onDelete={() => {}} />
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="lg:col-span-1 space-y-8">
          <div style={{ animation: 'slideUp 0.5s ease-out 0.4s both' }}>
            <SpendingPieChart data={categoryBreakdown} />
          </div>
        </div>
      </div>

      {showForm && <TransactionForm onClose={() => setShowForm(false)} onSuccess={loadDashboard} />}
    </div>
  );
};

export default Dashboard;
