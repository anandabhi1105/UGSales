import React, { createContext, useContext, useState } from "react";
import { registerUser } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (token) => setToken(token);
  const logout = () => setToken(null);

  const signUp = async (username, email, password, phoneNo) => {
    return await registerUser(username, email, password, "User", phoneNo);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
