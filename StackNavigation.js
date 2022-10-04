import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Search from "./screens/Search";



const Stack = createNativeStackNavigator();

export function  HomeStackNavigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="1"
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
        </Stack.Navigator>
    )
}

export function SearchStackNavigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="2"
            component={Search}
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
        </Stack.Navigator>
    )
}