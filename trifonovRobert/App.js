import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Tasks from './src/screen/Tasks/Tasks'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        id={'main'}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Tasks') {
              iconName = 'checkmark-done-outline';
            } else if (route.name === 'Statistics') {
              iconName = 'analytics-outline';
            } else if (route.name === 'Settings') {
              iconName = 'cog-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarShowLabel: false,
          headerShown: false
        })}
      >
        <Tab.Screen name="Tasks" component={Tasks}/>
        <Tab.Screen name="Statistics" component={Tasks}/>
        <Tab.Screen name="Settings" component={Tasks}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

