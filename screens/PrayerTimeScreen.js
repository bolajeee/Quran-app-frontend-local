import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useTheme } from "../components/themeContext";
import { Colors } from "../components/styles";
import LocationComponent from "../components/locationComponent";
// import AdhanNotification from "../components/adhanNotification";

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

const PrayerTimeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [hijriDate, setHijriDate] = useState("");
  const currentDate = new Date();

  // Function to handle location updates from LocationComponent
  const handleLocationUpdate = useCallback(async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${currentDate.getDate()}-${currentDate.getMonth() + 1
        }-${currentDate.getFullYear()}?latitude=${latitude}&longitude=${longitude}&method=2`
      );
      const data = await response.json();

        if (data.code === 200) {
          setPrayerTimes(data.data.timings);
          setHijriDate(data.data.date.hijri.date);
          setLoading(false);
        } else {
          setError("Failed to fetch prayer times");
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching prayer times");
        setLoading(false);
      }
    },
    [currentDate]
  );


  // Function to determine the current prayer time
  const getCurrentPrayer = () => {
    if (!prayerTimes) return null;

    const now = new Date();
    const currentTime = now.toTimeString().split(" ")[0]; // Get current time in HH:MM:SS format

    const prayerTimesArray = Object.entries(prayerTimes).map(
      ([name, time]) => ({
        name,
        time,
      })
    );

    for (let i = 0; i < prayerTimesArray.length; i++) {
      const nextPrayer = prayerTimesArray[i];
      const nextPrayerTime = nextPrayer.time;

      if (currentTime < nextPrayerTime) {
        return prayerTimesArray[i - 1] || prayerTimesArray[0]; // Return the last prayer if current time is before the first prayer
      }
    }

    // If no next prayer found, return the last prayer of the day
    return prayerTimesArray[prayerTimesArray.length - 1];
  };

  useEffect(() => {
    const currentPrayer = getCurrentPrayer();
    setCurrentPrayer(currentPrayer);
  }, [prayerTimes]);

  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const LocationWrapper = () => {
    const [hasLoaded, setHasLoaded] = useState(false);

    const onLocationReceived = (location) => {
      if (location?.coords && !hasLoaded) {
        setHasLoaded(true);
        handleLocationUpdate(
          location.coords.latitude,
          location.coords.longitude
        );
      }
    };

    return <LocationComponent onLocationUpdate={onLocationReceived} />;

  };const prayers = prayerTimes    ? [
        {
          name: "Fajr",
          time: formatTime(prayerTimes.Fajr),
          icon: "volume-high",
        },
        {
          name: "Sunrise",
          time: formatTime(prayerTimes.Sunrise),
          icon: "weather-sunset-up",
        },
        {
          name: "Dhuhr",
          time: formatTime(prayerTimes.Dhuhr),
          icon: "volume-high",
        },
        { name: "Asr", time: formatTime(prayerTimes.Asr), icon: "volume-high" },
        {
          name: "Maghrib",
          time: formatTime(prayerTimes.Maghrib),
          icon: "volume-high",
        },
        {
          name: "Isha'a",
          time: formatTime(prayerTimes.Isha),
          icon: "volume-high",
        },
      ]
    : [];

  //navigation
  const handleHomeNavigation = () => {
    navigation.navigate("Home");
  };
  const handleProfileNavigation = () => {
    navigation.navigate("Profile");
  };
  const handleCalenderNavigation = () => {
    navigation.navigate("Calender");
  };
  const handleQuizNavigation = () => {
    navigation.navigate("Quiz");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>
          Prayers
        </Text>
      </View>

      {/* Location Info */}
      {/* <View style={styles.locationInfo}>
        <LocationWrapper />
      </View> */}

      {/* Date Info */}
      <View style={styles.dateInfo}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color={theme.textColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dateTextContainer}
          onPress={handleCalenderNavigation}
        >
          <Text style={[styles.dateText, { color: theme.textColor }]}>
            Gregorian Calendar, {currentDate.toLocaleDateString()}
          </Text>
          <Text style={[styles.hijriText, { color: theme.textColor }]}>
            Hijra Calendar, {hijriDate}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color={theme.textColor} />
        </TouchableOpacity>
      </View>

      {/* Current Prayer Indicator */}
      {currentPrayer && (
        <View style={styles.currentPrayerContainer}>
          <Text style={[styles.currentPrayerText, { color: theme.textColor }]}>
            Current Prayer: {currentPrayer.name}
          </Text>
          <View style={styles.prayerIndicator} />
        </View>
      )}

      {/* Prayer Times List */}
      <View
        style={[styles.prayerList, { backgroundColor: theme.listBackground }]}
      >
        {loading ? (
          <ActivityIndicator size="large" color={theme.textColor} />
        ) : error ? (
          <Text style={[styles.errorText, { color: theme.textColor }]}>
            {error}
          </Text>
        ) : (
          prayers.map((prayer, index) => (
            <View
              key={index}
              style={[
                styles.prayerItem,
                { borderBottomColor: theme.cardBackground },
              ]}
            >
              <View style={styles.prayerLeft}>
                <MaterialCommunityIcons
                  name={prayer.icon}
                  size={24}
                  color={theme.textColor}
                />
                <Text style={[styles.prayerName, { color: theme.textColor }]}>
                  {prayer.name}
                </Text>
              </View>
              <View style={styles.prayerRight}>
                <Text style={[styles.prayerTime, { color: theme.textColor }]}>
                  {prayer.time}
                </Text>
                {currentPrayer && currentPrayer.name === prayer.name && (
                  <View style={styles.activeIndicator} />
                )}
              </View>
            </View>
          ))
        )}
      </View>

      {/* Bottom Navigation */}
      <View
        style={[styles.bottomNav, { backgroundColor: theme.listBackground }]}
      >
        <TouchableOpacity style={styles.navItem} onPress={handleQuizNavigation}>
          <MaterialIcons name="quiz" size={24} color={theme.iconColor} />
          <Text style={[styles.navText, { color: theme.textColor }]}>Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Prayer")}
        >
          <MaterialIcons name="access-time" size={24} color={Colors.brand} />
          <Text style={[styles.navText, { color: Colors.brand }]}>Prayers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleHomeNavigation}>
          <AntDesign name="book" size={24} color={theme.iconColor} />
          <Text style={[styles.navText, { color: theme.textColor }]}>
            Quran
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={handleProfileNavigation}
        >
          <MaterialIcons name="person" size={24} color={theme.iconColor} />
          <Text style={[styles.navText, { color: theme.textColor }]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  locationInfo: {
    paddingHorizontal: 16,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
  },
  dateInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  dateTextContainer: {
    alignItems: "center",
  },
  dateText: {
    fontSize: 20,
    fontWeight: "600",
  },
  hijriText: {
    fontSize: 16,
    opacity: 0.9,
    marginTop: 4,
  },
  prayerList: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  prayerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  prayerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  prayerName: {
    fontSize: 18,
  },
  prayerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  prayerTime: {
    fontSize: 16,
    fontWeight: "500",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    padding: 20,
  },
  currentPrayerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  currentPrayerText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  prayerIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.brand,
  },
  activeIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red", // Change color to indicate active prayer
    marginLeft: 8,
  },
});

export default PrayerTimeScreen;
