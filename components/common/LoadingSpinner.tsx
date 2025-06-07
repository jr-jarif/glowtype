
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text }) => {
  const { theme } = useTheme();
  let spinnerSize = 'h-8 w-8';
  if (size === 'sm') spinnerSize = 'h-5 w-5';
  if (size === 'lg') spinnerSize = 'h-12 w-12';

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={`animate-spin rounded-full ${spinnerSize} border-t-2 border-b-2 ${theme.borderColor.replace('border-', 'border-t-').replace('/30', '/70')} ${theme.borderColor.replace('border-', 'border-b-')}`}
        style={{ borderTopColor: theme.accentColorHex || 'currentColor' }} // Use accent color for one part of spinner
      ></div>
      {text && <p className={`${theme.textColor} text-sm`}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;