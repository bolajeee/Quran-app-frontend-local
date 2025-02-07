import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Colors } from "../components/styles";
import { useTheme } from "../components/themeContext";

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

const WelcomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Light");

  const { theme, setIsDarkMode } = useTheme();

  // Update theme based on isDarkMode. Assumes Theme has both light and dark keys.

  const handleThemeChange = (mode) => {
    setActiveTab(mode);
    setIsDarkMode(mode === "Dark");
  };
   const handleProfileNavigation = () => {
     navigation.navigate("Profile");
   };

  const surahs = [
    {
      id: 1,
      name: "Al-Faatiha",
      translation: "The Opener",
      verses: "7 Verses",
      arabicText: "الفاتحة",
    },
    {
      id: 2,
      name: "Al-Baqara",
      translation: "The Cow",
      verses: "286 Verses",
      arabicText: "البقرة",
    },
    {
      id: 3,
      name: "Aal-i-Imraan",
      translation: "Family of Imran",
      verses: "200 Verses",
      arabicText: "آل عمران",
    },
    {
      id: 4,
      name: "An-Nisaa",
      translation: "The Women",
      verses: "176 Verses",
      arabicText: "النساء",
    },
    {
      id: 5,
      name: "Al-Maaida",
      translation: "The Table Spread",
      verses: "120 Verses",
      arabicText: "المائدة",
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>
          Quran Masters
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.settingsIcon}>
            <Ionicons
              name="settings-outline"
              size={24}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Light" && styles.activeTab]}
          onPress={() => handleThemeChange("Light")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Light" && styles.activeTabText,
            ]}
          >
            Light Mode
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Dark" && styles.activeTab]}
          onPress={() => handleThemeChange("Dark")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Dark" && styles.activeTabText,
            ]}
          >
            Dark Mode
          </Text>
        </TouchableOpacity>
      </View>

      {/* Status Cards */}
      <View style={styles.statusCards}>
        <View
          style={[styles.statusCard, { backgroundColor: theme.cardBackground }]}
        >
          <Feather name="book" size={24} color={Colors.darkLight} />
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle}>Take Quiz</Text>
            <Text style={styles.statusAction}>Earn coins now</Text>
          </View>
        </View>
      </View>

      {/* Surah List */}
      <ScrollView
        style={[styles.surahList, { backgroundColor: theme.listBackground }]}
      >
        {surahs.map((surah) => (
          <View key={surah.id} style={styles.surahItem}>
            <View style={styles.surahLeft}>
              <Text style={styles.surahNumber}>{surah.id}</Text>
              <View style={styles.surahInfo}>
                <Text style={styles.surahName}>{surah.name}</Text>
                <Text style={styles.surahTranslation}>{surah.translation}</Text>
              </View>
            </View>
            <View style={styles.surahRight}>
              <Text style={styles.arabicText}>{surah.arabicText}</Text>
              <Text style={styles.versesCount}>{surah.verses}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        style={[styles.bottomNav, { backgroundColor: theme.listBackground }]}
      >
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="quiz" size={24} color={Colors.darkLight} />
          <Text style={styles.navText}>Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            navigation.navigate("Prayer");
          }}
        >
          <MaterialIcons
            name="access-time"
            size={24}
            color={Colors.darkLight}
          />
          <Text style={styles.navText}>Prayers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="book" size={24} color={Colors.brand} />
          <Text style={styles.navText}>Quran</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color={Colors.darkLight} onPress={handleProfileNavigation}/>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004225",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsIcon: {
    marginLeft: 16,
  },
  tabContainer: {
    flexDirection: "row",
    padding: 8,
    marginHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
  },
  tab: {
    flex: 1,
    padding: 8,
    alignItems: "center",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: Colors.green,
  },
  tabText: {
    color: Colors.darkLight,
    fontWeight: "500",
  },
  activeTabText: {
    color: Colors.primary,
  },
  statusCards: {
    padding: 16,
  },
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusTextContainer: {
    marginLeft: 16,
  },
  statusTitle: {
    color: Colors.primary,
    fontWeight: "500",
  },
  statusAction: {
    color: Colors.green,
    fontSize: 12,
    marginTop: 4,
  },
  surahList: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
  },
  surahItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
  },
  surahLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  surahNumber: {
    width: 40,
    fontSize: 16,
    color: Colors.darkLight,
  },
  surahInfo: {
    marginLeft: 8,
  },
  surahName: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.tertiary,
  },
  surahTranslation: {
    fontSize: 12,
    color: Colors.darkLight,
    marginTop: 4,
  },
  surahRight: {
    alignItems: "flex-end",
  },
  arabicText: {
    fontSize: 20,
    color: Colors.tertiary,
    fontFamily: "System",
  },
  versesCount: {
    fontSize: 12,
    color: Colors.darkLight,
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: Colors.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.secondary,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: Colors.darkLight,
    marginTop: 4,
  },
});

export default WelcomeScreen;
