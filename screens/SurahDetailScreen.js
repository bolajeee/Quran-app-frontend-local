import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useTheme } from "../components/themeContext";

const SurahDetailScreen = ({ route }) => {
  const { theme } = useTheme();
  const { surah } = route.params; // Get the Surah data passed from the previous screen

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header} color={theme.cardBackground}>
        <Text style={[styles.title, { color: theme.textColor }]}>
          {surah.name}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={[styles.content, { color: theme.textColor }]}>
          {/* Replace this with the actual Surah content */}
          {surah.content}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  body: {
    padding: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SurahDetailScreen;
