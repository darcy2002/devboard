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
      className={`bg-white rounded-xl shadow-sm border border-gray-200
        transition-all duration-200 ease-out
        hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5
        active:translate-y-0 active:shadow-sm
        ${borderColor ? `border-l-4 ${borderColor}` : ''}
        ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
