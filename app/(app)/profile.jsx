import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../_layout";
import Constants from "expo-constants";
import Button from "../../components/Button";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Input from "../../components/Input";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const Profile = () => {
  const { logout, userId, userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/" +
              userId,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          setData(response.data);
          setPicture(response.data.photo.url);
          setDescription(response.data.description);
          setEmail(response.data.email);
          setUserName(response.data.username);
          setIsLoading(false);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    } else {
      alert("Pas d'utilisateur identifié");
    }
  }, []);
  const updateUserData = async () => {
    try {
      const response = await axios.put(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update",
        {
          email: email,
          description: description,
          username: userName,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateUserAvatarPicture = async () => {
    if (!picture) {
      alert("aucune photo sélectionnée");
      return;
    }

    const formData = new FormData();
    formData.append("photo", {
      uri: picture,
      name: "avatarPicture.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.put(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture",

        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const getPermissionAndGetPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowEditing: true,
        aspect: [1, 1],
      });

      if (result.canceled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setPicture(result.assets[0].uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  const getPermissionAndTakePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();

      if (result.canceled === true) {
        alert("Pas de photo prise");
      } else {
        setPicture(result.assets[0].uri);
      }
    } else {
      alert("permission refusée");
    }
    console.log(picture);
  };

  return isLoading ? (
    <Text style={styles.loadingStyle}>Chargement en cours... </Text>
  ) : (
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollViewStyle}>
      <SafeAreaView>
        <View style={styles.header}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}></Image>
        </View>
        <View style={styles.globalProfile}>
          <View style={styles.globalAvatarBox}>
            <View style={styles.avatarBox}>
              {picture ? (
                <Image source={{ uri: picture }} style={styles.avatar} />
              ) : (
                <FontAwesome6 name="user-large" size={85} color="#E7E7E7" />
              )}
            </View>
            <View style={styles.avatarBtnBox}>
              <TouchableOpacity onPress={getPermissionAndGetPicture}>
                <Entypo name="images" size={30} color="grey" />
              </TouchableOpacity>
              <TouchableOpacity onPress={getPermissionAndTakePicture}>
                <FontAwesome name="camera" size={30} color="grey" />
              </TouchableOpacity>
            </View>
          </View>

          <Input setState={setEmail} type="email-address" name={email} />

          <Input setState={setUserName} name={userName} />
          <TextInput
            style={styles.description}
            placeholder={description}
            multiline={true}
            textAlignVertical="top"
            onChangeText={(text) => setDescription(text)}
          />
          <Button
            buttonName="Mise à jour"
            onPressFunc={() => {
              updateUserData();
              if (picture) {
                updateUserAvatarPicture();
              }
            }}
          />
          <Button buttonName="Déconnection" onPressFunc={logout} />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
export default Profile;

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" && Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#E2E2E1",
    borderBottomWidth: 1,
  },
  logo: {
    height: 50,
    width: 50,
  },
  globalProfile: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    height: "85%",
  },
  globalAvatarBox: { flexDirection: "row" },
  avatarBtnBox: {
    justifyContent: "center",
    alignItems: "center",
    gap: 40,

    width: 70,
  },
  description: {
    borderColor: "#FFBAC0",
    borderWidth: 2,
    borderStyle: "solid",
    marginTop: 20,
    marginHorizontal: 40,
    height: 100,
    width: 350,
  },
  avatarBox: {
    borderColor: "#FFBAC0",
    borderWidth: 2,
    borderStyle: "solid",
    height: 150,
    width: 150,
    borderRadius: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: "100%",
    width: "100%",
    borderRadius: 150,
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewStyle: { justifyContent: "center", alignItems: "center" },
});
