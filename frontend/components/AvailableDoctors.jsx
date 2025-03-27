import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import { getAvailableDoctors } from "../api/doctorApi";

export default function AvailableDoctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            const data = await getAvailableDoctors();
            setDoctors(data);
            setLoading(false);
        };
        fetchDoctors();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#38BDF8" style={{ marginTop: 20 }} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Doctors</Text>
            <FlatList
                data={doctors}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.profileImage }} style={styles.image} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.fullName}</Text>
                            <Text style={styles.specialization}>{item.specialization}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 2 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: "bold" },
    specialization: { fontSize: 14, color: "gray" },
});