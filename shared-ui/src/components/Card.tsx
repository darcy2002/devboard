import '../index.css';

interface CardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  borderColor?: string;
}

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const Card = ({ children, padding = 'md', className = '', borderColor }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100
        transition-all duration-200 ease-out
        hover:shadow-md hover:border-gray-200
        ${borderColor ? `border-l-4 ${borderColor}` : ''}
        ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
