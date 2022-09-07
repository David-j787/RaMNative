import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';


export default function Home(){

    const [characters, setCharacters] = useState(null);

    const getCharacters = async () => {
        const characters = await fetch("https://rickandmortyapi.com/api/character");
        const a = await characters.json();
        setCharacters(a.results);
    }

    useEffect(() => {
        getCharacters();
    }, []);

    const styles = StyleSheet.create({
        container: {
            
        },
        name: {
        },
        image: {
            width: 200,
            height: 200
        }
    })
    
    return(
        <FlatList
        style={styles.container}
        data={characters}
        renderItem={({item: c}) => (
            <View key={c.id}>
                <Text style={styles.name}>{c.name}</Text>
                <Image
                style={styles.image}
                source={{uri: c.image}}
                />
            </View>
        )} 
        />
    )
}