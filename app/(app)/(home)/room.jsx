import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import RoomBox from "../../../components/RoomBox";
import MapView, { Marker } from "react-native-maps";

const Room = () => {
  const { id } = useLocalSearchParams();
  const [roomData, setRoomData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [boxClosed, setBoxClosed] = useState(true);

  console.log(roomData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/" + id
        );
        setRoomData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  const { photos, title, price, reviews, ratingValue, user } = roomData;

  return isLoading ? (
    <Text style={styles.loadingStyle}>Chargement en cours</Text>
  ) : (
    <SafeAreaView>
      <View style={styles.globalRoomBox}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.header}></Image>
        <RoomBox
          pictures={photos}
          title={title}
          price={price}
          reviews={reviews}
          ratingValue={ratingValue}
          avatar={user.account.photo.url}
        />
        <Text
          style={styles.descriptionBox}
          numberOfLines={boxClosed ? 3 : 100}
          onPress={() => {
            setBoxClosed(!boxClosed);
          }}>
          {roomData.description}
        </Text>
        <View>
          <MapView
            style={styles.mapBox}
            initialRegion={{
              latitude: roomData.location[1],
              longitude: roomData.location[0],
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            showsUserLocation={false}>
            <Marker
              Marker
              key={roomData._id}
              coordinate={{
                latitude: roomData.location[1],
                longitude: roomData.location[0],
              }}
              title={roomData.title}
              description={roomData.description}
            />
          </MapView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Room;

const styles = StyleSheet.create({
  globalRoomBox: {
    height: "100%",
    alignItems: "center",
    paddingTop: Platform.OS === "android" && Constants.statusBarHeight,
  },
  header: {
    height: 50,
    width: 50,
  },
  mapBox: {
    marginTop: 20,
    height: 300,
    width: 400,
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
