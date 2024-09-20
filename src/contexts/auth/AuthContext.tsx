import { getUser, login } from '@/api/auth';
import { LoginFormValues } from '@/forms/login-form/LoginForm';
import { User } from '@/types/user';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContext = {
  authToken?: string | null;
  currentUser?: User | null;
  handleLogin: (data: LoginFormValues) => Promise<void>; // Accepts LoginFormValues
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>();
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
  const fetchUser= async() => {
      try {
        const response = await getUser();

        const { authToken, user } = response[1];

        setAuthToken(authToken);
        setCurrentUser(user);
      } catch {
        setAuthToken(null);
        setCurrentUser(null);
      }
    }

    fetchUser();
  }, []);
  async function handleLogin(data: LoginFormValues) {
    try {
      const response = await login(data); // Pass the login data (email and password)
  
      const { authToken, user } = response[1];
  
      setAuthToken(authToken);
      setCurrentUser(user);
    } catch {
      setAuthToken(null);
      setCurrentUser(null);
      throw new Error('Invalid credentials');
    }
  }

  async function handleLogout() {
    setAuthToken(null);
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used inside of a AuthProvider');
  }

  return context;
}