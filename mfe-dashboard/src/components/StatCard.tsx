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
    <Card padding="md" className="p-5">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
