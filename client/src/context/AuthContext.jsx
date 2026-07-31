import { createContext, useContext, useEffect, useState } from "react";
import { getToken, removeToken, saveToken } from "../utils/token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = getToken();

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (token, user) => {
    saveToken(token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    removeToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => useContext(AuthContext);