import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token"); // Tokenni localStorage dan olish
  });

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken); // Tokenni localStorage ga saqlash
  };

  return (
    <AuthContext.Provider value={{ token, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
