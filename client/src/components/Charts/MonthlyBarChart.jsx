import { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthlyBarChart = ({ data, title = 'Income vs Expenses' }) => {
  const chartRef = useRef(null);

  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-6">
        <h3 className="text-base font-display font-semibold text-white mb-4">{title}</h3>
        <div className="flex items-center justify-center h-48 text-dark-500">
          <div className="text-center">
            <div className="text-3xl mb-2">📈</div>
            <p className="text-sm">No monthly data available</p>
          </div>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => MONTH_LABELS[d.month - 1]),
    datasets: [
      {
        label: 'Income',
        data: data.map((d) => d.income),
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return 'rgba(34, 197, 94, 0.7)';
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(34, 197, 94, 0.8)');
          gradient.addColorStop(1, 'rgba(34, 197, 94, 0.15)');
          return gradient;
        },
        hoverBackgroundColor: 'rgba(34, 197, 94, 0.95)',
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.55,
        categoryPercentage: 0.7,
      },
      {
        label: 'Expenses',
        data: data.map((d) => d.expense),
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return 'rgba(239, 68, 68, 0.7)';
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
          gradient.addColorStop(1, 'rgba(239, 68, 68, 0.15)');
          return gradient;
        },
        hoverBackgroundColor: 'rgba(239, 68, 68, 0.95)',
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.55,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#475569',
          font: { family: 'Inter', size: 11 },
        },
        border: { display: true, color: 'rgba(255,255,255,0.06)' },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: '#475569',
          font: { family: 'Inter', size: 11 },
          callback: (val) => `₹${val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val}`,
        },
        border: { display: false },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: '#94a3b8',
          font: { family: 'Inter', size: 11 },
          usePointStyle: true,
          pointStyle: 'rectRounded',
          padding: 16,
        },
      },
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
          label: (ctx) => ` ${ctx.dataset.label}: ₹${ctx.raw.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
        },
      },
    },
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-base font-display font-semibold text-white mb-4">{title}</h3>
      <div className="h-64">
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MonthlyBarChart;
