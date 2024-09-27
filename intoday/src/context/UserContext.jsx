import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext"
import { useServer } from "../api/server"

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useAuth()
  const [haveUserData, setHaveUserData] = useState(false);
  const server = useServer()

  const getUserData = async () => {
    try {
      const response = await server.get("/auth")
      setHaveUserData(response.data ? true : false)
      console.log(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserData()
    }
  }, [token])

  return (
    <UserContext.Provider value={{ haveUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext)
};
