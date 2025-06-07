
import React, { ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';
import GlassmorphismCard from './GlassmorphismCard'; // This will be a motion component now due to its own changes
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const modalTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const { theme } = useTheme();

  let sizeClasses = 'max-w-md'; // md
  if (size === 'sm') sizeClasses = 'max-w-sm';
  if (size === 'lg') sizeClasses = 'max-w-lg';
  if (size === 'xl') sizeClasses = 'max-w-xl';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose} // Close on backdrop click
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={modalTransition}
            className={`w-full ${sizeClasses} ${theme.textColor}`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
          >
            {/* GlassmorphismCard is already a motion.div, so it will animate with its own hover effects. 
                The motion.div wrapper here controls the modal's appearance/disappearance.
            */}
            <GlassmorphismCard className={`w-full ${theme.textColor}`}>
              <div className="flex justify-between items-center mb-4">
                {title && <h2 className={`text-2xl font-semibold ${theme.accentColor}`}>{title}</h2>}
                <button
                  onClick={onClose}
                  className={`p-1 rounded-full hover:bg-white/20 transition-colors ${theme.textColor}`}
                  aria-label="Close modal"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div>{children}</div>
            </GlassmorphismCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
