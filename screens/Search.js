import React, {useState, useEffect} from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    StatusBar, 
    TouchableWithoutFeedback,
    Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function Search(){

    const navigation = useNavigation();

    const [data, setData] = useState([]);

    const setSearch = async (text) => {
        setTimeout(async () =>{
            if(text){
                const search = await fetch(`https://rickandmortyapi.com/api/character/?name=${text}`);
                const json = await search.json();
                setData([...json.results]);
            }else{
                setData([]);
            }

        }, 750)
    }

    useEffect(() => {
        setSearch();
        navigation.setOptions({
            headerTitle: "",
            headerSearchBarOptions: {
                placeholder: "Search...",
                textColor: "white",
                hintTextColor: "white",
                headerIconColor: "white",
                autoFocus: true,
                onChangeText: (e) => setSearch(e.nativeEvent.text)
            },
        })
    }, [navigation])

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#100F0F",
            height: "100%"
        },
        cardImage: {
            width:  130,
            height: 130
        }
    })

    return(
        <View style={styles.container}>
            <StatusBar/>
            <FlatList
            numColumns={3}
            data={data}
            renderItem={({item: c}) => (
                <TouchableWithoutFeedback>

                    <Image
                    style={styles.cardImage}
                    source={{uri: c.image}}
                    />
                </TouchableWithoutFeedback>
            )}
            />
        </View>
    )
}