import React, {useState, useEffect} from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    FlatList, 
    StatusBar, 
    TouchableWithoutFeedback,
    Image,
    Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Search(){

    const navigation = useNavigation();

    const [data, setData] = useState([]);
    const [infoCharacter, setInfoCharacter] = useState(null);


    const windowWidth = Dimensions.get("window").width;

    const setSearch = async (text) => {
        setTimeout(async () =>{
            if(text){
                await fetch(`https://rickandmortyapi.com/api/character/?name=${text}`)
                .then(async data => {
                    const json = await data.json();
                    setData([...json.results]);
                })
                .catch(err => {
                    setData([])
                }) 
            }else{
                setData([]);
            }

        }, 900)
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
        itemList: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            margin: 10
        },
        cardImage: {
            width:  55,
            height: 55,
            borderRadius: 100
        },
        data: {
            paddingLeft: 10
        },
        textName: {
            color: "white",
            fontWeight: "bold",
            fontSize: 15
        },
        textLocation: {
            color: "#C9C9C9"
        },
        //CardAbsolute
        bluryBackGroundCard: {
            position: "absolute",
            zIndex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(52, 52, 52, 0.8)"
        },
        cardContainer: {
            left: windowWidth/8,
            zIndex: 2,
            backgroundColor: "#100F0F",
            width: 300,
            borderRadius: 15,
        },
        imageCard: {
            height: "80%",
            width: "100%",
        },
        titles: {
            fontSize: 16,
            fontWeight: "600",
            paddingLeft: 2,
            color: "white"
        },
        topCard: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2
        },
        ContainerbottomCard: {
            flexDirection: "row",
            justifyContent: "space-around"
        },
        bottomCard: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 8,
            paddingRight: 8,
            padding: 2
        }
    })

    return(
        <View style={styles.container}>
            <StatusBar/>
            <FlatList
            data={data}
            renderItem={({item: c}) => (
                <TouchableWithoutFeedback
                delayPressIn={150}
                onPress={() => setInfoCharacter({
                    id: c.id,
                    name: c.name,
                    image: c.image,
                    gender: c.gender,
                    status: c.status
                })}
                >
                    <View
                    style={styles.itemList}
                    >
                        <Image
                        style={styles.cardImage}
                        source={{uri: c.image}}
                        />
                        <View 
                        style={styles.data}
                        >
                            <Text
                            style={styles.textName}
                            >{c.name}</Text>
                            <Text
                            style={styles.textLocation}
                            >{c.origin.name}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
            />
            {
                infoCharacter ?
                (
                    <View
                    style={styles.bluryBackGroundCard}
                    >
                        <View
                        style={styles.cardContainer}
                        >
                            <View
                            style={styles.topCard}
                            >
                                <View
                                style={styles.topCard}
                                >
                                    <Ionicons name='person-circle' size={26} color={"white"}/>
                                    <Text
                                    style={styles.titles}
                                    >{infoCharacter.name}</Text>

                                </View>

                                <View
                                style={styles.topCard}
                                >
                                    <Ionicons 
                                    name='close' size={30}
                                    onPress={() => setInfoCharacter(null)}
                                    color={"white"}
                                    />
                                </View>

                            </View>

                            <Image 
                            style={styles.imageCard}
                            source={{uri: infoCharacter.image}}
                            />
                            <View
                            style={styles.ContainerbottomCard}
                            >
                                <View
                                style={styles.bottomCard}
                                >
                                    
                                    <Ionicons name='pulse' size={26} color={"white"}/>
                                    <Text
                                    style={styles.titles}
                                    >{infoCharacter.status}</Text>
                                </View>

                                <View
                                style={styles.bottomCard}
                                >

                                    <Ionicons name='transgender' size={26} color={"white"}/>
                                    <Text
                                    style={styles.titles}
                                    >{infoCharacter.gender}</Text>
                                </View>


                            </View>
                        </View>
                    </View>
                )
                : null
            }
        </View>
    )
}