import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Provider, useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import TasksScreen from './src/screen/Tasks/Tasks'
import StatisticsScreen from './src/screen/Statistics/Statistics'
import SettingsScreen from './src/screen/Settings/Settings'
import { store } from './src/store/store'
import { loadTheme } from './src/store/slices/themeSlice'

const Tab = createBottomTabNavigator()

function MainApp() {
  const dispatch = useDispatch()
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme)

  useEffect(() => {
    dispatch(loadTheme())
  }, [dispatch])

  return (
    <NavigationContainer>
      <Tab.Navigator
        id={'main'}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ _, color, size }) => {
            let iconName;
            if (route.name === 'Tasks') iconName = 'checkmark-done-outline'
            else if (route.name === 'Statistics') iconName = 'analytics-outline'
            else if (route.name === 'Settings') iconName = 'cog-outline'
            return <Icon name={iconName} size={size} color={color} />
          },
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Tasks" component={TasksScreen} />
        <Tab.Screen name="Statistics" component={StatisticsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  )
}
