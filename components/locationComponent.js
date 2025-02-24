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
    // If location is already set, do not run the effect again.
    if (location) return;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Get the current location
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      // Notify parent component of the location update
      if (onLocationUpdate) {
        onLocationUpdate(loc);
      }

      // Get address from coordinates
      let addressResponse = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (addressResponse.length > 0) {
        const addr = addressResponse[0];
        setAddress(`${addr.city}, ${addr.region}`);
      }
    })();
  }, [location]); // Runs only if 'location' is null

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
