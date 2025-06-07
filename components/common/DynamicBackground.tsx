
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface MatrixRainStreamProps {
  height: number;
  uniqueKey: string | number;
  initialDelay: number;
}

const MatrixRainStream: React.FC<MatrixRainStreamProps> = ({ height, uniqueKey, initialDelay }) => {
  const streamLength = Math.floor(Math.random() * 10) + 10; // 10-19 characters
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモョロヲゴゾドボポヴッン";
  
  return (
    <div
      key={uniqueKey}
      className="absolute text-xs md:text-sm leading-tight"
      style={{
        top: `${Math.random() * -50}vh`, // Start off-screen above
        left: `${Math.random() * 100}vw`,
        height: `${height}px`,
        animation: `matrixRainFall ${Math.random() * 3 + 4}s linear ${initialDelay}s infinite`,
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        filter: `hue-rotate(${Math.random() * 60 - 30}deg)`, // Slight color variation
        transform: `scaleY(${1 + Math.random() * 0.5})`, // Vary stream height a bit
      }}
    >
      {Array.from({ length: streamLength }).map((_, i) => (
        <span
          key={i}
          style={{
            color: `rgba(180, 220, 180, ${Math.random() * 0.5 + 0.3})`, // Varying green-ish opacity
            opacity: (streamLength - i) / streamLength, // Fades towards tail
            fontWeight: Math.random() > 0.8 ? 'bold' : 'normal',
          }}
        >
          {characters.charAt(Math.floor(Math.random() * characters.length))}
        </span>
      ))}
    </div>
  );
};


const DynamicBackground: React.FC = () => {
  const { theme } = useTheme();
  const numStreams = 50; // Adjust for performance vs density

  return (
    <div className="fixed inset-0 -z-20"> {/* Ensure it's behind everything */}
      {/* Gradient Background - Always present */}
      <motion.div
        key="gradient-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.3 }} 
        className="absolute inset-0 animated-gradient"
        style={{ background: theme.gradient }}
      />

      {/* Matrix Rain Background - Always present on top of gradient */}
      <motion.div
        key="matrix-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 overflow-hidden filter blur-[1px]" 
      >
        {Array.from({ length: numStreams }).map((_, index) => (
          <MatrixRainStream 
            key={`stream-${index}`} 
            uniqueKey={`stream-inner-${index}`}
            height={Math.random() * 300 + 200} 
            initialDelay={Math.random() * 2} // Stagger start times
          />
        ))}
      </motion.div>
    </div>
  );
};

export default DynamicBackground;
