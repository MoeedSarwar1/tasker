import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  firstName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // ✅ to wait for storage check

  // Load token + user on app start
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('accessToken');
        const storedUser = await AsyncStorage.getItem('user');
        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to load auth state', error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const login = async (user: User, token: string) => {
    setUser(user);
    setToken(token);
    await AsyncStorage.setItem('accessToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
