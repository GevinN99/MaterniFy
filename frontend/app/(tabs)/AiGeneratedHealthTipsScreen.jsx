// app/(tabs)/AiGeneratedHealthTipsScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * This screen shows AI-generated health tips.
 * It includes multiple "cards" with tips 
 * matching your "Hi, Sarah!" design concept.
 */
export default function AiGeneratedHealthTipsScreen() {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
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
    tipTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 5,
    },
    tipText: {
      fontSize: 14,
      lineHeight: 20,
      color: '#555',
    },
  });