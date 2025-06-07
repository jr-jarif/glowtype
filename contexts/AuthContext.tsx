
import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  signup: (name: string, email: string, password_plaintext: string, avatarFile?: File) => Promise<{ success: boolean; message: string }>;
  login: (email: string, password_plaintext: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  showEngineAnimation: boolean;
  completeLoginAnimation: () => void;
  isLoading: boolean;
  isAuthModalOpenGlobal: boolean;
  setAuthModalOpenGlobal: React.Dispatch<React.SetStateAction<boolean>>;
  authModalViewGlobal: 'login' | 'signup';
  setAuthModalViewGlobal: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ALL_USERS_STORAGE_KEY = 'glowtype-all-users';
const CURRENT_USER_SESSION_KEY = 'glowtype-current-user-session';

// Helper to read file as Data URL
const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem(ALL_USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUserSession = localStorage.getItem(CURRENT_USER_SESSION_KEY);
    return storedUserSession ? JSON.parse(storedUserSession) : null;
  });
  const [showEngineAnimation, setShowEngineAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const [isAuthModalOpenGlobal, setAuthModalOpenGlobal] = useState(false);
  const [authModalViewGlobal, setAuthModalViewGlobal] = useState<'login' | 'signup'>('login');


  useEffect(() => {
    localStorage.setItem(ALL_USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_SESSION_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_SESSION_KEY);
    }
  }, [currentUser]);

  const signup = useCallback(async (name: string, email: string, password_plaintext: string, avatarFile?: File): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      setIsLoading(false);
      return { success: false, message: "Email already exists." };
    }

    let avatarUrl: string | undefined = `https://picsum.photos/seed/${name.split(' ').join('')}/100/100`; 
    if (avatarFile) {
      try {
        avatarUrl = await readFileAsDataURL(avatarFile);
      } catch (error) {
        console.error("Error reading avatar file:", error);
        // Keep default picsum avatar if upload fails
      }
    }
    
    const newUser: User = {
      id: email.toLowerCase(), 
      name,
      email: email.toLowerCase(),
      password: password_plaintext, 
      avatarUrl,
      personalBestWpm: 0,
      averageAccuracy: 0,
      totalTestsTaken: 0,
    };

    setUsers(prevUsers => [...prevUsers, newUser]);
    setCurrentUser(newUser);
    setShowEngineAnimation(true);
    setAuthModalOpenGlobal(false); // Close modal on success
    setIsLoading(false);
    return { success: true, message: "Signup successful! Welcome!" };
  }, [users]);

  const login = useCallback(async (email: string, password_plaintext: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!foundUser) {
      setIsLoading(false);
      return { success: false, message: "User not found." };
    }

    if (foundUser.password !== password_plaintext) { 
      setIsLoading(false);
      return { success: false, message: "Incorrect password." };
    }

    setCurrentUser(foundUser);
    setShowEngineAnimation(true);
    setAuthModalOpenGlobal(false); // Close modal on success
    setIsLoading(false);
    return { success: true, message: "Login successful!" };
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setAuthModalViewGlobal('login'); // Default to login view after logout
    setAuthModalOpenGlobal(true); // Show modal after logout
  }, []);

  const completeLoginAnimation = useCallback(() => {
    setShowEngineAnimation(false);
  }, []);

  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider value={{ 
        currentUser, 
        signup, 
        login, 
        logout, 
        isAuthenticated, 
        showEngineAnimation, 
        completeLoginAnimation, 
        isLoading,
        isAuthModalOpenGlobal,
        setAuthModalOpenGlobal,
        authModalViewGlobal,
        setAuthModalViewGlobal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};