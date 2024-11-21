import { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth"; 
import { LoginFormValues } from "@/forms/login-form/LoginForm";
import { User } from "@/types/user";

type AuthContextType = {
  authToken: string | null;
  currentUser: User | null;
  handleLogin: (data: LoginFormValues) => Promise<void>;
  handleLogout: () => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: PropsWithChildren) {
  // Retrieve authToken and currentUser from localStorage
  const [authToken, setAuthToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken");
    }
    return null;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser");
      return storedUser ? JSON.parse(storedUser) : null; // Parse user data from localStorage
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null);

  // Handle login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormValues) => {
      setIsLoading(true); // Set loading to true on login attempt
      const response = await login(credentials); // Perform login API call
      return response;
    },
    onSuccess: (response) => {
      const { access_token, user } = response; // Extract access token and user
      setAuthToken(access_token);
      setCurrentUser(user); // Set current user data

      // Store authToken and user in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", access_token);
        localStorage.setItem("currentUser", JSON.stringify(user)); // Persist user as JSON
      }

      setIsLoading(false); // Reset loading state
      setError(null);
    },
    onError: (error: unknown) => {
      console.error("Login error:", error);
      handleLogout(); // Logout on login failure
      setIsLoading(false); // Reset loading state
      setError((error as Error).message || "An error occurred");
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    await loginMutation.mutateAsync(data);
  };

  const handleLogout = () => {
    setAuthToken(null);
    setCurrentUser(null); // Clear current user on logout

    // Remove authToken and user from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
    }
  };

  useEffect(() => {
    if (authToken && !currentUser) {
      // Optionally: Fetch the current user from the API using the token
      // fetchCurrentUser(authToken);
    }
  }, [authToken, currentUser]);

  const contextValue: AuthContextType = {
    authToken,
    currentUser,
    handleLogin,
    handleLogout,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside of an AuthProvider");
  }

  return context;
}
