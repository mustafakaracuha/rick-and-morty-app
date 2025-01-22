import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";

import { fetchData } from "@/src/api/apiCalls";

export default function index() {
    const [populerCharacters, setPopulerCharacters] = useState([]);

    useEffect(() => {
        const fetchPopulerCharacters = async () => {
            try {
                const data = await fetchData("/character");
                const popularCharacters = data.results.filter((character) =>
                    ["Rick Sanchez", "Morty Smith", "Beth Smith", "Summer Smith", "Jerry Smith", "Adjudicator Rick", "Tammy Guetermann", "Alan Rails", "Albert Einstein", "Abradolf Lincler"].includes(
                        character.name
                    )
                );
                setPopulerCharacters(popularCharacters);
            } catch (error) {
                console.error("Veri alınırken hata oluştu:", error);
            }
        };

        fetchPopulerCharacters();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent} showsHorizontalScrollIndicator={false}>
                {populerCharacters.map((character) => (
                    <View key={character.id} style={styles.card}>
                        <Image style={styles.characterImage} source={{ uri: character.image }} />
                        <Text style={styles.cardText}>{character.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "35%",
        flexDirection: "row",
        paddingLeft: 5,
        backgroundColor: "white",
    },
    scrollViewContent: {
        alignItems: "center",
        paddingHorizontal: 15,
    },
    card: {
        width: 170,
        height: 270,
        borderRadius: 20,
        overflow: "hidden",
        marginRight: 20,
    },
    cardText: {
        position: "absolute",
        left: 5,
        bottom: 15,
        fontSize: 24,
        color: "white",
        fontWeight: 600,
    },
    characterImage: {
        flex: 1,
    },
});
