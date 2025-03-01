// app/(tabs)/AiGeneratedHealthTipsScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * AiGeneratedHealthTipsScreen Component
 * ---------------------------------------
 * This screen displays AI-generated health tips.
 * It includes:
 *   - A greeting header ("Hi, Sarah!")
 *   - A subheading listing existing medical conditions
 *   - Two "tip cards" each containing a title and description
 * 
 * Enhancements:
 *   - A gradient background for a modern look.
 *   - ScrollView wraps the content to ensure it’s scrollable on smaller devices.
 *   - Each tip card has a white background with rounded corners and shadows.
 */
export default function AiGeneratedHealthTipsScreen() {
  return (
    <LinearGradient
      colors={['#FFF', '#E8F4FA']}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
      {/* Greeting / heading */}
      <Text style={styles.heading}>Hi, Sarah!</Text>
      <Text style={styles.subheading}>Existing Medical Conditions:</Text>
      <Text style={styles.condition}>• High Blood Pressure</Text>

      {/* Tip Card 1 */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>High Blood Pressure Warning</Text>
        <Text style={styles.tipText}>
          Your blood pressure is above normal. 
          Reduce processed foods, monitor regularly,
          and consult your doctor if it remains high.
        </Text>
      </View>
       {/* Tip Card 2 */}
       <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Boost Your Iron Levels!</Text>
        <Text style={styles.tipText}>
          Try iron-rich foods (like spinach, lentils) with vitamin C 
          for better absorption.
        </Text>
      </View>
    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
      },
       // ScrollView content container styling
  container: {
    flexGrow: 1,
    backgroundColor: 'transparent', // Let LinearGradient show through
    padding: 20,
    justifyContent: 'center',
  },
    heading: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 10,
      textAlign: 'center',
    },
    subheading: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 5,
    },
    condition: {
      fontSize: 14,
      marginBottom: 15,
      color: '#333',
    },
    tipCard: {
      backgroundColor: '#E8F4FA', // Light background for the card
      padding: 15,
      borderRadius: 8,
      marginBottom: 15,
    },
     // Tip title style, with emphasis and accent color
  tipTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#007AFF',
  },
  // Tip text style for the card description
  tipText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
  },
  });