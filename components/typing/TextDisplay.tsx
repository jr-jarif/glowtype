
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface TextDisplayProps {
  prevWords: string[];
  currentWord: string;
  nextWords: string[];
  typedCurrentWord: string;
  isCurrentCharErrorGlobal: boolean;
  textSourceTitle?: string;
  animationKey: string | number; // To trigger current word transition animation
}

const TextDisplay: React.FC<TextDisplayProps> = ({
  prevWords,
  currentWord,
  nextWords,
  typedCurrentWord,
  isCurrentCharErrorGlobal,
  textSourceTitle,
  animationKey
}) => {
  const { theme } = useTheme();

  const renderWordCharacters = (word: string, isCurrent: boolean) => {
    if (!isCurrent) {
      return <span className={isCurrentCharErrorGlobal && word === currentWord ? 'opacity-100' : 'opacity-50'}>{word}</span>; // Keep current word fully visible even if error elsewhere
    }

    // Character-by-character styling for the current word
    return word.split('').map((char, index) => {
      let charClass = '';
      const isTyped = index < typedCurrentWord.length;
      const isCurrentPos = index === typedCurrentWord.length;

      if (isTyped) {
        charClass = typedCurrentWord[index] === char ? theme.accentColor : 'text-red-500 line-through';
      } else if (isCurrentPos) {
        charClass = `${isCurrentCharErrorGlobal ? 'bg-red-500/30' : `${theme.accentColor.replace('text-','bg-')}/30`} rounded-sm animate-pulse px-[0.1em]`;
      } else {
        charClass = `${theme.textColor} opacity-50`; // Future characters in current word
      }
      
      if (char === ' ') { // Should not happen if word is from match(/\S+/g)
          return <span key={index} className={charClass}>&nbsp;</span>;
      }
      return (
        <span key={index} className={charClass}>
          {char}
        </span>
      );
    });
  };

  return (
    <div 
        className={`p-6 md:p-8 rounded-lg shadow-inner text-2xl md:text-3xl font-mono ${theme.glassBgClass} glassmorphism border ${theme.borderColor} ${theme.textColor} select-none relative flex items-center justify-center overflow-x-auto overflow-y-hidden min-h-[3em] max-h-[4em]`} // Adjusted min/max height for single line
        style={{ lineHeight: '1.5' }} 
    >
      {textSourceTitle && <div className={`absolute top-2 right-3 text-xs opacity-70 ${theme.textColor}`}>{textSourceTitle}</div>}
      
      <div className="flex items-center whitespace-nowrap">
        {prevWords.map((word, index) => (
          <React.Fragment key={`prev-${index}`}>
            <span className="opacity-60">{word}</span>
            <span className="opacity-60 mx-1.5">&nbsp;</span> {/* Space after previous words */}
          </React.Fragment>
        ))}

        <AnimatePresence mode="wait">
          <motion.div
            key={animationKey} // This key should change when the currentWord string itself changes
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="inline-block" // Ensure motion div doesn't cause weird spacing
          >
            {renderWordCharacters(currentWord, true)}
            {/* Blinking cursor for the current word if not fully typed or if it's the very last character to type */}
            {(typedCurrentWord.length < currentWord.length || (typedCurrentWord.length === currentWord.length && currentWord.length > 0)) && (
                <span className={`inline-block w-0.5 h-7 ml-px ${isCurrentCharErrorGlobal && typedCurrentWord.length === currentWord.length ? 'bg-red-500' : theme.accentColor.replace('text-','bg-')} animate-pulse`}></span>
            )}
          </motion.div>
        </AnimatePresence>

        {nextWords.length > 0 && <span className="opacity-50 mx-1.5">&nbsp;</span>} {/* Space before next words */}
        
        {nextWords.map((word, index) => (
          <React.Fragment key={`next-${index}`}>
            <span className="opacity-50">{word}</span>
            {index < nextWords.length - 1 && <span className="opacity-50 mx-1.5">&nbsp;</span>}
          </React.Fragment>
        ))}
      </div>

      {!currentWord && prevWords.length === 0 && nextWords.length === 0 && (
        <span className={`${theme.textColor} opacity-50`}>Loading text...</span>
      )}
    </div>
  );
};

export default TextDisplay;