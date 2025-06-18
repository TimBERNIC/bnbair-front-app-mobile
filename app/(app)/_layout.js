import { Tabs } from "expo-router";

const AppLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="map"
        options={{
          title: "map",
        }}
        screenOptions={{ headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
        screenOptions={{ headerShown: false }}
      />
    </Tabs>
  );
};

export default AppLayout;
