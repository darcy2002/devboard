import Card from 'sharedUi/Card';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  subtitle?: string;
  colorClass: string;
}

const StatCard = ({ icon, title, value, subtitle, colorClass }: StatCardProps) => {
  return (
    <Card padding="md" className="p-5 hover:scale-[1.02] transition-transform duration-200">
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorClass}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-gray-900 tabular-nums">{value}</p>
          {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
