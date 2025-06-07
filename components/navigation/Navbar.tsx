import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
// AuthModal instance removed from here, it's global now
import { NAV_LINKS } from '../../constants';
import { FaBars, FaTimes, FaSignInAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const { isAuthenticated, currentUser, logout, setAuthModalOpenGlobal, setAuthModalViewGlobal } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${theme.textColor} ${isActive ? `${theme.accentColor} font-bold border-b-2 ${theme.borderColor.replace('border-','border-b-')}` : `hover:${theme.accentColor} transition-colors duration-200`}`;
  
  const mobileLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `block px-3 py-2 rounded-md text-base font-medium ${theme.textColor} ${isActive ? `${theme.accentColor} ${theme.glassBgClass}` : `hover:${theme.accentColor} transition-colors duration-200`}`;

  const handleAuthAction = (view: 'login' | 'signup') => {
    setAuthModalViewGlobal(view);
    setAuthModalOpenGlobal(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 glassmorphism ${theme.glassBgClass} ${theme.borderColor} border-b shadow-lg`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className={`text-3xl font-bold ${theme.accentColor} hover:opacity-80 transition-opacity`}>
                GlowType
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {NAV_LINKS.map(link => (
                <NavLink key={link.name} to={link.path} className={linkClasses}>
                   <motion.div className="flex items-center space-x-1.5" whileHover={{scale: 1.05}} transition={{type: 'spring', stiffness: 400, damping:10}}>
                    <link.icon />
                    <span>{link.name}</span>
                   </motion.div>
                </NavLink>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated && currentUser ? (
                <>
                  {currentUser.avatarUrl && <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover border-2 border-opacity-50" style={{borderColor: theme.accentColorHex}}/>}
                  <span className={`${theme.textColor} text-sm`}>Hi, {currentUser.name}!</span>
                  <Button onClick={logout} variant="outline" size="sm">Logout</Button>
                </>
              ) : (
                <Button onClick={() => handleAuthAction('login')} variant="primary" size="sm">
                  <FaSignInAlt className="inline mr-1.5"/> Join / Login
                </Button>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${theme.textColor} p-2 rounded-md hover:${theme.accentColor} focus:outline-none`}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className={`md:hidden ${theme.glassBgClass} border-t ${theme.borderColor}`}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {NAV_LINKS.map(link => (
                  <NavLink key={link.name} to={link.path} className={mobileLinkClasses} onClick={()=>setIsMobileMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <link.icon />
                      <span>{link.name}</span>
                    </div>
                  </NavLink>
                ))}
                <div className={`pt-4 pb-3 border-t ${theme.borderColor}`}>
                  {isAuthenticated && currentUser ? (
                    <div className="flex items-center px-3 mb-3">
                       {currentUser.avatarUrl && <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-opacity-50" style={{borderColor: theme.accentColorHex}}/>}
                      <div>
                          <div className={`${theme.textColor} text-base font-medium`}>{currentUser.name}</div>
                          <div className={`${theme.textColor} text-xs opacity-70`}>{currentUser.email}</div>
                      </div>
                    </div>
                  ) : null}
                  <div className="mt-1 px-2 space-y-2">
                    {isAuthenticated && currentUser ? (
                       <Button onClick={() => { logout(); setIsMobileMenuOpen(false); }} variant="secondary" size="sm" className="w-full">Logout</Button>
                    ) : (
                      <>
                      <Button onClick={() => handleAuthAction('login')} variant="primary" size="sm" className="w-full">
                        Login
                      </Button>
                       <Button onClick={() => handleAuthAction('signup')} variant="outline" size="sm" className="w-full">
                        Sign Up
                      </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;