
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Theme } from '../../types';
import GlassmorphismCard from '../common/GlassmorphismCard';

const ThemePreview: React.FC<{ theme: Theme; isSelected: boolean; onSelect: () => void }> = ({ theme, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 ${isSelected ? `${theme.borderColor.replace('border-','border-b-4 border-')} ${theme.accentColor.replace('text-','ring-2 ring-')}` : theme.borderColor} hover:shadow-lg`}
      style={{ background: theme.gradient, backgroundSize: '200% 200%' }} // Static preview of gradient
    >
      <div className={`p-4 rounded ${theme.glassBgClass} glassmorphism`}>
        <h4 className={`font-semibold text-center ${theme.textColor}`}>{theme.name}</h4>
        <div className="flex justify-around mt-2">
          <div className={`w-5 h-5 rounded-full ${theme.accentColor.replace('text-','bg-')}`}></div>
          <div className={`w-5 h-5 rounded-full ${theme.textColor.replace('text-','bg-')}`}></div>
          <div className={`w-5 h-5 rounded-full ${theme.glassBgClass.split(' ')[0]}`}></div>
        </div>
      </div>
    </div>
  );
};

const ThemeSelector: React.FC = () => {
  const { theme: currentTheme, setThemeById, availableThemes } = useTheme();

  return (
    <GlassmorphismCard>
      <h3 className={`text-xl font-semibold mb-4 ${currentTheme.accentColor}`}>Appearance Themes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableThemes.filter(t => t.id !== 'custom').map((themeOption) => ( // Exclude custom from this list initially
          <ThemePreview
            key={themeOption.id}
            theme={themeOption}
            isSelected={currentTheme.id === themeOption.id}
            onSelect={() => setThemeById(themeOption.id)}
          />
        ))}
      </div>
    </GlassmorphismCard>
  );
};

export default ThemeSelector;