
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useSettings } from '../../contexts/SettingsContext';
import { KEYBOARD_LAYOUTS } from '../../constants'; 
import { KeyDefinition, KeyboardLayoutMap } from '../../types';
import { motion } from 'framer-motion';

interface KeyboardProps {
  lastPressedKey: string | null; 
  expectedKeyChar?: string | null; 
  isErrorState?: boolean; 
}

const Key: React.FC<{ keyDef: KeyDefinition; isActive: boolean; isError: boolean; isExpected: boolean }> = ({ keyDef, isActive, isError, isExpected }) => {
  const { theme } = useTheme();
  let displayChar = keyDef.base;
  if (keyDef.base.toLowerCase() === 'shift' || keyDef.base.toLowerCase() === 'ctrl' || keyDef.base.toLowerCase() === 'alt' || keyDef.base.toLowerCase() === 'win' || keyDef.base.toLowerCase() === 'menu') {
    displayChar = keyDef.base;
  } else if (keyDef.base.length > 1 && keyDef.base !== 'Space') { 
     displayChar = keyDef.base.length > 4 ? keyDef.base.substring(0,3) + '.' : keyDef.base;
  }

  const baseKeyClasses = `flex items-center justify-center h-10 md:h-11 m-0.5 rounded shadow-md transition-colors duration-100`;
  
  let keyStateClasses = '';
  let motionProps = {};

  if (isActive) {
    motionProps = { scale: 0.95, y: 1 }; // Simplified: removed z: -3
    if (isError) {
      keyStateClasses = 'bg-red-600 text-white ring-1 ring-red-500 brightness-90'; 
    } else {
      keyStateClasses = `${theme.kbdActiveBgClass.replace('80','90')} ${theme.kbdActiveTextClass} ring-1 ${theme.accentColor.replace('text-','ring-')} brightness-90`; 
    }
  } else if (isExpected && isError) { 
     keyStateClasses = `ring-2 ring-yellow-400 ${theme.kbdBgClass} ${theme.kbdTextClass} opacity-90`; 
  } else {
    keyStateClasses = `${theme.kbdBgClass} ${theme.kbdTextClass} hover:brightness-110`;
  }

  return (
    <motion.div
      className={`${baseKeyClasses} ${keyStateClasses}`}
      style={{ flexGrow: keyDef.grow || 1 }}
      title={keyDef.base}
      initial={{y:0}} // Removed z:0 as z is no longer animated
      animate={motionProps}
      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
    >
      <span className="text-[0.6rem] sm:text-[0.7rem] font-medium truncate px-0.5">{displayChar}</span>
    </motion.div>
  );
};

const Keyboard: React.FC<KeyboardProps> = ({ lastPressedKey, expectedKeyChar, isErrorState }) => {
  const { settings } = useSettings();
  const { theme } = useTheme();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const currentLayoutMap: KeyboardLayoutMap = KEYBOARD_LAYOUTS.find(l => l.id === settings.selectedLayout)?.map || KEYBOARD_LAYOUTS[0].map;
  
  useEffect(() => {
    if (lastPressedKey) {
      setActiveKey(lastPressedKey);
      const timer = setTimeout(() => setActiveKey(null), 150); // Slightly reduced timeout
      return () => clearTimeout(timer);
    }
  }, [lastPressedKey]);
  
  let expectedKeyCode: string | null = null;
  if (expectedKeyChar && isErrorState) {
    for (const row of currentLayoutMap) {
      for (const keyDef of row) {
        if (keyDef.base === expectedKeyChar.toLowerCase() || keyDef.shift === expectedKeyChar) {
          expectedKeyCode = keyDef.code;
          break;
        }
      }
      if (expectedKeyCode) break;
    }
     if (expectedKeyChar === ' ' && !expectedKeyCode) expectedKeyCode = 'Space';
  }

  return (
    <div 
      className={`p-1 sm:p-1.5 rounded-lg shadow-inner ${theme.glassBgClass} glassmorphism border ${theme.borderColor}`}
      // Removed transformStyle and perspective as individual key 3D effects are simplified
    >
      {currentLayoutMap.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {row.map((keyDef) => (
            <Key
              key={keyDef.code + (keyDef.base === 'Shift' && row.indexOf(keyDef) > row.length / 2 ? 'Right' : '')} 
              keyDef={keyDef}
              isActive={activeKey === keyDef.code}
              isError={!!(activeKey === keyDef.code && isErrorState)}
              isExpected={!!(expectedKeyCode === keyDef.code && isErrorState)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
