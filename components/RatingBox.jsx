import { View, Text, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

const RatingBox = ({ ratingValue, reviews }) => {
  const stars = () => {
    const starTab = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        starTab.push(
          <Entypo key={"ys" + i} name="star" size={24} color="#FFB100" />
        );
      } else
        starTab.push(
          <Entypo key={"gs" + i} name="star" size={24} color="grey" />
        );
    }

    return starTab;
  };

  return (
    <View style={styles.ratingBox}>
      <View style={styles.stars}>{stars()}</View>
      <Text style={styles.reviewsNb}>{reviews} reviews</Text>
    </View>
  );
};

export default RatingBox;

const styles = StyleSheet.create({
  ratingBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  reviewsNb: { fontSize: 14, color: "grey" },

  stars: { flexDirection: "row" },
});
