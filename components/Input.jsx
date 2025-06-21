import { View, TextInput, StyleSheet, setMultiLine } from "react-native";

const Input = ({ name, state, setState, type, password }) => {
  return (
    <TextInput
      value={state}
      onChangeText={setState}
      autoCapitalize="none"
      placeholder={name}
      style={styles.input}
      keyboardType={type ? type : "default"}
      secureTextEntry={password}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "#FFBAC0",
    borderBottomWidth: 2,
    borderStyle: "solid",
    marginHorizontal: 40,
    height: 40,
    width: 350,
  },
});

export default Input;
