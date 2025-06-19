import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState, useContext } from "react";
import { AuthContext } from "../_layout";
import WelcomeLogo from "../../components/WelcomeLogo";
import Input from "../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSucess, setLoginSucess] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const { login, userId, setUserId, userToken, setUserToken } =
    useContext(AuthContext);

  const loginFunc = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );

      const user = JSON.stringify({
        id: response.data.id,
        token: response.data.token,
      });
      await AsyncStorage.setItem("user", user);
      login();
      setUserId(response.data.id);
      setUserToken(response.data.token);
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

  return (
    <View style={styles.globalView}>
      <KeyboardAwareScrollView>
        <WelcomeLogo title="Sign in" />
        <View style={styles.inputBox}>
          <Input state={email} setState={setEmail} name="email" />
          <Input
            state={password}
            setState={setPassword}
            name="password"
            password={true}
          />
        </View>
        <View style={styles.buttonBox}>
          {loginSucess === true && (
            <Text style={styles.successBox}>Login succed</Text>
          )}

          {loginError === true && (
            <Text style={styles.errorBox}>password or account invalid</Text>
          )}
          <Button
            onPressFunc={loginFunc}
            buttonName="Sign in"
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            setLoginSucess={setLoginSucess}
            setLoginError={setLoginError}
          />
          <Text
            href="/signIn"
            style={styles.linkButton}
            onPress={() => {
              router.replace("/signUp");
            }}>
            No account ? Register
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  globalView: {
    marginTop: 100,
    gap: 100,
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
