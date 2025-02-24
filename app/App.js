import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import PrayerTimeScreen from "../screens/PrayerTimeScreen";
import { ThemeProvider } from "../components/themeContext";
import ProfileScreen from "../screens/ProfileScreen";
import SurahDetailScreen from "../screens/SurahDetailScreen";
import CalendarScreen from "../screens/CalendarScreen";
import QuizScreen from "../screens/QuizScreen";
import Settings from "../screens/Settings";
import ReferralScreen from "../screens/ReferralScreen"

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
            <Stack.Screen name="Home" component={WelcomeScreen} />
            <Stack.Screen name="Prayer" component={PrayerTimeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="SurahDetail" component={SurahDetailScreen} />
            <Stack.Screen name="Calender" component={CalendarScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="Setting" component={Settings} />
            <Stack.Screen name="Referral" component={ReferralScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </ThemeProvider>
  );
};

export default App;
