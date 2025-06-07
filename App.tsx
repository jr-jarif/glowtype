
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';
import HomePage from './pages/HomePage';
import PracticePage from './pages/PracticePage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import GamesPage from './pages/GamesPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import AsteroidBlasterPage from './pages/games/AsteroidBlasterPage';
import EngineStartAnimation from './components/auth/EngineStartAnimation';
import AuthModal from './components/auth/AuthModal';
import LoadingSpinner from './components/common/LoadingSpinner';
import DynamicBackground from './components/common/DynamicBackground'; // Added
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 15, 
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -15, 
  },
};

const pageTransition = {
  type: 'tween', 
  ease: 'easeInOut', 
  duration: 0.35, 
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div className="page-wrap" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><HomePage /></motion.div>} />
        <Route path="/practice" element={<motion.div className="page-wrap" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><PracticePage /></motion.div>} />
        <Route path="/dashboard" element={<motion.div className="page-wrap" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><DashboardPage /></motion.div>} />
        <Route path="/settings" element={<motion.div className="page-wrap" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><SettingsPage /></motion.div>} />
        <Route path="/leaderboards" element={<motion.div className="page-wrap" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><LeaderboardsPage /></motion.div>} />
        <Route path="/games" element={<motion.div className="page-wrap" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><GamesPage /></motion.div>} />
        <Route path="/games/asteroid-blaster" element={<motion.div className="page-wrap" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><AsteroidBlasterPage /></motion.div>} />
        <Route path="/about" element={<motion.div className="page-wrap" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><AboutPage /></motion.div>} />
        <Route path="/404" element={<motion.div className="page-wrap" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><NotFoundPage /></motion.div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};


const AppContent: React.FC = () => {
  const { theme } = useTheme(); // Theme is used by DynamicBackground
  const { 
    isAuthenticated, 
    showEngineAnimation, 
    completeLoginAnimation,
    isAuthModalOpenGlobal,
    setAuthModalOpenGlobal,
    authModalViewGlobal,
    setAuthModalViewGlobal,
    isLoading
  } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !showEngineAnimation && !isLoading) {
      const storedUsers = localStorage.getItem('glowtype-all-users');
      const usersExist = storedUsers && JSON.parse(storedUsers).length > 0;
      setAuthModalViewGlobal(usersExist ? 'login' : 'signup');
      setAuthModalOpenGlobal(true);
    } else if (isAuthenticated || showEngineAnimation || isLoading) {
       if (isAuthenticated || showEngineAnimation) { 
        setAuthModalOpenGlobal(false);
      }
    }
  }, [isAuthenticated, showEngineAnimation, isLoading, setAuthModalOpenGlobal, setAuthModalViewGlobal]);

  if (showEngineAnimation) {
    return (
      <>
        <DynamicBackground /> 
        <EngineStartAnimation onAnimationComplete={completeLoginAnimation} />
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <DynamicBackground />
        <AuthModal 
          isOpen={isAuthModalOpenGlobal} 
          onClose={() => {
            setAuthModalOpenGlobal(false); 
          }} 
          initialView={authModalViewGlobal}
        />
        {!isAuthModalOpenGlobal && !isLoading && (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 fixed inset-0 z-50"> {/* Ensure this overlay is above DynamicBackground if shown */}
                <div className={`${theme.textColor} p-8 rounded-xl shadow-2xl text-center glassmorphism ${theme.glassBgClass} ${theme.borderColor} border`}>
                    <LoadingSpinner text="Authenticating..." size="lg"/>
                    <p className="mt-4 text-sm opacity-70">Please wait or refresh if stuck.</p>
                </div>
            </div>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DynamicBackground />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24 sm:pt-28">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <ThemeProvider>
          <SettingsProvider>
            <AppContent />
          </SettingsProvider>
        </ThemeProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;