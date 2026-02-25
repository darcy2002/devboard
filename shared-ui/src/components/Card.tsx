import '../index.css';

interface CardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  borderColor?: string;
  className?: string;
}

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const Card = ({ children, padding = 'md', borderColor, className = '' }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 transition-shadow hover:shadow-md
        ${borderColor ? `border-l-4 ${borderColor}` : ''}
        ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
