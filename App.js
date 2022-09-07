import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Liked from './screens/Liked';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='All'>
          {
            () => (
              <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                  let iconName;
                  if(route.name === "Home"){
                    iconName = focused
                    ? "home-sharp"
                    : "home-outline"
                  } else if(route.name === "Liked"){
                    iconName = focused 
                    ? "heart-sharp"
                    : "heart-outline"
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
                
              })}
              >
                <Tab.Screen name="Home" component={Home}/>
                <Tab.Screen name='Liked' component={Liked}/>
              </Tab.Navigator>
              )
          }
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}