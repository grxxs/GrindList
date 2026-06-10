import { useEffect, useState } from "react";
import {
  getLoggedUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../api/authApi";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const data = await getLoggedUser();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setIsAuthLoading(false);
    }
  };

  useEffect(() => {
    getLoggedUser()
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }, []);

  const login = async (loginValue, password) => {
    const data = await loginUser(loginValue, password);
    const loggedUser = await getLoggedUser();
    setUser(loggedUser.user);
    return data;
  };

  const register = async (loginValue, email, password) => {
    const data = await registerUser(loginValue, email, password);
    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthLoading, login, register, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
