import { View, TextInput, StyleSheet, setMultiLine } from "react-native";

const Input = ({ name, state, setState, type, password }) => {
  console.log(state?.toString?.());
  return (
    <TextInput
      value={state}
      onChangeText={(text) => {
        setState(text);
      }}
      placeholder={name}
      style={styles.input}
      keyboardType={type ? type : "default"}
      secureTextEntry={!!password}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "#FFBAC0",
    borderBottomWidth: 2,
    borderStyle: "solid",
    marginHorizontal: 40,
    height: 50,
  },
});

export default Input;
