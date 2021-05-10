import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from '../HomeTab/HomeTab';
import NotificationTab from '../FavoriteTab/FavoriteTab';
import ProfileTab from '../ProfileTab/ProfileTab';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
console.disableYellowBox = true;
const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator 
    // barStyle={{ backgroundColor: '#694fad' }}

        tabBarOptions={{
          keyboardHidesTabBar: !(Platform.OS === 'ios'),
            labelStyle:{
                fontSize: 14,
            },
            activeTintColor: '#21465b', 
            inactiveTintColor: 'gray',
            activeBackgroundColor: 'black',
            tabStyle: {backgroundColor: '#fff'}
        }
        }
        >
      <Tab.Screen name="Home" component={HomeTab} options={{
          tabBarLabel: "Home",
          tabBarIcon: ({color})  => <Ionicons name="home" size={20} color={color} />
      }} 
      />
      {/* <Tab.Screen name="Favorite" component={NotificationTab} options={{
          tabBarLabel: "Favorite",
          tabBarIcon: ({color})  => <FontAwesome name="heart-o" size={20} color={color}/>
      }} /> */}
      <Tab.Screen name="Profile" component={ProfileTab} options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({color})  => <Ionicons name="person-circle-outline" size={20} color={color}/>
      }} />
    </Tab.Navigator>
  );
}
export default MainScreen;