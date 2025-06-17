import { View, Text, Image, StyleSheet } from "react-native";

const WelcomeLogo = ({ title }) => {
  return (
    <View style={styles.WelcomeLogo}>
      <Image source={require("../assets/logo.png")} style={styles.logo}></Image>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default WelcomeLogo;

const styles = StyleSheet.create({
  WelcomeLogo: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  logo: {
    height: 150,
    width: 150,
  },
  title: {
    fontSize: 25,
    color: "grey",
    fontWeight: "bold",
  },
});
