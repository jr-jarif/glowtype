import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { FaUserPlus, FaSignInAlt, FaCamera } from 'react-icons/fa';
import LoadingSpinner from '../common/LoadingSpinner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'login' }) => {
  const { signup, login, isLoading, authModalViewGlobal, setAuthModalViewGlobal } = useAuth(); // Use global view
  const { theme } = useTheme();
  
  // isLoginView is now primarily driven by authModalViewGlobal
  const isLoginView = authModalViewGlobal === 'login';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Effect to sync local state if initialView prop changes (though global state is primary)
  useEffect(() => {
    setAuthModalViewGlobal(initialView);
    resetForm(); // Reset form when view might change from prop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialView, setAuthModalViewGlobal]);
  
  useEffect(() => {
    // Reset form when the global view changes (e.g. from signup to login after no users found)
    resetForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authModalViewGlobal]);


  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarFile(undefined);
      setAvatarPreview(undefined);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAvatarFile(undefined);
    setAvatarPreview(undefined);
    setError('');
    setSuccessMessage('');
  };
  
  const handleCloseModal = () => {
    // Don't reset form here if modal is forced open; reset happens on view change or successful submit
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!isLoginView) { // Signup
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
      const result = await signup(name, email, password, avatarFile);
      if (result.success) {
        setSuccessMessage(result.message);
        // AuthContext will handle closing modal via global state change
        // setTimeout(handleCloseModal, 500); // No longer needed, AuthContext handles modal closure
      } else {
        setError(result.message);
      }
    } else { // Login
      const result = await login(email, password);
      if (result.success) {
        setSuccessMessage(result.message);
        // setTimeout(handleCloseModal, 500); // No longer needed
      } else {
        setError(result.message);
      }
    }
  };
    
  const inputClasses = `mt-1 block w-full px-3 py-2 ${theme.glassBgClass} border ${theme.borderColor} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:${theme.accentColor.replace('text-', 'ring-')} sm:text-sm ${theme.textColor} placeholder-gray-500`;
  const labelClasses = `block text-sm font-medium ${theme.textColor}`;

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} title={isLoginView ? "Login to GlowType" : "Join GlowType"} size="md">
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <LoadingSpinner text={isLoginView ? "Logging in..." : "Creating account..."} size="lg"/>
        </div>
      ) : (
      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLoginView && (
          <div>
            <label htmlFor="name" className={labelClasses}>Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClasses} placeholder="Your Name"/>
          </div>
        )}
        <div>
          <label htmlFor="email" className={labelClasses}>Email address</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClasses} placeholder="you@example.com"/>
        </div>
        <div>
          <label htmlFor="password" className={labelClasses}>Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClasses} placeholder="••••••••"/>
        </div>
        {!isLoginView && (
          <>
            <div>
              <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className={inputClasses} placeholder="••••••••"/>
            </div>
            <div>
                <label className={labelClasses}>Avatar Photo (Optional)</label>
                <div className="mt-1 flex items-center space-x-3">
                    {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar Preview" className="h-16 w-16 rounded-full object-cover" />
                    ) : (
                        <div className={`h-16 w-16 rounded-full ${theme.glassBgClass} flex items-center justify-center border ${theme.borderColor}`}>
                            <FaCamera className={`${theme.textColor} text-2xl opacity-50`} />
                        </div>
                    )}
                    <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        Upload Photo
                    </Button>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" />
                </div>
                 <p className={`text-xs ${theme.textColor} opacity-60 mt-1`}>Recommended: Square image, &lt;1MB.</p>
            </div>
          </>
        )}
        {error && <p className="text-sm text-red-400 bg-red-500/10 p-2 rounded-md">{error}</p>}
        {successMessage && <p className="text-sm text-green-400 bg-green-500/10 p-2 rounded-md">{successMessage}</p>}
        <Button type="submit" variant="primary" className="w-full !mt-6" disabled={isLoading}>
          {isLoginView ? <><FaSignInAlt className="inline mr-2"/>Login</> : <><FaUserPlus className="inline mr-2"/>Create Account</>}
        </Button>
      </form>
      )}
      {!isLoading && (
          <>
            {/* Social logins removed */}
            <div className="mt-6 text-center">
                <button 
                    onClick={() => { 
                        setAuthModalViewGlobal(isLoginView ? 'signup' : 'login');
                        // Reset form handled by useEffect listening to authModalViewGlobal
                    }} 
                    className={`text-sm ${theme.accentColor} hover:underline`}
                    disabled={isLoading}
                >
                {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </button>
            </div>
        </>
      )}
    </Modal>
  );
};

export default AuthModal;