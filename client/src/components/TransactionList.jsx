import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionList = ({ transactions, onEdit, onDelete, loading }) => {
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatAmount = (amount, type) => {
    const num = parseFloat(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return type === 'income' ? `+₹${num}` : `-₹${num}`;
  };

  const getCategoryInitial = (tx) => {
    const name = tx.category?.name || tx.description || 'T';
    return name.charAt(0).toUpperCase();
  };

  const getCategoryColor = (tx) => {
    if (tx.type === 'income') return { bg: 'rgba(34,197,94,0.1)', text: '#22c55e' };
    const colors = [
      { bg: 'rgba(239,68,68,0.1)', text: '#f87171' },
      { bg: 'rgba(251,146,60,0.1)', text: '#fb923c' },
      { bg: 'rgba(168,85,247,0.1)', text: '#a855f7' },
      { bg: 'rgba(59,130,246,0.1)', text: '#3b82f6' },
      { bg: 'rgba(236,72,153,0.1)', text: '#ec4899' },
    ];
    const idx = (tx.categoryId || 0) % colors.length;
    return colors[idx];
  };

  // Group transactions by date
  const groupByDate = (txs) => {
    const groups = {};
    txs.forEach((tx) => {
      const key = tx.date;
      if (!groups[key]) groups[key] = [];
      groups[key].push(tx);
    });
    return Object.entries(groups).sort((a, b) => new Date(b[0]) - new Date(a[0]));
  };

  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-dark-700" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 bg-dark-700 rounded w-1/3" />
                <div className="h-2.5 bg-dark-700/50 rounded w-1/4" />
              </div>
              <div className="h-4 bg-dark-700 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="text-4xl mb-3">📭</div>
        <p className="text-dark-400 font-medium">No transactions yet</p>
        <p className="text-dark-500 text-sm mt-1">Add your first transaction to get started</p>
      </div>
    );
  }

  const groups = groupByDate(transactions);

  return (
    <div className="glass-card overflow-hidden">
      <AnimatePresence>
        {groups.map(([date, txs]) => (
          <div key={date}>
            {/* Date divider */}
            <div className="date-divider">{formatDate(date)}</div>

            {txs.map((tx) => {
              const color = getCategoryColor(tx);
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 px-6 py-3.5 hover:bg-dark-800/30 transition-all duration-200 group"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}
                >
                  {/* Letter avatar */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                    style={{ background: color.bg, color: color.text }}
                  >
                    {getCategoryInitial(tx)}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-white truncate">
                      {tx.category?.name || 'Transaction'}
                    </p>
                    <p className="text-sm text-dark-400 mt-0.5 truncate">
                      {tx.description || '—'}
                    </p>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      tx.type === 'income' ? 'text-accent-400' : 'text-red-400'
                    }`}>
                      {formatAmount(tx.amount, tx.type)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button onClick={() => onEdit(tx)}
                      className="p-1.5 rounded-lg text-dark-500 hover:text-accent-400 hover:bg-accent-500/10 transition-all" title="Edit">
                      <HiOutlinePencil className="text-sm" />
                    </button>
                    <button onClick={() => onDelete(tx.id)}
                      className="p-1.5 rounded-lg text-dark-500 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Delete">
                      <HiOutlineTrash className="text-sm" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TransactionList;
