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