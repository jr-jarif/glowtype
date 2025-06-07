import React, { ReactNode } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimationDefinition } from 'framer-motion'; // Added AnimationDefinition for potential future use if exposing motion's onAnimationStart

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  // glowEffect prop is now handled internally by primary variant
  // If you need to expose Framer Motion's onAnimationStart, its type would be:
  // onMotionAnimationStart?: (definition: AnimationDefinition) => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onAnimationStart, // Destructure to prevent it from being passed in ...restProps if it's the HTML attribute version
  onDragStart, // Destructure to prevent conflict with Framer Motion's onDragStart
  ...restProps // Use restProps for other HTML attributes
}) => {
  const { theme } = useTheme();

  const baseStyles = 'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ease-in-out relative overflow-hidden';
  
  let sizeStyles = '';
  switch (size) {
    case 'sm': sizeStyles = 'px-3 py-1.5 text-sm'; break;
    case 'md': sizeStyles = 'px-5 py-2.5 text-base'; break;
    case 'lg': sizeStyles = 'px-7 py-3 text-lg'; break;
  }

  let variantStyles = '';
  const glowColorBase = theme.accentColorHex ? `${theme.accentColorHex}40` : 'rgba(128,128,128,0.25)';
  const glowColorHover = theme.accentColorHex ? `${theme.accentColorHex}80` : 'rgba(128,128,128,0.5)';
  let motionShadowInitial = `0 0 8px 0px ${glowColorBase}`;
  let motionShadowHover = `0 0 15px 3px ${glowColorHover}`;


  switch (variant) {
    case 'primary':
      variantStyles = `${theme.buttonClasses.split(' ').filter(c => !c.startsWith('shadow-')).join(' ')}`; // Remove static shadow from constants
      break;
    case 'secondary':
      variantStyles = `bg-gray-500 hover:bg-gray-600 text-white`;
      motionShadowInitial = `0 0 8px 0px rgba(107, 114, 128, 0.3)`; // Greyish glow for secondary
      motionShadowHover = `0 0 15px 3px rgba(107, 114, 128, 0.6)`;
      break;
    case 'outline':
      variantStyles = `${theme.borderColor} border-2 ${theme.textColor} hover:${theme.glassBgClass.replace('10', '20')} hover:${theme.accentColor}`;
      motionShadowInitial = `0 0 8px 0px ${theme.borderColor.startsWith('border-') ? theme.borderColor.replace('border-', '').split('/')[0] + '33' : 'rgba(128,128,128,0.25)'}`;
      motionShadowHover = `0 0 15px 3px ${theme.borderColor.startsWith('border-') ? theme.borderColor.replace('border-', '').split('/')[0] + '66' : 'rgba(128,128,128,0.5)'}`;
      break;
  }

  return (
    <motion.button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      style={{
        boxShadow: motionShadowInitial, // Initial glow
      }}
      whileHover={{ 
        scale: 1.03, 
        y: -3,
        boxShadow: motionShadowHover, // Hover glow
      }}
      whileTap={{ 
        scale: 0.97, 
        y: 1,
        boxShadow: motionShadowInitial, // Briefly revert to base glow on tap for "press" feel
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 350, 
        damping: 20,
        boxShadow: { duration: 0.2 }, // Faster shadow transition
      }}
      {...restProps} // Spread the remaining props here
    >
      {/* Shine Element */}
      <motion.span
        className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
        style={{
          background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
          transform: 'skewX(-25deg) translateX(-150%)', // Start off-screen
          opacity: 0.6,
        }}
        variants={{
          hover: { 
            translateX: '250%', // Move across the button
            transition: { duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] } 
          },
          initial: { 
            translateX: '-150%',
            transition: { duration: 0.01 } // Reset instantly
          }
        }}
        initial="initial"
        whileHover="hover" 
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;