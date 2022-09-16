import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';


export default function Home(){

    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);

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
        container: {
            flex: 1,
            
        },
        cardContainer: {
            width: "33%",
            margin: 1
        },
        name: {
        },
        image: {
            width:  "100%",
            height: 130
        }
    })
    
    return(
        <FlatList
        
        numColumns={3}
        style={styles.container}
        data={characters}
        onEndReached={getCharacters}
        onEndReachedThreshold={0.01}
        renderItem={({item: c}) => (
            <View style={styles.cardContainer} key={c.id}>
                
                <Image
                style={styles.image}
                source={{uri: c.image}}
                />
            </View>
        )} 
        />
    )
}