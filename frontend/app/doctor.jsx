import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import Stars from "react-native-stars";
import { FontAwesome } from "@expo/vector-icons";

export default function Doctor() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find Doctors</Text>
            <Text style={styles.subtitle}>Add your Doctor Details</Text>

            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search for a doctor..." placeholderTextColor="#666" />
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.doctorCard}>
                    <Text style={styles.doctorName}>Dr. Suresh Sagala</Text>
                    <Text style={styles.doctorSpecialty}>Perinatologist</Text>

                    <View style={styles.starContainer}>
                        <Text style={styles.starTitle}>Rating</Text>
                        <Stars
                            default={4.5} // Default rating
                            count={5} // Total stars
                            half={true} // Allow half stars
                            fullStar={<FontAwesome name="star" size={30} color="#FFD700" />}
                            emptyStar={<FontAwesome name="star-o" size={30} color="#D3D3D3" />}
                            halfStar={<FontAwesome name="star-half-full" size={30} color="#FFD700" />}
                        />
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/partner")}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "#F5F5F5",
    },
    scrollContainer: {
        paddingBottom: 100,
    },
    title: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        alignSelf: "flex-start",
        marginLeft: 30,
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    doctorCard: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "90%",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    doctorName: {
        fontSize: 22,
        fontWeight: "bold",
    },
    doctorSpecialty: {
        fontSize: 18,
        color: "#666",
        marginBottom: 10,
    },
    starContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    starTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 10,
    },
    nextButton: {
        backgroundColor: "#64A8F1",
        width: "90%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        position: "absolute",
        bottom: 20,
    },
    nextButtonText: {
        fontSize: 20,
        color: "#FFFF",
        fontWeight: "bold",
    },
});
