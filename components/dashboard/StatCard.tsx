
import React, { ReactNode } from 'react';
import GlassmorphismCard from '../common/GlassmorphismCard';
import { useTheme } from '../../contexts/ThemeContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, className }) => {
  const { theme } = useTheme();

  return (
    <GlassmorphismCard className={`text-center ${className}`}>
      {icon && <div className={`text-4xl ${theme.accentColor} mb-3 mx-auto w-min`}>{icon}</div>}
      <h3 className={`text-lg font-semibold ${theme.textColor} opacity-80`}>{title}</h3>
      <p className={`text-4xl font-bold my-1 ${theme.textColor}`}>{value}</p>
      {description && <p className={`text-sm ${theme.textColor} opacity-60`}>{description}</p>}
    </GlassmorphismCard>
  );
};

export default StatCard;
