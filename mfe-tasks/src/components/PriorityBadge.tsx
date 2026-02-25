interface PriorityBadgeProps {
  priority: 'low' | 'medium' | 'high';
}

const priorityConfig = {
  low: { label: 'Low', classes: 'bg-green-100 text-green-800' },
  medium: { label: 'Medium', classes: 'bg-yellow-100 text-yellow-800' },
  high: { label: 'High', classes: 'bg-red-100 text-red-800' },
};

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const config = priorityConfig[priority];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.classes}`}>
      {config.label}
    </span>
  );
};

export default PriorityBadge;
