import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ClassesScreen from './screens/ClassesScreen';

const Stack = createStackNavigator();

function HomeStack()
{
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Classes" component={ClassesScreen} />
        </Stack.Navigator>
    );
}

export default HomeStack;
