// app/(tabs)/HealthPlanScreen.jsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
// Import LinearGradient from Expo for a smooth gradient background
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Enhanced HealthPlanScreen Component
 * -------------------------------------
 * This screen is part of the "Health Plan" tab.
 * It displays a hero image, titles, description, and a call-to-action button,
 * all styled within a card-like container over a gradient background.
 */


export default function HealthPlanScreen() {
  return (
     <LinearGradient
      colors={['#E0F3FF', '#FFFFFF']}  // Gradient from light blue to white
      style={styles.gradientContainer}
    >
    <View style={styles.container}>
      {/* Replace with your actual illustration or local asset */}
      <Image
        source={{ uri: 'frontend/assets/images/helthplan1.png' }}
        style={styles.image}
      />
      <Text style={styles.title}>Transform Your Health With</Text>
      <Text style={styles.subtitle}>Personalized Health Plan</Text>
      <Text style={styles.description}>
        Your Personalized Pregnancy Plan Starts Here
      </Text>
    </View>
    </LinearGradient>
  );
}

// Basic styles to mimic your UI design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F3FF', // Light blue background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#555',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
