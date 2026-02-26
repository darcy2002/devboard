import '../index.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

const variantClasses = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  danger: 'bg-rose-50 text-rose-700 ring-rose-600/10',
  info: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  default: 'bg-gray-50 text-gray-600 ring-gray-500/10',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-2.5 py-1 text-xs',
};

const Badge = ({ children, variant = 'default', size = 'sm', className = '' }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-md font-semibold ring-1 ring-inset ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
