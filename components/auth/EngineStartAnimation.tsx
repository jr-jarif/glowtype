
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { FaCog } from 'react-icons/fa';

interface EngineStartAnimationProps {
  onAnimationComplete: () => void;
}

const EngineStartAnimation: React.FC<EngineStartAnimationProps> = ({ onAnimationComplete }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 2800); // Animation duration + a slight buffer
    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: 0.3}}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="engine-start-title"
    >
      <motion.div
        animate={{ rotate: [0, -360] }} // Changed rotation direction for variety
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={`text-7xl ${theme.accentColor} mb-8`}
      >
        <FaCog />
      </motion.div>
      <motion.h2
        id="engine-start-title"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={`text-4xl font-bold ${theme.textColor} mb-4`}
      >
        Igniting Engines...
      </motion.h2>
      <motion.div
        className="w-1/2 md:w-1/3 lg:w-1/4 h-2.5 bg-gray-700 rounded-full overflow-hidden mt-4 shadow-lg"
      >
        <motion.div
          className={`h-full ${theme.accentColor.replace('text-', 'bg-')}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: "circOut", delay: 0.2 }}
        />
      </motion.div>
       <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className={`mt-6 text-sm ${theme.textColor} opacity-70`}
      >
        Preparing your GlowType experience!
      </motion.p>
    </motion.div>
  );
};

export default EngineStartAnimation;