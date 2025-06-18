import { createContext, useEffect, useState } from "react";
import { Stack, router } from "expo-router";

export const AuthContext = createContext();

const Layout = () => {
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const login = () => {
    console.log("login OK");
    setIsConnected(true);
  };

  const logout = () => {
    console.log("Login False");
    setIsConnected(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (isConnected) {
        router.replace("/home");
      } else {
        router.replace("/signIn");
      }
    }, 0);
  }, [isConnected]);

  return (
    <AuthContext.Provider
      value={{ userId, setUserId, userToken, setUserToken, login, logout }}>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthContext.Provider>
  );
};

export default Layout;
