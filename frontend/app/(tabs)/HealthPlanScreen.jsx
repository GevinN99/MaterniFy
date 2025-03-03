// app/(tabs)/HealthPlanScreen.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import helthplanImg from '../../assets/images/helthplan1.png';

export default function HealthPlanScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#64B9F1', '#FFFFFF']} // Gradient from light blue to white
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {/* Circular container for the illustration */}
        <View style={styles.imageContainer}>
          <Image source={helthplanImg} style={styles.image} />
        </View>

        <Text style={styles.smallTitle}>Transform Your Health With</Text>
        <Text style={styles.bigTitle}>Personalized Health Plan</Text>
        <Text style={styles.description}>
          Your Personalized Pregnancy Plan Starts Here
        </Text>

        {/* "GET STARTED" button -> navigates to the hidden AiTips tab */}
        <Pressable
          onPress={() => navigation.navigate('AiTips')}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            GET STARTED <Ionicons name="arrow-forward" size={16} color="#fff" />
          </Text>
        </Pressable>

        {/* "Daily Health Check" button -> navigates to the Daily Health Checklist screen */}
        <Pressable
          onPress={() => navigation.navigate('Checklist')}
          style={({ pressed }) => [
            styles.button,
            styles.dailyButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            Daily Health Check 
          </Text>
        </Pressable>
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
  // Smaller title text
  smallTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  // Larger title text
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
  // Base button style
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'center',
  },
  // Additional spacing for the second button
  dailyButton: {
    marginTop: 20,
  },
  // Pressed style for slight feedback
  buttonPressed: {
    transform: [{ scale: 0.95 }], // slightly shrink on press
  },
  // Button text
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
