import {
  Text,
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import axios from "axios";
import RoomBox from "../../../components/RoomBox";
import { Link } from "expo-router";

const Home = () => {
  const [roomsData, setRoomsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // {"__v": 0, "_id": "58ff73cc1765a99897945391",
  // "description": "Exceptional view and hypercentral are the best words to describe our apartment located in a
  // beautiful 18th century building in the heart of the Latin Quarter in front of Notre-Dame.",
  // "location": [2.3434604, 48.8534078],
  // "photos": [{"picture_id": "60541451", "url": "https://a2.muscache.com/im/pictures/60541451/7a1644c5_original.jpg"},
  // {"picture_id": "60541484", "url": "https://a2.muscache.com/im/pictures/60541484/6a88b706_original.jpg"},
  // {"picture_id": "60538379", "url": "https://a0.muscache.com/im/pictures/60538379/37f848e3_original.jpg"},
  // {"picture_id": "60539030", "url": "https://a0.muscache.com/im/pictures/60539030/8732066b_original.jpg"},
  // {"picture_id": "60536951", "url": "https://a1.muscache.com/im/pictures/60536951/d2059103_original.jpg"}],
  // "price": 480, "ratingValue": 5, "reviews": 19,
  // "title": "Exceptional apt in the Latin Quarter",
  // "user": {"__v": 0, "_id": "58ff73cc1765a998979a338e", "account": {"description": "Hello, I'm married, 2 kids, leaving in the center of Paris and loving it. I rent my own place and manage a few others. For all of
  //  them, I'll be happy to advise you on your stay in Paris, nice places, best walks to reach them, shops, restaurants..... I'll be there. See you soon in Paris.",
  //  "photo": [Object], "username": "Robert"}, "rooms": ["58ff73cc1765a99897945391", "58ff73cc1765a9979391c532"]}}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );

        setRoomsData(response.data);
        setIsLoading(false);
        // console.log(response.data[2].user.account.photo.url); ==>>> Photo de profil user
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Text>Chargement en cours...</Text>
  ) : (
    <SafeAreaView>
      <View style={styles.globalHome}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.header}></Image>
        <FlatList
          data={roomsData}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <Link href={`/room?id=${item._id}`}>
              <RoomBox
                pictures={item.photos}
                price={item.price}
                reviews={item.reviews}
                ratingValue={item.ratingValue}
                title={item.title}
                avatar={item.user.account.photo.url}
                id={item._id}
              />
            </Link>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  globalHome: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" && Constants.statusBarHeight,
    height: "100%",
  },
  header: {
    height: 50,
    width: 50,
  },
});
