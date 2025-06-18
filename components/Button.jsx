import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

const Button = ({ onPressFunc, buttonName }) => {
  return (
    <TouchableOpacity style={styles.buttonBox} onPress={onPressFunc}>
      <Text style={styles.buttonText}>{buttonName}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonBox: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#EB5A62",
    borderWidth: 3,
    borderStyle: "solid",
    borderRadius: 30,
    height: 60,
    width: 200,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#717171",
    fontWeight: "bold",
  },
});
