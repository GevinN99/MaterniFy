import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AiGeneratedHealthTipsScreen() {
  const router = useRouter();
  const [healthPlan, setHealthPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthPlan = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Retrieve auth token
        if (!token) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:8070/api/health-plans/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setHealthPlan(response.data);
      } catch (err) {
        console.error("Error fetching health plan:", err);
        setError("Failed to fetch health plan.");
      } finally {
        setLoading(false);
      }
    };

    fetchHealthPlan();
  }, []);

  return (
    <LinearGradient colors={['#FFF', '#E8F4FA']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Greeting */}
        <Text style={styles.heading}>✨ Hi, Sarah!</Text>
        <Text style={styles.introText}>
          Let’s take a moment to care for you and your baby today
        </Text>

        {/* Existing Medical Conditions */}
        <View style={styles.conditionsContainer}>
          <Text style={styles.conditionsTitle}>Your AI-Generated Health Plan</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : healthPlan ? (
          <View style={styles.healthPlanContainer}>
            <Text style={styles.healthPlanText}>{healthPlan.planDetails}</Text>
          </View>
        ) : (
          <Text style={styles.noPlanText}>No health plan available.</Text>
        )}

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
  gradientContainer: { flex: 1 },
  container: { flexGrow: 1, backgroundColor: 'transparent', padding: 20 },
  heading: { fontSize: 24, fontWeight: '700', marginBottom: 8, textAlign: 'center', color: '#333' },
  introText: { fontSize: 14, fontWeight: '400', color: '#555', textAlign: 'center', marginBottom: 20 },
  conditionsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  conditionsTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  healthPlanContainer: { backgroundColor: '#CAF4FF', padding: 15, borderRadius: 8, marginBottom: 15 },
  healthPlanText: { fontSize: 14, color: '#333', lineHeight: 20 },
  noPlanText: { fontSize: 14, color: 'red', textAlign: 'center', marginBottom: 10 },
  errorText: { color: 'red', fontSize: 14, textAlign: 'center', marginBottom: 10 },
  button: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25, alignSelf: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
