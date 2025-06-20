import { createContext, useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const Layout = () => {
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const login = () => {
    setIsConnected(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setIsConnected(false);
    router.replace("/signIn");
  };

  useEffect(() => {
    const getUserData = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const user = JSON.parse(storedUser);
      if (user.id && user.token) {
        setUserId(user.id);
        setUserToken(user.token);
        login();
      } else {
        logout();
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (isConnected) {
      router.replace("/home");
    } else if (userId === "" && userToken === "") {
      router.replace("/signIn");
    }
  }, [isConnected]);

  return (
    <AuthContext.Provider
      value={{ userId, setUserId, userToken, setUserToken, login, logout }}>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthContext.Provider>
  );
};

export default Layout;
