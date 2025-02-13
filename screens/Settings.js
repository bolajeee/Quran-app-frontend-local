import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
} from "react-native";
import { useTheme } from "../components/themeContext";
import { Ionicons } from "@expo/vector-icons";

const Settings = ({ navigation }) => {
  const { theme } = useTheme();
  const [isPushEnabled, setIsPushEnabled] = useState(false);

  //navigation
  const handleProfileNavigation = () => {
    navigation.navigate("Profile");
  };

  const togglePushNotifications = () => {
    setIsPushEnabled((previousState) => !previousState);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: theme.textColor }]}>
          Settings
        </Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Profile
          </Text>
          <TouchableOpacity
            style={[styles.option, { borderBottomColor: theme.darkLight }]}
            onPress={handleProfileNavigation}
          >
            <View style={styles.optionContent}>
              <Ionicons
                name="person-circle-outline"
                size={24}
                color={theme.textColor}
              />
              <View style={styles.optionTextContainer}>
                <Text style={[styles.optionText, { color: theme.textColor }]}>
                  Signup or Login
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.textColor}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Communication Preferences
          </Text>
          <View style={[styles.option, { borderBottomColor: theme.darkLight }]}>
            <View style={styles.optionContent}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={theme.textColor}
              />
              <Text style={[styles.optionText, { color: theme.textColor }]}>
                Push Notifications
              </Text>
            </View>
            <Switch
              trackColor={{ false: theme.darkLight, true: theme.primary }}
              thumbColor={isPushEnabled ? "#fff" : "#f4f3f4"}
              ios_backgroundColor={theme.darkLight}
              onValueChange={togglePushNotifications}
              value={isPushEnabled}
            />
          </View>
          <TouchableOpacity
            style={[styles.option, { borderBottomColor: theme.darkLight }]}
          >
            <View style={styles.optionContent}>
              <Ionicons name="mail-outline" size={24} color={theme.textColor} />
              <Text style={[styles.optionText, { color: theme.textColor }]}>
                Free Newsletter
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            General
          </Text>
          <TouchableOpacity
            style={[styles.option, { borderBottomColor: theme.darklight }]}
          >
            <View style={styles.optionContent}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={theme.textColor}
              />
              <Text style={[styles.optionText, { color: theme.textColor }]}>
                About
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.textColor}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[styles.option, { borderBottomColor: theme.darkLight }]}
          >
            <View style={styles.optionContent}>
              <Ionicons name="business-outline" size={24} color={theme.textColor} />
              <Text style={[styles.optionText, { color: theme.textColor }]}>
                Corporate Governance
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.textColor} />
          </TouchableOpacity> */}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Legal
          </Text>
          <TouchableOpacity
            style={[styles.option, { borderBottomColor: theme.darkLight }]}
          >
            <View style={styles.optionContent}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color={theme.textColor}
              />
              <Text style={[styles.optionText, { color: theme.textColor }]}>
                Legal
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.textColor}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Social
          </Text>
          <TouchableOpacity
            style={[styles.option, { borderBottomColor: theme.darkLight }]}
          >
            <View style={styles.optionContent}>
              <Ionicons
                name="share-social-outline"
                size={24}
                color={theme.textColor}
              />
              <Text style={[styles.optionText, { color: theme.textColor }]}>
                Send Muslim Pro to a friend
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.textColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { borderBottomColor: theme.darkLight }]}
          >
            <View style={styles.optionContent}>
              <Ionicons
                name="chatbox-outline"
                size={24}
                color={theme.textColor}
              />
              <Text style={[styles.optionText, { color: theme.textColor }]}>
                Feedback
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={theme.textColor}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(204, 204, 204, 0.3)",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
  },
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    opacity: 0.8,
    letterSpacing: 0.5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionTextContainer: {
    marginLeft: 12,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "400",
  },
  optionSubtext: {
    fontSize: 14,
    marginLeft: 12,
    marginTop: 4,
    opacity: 0.7,
  },
});

export default Settings;
