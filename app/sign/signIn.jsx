import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import WelcomeLogo from "../../components/WelcomeLogo";
import Input from "../../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import RegisterButton from "../../components/RegisterButton";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSucess, setLoginSucess] = useState(false);
  const [loginError, setLoginError] = useState(false);

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
          <RegisterButton
            buttonName="Sign in"
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            setLoginSucess={setLoginSucess}
            setLoginError={setLoginError}
          />
          <Link href="/sign/signUp" style={styles.linkButton}>
            No account ? Register
          </Link>
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
