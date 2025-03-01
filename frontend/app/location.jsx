import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";

export default function Location() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nearest Hospital</Text>
            <Text style={styles.subtitle}>Add your Home Address</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for a location..."
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/doctor")}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 20,
    },
    title: {
        fontSize: 50,
        fontWeight: "bold",
    },
    subtitle: {
        margin: 20,
        fontSize: 30,
        alignSelf: "flex-start",
        marginLeft: 30,
    },
    searchContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
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
    nextButton: {
        backgroundColor: "#64A8F1",
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 40,
        paddingVertical: 15,
        position: "absolute",
        bottom: 50,
    },
    nextButtonText: {
        fontSize: 30,
        color: "#FFFF",
    },
});
