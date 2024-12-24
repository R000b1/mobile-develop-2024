import React from "react";
import { Button } from "react-native";
import {
  createBottomTabNavigator,
  TransitionPresets,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Lab1 from "./screens/lab1";
import Lab2 from "./screens/lab2";
import Lab3 from "./screens/lab3";
import { ThemeProvider } from "./ContextAPI/themeContext";
import { useTheme } from "./ContextAPI/themeContext";
import { getStyles } from "./screens/styles";

const Tab = createBottomTabNavigator();

function AppContent() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const styles = getStyles(isDarkTheme);

  return (
    <NavigationContainer >
      <Tab.Navigator 
        screenOptions={() => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "terminal" : "terminal-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen 
          name="Lab 1"
          component={Lab1}
          options={{
            TransitionPresets: TransitionPresets.ShiftTransition,
          }}
        />
        <Tab.Screen 
          name="Lab 2"
          component={Lab2}
          options={{
            TransitionPresets: TransitionPresets.ShiftTransition,
          }}
        />
        <Tab.Screen
          name="Lab 3"
          component={Lab3}
          options={{
            TransitionPresets: TransitionPresets.ShiftTransition,
          }}
        />
      </Tab.Navigator>
      <Button title="Сменить тему" onPress={toggleTheme} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
