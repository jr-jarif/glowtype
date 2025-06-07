
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { TestStats, WpmDataPoint } from '../../types';
import GlassmorphismCard from '../common/GlassmorphismCard';
import LiveWPMGraph from './LiveWPMGraph';

interface MetricsDisplayProps {
  stats: TestStats | null;
  timeLeft?: number; // Optional: for timed tests
  wordsCompleted?: number; // Optional: for word count tests
  totalWords?: number; // Optional: for word count tests
  wpmHistory: WpmDataPoint[];
  showLiveGraph: boolean;
}

const MetricItem: React.FC<{ label: string; value: string | number; accent?: boolean }> = ({ label, value, accent }) => {
  const { theme } = useTheme();
  return (
    <div className="text-center">
      <div className={`text-xs sm:text-sm ${theme.textColor} opacity-80`}>{label}</div>
      <div className={`text-2xl sm:text-3xl font-bold ${accent ? theme.accentColor : theme.textColor}`}>
        {value}
      </div>
    </div>
  );
};

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ stats, timeLeft, wordsCompleted, totalWords, wpmHistory, showLiveGraph }) => {
  const { theme } = useTheme();

  return (
    <GlassmorphismCard className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center">
        {timeLeft !== undefined && (
          <MetricItem label="Time Left" value={`${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`} />
        )}
        {wordsCompleted !== undefined && totalWords !== undefined && (
            <MetricItem label="Words" value={`${wordsCompleted}/${totalWords}`} />
        )}
        <MetricItem label="WPM" value={stats?.wpm.toFixed(0) ?? '0'} accent />
        <MetricItem label="Accuracy" value={`${stats?.accuracy.toFixed(1) ?? '0'}%`} />
        <MetricItem label="Errors" value={stats?.errors ?? '0'} />
        <MetricItem label="Chars" value={stats?.charsTyped ?? '0'} />
      </div>
      {showLiveGraph && stats && stats.timeElapsed > 2 && wpmHistory.length > 1 && (
        <div className="mt-4 h-24 md:h-32">
          <LiveWPMGraph data={wpmHistory} />
        </div>
      )}
    </GlassmorphismCard>
  );
};

export default MetricsDisplay;
