import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { PracticeSettings, TextSourceCategory } from '../../types';
import {
  PRACTICE_TEST_DURATIONS,
  PRACTICE_TEST_MODES,
  PRACTICE_WORD_COUNTS,
  ALL_TEXT_SOURCE_CATEGORIES_WITH_NAMES
} from '../../constants';
import GlassmorphismCard from '../common/GlassmorphismCard';

interface QuickSettingsPanelProps {
  settings: PracticeSettings;
  updateTestDuration: (duration: number) => void;
  updateTestMode: (mode: PracticeSettings['testMode']) => void;
  updateWordCount: (count: number) => void;
  updateTextSource: (source: TextSourceCategory) => void;
}

const QuickSettingsPanel: React.FC<QuickSettingsPanelProps> = ({
  settings,
  updateTestDuration,
  updateTestMode,
  updateWordCount,
  updateTextSource,
}) => {
  const { theme } = useTheme();

  const commonSelectClasses = `block w-full p-2 ${theme.glassBgClass} border ${theme.borderColor} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:${theme.accentColor.replace('text-', 'ring-')} ${theme.textColor} text-sm`;
  const commonLabelClasses = `block text-xs font-medium mb-1 ${theme.textColor} opacity-80`;

  return (
    <GlassmorphismCard className="my-6 md:my-8">
      <h3 className={`text-lg font-semibold mb-4 ${theme.accentColor}`}>Test Configuration</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor="qsTestMode" className={commonLabelClasses}>Mode</label>
          <select
            id="qsTestMode"
            value={settings.testMode}
            onChange={(e) => updateTestMode(e.target.value as PracticeSettings['testMode'])}
            className={commonSelectClasses}
          >
            {PRACTICE_TEST_MODES.map(mode => <option key={mode.id} value={mode.id}>{mode.name}</option>)}
          </select>
        </div>

        {settings.testMode === 'time' && (
          <div>
            <label htmlFor="qsTestDuration" className={commonLabelClasses}>Duration</label>
            <select
              id="qsTestDuration"
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
                <label htmlFor="qsWordCount" className={commonLabelClasses}>Words</label>
                <select
                  id="qsWordCount"
                  value={settings.wordCount}
                  onChange={(e) => updateWordCount(parseInt(e.target.value, 10))}
                  className={commonSelectClasses}
                >
                  {PRACTICE_WORD_COUNTS.map(count => <option key={count} value={count}>{count}</option>)}
                </select>
            </div>
        )}
        
        {(settings.testMode === 'time' || settings.testMode === 'words' || settings.testMode === 'quote' || settings.testMode === 'code') && (
             <div className={settings.testMode === 'time' || settings.testMode === 'words' ? 'col-span-2 md:col-span-1' : 'col-span-2 md:col-span-3'}> {/* Adjust span for better layout */}
                <label htmlFor="qsTextSource" className={commonLabelClasses}>Text Source</label>
                <select
                id="qsTextSource"
                value={settings.textSource}
                onChange={(e) => updateTextSource(e.target.value as TextSourceCategory)}
                className={commonSelectClasses}
                >
                {ALL_TEXT_SOURCE_CATEGORIES_WITH_NAMES.filter(source => {
                    if (source.id === TextSourceCategory.CUSTOM) return false; // Never show custom in this dropdown

                    if (settings.testMode === 'code') {
                        return source.id === TextSourceCategory.CODE_SNIPPETS_JS || source.id === TextSourceCategory.CODE_SNIPPETS_PYTHON;
                    }
                    if (settings.testMode === 'quote') {
                        return source.id === TextSourceCategory.FAMOUS_QUOTES;
                    }
                    if (settings.testMode === 'time' || settings.testMode === 'words') {
                        return source.id === TextSourceCategory.COMMON_WORDS || source.id === TextSourceCategory.FAMOUS_QUOTES;
                    }
                    return true; 
                }).map(source => <option key={source.id} value={source.id}>{source.name.replace(' Code','').replace(' (Upload)','')}</option>)}
                </select>
            </div>
        )}
      </div>
       <p className={`mt-3 text-xs ${theme.textColor} opacity-60`}>
        Changes will start a new test.
        {(settings.testMode === 'quote' || settings.testMode === 'code') && ' Word count/duration are determined by the selected text.'}
      </p>
    </GlassmorphismCard>
  );
};

export default QuickSettingsPanel;
