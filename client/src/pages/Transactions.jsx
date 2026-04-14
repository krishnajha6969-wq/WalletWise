import { useState, useEffect } from 'react';
import { mockApi } from '../services/mockData';
import toast from 'react-hot-toast';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { HiOutlinePlus, HiOutlineFilter, HiOutlineX } from 'react-icons/hi';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ type: '', categoryId: '', startDate: '', endDate: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    mockApi.getCategories().then(res => setCategories(res.categories)).catch(() => {});
  }, []);

  useEffect(() => { fetchTransactions(); }, [page, filters]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await mockApi.getTransactions({ page, limit: 15, ...filters });
      setTransactions(res.transactions);
      setTotalPages(res.totalPages);
    } catch {
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this transaction?')) return;
    try {
      await mockApi.deleteTransaction(id);
      toast.success('Transaction deleted');
      fetchTransactions();
    } catch { toast.error('Failed to delete'); }
  };

  const handleEdit = (tx) => { setEditData(tx); setShowForm(true); };
  const handleFormClose = () => { setShowForm(false); setEditData(null); };
  const clearFilters = () => { setFilters({ type: '', categoryId: '', startDate: '', endDate: '' }); setPage(1); };

  const hasFilters = filters.type || filters.categoryId || filters.startDate || filters.endDate;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-8" style={{ animation: 'slideUp 0.6s ease-out' }}>
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="text-dark-400 mb-0">Manage your income and expenses</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary flex items-center gap-2 relative ${showFilters ? 'border-primary-500/20 text-primary-400' : ''}`}
            style={{ padding: '10px 16px' }}
          >
            <HiOutlineFilter className="text-lg" />
            <span className="hidden sm:inline text-sm">Filters</span>
            {hasFilters && (
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary-500" style={{ animation: 'pulse-glow 2s infinite', boxShadow: '0 0 8px rgba(99,102,241,0.5)' }} />
            )}
          </button>
          <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 group">
            <HiOutlinePlus className="text-lg transition-transform duration-300 group-hover:rotate-90" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="glass-card p-5 mb-6" style={{ animation: 'slideDown 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="label">Type</label>
              <select value={filters.type} onChange={(e) => { setFilters({ ...filters, type: e.target.value, categoryId: '' }); setPage(1); }} className="input-field w-32">
                <option value="">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="label">Category</label>
              <select value={filters.categoryId} onChange={(e) => { setFilters({ ...filters, categoryId: e.target.value }); setPage(1); }} className="input-field w-40">
                <option value="">All Categories</option>
                {categories
                  .filter((c) => !filters.type || c.type === filters.type)
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
              </select>
            </div>
            <div>
              <label className="label">From</label>
              <input type="date" value={filters.startDate} onChange={(e) => { setFilters({ ...filters, startDate: e.target.value }); setPage(1); }} className="input-field w-44" />
            </div>
            <div>
              <label className="label">To</label>
              <input type="date" value={filters.endDate} onChange={(e) => { setFilters({ ...filters, endDate: e.target.value }); setPage(1); }} className="input-field w-44" />
            </div>
            {hasFilters && (
              <button onClick={clearFilters} className="btn-secondary text-sm flex items-center gap-1.5 text-expense hover:text-expense-light" style={{ padding: '10px 14px' }}>
                <HiOutlineX className="text-sm" />
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* List */}
      <div style={{ animation: 'slideUp 0.6s ease-out 0.1s both' }}>
        <TransactionList transactions={transactions} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8" style={{ animation: 'fadeIn 0.5s ease 0.3s both' }}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="btn-secondary text-sm px-4 py-2.5 disabled:opacity-30">Previous</button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-300 ${
                p === page ? 'text-white' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800/40'
              }`} style={p === page ? { background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' } : {}}>
                {p}
              </button>
            ))}
          </div>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-secondary text-sm px-4 py-2.5 disabled:opacity-30">Next</button>
        </div>
      )}

      {showForm && <TransactionForm onClose={handleFormClose} onSuccess={fetchTransactions} editData={editData} />}
    </div>
  );
};

export default Transactions;
