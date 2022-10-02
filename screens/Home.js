import React, {useState, useEffect} from 'react';
import Constants  from 'expo-constants';
import { 
    Text, 
    View, 
    FlatList, 
    Image, 
    StyleSheet, 
    TouchableWithoutFeedback,
    Dimensions,
    StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Home(){

    const navigation = useNavigation();

    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [infoCharacter, setInfoCharacter] = useState(null);


    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const getCharacters = async () => {
        const characters = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const json = await characters.json();
        if(json.results){
            setCharacters(prev => [...prev, ...json.results]);
            setPage(prev => prev + 1);
        }else return;
    }

    useEffect(() => {
        getCharacters();
        navigation.setOptions({
            headerTitle: "R&M's Wiki",
            headerSearchBarOptions: {
                placeholder: "Search...",
                textColor: "white",
                hintTextColor: "white",
                headerIconColor: "white"
            },
        })
    }, [navigation]);

    const styles = StyleSheet.create({
        wholeContainer: {
            // marginTop: Constants.statusBarHeight
            backgroundColor: "#100F0F"
        },
        name: {
        },
        image: {
            width:  130,
            height: 130
        },
        //cardOpacitty
        bluryBackGroundCard: {
            position: "absolute",
            zIndex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(52, 52, 52, 0.8)"
        },
        cardContainer: {
            position: "absolute",
            top: windowHeight/5,
            left: windowWidth/18,
            zIndex: 2,
            backgroundColor: "#100F0F",
            width: 350,
            height: 425,
            borderRadius: 15,
            elevation: 50,
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
        <View style={styles.wholeContainer}>
            <StatusBar
            backgroundColor={"#100F0F"}
            />
            <FlatList
            
            numColumns={3}
            style={styles.container}
            data={characters}
            onEndReached={getCharacters}
            onEndReachedThreshold={0.01}
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
                    <Image
                    style={styles.image}
                    source={{uri: c.image}}
                    />
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