import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Animated } from "react-native";
import { fetchData } from "@/src/api/apiCalls";

export default function Episodes() {
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const fetchEpisodes = async (pageNum) => {
        setLoading(true);
        try {
            const data = await fetchData(`/episode/?page=${pageNum}`);
            setEpisodes((prev) => [...prev, ...data.results]);
        } catch (error) {
            console.error("Bölümler alınırken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (page > 0 && page < 3) {
            fetchEpisodes(page);
        }
    }, [page]);

    const handleLoadMore = () => {
        if (!loading && page <= 3) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const renderEpisode = ({ item }) => (
        <View style={styles.episodeCard}>
            <Text style={styles.episodeName}>{item.name}</Text>
            <Text style={styles.episodeDetails}>{item.air_date}</Text>
            <Text style={styles.episodeDetails}>{item.episode}</Text>
        </View>
    );

    return (
        <FlatList
            data={episodes}
            renderItem={renderEpisode}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            contentContainerStyle={styles.listContainer}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 10,
    },
    episodeCard: {
        width: "95%",
        backgroundColor: "#F5F5F7",
        padding: 15,
        marginLeft: 10,
        borderRadius: 20,
        marginBottom: 20,
        gap: 5,
    },
    episodeName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#31363F",
    },
    episodeDetails: {
        fontSize: 14,
        color: "#626770",
    },
});
