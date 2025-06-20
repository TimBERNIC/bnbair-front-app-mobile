import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

import RatingBox from "./RatingBox";

const RoomBox = ({ pictures, title, price, reviews, ratingValue, avatar }) => {
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
        <View style={styles.roomPriceBox}>
          <Text style={styles.roomPrice}>{price} €</Text>
        </View>
      </View>
      <View style={styles.roomUnderbox}>
        <View style={styles.roomUnderboxDetails}>
          <Text style={styles.roomTitle}>{title}</Text>

          <RatingBox ratingValue={ratingValue} reviews={reviews} />
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
  roomPriceBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 50,
    top: 130,
    left: 0,
    position: "absolute",
    backgroundColor: "black",
  },
  roomPrice: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 22,
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
  roomTitle: { fontSize: 20 },
});
