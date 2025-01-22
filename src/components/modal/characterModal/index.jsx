import React from "react";
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function CharacterModal({ visible, onClose, character }) {
    if (!character) return null;

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Image style={styles.characterImage} source={{ uri: character.image }} />
                    <Text style={styles.characterName}>{character.name}</Text>
                    <Text style={styles.characterInfo}>
                        <Text style={styles.label}>Status:</Text> {character.status} |<Text style={styles.label}> Species:</Text> {character.species}
                    </Text>
                    <Text style={styles.characterInfo}>
                        <Text style={styles.label}>Origin:</Text> {character.origin.name}
                    </Text>
                    <Text style={styles.characterInfo}>
                        <Text style={styles.label}>Location:</Text> {character.location.name}
                    </Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContent: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    characterImage: {
        width: 200,
        height: 200,
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 4,
        borderColor: "rgb(251 191 36)",
    },
    characterName: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#31363F",
        textAlign: "center",
    },
    characterInfo: {
        fontSize: 16,
        color: "#555",
        marginBottom: 10,
        textAlign: "center",
        lineHeight: 22,
    },
    label: {
        fontWeight: "bold",
        color: "#333",
    },
    closeButton: {
        marginTop: 30,
        backgroundColor: "#7E8EF1",
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 10,
    },
    closeButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
