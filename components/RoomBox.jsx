import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

import Entypo from "@expo/vector-icons/Entypo";

const RoomBox = ({ pictures, title, price, reviews, ratingValue, avatar }) => {
  const stars = () => {
    const starTab = [];
    for (let i = 0; i < ratingValue; i++) {
      starTab.push(
        <Entypo key={"ys" + i} name="star" size={24} color="#FFB100" />
      );
    }
    for (let i = 0; i < 5 - ratingValue; i++) {
      starTab.push(
        <Entypo key={"gs" + i} name="star" size={24} color="grey" />
      );
    }

    return starTab;
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxPicture}>
        <ScrollView horizontal style={styles.scrollBox}>
          {pictures.map((picture, index) => (
            <Image
              key={index}
              source={{ uri: picture.url }}
              style={styles.roomPicture}
            />
          ))}
        </ScrollView>
        <Text style={styles.roomPrice}>{price} €</Text>
      </View>
      <View style={styles.roomUnderbox}>
        <View style={styles.roomUnderboxDetails}>
          <Text style={styles.roomTitle}>{title}</Text>
          <View style={styles.ratingBox}>
            <View style={styles.stars}>{stars()}</View>
            <Text style={styles.reviewsNb}>{reviews} reviews</Text>
          </View>
        </View>
        <Image style={styles.avatar} source={{ uri: avatar }} />
      </View>
    </View>
  );
};

export default RoomBox;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  boxPicture: { position: "relative", width: 400 },
  scrollBox: {
    height: 200,
  },
  roomPicture: {
    width: 390,
    height: "100%",
    marginRight: 10,
  },

  roomPrice: {
    width: 100,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 22,
    backgroundColor: "black",
    position: "absolute",
    top: 130,
    left: 0,
  },
  roomUnderbox: {
    flexDirection: "row",
    width: 400,
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#E7E7E7",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  roomUnderboxDetails: {
    justifyContent: "center",
    alignItems: "flex-start",

    gap: 10,
    width: 280,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  ratingBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  roomTitle: { fontSize: 20 },

  reviewsNb: { fontSize: 14, color: "grey" },

  stars: { flexDirection: "row" },
});
