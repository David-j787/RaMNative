import React, {useState, useEffect} from 'react';

import { 
    Text, 
    View, 
    FlatList, 
    Image, 
    StyleSheet, 
    TouchableWithoutFeedback,
    Dimensions 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Home(){

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
    }, []);

    const styles = StyleSheet.create({
        cardContainer: {
            width: "33%",
            margin: 1
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
            backgroundColor: "rgba(52, 52, 52, 0.9)"
        },
        cardContainer: {
            position: "absolute",
            top: windowHeight/8,
            left: windowWidth/18,
            zIndex: 2,
            backgroundColor: "white",
            width: 350,
            height: 425,
            borderRadius: 15,
            elevation: 50
        },
        imageCard: {
            height: "80%",
            width: "100%",

        },
        titles: {
            fontSize: 18,
            fontWeight: "600",
            paddingLeft: 2
        },
        topCard: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingLeft: 8,
            paddingRight: 8,
            padding: 2
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
        <View>
            <FlatList
            numColumns={3}
            style={styles.container}
            data={characters}
            onEndReached={getCharacters}
            onEndReachedThreshold={0.01}
            renderItem={({item: c}) => (
                <TouchableWithoutFeedback
                delayPressIn={150}
                onPressIn={() => setInfoCharacter({
                    name: c.name,
                    image: c.image,
                    gender: c.gender,
                    status: c.status
                })}
                onPressOut={() => setInfoCharacter(null)}
                style={styles.cardContainer} 
                key={c.id}
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
                                    <Ionicons name='person-circle' size={26}/>
                                    <Text
                                    style={styles.titles}
                                    >{infoCharacter.name}</Text>

                                </View>

                                <View
                                style={styles.topCard}
                                >
                                    <Ionicons name='transgender' size={26}/>
                                    <Text
                                    style={styles.titles}
                                    >{infoCharacter.gender}</Text>
                                </View>

                            </View>

                            <Image 
                            style={styles.imageCard}
                            source={{uri: infoCharacter.image}}
                            />
                            <View
                            style={styles.bottomCard}
                            >
                                <Ionicons name='pulse' size={26}/>
                                <Text
                                style={styles.titles}
                                >{infoCharacter.status}</Text>
                            </View>
                        </View>
                    </View>
                )
                : null
            }
        </View>
    )
}