
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { Theme } from '../types';
import { DEFAULT_THEMES, DEFAULT_THEME_ID } from '../constants';

interface ThemeContextType {
  theme: Theme;
  setThemeById: (themeId: string) => void;
  availableThemes: Theme[];
  updateCustomThemeColors: (startColor: string, endColor: string) => void;
  updateGlassmorphism: (blur: number, opacity: number) => void; // blur in px, opacity 0-1
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storedThemeId = localStorage.getItem('glowtype-theme-id');
    const foundTheme = DEFAULT_THEMES.find(t => t.id === storedThemeId);
    return foundTheme || DEFAULT_THEMES.find(t => t.id === DEFAULT_THEME_ID)!;
  });

  const [customThemeConfig, setCustomThemeConfig] = useState(() => {
    const stored = localStorage.getItem('glowtype-custom-theme');
    if (stored) return JSON.parse(stored);
    return {
      gradient: currentTheme.gradient,
      blur: 16, // Default blur
      opacity: 0.1, // Default opacity for glassBgClass
      startColor: '#004e92', // Default start for custom, e.g., Arctic Night
      endColor: '#000428',   // Default end for custom
    };
  });
  
  const [effectiveTheme, setEffectiveTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    localStorage.setItem('glowtype-theme-id', currentTheme.id);
    if (currentTheme.id === 'custom') {
        const customGlassBgClass = `bg-black/${Math.round(customThemeConfig.opacity * 100)}`; // e.g. bg-black/10 for 0.1
        setEffectiveTheme({
            ...currentTheme, // base custom theme structure
            name: "Custom Vibe",
            gradient: customThemeConfig.gradient,
            glassBgClass: customGlassBgClass,
            // Potentially derive other colors or keep them fixed for custom
            textColor: 'text-gray-200',
            accentColor: 'text-sky-400',
            borderColor: 'border-gray-500/30',
        });
    } else {
        setEffectiveTheme(currentTheme);
    }
  }, [currentTheme, customThemeConfig]);


  const setThemeById = useCallback((themeId: string) => {
    const newTheme = DEFAULT_THEMES.find(t => t.id === themeId) || (themeId === 'custom' ? {
        id: 'custom',
        name: 'Custom Vibe', // Will be updated by effect
        gradient: customThemeConfig.gradient,
        glassBgClass: `bg-black/${Math.round(customThemeConfig.opacity * 100)}`, // Default to black base for custom
        textColor: 'text-gray-200',
        accentColor: 'text-sky-400', // Default accent
        borderColor: 'border-gray-500/30', // Default border
        buttonClasses: 'bg-sky-500 hover:bg-sky-600 text-white', // Default button
        kbdBgClass: 'bg-gray-800/50',
        kbdTextClass: 'text-gray-200',
        kbdActiveBgClass: 'bg-sky-500/80',
        kbdActiveTextClass: 'text-white',
      } : currentTheme) ;
    setCurrentTheme(newTheme);
  }, [currentTheme, customThemeConfig.gradient, customThemeConfig.opacity]);

  const updateCustomThemeColors = useCallback((startColor: string, endColor: string) => {
    const newGradient = `linear-gradient(-45deg, ${startColor}, ${endColor}, ${startColor}, ${endColor})`;
    setCustomThemeConfig(prev => {
        const newConfig = {...prev, gradient: newGradient, startColor, endColor};
        localStorage.setItem('glowtype-custom-theme', JSON.stringify(newConfig));
        return newConfig;
    });
    if (currentTheme.id === 'custom') {
      setCurrentTheme(prev => ({ ...prev, gradient: newGradient }));
    }
  }, [currentTheme.id]);

  const updateGlassmorphism = useCallback((blur: number, opacity: number) => {
    setCustomThemeConfig(prev => {
        const newConfig = {...prev, blur, opacity};
        localStorage.setItem('glowtype-custom-theme', JSON.stringify(newConfig));
        return newConfig;
    });
     if (currentTheme.id === 'custom') {
        const customGlassBgClass = `bg-black/${Math.round(opacity * 100)}`;
        // This is tricky, might need to re-trigger setCurrentTheme or have effectiveTheme logic handle it
        setCurrentTheme(prev => ({...prev, glassBgClass: customGlassBgClass }));
        // Also update body style for blur if it's controlled globally here
        // For simplicity, blur is applied via Tailwind utility, this would primarily affect custom themes
    }
    // Update a global CSS variable for blur if needed for non-Tailwind components, or adjust Tailwind config if possible dynamically (advanced)
    // document.documentElement.style.setProperty('--glass-blur', `${blur}px`);
  }, [currentTheme.id]);


  const availableThemesWithCustom = [...DEFAULT_THEMES];
  if (!DEFAULT_THEMES.find(t => t.id === 'custom')) {
    availableThemesWithCustom.push({
        id: 'custom',
        name: 'Custom Vibe',
        gradient: customThemeConfig.gradient,
        glassBgClass: `bg-black/${Math.round(customThemeConfig.opacity * 100)}`,
        textColor: 'text-gray-200',
        accentColor: 'text-sky-400',
        accentColorHex: '#38BDF8',
        borderColor: 'border-gray-500/30',
        buttonClasses: 'bg-sky-500 hover:bg-sky-600 text-white',
        kbdBgClass: 'bg-gray-800/50',
        kbdTextClass: 'text-gray-200',
        kbdActiveBgClass: 'bg-sky-500/80',
        kbdActiveTextClass: 'text-white',
    });
  }


  return (
    <ThemeContext.Provider value={{ theme: effectiveTheme, setThemeById, availableThemes: availableThemesWithCustom, updateCustomThemeColors, updateGlassmorphism }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};