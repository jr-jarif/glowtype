
import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { useTheme } from '../../contexts/ThemeContext'; 
import GlassmorphismCard from '../common/GlassmorphismCard';
import { KEYBOARD_LAYOUTS } from '../../constants';
import Button from '../common/Button';

const LayoutSelector: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const { theme } = useTheme(); // Corrected usage

  return (
    <GlassmorphismCard>
      <h3 className={`text-xl font-semibold mb-4 ${theme.accentColor}`}>Keyboard Layout</h3>
      <div className="space-y-2">
        {KEYBOARD_LAYOUTS.map((layout) => (
          <Button
            key={layout.id}
            onClick={() => updateSettings({ selectedLayout: layout.id })}
            variant={settings.selectedLayout === layout.id ? 'primary' : 'outline'}
            className="w-full text-left justify-start"
            disabled={layout.name.includes("Coming Soon")}
          >
            {layout.name} {layout.name.includes("Coming Soon") && <span className="text-xs opacity-70 ml-2">(Coming Soon)</span>}
          </Button>
        ))}
      </div>
      <p className={`mt-3 text-sm ${theme.textColor} opacity-70`}>
        Current: {KEYBOARD_LAYOUTS.find(l => l.id === settings.selectedLayout)?.name || 'QWERTY'}. More layouts coming soon!
      </p>
    </GlassmorphismCard>
  );
};

export default LayoutSelector;
