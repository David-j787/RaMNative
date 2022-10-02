import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Liked(){

    const [data, setData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);


    const getFavs = async () => {
        const data = await AsyncStorage.getItem("favList");
        const json = await JSON.parse(data);
        for (let i = 0; i < json.length; i++) {
            
        }
        setData(json);
    }

    useEffect(() => {
        getFavs();
    }, []);


    return(
        <View>
            <FlatList
            refreshing={isRefreshing}
            onRefresh={() => {
                setIsRefreshing(true);
                getFavs();
                setIsRefreshing(false);
            }}
                
            data={data}
            renderItem={({item: c}) => (
                <View>
                    <Text>{c}</Text>
                </View>
            )}
            />
        </View>
    )
}