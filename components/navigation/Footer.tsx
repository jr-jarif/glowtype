
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={`py-8 ${theme.glassBgClass} glassmorphism border-t ${theme.borderColor} mt-12`}>
      <div className="container mx-auto px-4 text-center ${theme.textColor} text-sm">
        <p>&copy; {new Date().getFullYear()} GlowType. All rights reserved. </p>
        <p className="mt-1">Experience the Future of Typing.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`hover:${theme.accentColor} transition-colors`} aria-label="GitHub">
            <FaGithub size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`hover:${theme.accentColor} transition-colors`} aria-label="Twitter">
            <FaTwitter size={24} />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className={`hover:${theme.accentColor} transition-colors`} aria-label="Discord">
            <FaDiscord size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
