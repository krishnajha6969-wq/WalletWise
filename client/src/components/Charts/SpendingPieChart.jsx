import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  '#22c55e', '#3b82f6', '#a855f7',
  '#ef4444', '#f97316', '#06b6d4',
  '#f59e0b', '#ec4899', '#14b8a6',
  '#8b5cf6', '#10b981', '#64748b',
];

const SpendingPieChart = ({ data, title = 'Spending by Category' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-6">
        <h3 className="text-base font-display font-semibold text-white mb-4">{title}</h3>
        <div className="flex items-center justify-center h-48 text-dark-500">
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-sm">No spending data available</p>
          </div>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => d.category?.name || d.name || 'Unknown'),
    datasets: [
      {
        data: data.map((d) => parseFloat(d.total)),
        backgroundColor: COLORS.slice(0, data.length),
        borderColor: 'rgba(15, 23, 42, 0.9)',
        borderWidth: 3,
        hoverOffset: 6,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.96)',
        titleColor: '#e2e8f0',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(34, 197, 94, 0.2)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        titleFont: { family: 'Inter', size: 12, weight: '600' },
        bodyFont: { family: 'Inter', size: 11 },
        callbacks: {
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((ctx.raw / total) * 100).toFixed(1);
            return ` ₹${ctx.raw.toLocaleString('en-IN', { minimumFractionDigits: 2 })} (${percentage}%)`;
          },
        },
      },
    },
  };

  const totalSpending = data.reduce((sum, d) => sum + parseFloat(d.total), 0);

  return (
    <div className="glass-card p-6">
      <h3 className="text-base font-display font-semibold text-white mb-4">{title}</h3>
      <div className="relative h-52">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xs text-dark-500 uppercase tracking-wider">Total</p>
            <p className="text-2xl font-bold text-white mt-1">
              ₹{totalSpending.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>
      {/* Custom Legend */}
      <div className="mt-5 grid grid-cols-2 gap-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-sm py-1">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
            <span className="text-dark-300 truncate">{item.category?.name || item.name}</span>
            <span className="text-white font-medium ml-auto tracking-wide">₹{parseFloat(item.total).toFixed(0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingPieChart;
