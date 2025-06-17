import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Link } from "expo-router";
import { useState } from "react";
import WelcomeLogo from "../../components/WelcomeLogo";
import Input from "../../components/Input";

import RegisterButton from "../../components/RegisterButton";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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
        {success && <Text style={styles.successBox}>SignUp succed</Text>}

        <RegisterButton
          buttonName="Sign up"
          setError={setError}
          email={email}
          setEmail={setEmail}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          setSuccess={setSuccess}
          description={description}
          setDescription={setDescription}
        />
        <Link href="/sign/signIn" style={styles.linkButton}>
          No account ? Register
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  globalView: {
    marginTop: 20,
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
