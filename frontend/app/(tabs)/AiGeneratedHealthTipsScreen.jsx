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