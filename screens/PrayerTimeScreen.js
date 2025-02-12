import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useTheme } from "../components/themeContext";
import { Colors } from "../components/styles";

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

const PrayerTimeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const prayers = [
    { name: "Fajr", time: "5:53 AM", icon: "volume-high" },
    { name: "Sunrise", time: "7:04 AM", icon: "weather-sunset-up" },
    {
      name: "Dhuhr",
      time: "1:00 PM",
      icon: "volume-high",
      countdown: "-1:40:20",
    },
    { name: "Asr", time: "4:22 PM", icon: "volume-high" },
    { name: "Maghrib", time: "6:57 PM", icon: "volume-high" },
    { name: "Isha'a", time: "8:04 PM", icon: "volume-high" },
  ];

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
      <View style={styles.locationInfo}>
        <Text style={[styles.locationText, { color: theme.textColor }]}>
          Lagos, Nigeria • Muslim World League (MWL) (18.0° / 17.0°)
        </Text>
      </View>

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
            Today, February 5
          </Text>
          <Text style={[styles.hijriText, { color: theme.textColor }]}>
            Sha'ban 6, 1446 AH
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color={theme.textColor} />
        </TouchableOpacity>
      </View>

      {/* Prayer Times List */}
      <View
        style={[styles.prayerList, { backgroundColor: theme.listBackground }]}
      >
        {prayers.map((prayer, index) => (
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
              {prayer.countdown && (
                <Text
                  style={[styles.countdownText, { color: theme.textColor }]}
                >
                  {prayer.countdown}
                </Text>
              )}
              <Text style={[styles.prayerTime, { color: theme.textColor }]}>
                {prayer.time}
              </Text>
              {prayer.name === "Dhuhr" && (
                <View style={styles.checkmark}>
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={theme.textColor}
                  />
                </View>
              )}
            </View>
          </View>
        ))}
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
  countdownText: {
    fontSize: 16,
  },
  prayerTime: {
    fontSize: 16,
    fontWeight: "500",
  },
  checkmark: {
    backgroundColor: "#10B981",
    borderRadius: 12,
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
});

export default PrayerTimeScreen;
