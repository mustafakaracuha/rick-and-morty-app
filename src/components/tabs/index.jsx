import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Tabs = ({ selectedTab, setSelectedTab }) => {
    const tabs = [
        { key: "All", label: "Characters" },
        { key: "Episodes", label: "Episodes" },
        { key: "Favorites", label: "Favorites" },
    ];

    return (
        <View style={styles.tabContainer}>
            {tabs.map((tab) => (
                <TouchableOpacity key={tab.key} style={[styles.activeTab, selectedTab === tab.key && styles.tabText]} onPress={() => setSelectedTab(tab.key)}>
                    <Text style={[styles.tabText, selectedTab === tab.key && styles.activeTab]}>{tab.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: "row",
        gap: 15,
        padding: 24,
        backgroundColor: "#fff",
    },
    tabText: {
        fontSize: 19,
        color: "#999",
    },
    activeTab: {
        color: "#000",
        fontWeight:500
    },
});

export default Tabs;
