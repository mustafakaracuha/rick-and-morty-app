import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function FavoriteInfo({ favorites, selectedTab, onAddFavorite }) {
    if (favorites.length > 0 || selectedTab === "All") return null;

    return (
        <View style={styles.infoContainer}>
            <Icon name="staro" size={40} color={"#FCC737"} />
            <Text style={styles.infoText}>You have not added a favorite card yet!</Text>
            <Text style={styles.subInfoText}>Select cards to add them to your favorites and get faster access.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    infoContainer: {
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#F5F5F5",
        padding: 20,
        borderRadius: 12,
        margin: 20,
    },
    infoText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#333",
        marginVertical: 15,
        textAlign: "center",
    },
    subInfoText: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: "#FFD700",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
});
