import { View, StyleSheet, Platform, SafeAreaView } from "react-native";

import Constants from "expo-constants";
import { Redirect } from "expo-router";

const Index = () => {
  return (
    <SafeAreaView>
      <View style={styles.globalIndex}>
        <Redirect href={"/sign/signIn"} />
      </View>
    </SafeAreaView>
  );
};
export default Index;

const styles = StyleSheet.create({
  globalIndex: {},
});
