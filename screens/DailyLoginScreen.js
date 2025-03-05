import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../components/themeContext";

const DailyLoginScreen = () => {
  const [isTodayLogged, setIsTodayLogged] = useState(false);
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const [loading, setLoading] = useState(true);

  // Helper to get date string in YYYY-MM-DD format
  const getDateString = (date) => date.toISOString().split("T")[0];

  useEffect(() => {
    const checkDailyLogin = async () => {
      try {
        const today = getDateString(new Date());
        const lastLogin = await AsyncStorage.getItem("lastLogin");
        const storedCount = await AsyncStorage.getItem("consecutiveDays");
        let count = storedCount ? parseInt(storedCount, 10) : 0;

        if (lastLogin === today) {
          // Already logged in today, just display current count
          setIsTodayLogged(true);
          setConsecutiveDays(count);
        } else {
          // Not logged in today
          if (lastLogin) {
            const yesterday = new Date();
            yesterday.setDate(new Date().getDate() - 1);
            const yesterdayStr = getDateString(yesterday);
            if (lastLogin === yesterdayStr) {
              count += 1;
            } else {
              count = 1; // reset streak if not consecutive
            }
          } else {
            count = 1; // first login
          }
          await AsyncStorage.setItem("lastLogin", today);
          await AsyncStorage.setItem("consecutiveDays", count.toString());
          setIsTodayLogged(true);
          setConsecutiveDays(count);
        }
      } catch (error) {
        console.error("Error checking daily login:", error);
      } finally {
        setLoading(false);
      }
    };

    checkDailyLogin();
  }, []);

  // Compute the current 30-day interval
  const currentInterval = Math.floor((consecutiveDays - 1) / 30) + 1;
  const intervalStart = (currentInterval - 1) * 30 + 1;
  const intervalEnd = currentInterval * 30;

  // Create an array for the current interval days
  const intervalDays = Array.from(
    { length: intervalEnd - intervalStart + 1 },
    (_, i) => i + intervalStart
  );

  // Calculate reward points for a given day within the interval
  // Reward = 5 + (dayIndex * 10), where dayIndex = (day - intervalStart)
  const getRewardPoints = (day) => 5 + (day - intervalStart) * 10;

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.text}>Checking login status...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.text}>
        You have logged in for {consecutiveDays} consecutive day
        {consecutiveDays === 1 ? "" : "s"}.
      </Text>
      <Text style={[styles.subTitle, { marginTop: 20 }]}>
        Daily Rewards (Current Interval: {intervalStart} - {intervalEnd})
      </Text>
      <View style={styles.gridContainer}>
        {intervalDays.map((day) => (
          <View
            key={day}
            style={[
              styles.gridItem,
              day === consecutiveDays && styles.currentDayItem,
            ]}
          >
            <Text style={styles.dayNumber}>{day}</Text>
            <Text style={styles.rewardText}>{getRewardPoints(day)} pts</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "#F8F8F8",
  },
  contentContainer: {
    padding: 20,
    // alignItems: "center" is applied selectively (e.g., on title/text)
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#313431",
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  gridItem: {
    width: 50,
    height: 50,
    backgroundColor: "#E5E7EB",
    margin: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  currentDayItem: {
    backgroundColor: "#10B981",
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  rewardText: {
    fontSize: 14,
    color: "#1F2937",
  },
});

export default DailyLoginScreen;
