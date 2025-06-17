import {
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import Constants from "expo-constants";

export default function HomePage() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Link href="/sign/signIn" style={styles.title}>
          Bienvenue sur BnBAir !
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" && Constants.statusBarHeight,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
