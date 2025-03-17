// app/(tabs)/AiGeneratedHealthTipsScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

/**
 * AiGeneratedHealthTipsScreen
 * ---------------------------------------
 * This screen:
 *  - Shows a greeting + existing medical conditions
 *  - Contains two tip cards (expand/collapse)
 *  - Allows user to edit conditions (placeholder)
 *  - Has a GO BACK button to navigate to Home
 */
export default function AiGeneratedHealthTipsScreen() {
  const router = useRouter();

  // Example function triggered when user taps the edit icon
  const handleEditConditions = () => {
    console.log('Edit existing medical conditions');
  };

  // States for tip card expansion
  const [isCard1Expanded, setIsCard1Expanded] = useState(false);
  const [isCard2Expanded, setIsCard2Expanded] = useState(false);

  // Toggle functions
  const toggleCard1 = () => setIsCard1Expanded(!isCard1Expanded);
  const toggleCard2 = () => setIsCard2Expanded(!isCard2Expanded);

  return (
    <LinearGradient colors={['#FFF', '#E8F4FA']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Greeting */}
        <Text style={styles.heading}>✨ Hi, Sarah!</Text>
        <Text style={styles.introText}>
          Let’s take a moment to care for you and your baby today
        </Text>

        {/* Existing Medical Conditions row */}
        <View style={styles.conditionsContainer}>
          <Text style={styles.conditionsTitle}>Existing Medical Conditions</Text>
          <TouchableOpacity onPress={handleEditConditions} style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Single condition bullet (red) */}
        <Text style={styles.conditionBullet}>
          <Text style={styles.redText}>🩸 High Blood Pressure</Text>
        </Text>

        {/* Tip Card 1: High Blood Pressure */}
        <View style={styles.tipCard}>
          {/* Card Header: Title + Show More/Less */}
          <TouchableOpacity onPress={toggleCard1} style={styles.cardHeader}>
            <Text style={styles.tipTitle}>🩸 High Blood Pressure Warning</Text>
            <Text style={styles.showToggleText}>
              {isCard1Expanded ? 'Show less' : 'Show more'}
            </Text>
          </TouchableOpacity>

          {/* Base tip text always visible */}
          <Text style={styles.tipText}>
            Your blood pressure is above normal.
            Reduce processed foods, monitor regularly,
            and consult your doctor if it remains high.
          </Text>

          {/* Extra details only visible if expanded */}
          {isCard1Expanded && (
            <Text style={styles.tipExtra}>
              Additional Info: Consider checking your blood pressure at the same time each day.
              Relax for at least 5 minutes before measuring. Keep track of readings to share with your doctor.
            </Text>
          )}
        </View>

        {/* Tip Card 2: Iron Levels */}
        <View style={styles.tipCard}>
          <TouchableOpacity onPress={toggleCard2} style={styles.cardHeader}>
            <Text style={styles.tipTitle}>⚡ Boost Your Iron Levels!</Text>
            <Text style={styles.showToggleText}>
              {isCard2Expanded ? 'Show less' : 'Show more'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.tipText}>
            Try iron-rich foods (like spinach, lentils) with vitamin C for better absorption.
          </Text>

          {isCard2Expanded && (
            <Text style={styles.tipExtra}>
              Additional Info: Red meat, beans, and fortified cereals are also excellent sources of iron.
              Avoid drinking tea or coffee with meals, as they can reduce iron absorption.
            </Text>
          )}
        </View>

         {/* GO BACK to HealthPlanScreen */}
         <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/HealthPlanScreen')}
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
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  introText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
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
  conditionBullet: {
    fontSize: 14,
    marginBottom: 20,
  },
  redText: {
    color: 'red',
  },
  tipCard: {
    backgroundColor: '#CAF4FF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  // Card header row: Title + Show More
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    color: '#007AFF',
  },
  showToggleText: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 10,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 4,
  },
  tipExtra: {
    fontSize: 13,
    lineHeight: 18,
    color: '#333',
    marginTop: 6,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
