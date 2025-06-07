
import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { useTheme } from '../../contexts/ThemeContext';
import GlassmorphismCard from '../common/GlassmorphismCard';

const soundProfiles = [
  { id: 'clicky', name: 'Clicky Blue' },
  { id: 'tactile', name: 'Tactile Brown' },
  { id: 'linear', name: 'Linear Red' },
  { id: 'silent', name: 'Silent' },
];

const SoundSettings: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const { theme } = useTheme();

  const commonSelectClasses = `block w-full p-2 ${theme.glassBgClass} border ${theme.borderColor} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:${theme.accentColor.replace('text-', 'ring-')} ${theme.textColor}`;
  const commonLabelClasses = `block text-sm font-medium mb-1 ${theme.textColor}`;

  return (
    <GlassmorphismCard>
      <h3 className={`text-xl font-semibold mb-4 ${theme.accentColor}`}>Sound Effects</h3>
      <div className="space-y-4">
        <div>
          <label className={commonLabelClasses}>Enable Typing Sounds</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="soundEffects"
              checked={settings.soundEffects}
              onChange={(e) => updateSettings({ soundEffects: e.target.checked })}
              className={`h-5 w-5 rounded ${theme.accentColor.replace('text-','accent-')} border-gray-300 focus:ring-offset-0 focus:ring-2`}
            />
            <label htmlFor="soundEffects" className={`ml-2 text-sm ${theme.textColor}`}>Play sounds on keypress</label>
          </div>
        </div>

        {settings.soundEffects && (
          <div>
            <label htmlFor="soundProfile" className={commonLabelClasses}>Sound Profile</label>
            <select
              id="soundProfile"
              value={settings.soundProfile}
              onChange={(e) => updateSettings({ soundProfile: e.target.value as 'clicky' | 'tactile' | 'linear' | 'silent' })}
              className={commonSelectClasses}
              disabled={!settings.soundEffects}
            >
              {soundProfiles.map(profile => <option key={profile.id} value={profile.id}>{profile.name}</option>)}
            </select>
          </div>
        )}
        <p className={`text-xs ${theme.textColor} opacity-70`}>
            Actual sound playback is a complex feature and is currently for demonstration purposes. Custom sound uploads are a planned premium feature.
        </p>
      </div>
    </GlassmorphismCard>
  );
};

export default SoundSettings;
