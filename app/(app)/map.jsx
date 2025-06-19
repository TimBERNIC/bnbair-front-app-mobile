import { View, Text, StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";

const Map = () => {
  return (
    <View>
      <Text style={styles.globalMap}>Je suis La page map</Text>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  globalMap: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" && Constants.statusBarHeight,
    height: "100%",
  },
});
