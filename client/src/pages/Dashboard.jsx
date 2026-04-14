import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockData';
import toast from 'react-hot-toast';
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

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [txRes, monthlyRes, categoryRes] = await Promise.all([
        mockApi.getTransactions({ limit: 5 }),
        mockApi.getMonthlySummary(new Date().getFullYear()),
        mockApi.getCategoryBreakdown({ year: new Date().getFullYear() }),
      ]);

      setRecentTransactions(txRes.transactions);
      setMonthlyData(monthlyRes.data);
      setCategoryBreakdown(categoryRes.breakdown);

      const totals = monthlyRes.data.reduce(
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

  const formatCurrency = (val) =>
    `₹${Math.abs(val).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  const statCards = [
    {
      label: 'Total Balance',
      value: formatCurrency(stats.balance),
      prefix: stats.balance >= 0 ? '+' : '-',
      icon: HiOutlineCash,
      colorClass: stats.balance >= 0 ? 'gradient-text-income' : 'gradient-text-expense',
      iconBg: stats.balance >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)',
      iconColor: stats.balance >= 0 ? 'text-income-light' : 'text-expense-light',
      gradient: stats.balance >= 0
        ? 'radial-gradient(circle at top right, rgba(16,185,129,0.08) 0%, transparent 60%)'
        : 'radial-gradient(circle at top right, rgba(244,63,94,0.08) 0%, transparent 60%)',
    },
    {
      label: 'Total Income',
      value: formatCurrency(stats.income),
      prefix: '+',
      icon: HiOutlineTrendingUp,
      colorClass: 'gradient-text-income',
      iconBg: 'rgba(16,185,129,0.1)',
      iconColor: 'text-income-light',
      gradient: 'radial-gradient(circle at top right, rgba(16,185,129,0.08) 0%, transparent 60%)',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(stats.expense),
      prefix: '-',
      icon: HiOutlineTrendingDown,
      colorClass: 'gradient-text-expense',
      iconBg: 'rgba(244,63,94,0.1)',
      iconColor: 'text-expense-light',
      gradient: 'radial-gradient(circle at top right, rgba(244,63,94,0.08) 0%, transparent 60%)',
    },
  ];

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
      <div className="flex items-center justify-between mb-10" style={{ animation: 'slideUp 0.6s ease-out' }}>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{g.emoji}</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white">
              {g.text},{' '}
              <span className="gradient-text">{user?.name?.split(' ')[0]}</span>
            </h1>
          </div>
          <p className="text-dark-400 text-lg ml-14">Here's your financial overview for {new Date().getFullYear()}</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2.5 group">
          <HiOutlinePlus className="text-lg transition-transform duration-300 group-hover:rotate-90" />
          <span className="hidden sm:inline">Add Transaction</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-12">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="glass-card-hover p-8"
              style={{
                animationDelay: `${i * 100}ms`,
                animation: `slideUp 0.6s ease-out ${i * 0.1}s both`,
                backgroundImage: card.gradient,
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-base text-dark-400 font-medium tracking-wide uppercase">{card.label}</span>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: card.iconBg }}>
                  <Icon className={`text-2xl ${card.iconColor}`} />
                </div>
              </div>
              <p className={`text-4xl font-display font-bold ${card.colorClass}`}>
                {card.prefix}{card.value}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <HiOutlineSparkles className="text-primary-400 text-sm" />
                <span className="text-sm text-dark-500">This year</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div style={{ animation: 'slideUp 0.6s ease-out 0.3s both' }}>
          <MonthlyBarChart data={monthlyData} />
        </div>
        <div style={{ animation: 'slideUp 0.6s ease-out 0.4s both' }}>
          <SpendingPieChart data={categoryBreakdown} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div style={{ animation: 'slideUp 0.6s ease-out 0.5s both' }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-display font-semibold text-white flex items-center gap-2">
            <span>Recent Transactions</span>
          </h2>
          <span className="text-xs text-dark-500 font-medium px-3 py-1.5 rounded-lg" style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.04)' }}>
            Last 5
          </span>
        </div>
        <TransactionList
          transactions={recentTransactions}
          loading={loading}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      </div>

      {showForm && (
        <TransactionForm onClose={() => setShowForm(false)} onSuccess={loadDashboard} />
      )}
    </div>
  );
};

export default Dashboard;
