// app/(tabs)/HealthPlanScreen.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// Import LinearGradient from Expo for a smooth gradient background
import { LinearGradient } from 'expo-linear-gradient';


export default function HealthPlanScreen() {
  return (
    <LinearGradient
      colors={['#E0F3FF', '#FFFFFF']} // Gradient from light blue to white
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {/* Circular container for the illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: '@/assets/images/helthplan1.png' }}
            style={styles.image}
          />
        </View>

        {/* Smaller title text */}
        <Text style={styles.smallTitle}>Transform Your Health With</Text>

        {/* Larger main title text */}
        <Text style={styles.bigTitle}>Personalized Health Plan</Text>

        {/* Description text */}
        <Text style={styles.description}>
          Your Personalized Pregnancy Plan Starts Here
        </Text>

        {/* Call-to-action button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  // Main container: center content vertically & horizontally
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  // Circular container for the illustration
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100, // half the width/height
    overflow: 'hidden', // ensures image is clipped to circle
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  // The image fills the circular container
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // Smaller title text (e.g., "Transform Your Health With")
  smallTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  // Larger title text (e.g., "Personalized Health Plan")
  bigTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  // Description text
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  // "GET STARTED" button
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  // Button text
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
