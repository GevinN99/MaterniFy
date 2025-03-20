import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { registerUser } from "../../api/authApi";
import { uploadImageToFirebase } from "../../utils/firebaseImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Signup() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "mother",
        languagePreference: "English",
        profileImage: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Pick an Image from Gallery
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Handle Signup Submission
    const handleSignup = async () => {
        if (!formData.fullName || !formData.email || !formData.password) {
            Alert.alert("Please fill in all fields!");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {
            let imageUrl = formData.profileImage;

            // If the user selects an image, upload it to Firebase and get the URL
            if (image) {
                imageUrl = await uploadImage(image, "profile_pics");
            } else {
                // If no image is selected, use the default image URL
                imageUrl = "https://www.w3schools.com/w3images/avatar2.png";
            }

            // Register the user with the data
            const response = await registerUser({ ...formData, profileImage: imageUrl });

            // Handle successful response
            if (response.token) {
                await AsyncStorage.setItem("token", response.token);
                setSuccessMessage("Account created successfully!");

                // Wait for 2 seconds to show success message before redirecting
                setTimeout(() => {
                    router.replace("/auth/Login");
                }, 2000);
            } else {
                setErrorMessage(response.message || "Signup failed!");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setErrorMessage(error.message || "Please try again!");
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an Account</Text>

            <TouchableOpacity onPress={pickImage}>
                <Image
                    source={{
                        uri: image || "https://www.w3schools.com/w3images/avatar2.png",
                    }}
                    style={styles.profileImage}
                />
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={formData.fullName}
                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                keyboardType="email-address"
                onChangeText={(text) => setFormData({ ...formData, email: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={formData.password}
                secureTextEntry
                onChangeText={(text) => setFormData({ ...formData, password: text })}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
                {loading ? <LoadingSpinner /> : <Text style={styles.buttonText}>Sign Up</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/auth/Login")}>
                <Text style={styles.link}>Already have an account? Log in</Text>
            </TouchableOpacity>

            {successMessage && (
                <Text style={styles.successMessage}>{successMessage}</Text>
            )}

            {errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", paddingVertical: 30, backgroundColor: "#F5F5F5" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    input: { width: "90%", padding: 12, borderWidth: 1, borderColor: "#ccc", marginBottom: 10, borderRadius: 8 },
    button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 10, width: "90%", alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "bold" },
    link: { marginTop: 10, color: "#007AFF" },
    profileImage: { width: 80, height: 80, borderRadius: 50, marginBottom: 20, borderWidth: 2, borderColor: "#ccc" },
    successMessage: { color: "green", fontSize: 18, marginTop: 20 },
    errorMessage: { color: "red", fontSize: 18, marginTop: 20 },
});
