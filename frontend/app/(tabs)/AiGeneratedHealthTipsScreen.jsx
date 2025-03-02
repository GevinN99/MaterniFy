// app/(tabs)/AiGeneratedHealthTipsScreen.jsx
import React from 'react';
import { View, Text, StyleSheet , ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';



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
  const navigation = useNavigation();
   // Example function triggered when user taps the edit icon
   const handleEditConditions = () => {
    // Implement your edit logic here
    console.log('Edit existing medical conditions');
  };

  return (
    <LinearGradient
      colors={['#FFF', '#E8F4FA']}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
      {/* Greeting / heading */}
       {/* Main Greeting */}
       <Text style={styles.heading}>✨ Hi, Sarah!</Text>
        <Text style={styles.introText}>
          Let’s take a moment to care for you and your baby today
        </Text>
       
        {/* Row: "Existing Medical Conditions" + Edit Button */}
        <View style={styles.conditionsContainer}>
          <Text style={styles.conditionsTitle}>Existing Medical Conditions</Text>
          <TouchableOpacity onPress={handleEditConditions} style={styles.editButton}>
            {/* Replace with your chosen icon */}
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View> 
        
       {/* Single condition bullet (red) */}
       <Text style={styles.conditionBullet}>
          <Text style={styles.redText}>🩸 High Blood Pressure</Text>
        </Text>

      {/* Tip Card 1 */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>🩸 High Blood Pressure Warning</Text>
        <Text style={styles.tipText}>
          Your blood pressure is above normal. 
          Reduce processed foods, monitor regularly,
          and consult your doctor if it remains high.
        </Text>
      </View>
       {/* Tip Card 2 */}
       <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>⚡Boost Your Iron Levels!</Text>
        <Text style={styles.tipText}>
          Try iron-rich foods (like spinach, lentils) with vitamin C 
          for better absorption.
        </Text>
      </View>

       {/* "GO BACK" button -> navigate to Home (HealthPlanScreen) */}
       <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')} // 3) navigate to "Home"
        >
          <Text style={styles.buttonText}>GO BACK</Text>
        </TouchableOpacity>

    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    padding: 20,
    // This ensures content can scroll on smaller devices
  },
  // Greeting "✨ Hi, Sarah!"
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  // Subheading under the main greeting
  introText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  // Row for "Existing Medical Conditions" + edit icon
  conditionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  conditionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  editButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  editText: {
    fontSize: 14,
    color: '#007AFF',
  },
  // Single bullet item (🩸 High Blood Pressure)
  conditionBullet: {
    fontSize: 14,
    marginBottom: 20,
  },
  // Red text for "High Blood Pressure"
  redText: {
    color: 'red',
  },
  // Tip Card style
  tipCard: {
    backgroundColor: '#E8F4FA',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    // Light shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Elevation for Android
    elevation: 2,
  },
  // Title within each tip card
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    color: '#007AFF',
  },
  // Main text in the tip card
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 4,
  },
  // "Tip:" line for extra advice
  tipNote: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center', // center horizontally
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});