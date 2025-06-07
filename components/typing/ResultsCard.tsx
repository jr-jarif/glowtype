import React from 'react';
import { TestStats, WpmDataPoint } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import GlassmorphismCard from '../common/GlassmorphismCard';
import Button from '../common/Button';
import LiveWPMGraph from './LiveWPMGraph'; // Re-using for static display
import { FaShareAlt, FaRedo, FaChartLine, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface ResultsCardProps {
  stats: TestStats;
  wpmHistory: WpmDataPoint[];
  onRestart: () => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ stats, wpmHistory, onRestart }) => {
  const { theme } = useTheme();

  const shareResults = () => {
    const baseText = `I just got ${stats.wpm.toFixed(0)} WPM with ${stats.accuracy.toFixed(1)}% accuracy on GlowType!`;
    let shareableUrl: string | undefined = undefined;
    let fullTextForClipboard = baseText;

    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
      shareableUrl = window.location.href;
      fullTextForClipboard = `${baseText} Check it out: ${shareableUrl}`;
    } else {
      fullTextForClipboard = `${baseText} (App running locally)`; 
    }

    const shareData: ShareData = {
      title: 'My GlowType Results',
      text: baseText, 
    };

    if (shareableUrl) {
      shareData.url = shareableUrl;
    }

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Successfully shared'))
        .catch((error) => {
          console.error('Error sharing:', error);
          // Fallback to clipboard, provide more context in alert based on error.
          let alertMessage = 'Results copied to clipboard!';
          if (error.name !== 'AbortError') { // AbortError means user cancelled, not a failure.
            alertMessage += ' (Sharing failed)';
          }
          navigator.clipboard.writeText(fullTextForClipboard).then(() => {
            alert(alertMessage);
          }).catch(err => console.error('Failed to copy to clipboard:', err));
        });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(fullTextForClipboard).then(() => {
        alert('Results copied to clipboard! (Sharing not supported)');
      }).catch(err => console.error('Failed to copy to clipboard:', err));
    }
  };

  return (
    <GlassmorphismCard className={`max-w-2xl mx-auto ${theme.textColor}`}>
      <div className="text-center mb-6">
        <h2 className={`text-3xl font-bold ${theme.accentColor}`}>Test Completed!</h2>
        <p className="opacity-80">Here's how you performed on "{stats.textSourceTitle || 'the test'}"</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
        <div>
          <FaChartLine className={`mx-auto text-3xl mb-1 ${theme.accentColor}`} />
          <p className="text-sm opacity-80">WPM</p>
          <p className="text-2xl font-bold">{stats.wpm.toFixed(0)}</p>
        </div>
        <div>
          <FaCheckCircle className={`mx-auto text-3xl mb-1 ${stats.accuracy > 95 ? 'text-green-400' : stats.accuracy > 90 ? 'text-yellow-400' : 'text-orange-400'}`} />
          <p className="text-sm opacity-80">Accuracy</p>
          <p className="text-2xl font-bold">{stats.accuracy.toFixed(1)}%</p>
        </div>
        <div>
          <FaTimesCircle className={`mx-auto text-3xl mb-1 ${stats.errors === 0 ? 'text-green-400' : 'text-red-400'}`} />
          <p className="text-sm opacity-80">Errors</p>
          <p className="text-2xl font-bold">{stats.errors}</p>
        </div>
        <div>
          <p className="text-sm opacity-80 mt-1 md:mt-0">Time</p> {/* Aligning this with icons */}
          <p className="text-2xl font-bold pt-8 md:pt-0">{stats.timeElapsed.toFixed(1)}s</p>
        </div>
      </div>
      
      {wpmHistory.length > 1 && (
        <div className="mb-6 h-48 md:h-64">
          <h3 className="text-lg font-semibold mb-2 text-center">WPM Over Time</h3>
          <LiveWPMGraph data={wpmHistory} />
        </div>
      )}

      {/* Placeholder for achievements */}
      {/* <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Achievements Unlocked</h3>
        <div className="flex space-x-2">
          <span className="p-2 bg-yellow-500/20 text-yellow-400 rounded-md text-xs">⚡️ Fast Typer</span>
        </div>
      </div> */}

      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
        <Button onClick={onRestart} variant="primary" size="lg">
          <FaRedo className="inline mr-2" /> Try Again
        </Button>
        <Button onClick={shareResults} variant="outline" size="lg">
          <FaShareAlt className="inline mr-2" /> Share Results
        </Button>
      </div>
    </GlassmorphismCard>
  );
};

export default ResultsCard;