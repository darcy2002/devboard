import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TaskStats } from '../types';

interface PriorityChartProps {
  stats: TaskStats;
}

const COLORS = { low: '#22c55e', medium: '#eab308', high: '#ef4444' };

const PriorityChart = ({ stats }: PriorityChartProps) => {
  const data = [
    { name: 'Low', value: stats.byPriority.low, color: COLORS.low },
    { name: 'Medium', value: stats.byPriority.medium, color: COLORS.medium },
    { name: 'High', value: stats.byPriority.high, color: COLORS.high },
  ];

  const hasData = data.some((d) => d.value > 0);

  if (!hasData) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Priority Distribution</h3>
        <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
          No tasks to display
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Priority Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriorityChart;
