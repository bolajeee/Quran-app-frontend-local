import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useTheme } from "./themeContext";
import { Ionicons } from "@expo/vector-icons";

const LocationComponent = ({ onLocationUpdate }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // Pass location to parent component
      if (onLocationUpdate) {
        onLocationUpdate(location);
      }

      // Get address from coordinates
      let addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (addressResponse.length > 0) {
        const addr = addressResponse[0];
        setAddress(`${addr.city}, ${addr.region}`);
      }
    })();
  }, []);

  let text = "Loading...";
  if (errorMsg) {
    text = errorMsg;
  } else if (address) {
    text = address;
  }

  return (
    <View style={styles.container}>
      <Ionicons name="location-outline" size={20} color={theme.textColor} />
      <Text style={[styles.locationText, { color: theme.textColor }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  locationText: {
    fontSize: 16,
  },
});

export default LocationComponent;
