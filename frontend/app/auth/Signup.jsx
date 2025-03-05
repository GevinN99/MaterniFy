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
import uploadImage from "../../utils/uploadImage";
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
        role: "mother", // Default role
        languagePreference: "English",
        profileImage: "",
    });

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

        try {
            let imageUrl = formData.profileImage;
            if (image) {
                imageUrl = await uploadImage(image, "profile_pics"); // Upload to profile_pics folder
            }

            const response = await registerUser({ ...formData, profileImage: imageUrl });

            if (response.token) {
                await AsyncStorage.setItem("token", response.token);
                router.replace("/auth/Login"); // Redirect to Login Page after signup
            } else {
                Alert.alert("Signup Failed", response.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            Alert.alert("Signup Error", error.message || "Please try again!");
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
});
