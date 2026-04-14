import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const TransactionList = ({ transactions, onEdit, onDelete, loading }) => {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatAmount = (amount, type) => {
    const num = parseFloat(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return type === 'income' ? `+₹${num}` : `-₹${num}`;
  };

  if (loading) {
    return (
      <div className="glass-card p-8">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-dark-700" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-dark-700 rounded w-1/3" />
                <div className="h-3 bg-dark-700/50 rounded w-1/4" />
              </div>
              <div className="h-5 bg-dark-700 rounded w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="text-5xl mb-4">📭</div>
        <p className="text-dark-400 text-lg font-medium">No transactions yet</p>
        <p className="text-dark-500 text-sm mt-1">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="divide-y divide-dark-700/30">
        {transactions.map((tx, index) => (
          <div
            key={tx.id}
            className="flex items-center gap-4 px-6 py-4 hover:bg-dark-700/20 transition-all duration-200 group animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Category Icon */}
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${
              tx.type === 'income' ? 'bg-income/10' : 'bg-expense/10'
            }`}>
              {tx.category?.icon || (tx.type === 'income' ? '💰' : '💸')}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-dark-100 truncate">
                {tx.description || tx.category?.name || 'Transaction'}
              </p>
              <p className="text-xs text-dark-500 mt-0.5">
                {tx.category?.name} · {formatDate(tx.date)}
              </p>
            </div>

            {/* Amount */}
            <div className="text-right">
              <p className={`text-sm font-bold ${
                tx.type === 'income' ? 'text-income-light' : 'text-expense-light'
              }`}>
                {formatAmount(tx.amount, tx.type)}
              </p>
              <span className={`${tx.type === 'income' ? 'badge-income' : 'badge-expense'} text-[10px] mt-1`}>
                {tx.type}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onEdit(tx)}
                className="p-2 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                title="Edit"
              >
                <HiOutlinePencil className="text-sm" />
              </button>
              <button
                onClick={() => onDelete(tx.id)}
                className="p-2 rounded-lg text-dark-400 hover:text-expense hover:bg-expense/10 transition-all"
                title="Delete"
              >
                <HiOutlineTrash className="text-sm" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
