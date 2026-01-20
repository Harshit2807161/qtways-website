import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

// Session ID for guest cart (persists in localStorage)
const getSessionId = () => {
  if (typeof window === 'undefined') return null;

  let sessionId = localStorage.getItem('qtways_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('qtways_session_id', sessionId);
  }
  return sessionId;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionId] = useState(() => getSessionId());

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check if user is authenticated
  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.user) {
          setUser(data.data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send OTP to phone
  const sendOTP = useCallback(async (phone) => {
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to send OTP');
    }

    return data;
  }, []);

  // Verify OTP and login
  const verifyOTP = useCallback(async (phone, otp) => {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp, sessionId }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Verification failed');
    }

    setUser(data.data.user);
    setIsAuthenticated(true);

    // Clear session ID after successful login (cart merged)
    localStorage.removeItem('qtways_session_id');

    return data;
  }, [sessionId]);

  // Logout
  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }

    setUser(null);
    setIsAuthenticated(false);

    // Generate new session ID
    const newSessionId = crypto.randomUUID();
    localStorage.setItem('qtways_session_id', newSessionId);
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (updates) => {
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Update failed');
    }

    setUser(prev => ({ ...prev, ...data.data.user }));
    return data;
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    sessionId,
    sendOTP,
    verifyOTP,
    logout,
    updateProfile,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
