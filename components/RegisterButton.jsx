import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

const RegisterButton = ({
  buttonName,
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  description,
  setDescription,
  setError,
  setSuccess,
  setLoginSucess,
  setLoginError,
}) => {
  const login = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );

      console.log(response.data);
      setLoginError(false);
      setLoginSucess(true);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.response);
      setLoginSucess(false);
      setLoginError(true);
    }
  };

  const register = async () => {
    if (password === confirmPassword && password.length > 7) {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
          {
            email: email,
            username: username,
            description: description,
            password: password,
          }
        );

        console.log(response.data);

        setSuccess(true);
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setDescription("");
        setError(false);
      } catch (error) {
        console.log(error.response);
        setSuccess(false);
        setError(true);
      }
    } else {
      setSuccess(false);
      setError(true);
    }
  };
  return (
    <TouchableOpacity
      style={styles.buttonBox}
      onPress={
        buttonName === "Sign up"
          ? register
          : buttonName === "Sign in"
          ? login
          : null
      }>
      <Text style={styles.buttonText}>{buttonName}</Text>
    </TouchableOpacity>
  );
};

export default RegisterButton;
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
