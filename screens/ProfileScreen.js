import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../components/themeContext";
import { Colors } from "../components/styles";

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

const ProfileScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const [totalScore, setTotalScore] = React.useState(0);

  // Get the quiz results from navigation params and update total score
  const newScore = route.params?.quizScore || 0;

  React.useEffect(() => {
    if (newScore > 0) {
      setTotalScore((prevScore) => prevScore + newScore);
    }
  }, [newScore]);

  const menuItems = [
    { icon: "star", label: "My Premium", subtitle: "Go Premium" },
    { icon: "star", label: "Daily Deen" },
    { icon: "star", label: "Leave us a Review" },
    { icon: "share", label: "Share Muslim Pro App" },
    {
      icon: "update",
      label: "Your App is up to date",
      subtitle: "Version 15.11.3",
    },
  ];

  // Navigation handlers
  const handleLoginNavigation = () => {
    navigation.navigate("Login");
  };
  const handleSignupNavigation = () => {
    navigation.navigate("Signup");
  };
  const handleHomeNavigation = () => {
    navigation.navigate("Home");
  };
  const handlePrayerNavigation = () => {
    navigation.navigate("Prayer");
  };
  const handleProfileNavigation = () => {
    navigation.navigate("Profile");
  };
  const handleQuizNavigation = () => {
    navigation.navigate("Quiz");
  };
  const handleSettingNavigation = () => {
    navigation.navigate("Setting");
  };
   const handleReferralNavigation = () => {
     navigation.navigate("Referral");
   };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.textColor }]}>
            Profile
          </Text>
          <TouchableOpacity
            style={styles.settingsIcon}
            onPress={handleSettingNavigation}
          >
            <Ionicons
              name="settings-outline"
              size={24}
              color={theme.iconColor}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View
            style={[styles.avatar, { backgroundColor: theme.cardBackground }]}
          >
            <AntDesign name="user" size={40} color={theme.iconColor} />
          </View>
          <TouchableOpacity
            style={[styles.premiumButton, { backgroundColor: theme.brand }]}
          >
            <Text style={styles.premiumButtonText}>Go Premium</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.communityText, { color: theme.textColor }]}>
          Join our global community for access to a full suite of features!
        </Text>

        <TouchableOpacity
          style={[
            styles.createAccountButton,
            { backgroundColor: Colors.brand },
          ]}
          onPress={handleSignupNavigation}
        >
          <Text style={styles.createAccountText}>Create Free Account</Text>
        </TouchableOpacity>

        <View style={styles.questSection}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Quests
          </Text>
          <View
            style={[
              styles.questCard,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <View style={styles.questItem}>
              <AntDesign name="star" size={24} color={Colors.brand} />
              <Text style={[styles.questValue, { color: theme.textColor }]}>
                {totalScore}
              </Text>
              <Text style={[styles.questLabel, { color: theme.textColor }]}>
                Total Score
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: Colors.brand }]}
              onPress={handleLoginNavigation}
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.journeySection}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Journey
          </Text>
          <View style={styles.journeyButtons}>
            <TouchableOpacity
              style={[styles.journeyButton, { backgroundColor: Colors.brand }]}
            >
              <Text style={styles.journeyButtonText}>Read the Quran →</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.journeyButton, { backgroundColor: Colors.green }]}
            >
              <Text style={styles.journeyButtonText}>Track prayers →</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                { borderBottomColor: theme.textColor + "20" },
              ]}
            >
              <MaterialIcons
                name={item.icon}
                size={24}
                color={theme.iconColor}
              />
              <View style={styles.menuItemText}>
                <Text
                  style={[styles.menuItemLabel, { color: theme.textColor }]}
                >
                  {item.label}
                </Text>
                {item.subtitle && (
                  <Text
                    style={[
                      styles.menuItemSubtitle,
                      { color: theme.textColor + "80" },
                    ]}
                  >
                    {item.subtitle}
                  </Text>
                )}
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={theme.iconColor}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={[styles.button, { backgroundColor: theme.cardBackground }]}
        >
          <TouchableOpacity onPress={handleReferralNavigation}>
            <Text>Referrals</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View
        style={[styles.bottomNav, { backgroundColor: theme.listBackground }]}
      >
        <TouchableOpacity style={styles.navItem} onPress={handleQuizNavigation}>
          <MaterialIcons name="quiz" size={24} color={theme.iconColor} />
          <Text style={[styles.navText, { color: theme.textColor }]}>Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={handlePrayerNavigation}
        >
          <MaterialIcons name="access-time" size={24} color={theme.iconColor} />
          <Text style={[styles.navText, { color: theme.textColor }]}>
            Prayers
          </Text>
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
          <MaterialIcons name="person" size={24} color={Colors.brand} />
          <Text style={[styles.navText, { color: Colors.brand }]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("GameList")}
        >
          <FontAwesome name="gamepad" size={24} color={theme.iconColor} />
          <Text style={[styles.navText, { color: theme.darkLight }]}>Games</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  premiumButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  premiumButtonText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  communityText: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  createAccountButton: {
    margin: 16,
    padding: 16,
    borderRadius: 25,
  },
  createAccountText: {
    color: Colors.primary,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  questSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  questCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questItem: {
    alignItems: "center",
  },
  questValue: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 4,
  },
  questLabel: {
    fontSize: 12,
  },
  loginButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 16,
  },
  loginButtonText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  journeySection: {
    padding: 16,
  },
  journeyButtons: {
    flexDirection: "row",
    gap: 16,
  },
  journeyButton: {
    flex: 1,
    padding: 16,
    borderRadius: 25,
  },
  journeyButtonText: {
    color: Colors.primary,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  menuSection: {
    padding: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuItemText: {
    flex: 1,
    marginLeft: 16,
  },
  menuItemLabel: {
    fontSize: 16,
  },
  menuItemSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: secondary,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    margin: 20,
    alignItems: "center",
  },
});

export default ProfileScreen;
