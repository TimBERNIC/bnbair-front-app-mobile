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

const Room = () => {
  const { id } = useLocalSearchParams();
  const [roomData, setRoomData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [boxClosed, setBoxClosed] = useState(true);

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
    <Text>Chargement en cours</Text>
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
        <View style={styles.mapBox}></View>
      </View>
    </SafeAreaView>
  );
};

// {"__v": 0, "_id": "58ff73cc1765a9979391c532", "description": "Apartment refurbished full of charm rue du Recherches-Midi,
// in the heart of the 6th arrondissement. Close to Luxembourg and the Bon Marché. Two bedrooms, sublime view of the Eiffel
// Tower, 2 balconies, very nice bathroom with separate WC. Open equipped kitchen, sofa bed, wifi ... A dream!",
// "location": [2.3215788, 48.8480923], "photos": [{"picture_id": "a560cdc0",
// "url": "https://a2.muscache.com/im/pictures/a560cdc0-425d-4d7b-ab8a-f98481eeb23f.jpg"},
// {"picture_id": "38eb9bfe", "url": "https://a2.muscache.com/im/pictures/38eb9bfe-bd03-4c21-a3b8-4d3c8e44c4c9.jpg"},
//  {"picture_id": "3e3b2eda", "url": "https://a2.muscache.com/im/pictures/3e3b2eda-f99f-4ac3-94dd-3c3dc8f80c7a.jpg"},
// {"picture_id": "25308387", "url": "https://a2.muscache.com/im/pictures/25308387-a29c-4442-b927-39f2bd9c0e6f.jpg"},
// {"picture_id": "db9f14c0", "url": "https://a2.muscache.com/im/pictures/db9f14c0-e7bc-4d2c-a87a-3f8ed0dce7ff.jpg"}],
// "price": 200, "ratingValue": 4, "reviews": 48, "title": "View of the Eiffel Tower in Saint Germain!",
// "user": {"__v": 0, "_id": "58ff73cc1765a998979a338f",
// "account": {"description": "In the center of Paris, you will find on the 4th floor of a typical Parisian building a very nice flat with all necessary equipment.", "photo": [Object], "username": "Lucy"}, "rooms": ["58ff73cc1765a998979a3391"]}}
export default Room;
const styles = StyleSheet.create({
  globalRoomBox: {
    height: "100%",
    alignItems: "center",
    paddingTop: Platform.OS === "Android" && Constants.statusBarHeight,
  },
  header: {
    height: 50,
    width: 50,
  },
  mapBox: {
    height: 400,
    width: 400,
    borderColor: "blue",
    borderWidth: 2,
    borderStyle: "solid",
  },
});
