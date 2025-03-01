import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EpdsScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edinburgh Postnatal Depression Scale</Text>
            <Image source={require("../assets/epdsHome.jpeg")} style={styles.image} />
            <Text style={styles.text}>The Edinburgh Postnatal Depression Scale (EPDS) is a set of 10 screening questions that can indicate whether a parent has symptoms</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EpdsQuestions")}>
                <Text style={styles.buttonText}>Start Assessment</Text>
            </TouchableOpacity>
            <Text style={styles.confidential}>Your responses are confidential.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: "center", justifyContent: "center", justifyContent: "center", padding: 20, backgroundColor: "#F0F7FF" },
    title: {fontSize: 20, fontWeight: "bold", color: "#184E77", textAlign: "center", marginBottom: 10 },
    image: {width: 200, height: 200, marginBottom: 20 },
    description: {fontSize: 14, color: "#555", textAlign: "center", marginBottom: 15 },
    button: {backgroundColor: "#3B82F6", padding: 10, borderRadius: 5, width: "80%", alignItems: "center", marginTop: 20 },
    buttonText: {color: "#fff", fontSize: 16, fontWeight: "bold" },
    confidential: {marginTop: 20, fontSize: 12, color: "#888" },
});

export default EpdsScreen;