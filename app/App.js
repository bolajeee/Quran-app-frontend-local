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

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
            <Stack.Screen name="Home" component={WelcomeScreen} />
            <Stack.Screen name="Prayer" component={PrayerTimeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </ThemeProvider>
  );
};

export default App;
