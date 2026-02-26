/// <reference types="vite/client" />

declare module 'sharedUi/Button' {
  import type { ButtonHTMLAttributes } from 'react';
  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children: React.ReactNode;
    className?: string;
  }
  const Button: React.FC<ButtonProps>;
  export default Button;
}

declare module 'sharedUi/Modal' {
  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
  }
  const Modal: React.FC<ModalProps>;
  export default Modal;
}

declare module 'sharedUi/Badge' {
  interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
    size?: 'sm' | 'md';
    className?: string;
  }
  const Badge: React.FC<BadgeProps>;
  export default Badge;
}

declare module 'sharedUi/Spinner' {
  interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
  }
  const Spinner: React.FC<SpinnerProps>;
  export default Spinner;
}

declare module 'sharedUi/EmptyState' {
  interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
  }
  const EmptyState: React.FC<EmptyStateProps>;
  export default EmptyState;
}

declare module 'sharedUi/Card' {
  interface CardProps {
    children: React.ReactNode;
    padding?: 'sm' | 'md' | 'lg';
    borderColor?: string;
    className?: string;
  }
  const Card: React.FC<CardProps>;
  export default Card;
}
