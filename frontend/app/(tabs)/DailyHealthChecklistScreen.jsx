// app/(tabs)/DailyHealthChecklistScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

/**
 * This screen represents the Daily Health Checklist.
 * Each item is toggled with a Switch to show completion.
 */
export default function DailyHealthChecklistScreen() {
  // State variables to track if the user has completed each task
  const [hydration, setHydration] = useState(false);
  const [physicalActivity, setPhysicalActivity] = useState(false);
  const [prenatalCare, setPrenatalCare] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Daily Health Checklist</Text>

      {/* Each item is a row with a Switch and label text */}
      <View style={styles.checkItem}>
        <Switch value={hydration} onValueChange={setHydration} />
        <Text style={styles.checkText}>
          Hydration Reminder: 8+ glasses of water
        </Text>
      </View>

      <View style={styles.checkItem}>
        <Switch value={physicalActivity} onValueChange={setPhysicalActivity} />
        <Text style={styles.checkText}>
          Physical Activity: 1 walk a day
        </Text>
      </View>

      <View style={styles.checkItem}>
        <Switch value={prenatalCare} onValueChange={setPrenatalCare} />
        <Text style={styles.checkText}>
          Prenatal Care: Take prenatal vitamins
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
    title: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 20,
      textAlign: 'center',
    },
    checkItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    checkText: {
      marginLeft: 10,
      fontSize: 14,
      color: '#333',
    },
  });