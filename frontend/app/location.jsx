import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";

export default function Location() {
    const router = useRouter();
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>


            <Text>1 / 3</Text>
            <Text style={styles.title}>Location</Text>
            <Text style={styles.subtitle}>Add your Home Address</Text>

            <Text style={styles.label}>Full Name*</Text>
            <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" />

            <Text style={styles.label}>House Number*</Text>
            <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" />

            <Text style={styles.label}>Street Name*</Text>
            <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" keyboardType="email-address" />

            <Text style={styles.label}>Village (If you are far from the Nearest City)</Text>
            <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" keyboardType="phone-pad" />

            <Text style={styles.label}>City*</Text>
            <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#666" />

            <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/doctor")}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    container: {
        flex: 1,
        backgroundColor: "#E7EDEF",
        padding: 10,
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
    },
    subtitle: {
        margin: 15,
        fontSize: 24,
        alignSelf: "flex-start",
        marginLeft: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 1000,
        marginTop: 10,
        alignSelf: "flex-start",
        marginLeft: 20,
    },
    input: {
        width: "90%",
        height: 50,
        borderColor: "#007AFF",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "#fff",
        marginBottom: 15,
    },
    nextButton: {
        backgroundColor: "#64A8F1",
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 40,
        paddingVertical: 10,
        alignSelf: "center",
    },
    nextButtonText: {
        fontSize: 28,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});
