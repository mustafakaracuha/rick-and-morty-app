import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import HighlightCharacterCard from "../src/components/highlightCharacterCard";
import AllCards from "../src/components/allCard";

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.higlightContainer}>
                    <Text style={styles.higlightText}>Highlights</Text>
                    <Icon name="search" size={27} color="black" />
                </View>
                <HighlightCharacterCard />
                <AllCards />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    higlightContainer: {
        width: "100%",
        height: "auto",
        alignItems: "start",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },
    higlightText: {
        fontWeight: 600,
        fontSize: 24,
    },
});
