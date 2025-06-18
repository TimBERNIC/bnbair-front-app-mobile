import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useContext } from "react";
import { AuthContext } from "../_layout";
import Constants from "expo-constants";
import Button from "../../components/Button";

const Profile = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.globalProfile}>
      <Text>Je suis la Page Profile</Text>
      <Button buttonName="Déconnection" onPressFunc={logout} />
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  globalProfile: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" && Constants.statusBarHeight,
    height: "100%",
  },
  logoutBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderColor: "blue",
    borderWidth: 2,
    borderStyle: "solid",
  },
});
