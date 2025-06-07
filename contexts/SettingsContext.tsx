
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { PracticeSettings, KeyboardLayoutId, TextSourceCategory } from '../types';
import { DEFAULT_PRACTICE_SETTINGS } from '../constants';

interface SettingsContextType {
  settings: PracticeSettings;
  updateSettings: (newSettings: Partial<PracticeSettings>) => void;
  updateTestDuration: (duration: number) => void;
  updateTestMode: (mode: 'time' | 'words' | 'quote' | 'code') => void;
  updateWordCount: (count: number) => void;
  updateTextSource: (source: TextSourceCategory) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<PracticeSettings>(() => {
    const savedSettings = localStorage.getItem('glowtype-settings');
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_PRACTICE_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('glowtype-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback((newSettings: Partial<PracticeSettings>) => {
    setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  }, []);

  const updateTestDuration = useCallback((duration: number) => {
    updateSettings({ testDuration: duration });
  }, [updateSettings]);

  const updateTestMode = useCallback((mode: 'time' | 'words' | 'quote' | 'code') => {
    updateSettings({ testMode: mode });
  }, [updateSettings]);
  
  const updateWordCount = useCallback((count: number) => {
    updateSettings({ wordCount: count });
  }, [updateSettings]);

  const updateTextSource = useCallback((source: TextSourceCategory) => {
    updateSettings({ textSource: source });
  }, [updateSettings]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, updateTestDuration, updateTestMode, updateWordCount, updateTextSource }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};