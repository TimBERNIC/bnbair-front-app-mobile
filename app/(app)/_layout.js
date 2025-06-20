import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

const AppLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: () => {
            return <AntDesign name="home" size={24} color="black" />;
          },
        }}
        screenOptions={{ headerShown: false }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "map",
          tabBarIcon: () => {
            return <Feather name="map" size={24} color="black" />;
          },
        }}
        screenOptions={{ headerShown: false }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => {
            return <AntDesign name="user" size={24} color="black" />;
          },
        }}
        screenOptions={{ headerShown: false }}
      />
    </Tabs>
  );
};

export default AppLayout;
