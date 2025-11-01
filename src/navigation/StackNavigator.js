import React from 'react'

import HomeScreen from '../screens/HomeScreen'
import SplashScreen from '../screens/SplashScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Splash' component={SplashScreen}/>
        </Stack.Navigator>
    )
}

export default StackNavigator