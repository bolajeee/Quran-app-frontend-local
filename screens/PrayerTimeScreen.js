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
// Import adhan library for local prayer time calculation
import { PrayerTimes, CalculationMethod, Coordinates } from "adhan";
import momentHijri from "moment-hijri";

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

const PrayerTimeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const hijriDate = momentHijri(currentDate).format("iYYYY/iM/iD");

  // Function to handle location updates from LocationComponent
  const handleLocationUpdate = useCallback(
    async (location) => {
      try {
        const { latitude, longitude } = location.coords;
        setCurrentLocation({ latitude, longitude });
        const coordinates = new Coordinates(latitude, longitude);
        const params = CalculationMethod.MuslimWorldLeague();
        const times = new PrayerTimes(coordinates, currentDate, params);
        const calculatedTimes = {
          Fajr: times.fajr.toLocaleTimeString(),
          Sunrise: times.sunrise.toLocaleTimeString(),
          Dhuhr: times.dhuhr.toLocaleTimeString(),
          Asr: times.asr.toLocaleTimeString(),
          Maghrib: times.maghrib.toLocaleTimeString(),
          Isha: times.isha.toLocaleTimeString(),
        };
        setPrayerTimes(calculatedTimes);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error calculating prayer times");
        setLoading(false);
      }
    },
    [currentDate]
  );

  // Re-calculate prayer times when currentDate changes and location is available
  useEffect(() => {
    if (currentLocation) {
      handleLocationUpdate({ coords: currentLocation });
    }
  }, [currentDate]);

  // Helper function: Convert a 12-hour time string (e.g., "05:30 AM") to 24-hour format "HH:MM"
  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    hours = hours.toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Helper function: Convert "HH:MM" string into total minutes
  const convertToMinutes = (time24) => {
    const [hours, minutes] = time24.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Function to determine the current prayer time based on calculated timings
  const getCurrentPrayer = () => {
    if (!prayerTimes) return null;
    const now = new Date();
    const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();
    const prayerTimesArray = Object.entries(prayerTimes).map(([name, time]) => {
      const time24 = convertTo24Hour(time);
      return {
        name,
        minutes: convertToMinutes(time24),
        display: time,
      };
    });
    prayerTimesArray.sort((a, b) => a.minutes - b.minutes);
    let current = prayerTimesArray[0];
    for (let i = 0; i < prayerTimesArray.length; i++) {
      if (currentTimeMinutes >= prayerTimesArray[i].minutes) {
        current = prayerTimesArray[i];
      }
    }
    return current;
  };

  useEffect(() => {
    if (prayerTimes) {
      const cp = getCurrentPrayer();
      setCurrentPrayer(cp);
    }
  }, [prayerTimes]);

  // Update current prayer every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (prayerTimes) {
        setCurrentPrayer(getCurrentPrayer());
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const formatTime = (time) => time; // Already in readable format

  // Function to check if currentDate is today
  const isToday = () => {
    const now = new Date();
    return (
      now.getDate() === currentDate.getDate() &&
      now.getMonth() === currentDate.getMonth() &&
      now.getFullYear() === currentDate.getFullYear()
    );
  };

  // Date navigation functions: Update currentDate by subtracting or adding one day
  const handlePrevDay = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(
          prevDate.getFullYear(),
          prevDate.getMonth(),
          prevDate.getDate() - 1
        )
    );
  };

  const handleNextDay = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(
          prevDate.getFullYear(),
          prevDate.getMonth(),
          prevDate.getDate() + 1
        )
    );
  };

  // Navigation functions
  const handleHomeNavigation = () => navigation.navigate("Home");
  const handleProfileNavigation = () => navigation.navigate("Profile");
  const handleCalenderNavigation = () => navigation.navigate("Calender");
  const handleQuizNavigation = () => navigation.navigate("Quiz");

  // LocationWrapper: uses the LocationComponent to get dynamic location and trigger prayer time calculation.
  const LocationWrapper = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const onLocationReceived = (location) => {
      if (location?.coords && !hasLoaded) {
        setHasLoaded(true);
        handleLocationUpdate(location);
      }
    };
    return <LocationComponent onLocationUpdate={onLocationReceived} />;
  };

  const prayers = prayerTimes
    ? [
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <StatusBar barStyle="light-content" />
      {/* Get dynamic location and calculate prayer times */}
      <LocationWrapper />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>
          Prayers
        </Text>
      </View>

      {/* Date Info with Navigation Arrows */}
      <View style={styles.dateInfo}>
        <TouchableOpacity onPress={handlePrevDay}>
          <Ionicons name="chevron-back" size={24} color={theme.textColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dateTextContainer}
          onPress={handleCalenderNavigation}
        >
          <Text style={[styles.dateText, { color: theme.textColor }]}>
            Gregorian Calendar, {currentDate.toLocaleDateString()}
          </Text>
          <Text
            style={[styles.hijraText, { color: theme.textColor }]}
          >{`Hijri Calendar, ${hijriDate}`}</Text>
          {isToday() && <Text style={styles.todayIndicator}>Today</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextDay}>
          <Ionicons name="chevron-forward" size={24} color={theme.textColor} />
        </TouchableOpacity>
      </View>

      {/* Current Prayer Indicator */}
      {/* {currentPrayer && (
        <View style={styles.currentPrayerContainer}>
          <Text style={[styles.currentPrayerText, { color: theme.textColor }]}>
            Current Prayer: {currentPrayer.name}
          </Text>
          <ActivityIndicator
            size="small"
            color={theme.iconColor}
            style={styles.currentPrayerIndicator}
          />
        </View>
      )} */}

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
                  color={theme.iconColor}
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
                  <ActivityIndicator
                    size="small"
                    color={theme.iconColor}
                    style={styles.currentPrayerIndicator}
                  />
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
  container: { flex: 1 },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 28, fontWeight: "bold" },
  locationInfo: {
    paddingHorizontal: 16,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: { fontSize: 16 },
  dateInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  dateTextContainer: { alignItems: "center" },
  dateText: { fontSize: 20, fontWeight: "600" },
  hijraText: { fontSize: 16, opacity: 0.9, marginTop: 4 },
  todayIndicator: {
    marginTop: 4,
    backgroundColor: brand,
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    fontSize: 12,
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
  prayerLeft: { flexDirection: "row", alignItems: "center" },
  prayerName: { fontSize: 18 },
  prayerRight: { flexDirection: "row", alignItems: "center" },
  prayerTime: { fontSize: 16, fontWeight: "500" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    borderTopWidth: 1,
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, marginTop: 4 },
  errorText: { textAlign: "center", fontSize: 16, padding: 20 },
  currentPrayerContainer: { alignItems: "center", marginVertical: 20 },
  currentPrayerText: { fontSize: 20, fontWeight: "600", marginBottom: 10 },
  currentPrayerIndicator: { marginLeft: 8 },
});

export default PrayerTimeScreen;
