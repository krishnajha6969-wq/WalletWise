import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const BudgetCard = ({ budget, onEdit, onDelete }) => {
  const spent = parseFloat(budget.spent) || 0;
  const total = parseFloat(budget.amount) || 1;
  const percentage = Math.min((spent / total) * 100, 100);
  const remaining = total - spent;
  const isOver = spent > total;
  const isWarning = percentage >= 80 && !isOver;

  const getColor = () => {
    if (isOver) return { ring: '#f43f5e', bg: 'expense', glow: 'shadow-glow-expense' };
    if (isWarning) return { ring: '#f59e0b', bg: 'yellow-500', glow: '' };
    return { ring: '#10b981', bg: 'income', glow: '' };
  };

  const color = getColor();

  // SVG circular progress
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`glass-card-hover p-6 relative overflow-hidden ${isOver ? 'border-expense/30' : ''}`}>
      {/* Warning glow overlay */}
      {isOver && (
        <div className="absolute inset-0 bg-expense/5 animate-pulse-slow pointer-events-none" />
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{budget.category?.icon || '📊'}</span>
            <h3 className="text-sm font-semibold text-dark-200">{budget.category?.name || 'Budget'}</h3>
          </div>
          <p className="text-xs text-dark-500">
            {new Date(budget.year, budget.month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(budget)}
            className="p-1.5 rounded-lg text-dark-500 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
          >
            <HiOutlinePencil className="text-xs" />
          </button>
          <button
            onClick={() => onDelete(budget.id)}
            className="p-1.5 rounded-lg text-dark-500 hover:text-expense hover:bg-expense/10 transition-all"
          >
            <HiOutlineTrash className="text-xs" />
          </button>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex items-center gap-5">
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50" cy="50" r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            {/* Progress ring */}
            <circle
              cx="50" cy="50" r={radius}
              fill="none"
              stroke={color.ring}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-lg font-bold ${isOver ? 'text-expense' : isWarning ? 'text-yellow-400' : 'text-income-light'}`}>
              {Math.round(percentage)}%
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <div>
            <p className="text-xs text-dark-500 uppercase tracking-wider">Spent</p>
            <p className={`text-lg font-bold ${isOver ? 'text-expense-light' : 'text-dark-100'}`}>
              ₹{spent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className="text-xs text-dark-500 uppercase tracking-wider">
              {isOver ? 'Over Budget' : 'Remaining'}
            </p>
            <p className={`text-sm font-semibold ${isOver ? 'text-expense' : 'text-income'}`}>
              {isOver ? '-' : ''}₹{Math.abs(remaining).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-xs text-dark-500">
            Budget: ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Status indicator */}
      {isOver && (
        <div className="mt-4 px-3 py-2 rounded-lg bg-expense/10 border border-expense/20 flex items-center gap-2">
          <span className="text-xs">⚠️</span>
          <span className="text-xs text-expense font-medium">Over budget by ₹{Math.abs(remaining).toFixed(2)}</span>
        </div>
      )}
      {isWarning && (
        <div className="mt-4 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-2">
          <span className="text-xs">⚡</span>
          <span className="text-xs text-yellow-400 font-medium">Approaching budget limit</span>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
