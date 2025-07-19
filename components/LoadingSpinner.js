import { Loader2 } from 'lucide-react';

/**
 * LoadingSpinner Component
 * Reusable loading indicator with customizable size and text
 */
const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      <span className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
        {text}
      </span>
    </div>
  );
};

export default LoadingSpinner;