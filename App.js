import * as React from 'react';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Liked from './screens/Liked';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      >
        <Tab.Screen
        name='Home'
        component={Home}
        options={(props) => ({
          headerStyle: {
            backgroundColor: "#100F0F",
          },
          headerTitleStyle: {
            color: "white",
            fontWeight: "700",
            fontFamily: "sans-serif-medium"
          },
        })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}