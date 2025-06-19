import { createContext, useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const Layout = () => {
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const login = () => {
    setIsConnected(true);
  };

  const logout = () => {
    setIsConnected(false);
  };

  useEffect(() => {
    const getUserData = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const user = JSON.parse(storedUser);
      if (user.id && user.token) {
        login();
      } else {
        logout();
      }
    };
    getUserData();
  }, []);

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
