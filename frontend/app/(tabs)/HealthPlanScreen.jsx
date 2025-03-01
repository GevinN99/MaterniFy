// app/(tabs)/HealthPlanScreen.jsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

/**
 * This screen corresponds to the "Health Plan" tab. 
 * It shows a hero image and some text, 
 * matching your provided mockup.
 */
export default function HealthPlanScreen() {
  return (
    <View style={styles.container}>
      {/* Replace with your actual illustration or local asset */}
      <Image
        source={{ uri: 'https://via.placeholder.com/200' }}
        style={styles.image}
      />
      <Text style={styles.title}>Transform Your Health With</Text>
      <Text style={styles.subtitle}>Personalized Health Plan</Text>
      <Text style={styles.description}>
        Your Personalized Pregnancy Plan Starts Here
      </Text>
    </View>
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
