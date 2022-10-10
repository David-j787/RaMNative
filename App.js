import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeStackNavigation, SearchStackNavigation } from './StackNavigation';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName='Home'
       screenOptions={({ route }) => ({
         tabBarIcon: ({ focused, color, size }) => {
           let iconName;
 
           if (route.name === 'Home') {
             iconName = focused
               ? 'home-sharp'
               : 'home-outline';
           } else if (route.name === 'Search') {
             iconName = focused
               ? 'search-sharp' 
               : 'search-outline';
           }
 
           // You can return any component that you like here!
           return <Ionicons name={iconName} size={size} color={color} />;
         },
         tabBarStyle: [{
           backgroundColor: "black",
           position: "absolute",
           height: 58
         }],
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarIconStyle: {
          alignItems: "center",
        }
      })}
      >
        <Tab.Screen
        name='Home'
        component={HomeStackNavigation}
        />

        <Tab.Screen
        name='Search'
        component={SearchStackNavigation}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}