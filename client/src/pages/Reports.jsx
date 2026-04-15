import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import SpendingPieChart from '../components/Charts/SpendingPieChart';
import MonthlyBarChart from '../components/Charts/MonthlyBarChart';
import { HiOutlineTrendingUp, HiOutlineTrendingDown, HiOutlineCash, HiOutlineSparkles } from 'react-icons/hi';

const Reports = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [incomeBreakdown, setIncomeBreakdown] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadReports(); }, [year]);

  const loadReports = async () => {
    setLoading(true);
    try {
      const [monthlyRes, expenseCatRes, incomeCatRes] = await Promise.all([
        api.get('/reports/monthly-summary', { params: { year } }),
        api.get('/reports/category-breakdown', { params: { year, type: 'expense' } }),
        api.get('/reports/category-breakdown', { params: { year, type: 'income' } }),
      ]);
      setMonthlyData(monthlyRes.data.data);
      setCategoryBreakdown(expenseCatRes.data.breakdown);
      setIncomeBreakdown(incomeCatRes.data.breakdown);
    } catch { toast.error('Failed to load reports'); }
    finally { setLoading(false); }
  };

  const totals = monthlyData.reduce((acc, m) => ({ income: acc.income + m.income, expense: acc.expense + m.expense }), { income: 0, expense: 0 });
  const savings = totals.income - totals.expense;
  const savingsRate = totals.income > 0 ? ((savings / totals.income) * 100).toFixed(1) : 0;
  const highestExpenseMonth = monthlyData.reduce((max, m) => (m.expense > max.expense ? m : max), { month: 0, expense: 0 });
  const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const stats = [
    { label: 'Total Income', value: `₹${totals.income.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, icon: HiOutlineTrendingUp, colorClass: 'gradient-text-income', iconBg: 'rgba(16,185,129,0.1)', iconColor: 'text-income-light' },
    { label: 'Total Expenses', value: `₹${totals.expense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, icon: HiOutlineTrendingDown, colorClass: 'gradient-text-expense', iconBg: 'rgba(244,63,94,0.1)', iconColor: 'text-expense-light' },
    { label: 'Net Savings', value: `₹${Math.abs(savings).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, icon: HiOutlineCash, colorClass: savings >= 0 ? 'gradient-text-income' : 'gradient-text-expense', iconBg: savings >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)', iconColor: savings >= 0 ? 'text-income-light' : 'text-expense-light', suffix: `${savingsRate}% savings rate` },
    { label: 'Peak Spending', value: highestExpenseMonth.month ? monthNames[highestExpenseMonth.month] : 'N/A', icon: HiOutlineSparkles, colorClass: 'gradient-text', iconBg: 'rgba(99,102,241,0.1)', iconColor: 'text-primary-400', suffix: highestExpenseMonth.expense ? `₹${highestExpenseMonth.expense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '' },
  ];

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-8" style={{ animation: 'slideUp 0.6s ease-out' }}>
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="text-dark-400">Analyze your financial patterns</p>
        </div>
        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="input-field w-32">
          {[2024, 2025, 2026, 2027].map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card-hover p-5" style={{ animation: `slideUp 0.5s ease-out ${i * 0.08}s both` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-dark-500 uppercase tracking-wider font-medium">{stat.label}</span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: stat.iconBg }}>
                  <Icon className={`text-sm ${stat.iconColor}`} />
                </div>
              </div>
              <p className={`text-2xl font-display font-bold ${stat.colorClass}`}>{stat.value}</p>
              {stat.suffix && <p className="text-xs text-dark-500 mt-1.5">{stat.suffix}</p>}
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="mb-10" style={{ animation: 'slideUp 0.6s ease-out 0.3s both' }}>
        <MonthlyBarChart data={monthlyData} title={`Monthly Overview — ${year}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div style={{ animation: 'slideUp 0.6s ease-out 0.4s both' }}>
          <SpendingPieChart data={categoryBreakdown} title="Expense Breakdown" />
        </div>
        <div style={{ animation: 'slideUp 0.6s ease-out 0.5s both' }}>
          <SpendingPieChart data={incomeBreakdown} title="Income Sources" />
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden" style={{ animation: 'slideUp 0.6s ease-out 0.6s both' }}>
        <div className="p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <h3 className="text-lg font-display font-semibold text-white">Monthly Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <th className="text-left text-xs text-dark-500 font-medium uppercase tracking-wider px-6 py-4">Month</th>
                <th className="text-right text-xs text-dark-500 font-medium uppercase tracking-wider px-6 py-4">Income</th>
                <th className="text-right text-xs text-dark-500 font-medium uppercase tracking-wider px-6 py-4">Expenses</th>
                <th className="text-right text-xs text-dark-500 font-medium uppercase tracking-wider px-6 py-4">Net</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((m) => {
                const net = m.income - m.expense;
                if (m.income === 0 && m.expense === 0) return null;
                return (
                  <tr key={m.month} className="transition-all duration-300 hover:bg-dark-800/30 group" style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td className="px-6 py-4 text-sm font-medium text-dark-200 group-hover:text-white transition-colors">
                      {new Date(year, m.month - 1).toLocaleString('default', { month: 'long' })}
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-income-light">+₹{m.income.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-expense-light">-₹{m.expense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td className={`px-6 py-4 text-sm text-right font-bold ${net >= 0 ? 'text-income' : 'text-expense'}`}>
                      {net >= 0 ? '+' : '-'}₹{Math.abs(net).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
