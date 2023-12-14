import * as React from "react";
import { View, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./src/screens/Profile";
import Translate from "./src/screens/Translate";
import WordList from "./src/components/WordList";
import Card from "./src/components/Card";
import Ionicons from "@expo/vector-icons/Ionicons";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuProvider } from "react-native-popup-menu";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isSignedIn, setIsSignedin] = React.useState(false);

  const auth = getAuth();

  React.useEffect(() => {
    const setAuth = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsSignedin(true);
        } else {
          setIsSignedin(false);
        }
      });
    };
    setAuth();
  });

  return isSignedIn ? (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Your List") {
                iconName = focused ? "ios-list" : "ios-list-outline";
              } else if (route.name === "Flash Cards") {
                iconName = focused ? "flash" : "flash-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "AI Translator") {
                iconName = focused ? "send" : "send-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          })}
        >
          <Tab.Screen name="Your List" component={WordList} />
          <Tab.Screen name="Flash Cards" component={Card} />
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="AI Translator" component={Translate} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  ) : (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Register") {
                iconName = focused ? "ios-list" : "ios-list-outline";
              } else if (route.name === "Login") {
                iconName = focused ? "flash" : "flash-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          })}
        >
          <Tab.Screen name="Register" component={Register} />
          <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
