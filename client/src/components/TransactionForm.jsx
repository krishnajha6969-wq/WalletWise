import { useState, useEffect } from 'react';
import { mockApi } from '../services/mockData';
import toast from 'react-hot-toast';
import { HiOutlineX } from 'react-icons/hi';

const TransactionForm = ({ onClose, onSuccess, editData = null }) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    amount: editData?.amount || '',
    type: editData?.type || 'expense',
    description: editData?.description || '',
    date: editData?.date || new Date().toISOString().split('T')[0],
    categoryId: editData?.categoryId || '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const res = await mockApi.getCategories();
      setCategories(res.categories);
    } catch { toast.error('Failed to load categories'); }
  };

  const filteredCategories = categories.filter((c) => c.type === form.type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.categoryId || !form.date) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      if (editData) {
        await mockApi.updateTransaction(editData.id, form);
        toast.success('Transaction updated!');
      } else {
        await mockApi.createTransaction(form);
        toast.success('Transaction added! 🎉');
      }
      onSuccess?.();
      onClose?.();
    } catch (err) {
      toast.error('Failed to save transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-white">
            {editData ? 'Edit Transaction' : 'New Transaction'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl text-dark-400 hover:text-white hover:bg-dark-700/50 transition-all duration-300">
            <HiOutlineX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-2 p-1.5 rounded-2xl" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)' }}>
            <button
              type="button"
              onClick={() => setForm({ ...form, type: 'expense', categoryId: '' })}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-500 relative overflow-hidden ${
                form.type === 'expense' ? 'text-expense-light' : 'text-dark-400 hover:text-dark-200'
              }`}
              style={form.type === 'expense' ? {
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                boxShadow: '0 4px 20px rgba(244, 63, 94, 0.15)',
              } : { border: '1px solid transparent' }}
            >
              💸 Expense
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, type: 'income', categoryId: '' })}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-500 ${
                form.type === 'income' ? 'text-income-light' : 'text-dark-400 hover:text-dark-200'
              }`}
              style={form.type === 'income' ? {
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.15)',
              } : { border: '1px solid transparent' }}
            >
              💰 Income
            </button>
          </div>

          <div>
            <label className="label">Amount (₹)</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-dark-500">₹</span>
              <input type="number" step="0.01" min="0.01" value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="input-field pl-12 text-3xl font-display font-bold" placeholder="0.00" required />
            </div>
          </div>

          <div>
            <label className="label">Category</label>
            <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="input-field" required>
              <option value="">Select category</option>
              {filteredCategories.map((cat) => <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>)}
            </select>
          </div>

          <div>
            <label className="label">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field" required />
          </div>

          <div>
            <label className="label">Description (optional)</label>
            <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" placeholder="What is this for?" />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 py-4 text-base">Cancel</button>
            <button type="submit" disabled={loading}
              className={`flex-1 py-4 text-base rounded-xl font-semibold transition-all duration-300 ${
                form.type === 'expense' 
                  ? 'border border-expense/30 bg-expense/20 text-expense-light hover:bg-expense/30 hover:border-expense/50 shadow-[0_4px_20px_rgba(244,63,94,0.15)]' 
                  : 'border border-income/30 bg-income/20 text-income-light hover:bg-income/30 hover:border-income/50 shadow-[0_4px_20px_rgba(16,185,129,0.15)]'
              }`}
            >
              {loading ? 'Saving...' : editData ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
