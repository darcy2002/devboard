import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TaskStats } from '../types';

interface TaskChartProps {
  stats: TaskStats;
}

const COLORS = ['#22c55e', '#6366f1', '#eab308'];

const TaskChart = ({ stats }: TaskChartProps) => {
  const data = [
    { name: 'Completed', value: stats.completed },
    { name: 'In Progress', value: stats.inProgress ?? 0 },
    { name: 'Pending', value: stats.pending },
  ];

  const hasData = data.some((d) => d.value > 0);

  if (!hasData) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Task Status</h3>
        <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
          No tasks to display
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Task Status</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskChart;
