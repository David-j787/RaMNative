import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, StatusBar} from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function Search(){

    const navigation = useNavigation();


    useEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerSearchBarOptions: {
                placeholder: "Search...",
                textColor: "white",
                hintTextColor: "white",
                headerIconColor: "white",
                autoFocus: true
            },
        })
    }, [navigation])

    const styles = StyleSheet.create({

        container: {
            backgroundColor: "#100F0F",
            height: "100%"
        }
    })

    return(
        <View style={styles.container}>
            <StatusBar/>
            <Text>o</Text>
        </View>
    )
}