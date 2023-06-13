import { StatusBar } from "expo-status-bar";

import Login from "./screens/LoginScreen";
import MainDashboard from "./screens/MainDashboard";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setIsLoggedIn(true);
      // ...
    } else {
      setIsLoggedIn(false);
    }
  });
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Dashboard" component={MainDashboard} />
        <Stack.Screen name="Login" component={Login} />
        
        
      
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
