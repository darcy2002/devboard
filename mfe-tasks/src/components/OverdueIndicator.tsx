interface OverdueIndicatorProps {
  status: 'pending' | 'completed';
  dueDate: string;
}

const OverdueIndicator = ({ status, dueDate }: OverdueIndicatorProps) => {
  const isOverdue = status === 'pending' && new Date(dueDate) < new Date();

  if (!isOverdue) return null;

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
      ⚠ Overdue
    </span>
  );
};

export default OverdueIndicator;
