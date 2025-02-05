import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, NavigationIndependentTree} from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignupScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
     <NavigationIndependentTree>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
      </Stack.Navigator>
      </NavigationContainer>
      </NavigationIndependentTree>
  );
};

export default App;
