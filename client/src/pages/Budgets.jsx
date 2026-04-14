import { useState, useEffect } from 'react';
import { mockApi } from '../services/mockData';
import toast from 'react-hot-toast';
import BudgetCard from '../components/BudgetCard';
import { HiOutlinePlus, HiOutlineX } from 'react-icons/hi';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [form, setForm] = useState({ amount: '', categoryId: '', month: new Date().getMonth() + 1, year: new Date().getFullYear() });

  useEffect(() => { fetchBudgets(); fetchCategories(); }, [month, year]);

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const res = await mockApi.getBudgets({ month, year });
      setBudgets(res.budgets);
    } catch { toast.error('Failed to load budgets'); }
    finally { setLoading(false); }
  };

  const fetchCategories = async () => {
    try {
      const res = await mockApi.getCategories();
      setCategories(res.categories.filter((c) => c.type === 'expense'));
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.categoryId) { toast.error('Please fill in all fields'); return; }
    try {
      if (editData) {
        await mockApi.updateBudget(editData.id, { amount: form.amount });
        toast.success('Budget updated!');
      } else {
        await mockApi.createBudget(form);
        toast.success('Budget created!');
      }
      setShowForm(false); setEditData(null);
      setForm({ amount: '', categoryId: '', month, year });
      fetchBudgets();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save budget'); }
  };

  const handleEdit = (budget) => {
    setEditData(budget);
    setForm({ amount: budget.amount, categoryId: budget.categoryId, month: budget.month, year: budget.year });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this budget?')) return;
    try { await mockApi.deleteBudget(id); toast.success('Budget deleted'); fetchBudgets(); }
    catch { toast.error('Failed to delete'); }
  };

  const handleClose = () => { setShowForm(false); setEditData(null); setForm({ amount: '', categoryId: '', month, year }); };
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const totalBudget = budgets.reduce((s, b) => s + parseFloat(b.amount), 0);
  const totalSpent = budgets.reduce((s, b) => s + parseFloat(b.spent || 0), 0);
  const percentage = totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(0) : 0;

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-8" style={{ animation: 'slideUp 0.6s ease-out' }}>
        <div>
          <h1 className="page-title">Budgets</h1>
          <p className="text-dark-400">Set monthly spending limits by category</p>
        </div>
        <button onClick={() => { setForm({ amount: '', categoryId: '', month, year }); setShowForm(true); }} className="btn-primary flex items-center gap-2 group">
          <HiOutlinePlus className="text-lg transition-transform duration-300 group-hover:rotate-90" />
          <span className="hidden sm:inline">New Budget</span>
        </button>
      </div>

      {/* Month/Year + Stats */}
      <div className="glass-card p-5 mb-8" style={{ animation: 'slideUp 0.6s ease-out 0.1s both' }}>
        <div className="flex flex-wrap items-center gap-4">
          <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))} className="input-field w-40">
            {monthNames.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
          </select>
          <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="input-field w-28">
            {[2024, 2025, 2026, 2027].map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <div className="ml-auto flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-dark-500 uppercase tracking-wider">Budget</p>
              <p className="text-lg font-display font-bold text-white">₹{totalBudget.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-dark-500 uppercase tracking-wider">Spent</p>
              <p className={`text-lg font-display font-bold ${totalSpent > totalBudget ? 'gradient-text-expense' : 'gradient-text-income'}`}>₹{totalSpent.toFixed(2)}</p>
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke={totalSpent > totalBudget ? '#f43f5e' : '#10b981'} strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`} strokeDashoffset={`${2 * Math.PI * 40 * (1 - Math.min(percentage / 100, 1))}`}
                  className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-dark-200">{percentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map((i) => <div key={i} className="glass-card p-6 h-52 shimmer" />)}
        </div>
      ) : budgets.length === 0 ? (
        <div className="glass-card p-16 text-center" style={{ animation: 'fadeIn 0.5s ease' }}>
          <div className="text-6xl mb-5" style={{ animation: 'float 3s ease-in-out infinite' }}>🎯</div>
          <p className="text-dark-300 text-xl font-display font-semibold mb-2">No budgets set</p>
          <p className="text-dark-500 mb-6">Create a budget for {monthNames[month - 1]} {year} to start tracking</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">Create First Budget</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget, i) => (
            <div key={budget.id} style={{ animation: `slideUp 0.5s ease-out ${i * 0.08}s both` }}>
              <BudgetCard budget={budget} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-white">{editData ? 'Edit Budget' : 'New Budget'}</h2>
              <button onClick={handleClose} className="p-2 rounded-xl text-dark-400 hover:text-white hover:bg-dark-700/50 transition-all"><HiOutlineX className="text-xl" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!editData && (
                <div>
                  <label className="label">Category</label>
                  <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="input-field" required>
                    <option value="">Select expense category</option>
                    {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label className="label">Budget Amount ($)</label>
                <input type="number" step="0.01" min="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="input-field text-xl font-bold" placeholder="0.00" required />
              </div>
              {!editData && (
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="label">Month</label><select value={form.month} onChange={(e) => setForm({ ...form, month: parseInt(e.target.value) })} className="input-field">{monthNames.map((m, i) => <option key={i} value={i+1}>{m}</option>)}</select></div>
                  <div><label className="label">Year</label><select value={form.year} onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })} className="input-field">{[2024,2025,2026,2027].map((y) => <option key={y} value={y}>{y}</option>)}</select></div>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleClose} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">{editData ? 'Update' : 'Create Budget'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
