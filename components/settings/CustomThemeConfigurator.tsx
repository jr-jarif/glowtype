import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import GlassmorphismCard from '../common/GlassmorphismCard';
import Button from '../common/Button';

const CustomThemeConfigurator: React.FC = () => {
  const { theme, updateCustomThemeColors, updateGlassmorphism, setThemeById } = useTheme();
  
  // Initialize local state from local storage or defaults if 'custom' theme is active or being configured
  const [localConfig, setLocalConfig] = useState(() => {
    const stored = localStorage.getItem('glowtype-custom-theme');
    if (stored) {
        const parsed = JSON.parse(stored);
        return {
            startColor: parsed.startColor || '#FF5F6D',
            endColor: parsed.endColor || '#FFC371',
            blur: parsed.blur || 16,
            opacity: parsed.opacity || 0.1,
        };
    }
    return {
        startColor: '#FF5F6D', // Default Solar Flare like
        endColor: '#FFC371',
        blur: 16,
        opacity: 0.1,
    };
  });
  
  useEffect(() => {
    // If the global theme is custom, ensure local state reflects its current live configuration
    // This is mainly for initial load or if custom theme was set elsewhere
    if (theme.id === 'custom') {
        const stored = localStorage.getItem('glowtype-custom-theme');
        if (stored) {
            const parsed = JSON.parse(stored);
            setLocalConfig({
                startColor: parsed.startColor,
                endColor: parsed.endColor,
                blur: parsed.blur,
                opacity: parsed.opacity,
            });
        }
    }
  }, [theme.id, theme.gradient]);


  const handleApplyCustomTheme = () => {
    updateCustomThemeColors(localConfig.startColor, localConfig.endColor);
    updateGlassmorphism(localConfig.blur, localConfig.opacity);
    // Ensure the 'custom' theme is activated
    if (theme.id !== 'custom') {
      setThemeById('custom');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setLocalConfig(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };
  
  const commonInputClasses = `block w-full p-2 ${theme.id === 'custom' ? theme.glassBgClass : 'bg-gray-700/20'} border ${theme.id === 'custom' ? theme.borderColor : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:${theme.id === 'custom' ? theme.accentColor.replace('text-', 'ring-') : 'ring-sky-500'} ${theme.textColor}`;
  const commonLabelClasses = `block text-sm font-medium mb-1 ${theme.textColor}`;

  return (
    <GlassmorphismCard>
      <h3 className={`text-xl font-semibold mb-4 ${theme.accentColor}`}>Customize Your Vibe</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="startColor" className={commonLabelClasses}>Gradient Start Color</label>
          <input type="color" id="startColor" name="startColor" value={localConfig.startColor} onChange={handleInputChange} className={`${commonInputClasses} h-10`} />
        </div>
        <div>
          <label htmlFor="endColor" className={commonLabelClasses}>Gradient End Color</label>
          <input type="color" id="endColor" name="endColor" value={localConfig.endColor} onChange={handleInputChange} className={`${commonInputClasses} h-10`} />
        </div>
        <div>
          <label htmlFor="blur" className={commonLabelClasses}>Glass Blur Intensity ({localConfig.blur}px)</label>
          <input type="range" id="blur" name="blur" min="0" max="40" step="1" value={localConfig.blur} onChange={handleInputChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500" />
        </div>
        <div>
          <label htmlFor="opacity" className={commonLabelClasses}>Glass Background Opacity ({(localConfig.opacity * 100).toFixed(0)}%)</label>
          <input type="range" id="opacity" name="opacity" min="0.05" max="0.5" step="0.01" value={localConfig.opacity} onChange={handleInputChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500" />
        </div>
        <Button onClick={handleApplyCustomTheme} variant="primary" className="w-full mt-2">
          Apply Custom Vibe
        </Button>
      </div>
      {theme.id === 'custom' && <p className={`mt-3 text-xs ${theme.textColor} opacity-70`}>Your custom vibe is active!</p>}
      {theme.id !== 'custom' && <p className={`mt-3 text-xs ${theme.textColor} opacity-70`}>Preview and apply to activate your custom theme.</p>}
    </GlassmorphismCard>
  );
};

export default CustomThemeConfigurator;