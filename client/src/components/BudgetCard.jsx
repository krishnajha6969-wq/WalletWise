import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const CATEGORY_EMOJIS = {
  'food': '🍔', 'dining': '🍔', 'restaurant': '🍔',
  'transport': '🚗', 'gas': '⛽', 'fuel': '⛽',
  'shopping': '🛍️', 'clothes': '👕',
  'entertainment': '🎬', 'movie': '🎬', 'music': '🎵',
  'bills': '💡', 'utilities': '💡', 'electric': '⚡',
  'health': '🏥', 'medical': '🏥', 'doctor': '🏥',
  'education': '📚', 'course': '📚', 'book': '📖',
  'rent': '🏠', 'home': '🏠', 'house': '🏠',
  'travel': '✈️', 'vacation': '🏖️',
  'grocery': '🛒', 'groceries': '🛒',
};

const getEmoji = (categoryName) => {
  if (!categoryName) return '📊';
  const lower = categoryName.toLowerCase();
  for (const [key, emoji] of Object.entries(CATEGORY_EMOJIS)) {
    if (lower.includes(key)) return emoji;
  }
  return '📊';
};

const BudgetCard = ({ budget, onEdit, onDelete }) => {
  const spent = parseFloat(budget.spent) || 0;
  const total = parseFloat(budget.amount) || 1;
  const percentage = Math.min((spent / total) * 100, 100);
  const rawPercentage = (spent / total) * 100;
  const remaining = total - spent;
  const isOver = spent > total;
  const isWarning = rawPercentage >= 60 && !isOver;

  const getBarClass = () => {
    if (isOver || rawPercentage >= 90) return 'progress-red';
    if (rawPercentage >= 60) return 'progress-amber';
    return 'progress-green';
  };

  const categoryName = budget.category?.name || 'Budget';
  const emoji = budget.category?.icon || getEmoji(categoryName);

  return (
    <div className={`glass-card-hover p-6 relative ${isOver ? 'budget-card-over border-red-500/20' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{emoji}</div>
          <div>
            <h3 className="text-sm font-semibold text-dark-100">{categoryName}</h3>
            <p className="text-xs text-dark-500">
              {new Date(budget.year, budget.month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => onEdit(budget)}
            className="p-1.5 rounded-lg text-dark-500 hover:text-accent-400 hover:bg-accent-500/10 transition-all">
            <HiOutlinePencil className="text-xs" />
          </button>
          <button onClick={() => onDelete(budget.id)}
            className="p-1.5 rounded-lg text-dark-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <HiOutlineTrash className="text-xs" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-lg font-display font-bold ${isOver ? 'text-red-400' : 'text-white'}`}>
            ₹{spent.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
          </span>
          <span className="text-xs text-dark-500">
            of ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
          </span>
        </div>
        <div className="progress-bar-track">
          <div
            className={`progress-bar-fill ${getBarClass()}`}
            style={{ width: `${Math.min(rawPercentage, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-dark-500">{Math.round(rawPercentage)}% used</span>
          <span className={`text-xs font-medium ${isOver ? 'text-red-400' : 'text-accent-400'}`}>
            {isOver ? `₹${Math.abs(remaining).toLocaleString('en-IN')} over` : `₹${remaining.toLocaleString('en-IN')} left`}
          </span>
        </div>
      </div>

      {/* Status */}
      {isOver && (
        <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
          <span className="text-xs">⚠️</span>
          <span className="text-xs text-red-400 font-medium">Over budget by ₹{Math.abs(remaining).toFixed(0)}</span>
        </div>
      )}
      {isWarning && !isOver && rawPercentage >= 80 && (
        <div className="px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-2">
          <span className="text-xs">⚡</span>
          <span className="text-xs text-yellow-400 font-medium">Approaching budget limit</span>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
