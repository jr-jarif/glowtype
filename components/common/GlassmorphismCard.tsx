
import React, { ReactNode } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  initialTranslateZ?: number; // For initial 3D positioning
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({ children, className = '', onClick, initialTranslateZ = 0 }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`glassmorphism ${theme.glassBgClass} ${theme.borderColor} border rounded-xl p-6 shadow-xl transition-shadow duration-300 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={{ 
        transformStyle: "preserve-3d", 
        transform: `translateZ(${initialTranslateZ}px)` 
      }}
      onClick={onClick}
      whileHover={onClick || className.includes("hover:scale-") ? { 
        scale: 1.02, // Slightly reduced scale
        y: -4,    // Slightly reduced lift
        z: 10,    // Reduced Z pop
        // rotateX: 0, // Removed X rotation
        // rotateY: 0, // Removed Y rotation
        boxShadow: "0px 15px 25px rgba(0,0,0,0.25)" // Adjusted shadow
      } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 25 }} // Adjusted spring for quicker response
    >
      {children}
    </motion.div>
  );
};

export default GlassmorphismCard;
