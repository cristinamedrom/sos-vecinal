import { useState, useEffect, createContext, useContext } from 'react';
import { isUserLoggedIn } from "../service/auth";
import { useQueryClient, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: isUserLoggedIn,
  });

  useEffect(() => {
    if (data?.user) {
      setCurrentUser(data?.user);
    } else {
      setCurrentUser(null);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
};
