// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './HomeStack'; // Import HomeStack

const Tab = createBottomTabNavigator();

export default function App()
{
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
          {
            let iconName;

            if (route.name === 'Home')
            {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Bookings')
            {
              iconName = focused ? 'calendar' : 'calendar-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Bookings" component={BookingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
