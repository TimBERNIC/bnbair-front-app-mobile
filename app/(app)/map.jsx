import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";

const Map = () => {
  const [coords, setCoords] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const askPermissionAndKeepLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();

          setCoords(location);

          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        console.log(error);
        setError(false);
      }
    };

    askPermissionAndKeepLocation();
  }, []);

  useEffect(() => {
    const getLocationsAroundMe = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around",
          {
            params: {
              latitude: 48.856614,
              longitude: 2.3522219,
              // latitude:   coords.coords.latitude, normalement ce sont ces deux la mais l'API ne gère pas hors paris
              // longitude: coords.coords.longitude,
            },
          }
        );

        setMarkers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    if (coords?.coords?.latitude && coords?.coords?.longitude) {
      getLocationsAroundMe();
    }
  }, [coords]);

  {
    useEffect(() => {
      if (error) {
        alert(
          "Veuillez accepter les conditions de géolocalisation pour la faire fonctionner"
        );
      }
    }, [error]);
  }

  return isLoading ? (
    <Text style={styles.loadingBox}>Chargement en cours...</Text>
  ) : (
    <SafeAreaView style={styles.globalMap}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}></Image>
      </View>
      <View style={styles.globalMap}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coords?.coords.latitude,
            longitude: coords?.coords.longitude,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
          }}
          showsUserLocation={true}>
          {markers.map((element) => {
            return (
              <Marker
                key={element._id}
                coordinate={{
                  latitude: element.location[1],
                  longitude: element.location[0],
                }}
                title={markers.title}
                description={markers.description}></Marker>
            );
          })}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  globalMap: {
    flex: 1,
    justifyContent: "center",
  },
  map: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    height: "100%",
  },
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
});
