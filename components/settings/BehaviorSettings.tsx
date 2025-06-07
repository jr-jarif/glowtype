import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { useTheme } from '../../contexts/ThemeContext';
import GlassmorphismCard from '../common/GlassmorphismCard';
import { TextSourceCategory, PracticeSettings } from '../../types';
import { 
    PRACTICE_TEST_DURATIONS,
    PRACTICE_TEST_MODES,
    PRACTICE_WORD_COUNTS,
    ALL_TEXT_SOURCE_CATEGORIES_WITH_NAMES
} from '../../constants';


const BehaviorSettings: React.FC = () => {
  const { settings, updateSettings, updateTestDuration, updateTestMode, updateWordCount, updateTextSource } = useSettings();
  const { theme } = useTheme();

  const commonSelectClasses = `block w-full p-2 ${theme.glassBgClass} border ${theme.borderColor} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:${theme.accentColor.replace('text-', 'ring-')} ${theme.textColor}`;
  const commonLabelClasses = `block text-sm font-medium mb-1 ${theme.textColor}`;

  // Filter out 'Custom Text (Upload)' for the default text source selection in general settings,
  // as 'custom' is usually an ad-hoc selection or upload on the practice page itself.
  const availableTextSourcesForSettings = ALL_TEXT_SOURCE_CATEGORIES_WITH_NAMES.filter(
    source => source.id !== TextSourceCategory.CUSTOM
  );


  return (
    <GlassmorphismCard>
      <h3 className={`text-xl font-semibold mb-6 ${theme.accentColor}`}>Test Behavior</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="testMode" className={commonLabelClasses}>Test Mode</label>
          <select
            id="testMode"
            value={settings.testMode}
            onChange={(e) => updateTestMode(e.target.value as PracticeSettings['testMode'])}
            className={commonSelectClasses}
          >
            {PRACTICE_TEST_MODES.map(mode => <option key={mode.id} value={mode.id}>{mode.name}</option>)}
          </select>
        </div>

        {settings.testMode === 'time' && (
          <div>
            <label htmlFor="testDuration" className={commonLabelClasses}>Test Duration (seconds)</label>
            <select
              id="testDuration"
              value={settings.testDuration}
              onChange={(e) => updateTestDuration(parseInt(e.target.value, 10))}
              className={commonSelectClasses}
            >
              {PRACTICE_TEST_DURATIONS.map(duration => <option key={duration} value={duration}>{duration}s</option>)}
            </select>
          </div>
        )}

        {settings.testMode === 'words' && (
             <div>
                <label htmlFor="wordCount" className={commonLabelClasses}>Number of Words</label>
                <select
                id="wordCount"
                value={settings.wordCount}
                onChange={(e) => updateWordCount(parseInt(e.target.value, 10))}
                className={commonSelectClasses}
                >
                {PRACTICE_WORD_COUNTS.map(count => <option key={count} value={count}>{count} words</option>)}
                </select>
            </div>
        )}
        
        <div>
            <label htmlFor="textSource" className={commonLabelClasses}>Default Text Source</label>
            <select
            id="textSource"
            value={settings.textSource}
            onChange={(e) => updateTextSource(e.target.value as TextSourceCategory)}
            className={commonSelectClasses}
            >
            {availableTextSourcesForSettings.map(source => <option key={source.id} value={source.id}>{source.name.replace(' (Upload)','')}</option>)}
            </select>
        </div>

        <div>
            <label className={commonLabelClasses}>Live WPM Graph</label>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="liveWpmGraph"
                    checked={settings.liveWpmGraph}
                    onChange={(e) => updateSettings({liveWpmGraph: e.target.checked})}
                    className={`h-5 w-5 rounded ${theme.accentColor.replace('text-','accent-')} border-gray-300 focus:ring-offset-0 focus:ring-2`}
                />
                <label htmlFor="liveWpmGraph" className={`ml-2 text-sm ${theme.textColor}`}>Show live WPM graph during test</label>
            </div>
        </div>

      </div>
       <p className={`mt-4 text-xs ${theme.textColor} opacity-60`}>
        Note: Quote and Code modes will use their specific content length. Custom text is handled on the Practice page.
      </p>
    </GlassmorphismCard>
  );
};

export default BehaviorSettings;
