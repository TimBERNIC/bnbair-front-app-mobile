import { View, Text, StyleSheet, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { useState, useContext } from "react";
import { AuthContext } from "../_layout";
import WelcomeLogo from "../../components/WelcomeLogo";
import Input from "../../components/Input";
import axios from "axios";
import Button from "../../components/Button";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [logError, setLogError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { login } = useContext(AuthContext);

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

        const user = JSON.stringify({
          id: response.data.id,
          token: response.data.token,
        });
        await AsyncStorage.setItem("user", user);
        login();
        setSuccess(true);
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setDescription("");
        setError(false);
        setLogError(false);
      } catch (error) {
        console.log(error.response);
        setSuccess(false);
        setLogError(true);
        setError(false);
      }
    } else {
      setSuccess(false);
      setError(true);
      setLogError(false);
    }
  };

  return (
    <View style={styles.globalView}>
      <KeyboardAwareScrollView>
        <WelcomeLogo title="Sign up" />
        <View style={styles.inputBox}>
          <Input
            state={email}
            setState={setEmail}
            name="email"
            type="email-address"
          />
          <Input state={username} setState={setUsername} name="username" />
          <TextInput
            style={styles.description}
            placeholder="Describe yourself in a few words..."
            multiline={true}
            textAlignVertical="top"
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
          />

          <Input
            state={password}
            setState={setPassword}
            name="password"
            password={true}
          />
          <Input
            state={confirmPassword}
            setState={setConfirmPassword}
            name="confirm password"
            password={true}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.buttonBox}>
        {error && (
          <Text style={styles.errorBox}>
            Passwords must be the same and to have at least 8 caracters
          </Text>
        )}
        {logError && (
          <Text style={styles.errorBox}>
            Error Server, Maybe Username or email already exist.
          </Text>
        )}
        {success && <Text style={styles.successBox}>SignUp succed</Text>}

        <Button onPressFunc={register} buttonName="Sign up" />
        <Text
          href="/signIn"
          style={styles.linkButton}
          onPress={() => {
            router.replace("/signIn");
          }}>
          Already have an account ? Login !
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  globalView: {
    marginTop: 50,
    gap: 20,
  },
  inputBox: {
    gap: 20,
  },
  buttonBox: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  linkButton: {
    color: "grey",
  },
  description: {
    borderColor: "#FFBAC0",
    borderWidth: 2,
    borderStyle: "solid",
    marginTop: 20,
    marginHorizontal: 40,
    height: 100,
  },
  errorBox: {
    color: "red",
    marginHorizontal: 40,
    textAlign: "center",
  },
  successBox: {
    color: "green",
    marginHorizontal: 40,
    textAlign: "center",
  },
});
