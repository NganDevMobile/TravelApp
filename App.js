// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import MainScreen from './src/screens/MainScreen/MainScreen';
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';
import OnboardingScreen from './src/screens/OnboardingScreen/OnboardingScreen';
import FlashScreen from './src/screens/FlashScreen/FlashScreen'
import Demo from './src/screens/Demo/Product'
import Choose from './src/screens/Choose/Choose'
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
// import App from './src/screens/BaoVe/Baove'

const Stack = createStackNavigator();

function App() {
  // const [loaded] = useFonts({
  //   RalewayBold : require('../Assignment/src/assets/fonts/Raleway-Bold.ttf'),
  //   // RalewayBold : require('../assets/fonts/Raleway-Bold.ttf'),
 
  // });
  
  // if (!loaded) {
  //   return null;
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Flash" headerMode="none">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Demo" component={Demo} />
        <Stack.Screen name="Flash" component={FlashScreen} />
        <Stack.Screen name="Choose" component={Choose} />
        {/* <Stack.Screen name="Baove" component={Baove} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}





export default function Project(){
  return <App/>;
}