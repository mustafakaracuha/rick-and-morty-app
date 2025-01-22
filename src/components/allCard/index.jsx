import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/AntDesign";

import { fetchData } from "@/src/api/apiCalls";
import CharacterModal from "../modal/characterModal";
import FavoriteInfo from "../favoriteInfo";
import Tabs from "../tabs";
import Episodes from "../episodes";

export default function Index() {
    const [characters, setCharacters] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState("All");

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem("favorites");
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            } else {
                setFavorites([]);
            }
        } catch (error) {
            console.error("Favoriler alınırken hata oluştu:", error);
        }
    };

    const toggleFavorite = async (character) => {
        let updatedFavorites;
        if (favorites.some((fav) => fav.id === character.id)) {
            updatedFavorites = favorites.filter((fav) => fav.id !== character.id);
        } else {
            updatedFavorites = [...favorites, character];
        }
        setFavorites(updatedFavorites);
        setSelectedTab("Favorites");
        try {
            await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error("Favoriler kaydedilirken hata oluştu:", error);
        }
    };

    const fetchCharacters = async (pageNum) => {
        try {
            const data = await fetchData(`/character/?page=${pageNum}`);
            setCharacters((prev) => [...prev, ...data.results]);
        } catch (error) {
            console.error("Veri alınırken hata oluştu:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchCharacters(page);
        loadFavorites();
    }, [page]);

    const handleLoadMore = () => {
        if (!loadingMore) {
            setLoadingMore(true);
            setPage((prevPage) => prevPage + 1);
        }
    };

    const openModal = (character) => {
        setSelectedCharacter(character);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setSelectedCharacter(null);
        setIsModalVisible(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.card}>
                <Image style={styles.characterImage} source={{ uri: item.image }} />
                <View style={styles.textContainer}>
                    <Text style={styles.cardText}>{item.name}</Text>
                    <View style={styles.infoText}>
                        {item.status !== "unknown" && <Text style={styles.statusText}>{item.status}</Text>}
                        {item.species !== "unknown" && <Text style={styles.speciesText}>{item.species}</Text>}
                    </View>
                </View>
                <TouchableOpacity style={styles.favoriteIcon} onPress={() => toggleFavorite(item)}>
                    <Icon name={favorites.some((fav) => fav.id === item.id) ? "star" : "staro"} size={24} color={favorites.some((fav) => fav.id === item.id) ? "#FCC737" : "gray"} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const filteredData = selectedTab === "All" ? characters : favorites;

    return (
        <>
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {favorites.length >= 0 && selectedTab !== "All" && selectedTab !== "Episodes" && <FavoriteInfo favorites={favorites} />}
            {selectedTab !== "Episodes" && (
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={selectedTab === "All" ? handleLoadMore : null}
                    onEndReachedThreshold={0.5}
                    contentContainerStyle={styles.scrollViewContent}
                />
            )}
            {selectedTab === "Episodes" && <Episodes />}
            <CharacterModal visible={isModalVisible} onClose={closeModal} character={selectedCharacter} />
        </>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        paddingHorizontal: 10,
    },
    card: {
        width: "90%",
        height: 100,
        marginLeft: 30,
        borderRadius: 20,
        marginBottom: 20,
        backgroundColor: "#F5F5F7",
        position: "relative",
        alignItems: "start",
        justifyContent: "center",
    },
    textContainer: {
        flex: 1,
        marginTop: 14,
        marginLeft: 75,
    },
    cardText: {
        fontSize: 16,
        color: "#31363F",
        fontWeight: "600",
        marginBottom: 5,
    },
    statusText: {
        padding: 8,
        textAlign: "center",
        backgroundColor: "#7E8EF1",
        fontSize: 13,
        marginTop: 5,
        borderRadius: 10,
        color: "white",
    },
    speciesText: {
        padding: 8,
        textAlign: "center",
        backgroundColor: "#A7D397",
        fontSize: 13,
        marginTop: 5,
        borderRadius: 10,
        color: "white",
    },
    infoText: {
        flexDirection: "row",
        gap: 10,
    },
    characterImage: {
        width: 75,
        height: 75,
        position: "absolute",
        left: -20,
        borderRadius: 20,
    },
    favoriteIcon: {
        position: "absolute",
        top: 35,
        right: 25,
    },
    favoriteInfoText: {
        padding: 25,
        fontSize: 16,
        fontWeight: 600,
        color: "red",
    },
});
