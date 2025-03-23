import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import axiosInstance from '../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AiGeneratedHealthTipsScreen() {
  const router = useRouter();
  const [healthPlan, setHealthPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateAndFetchHealthPlan = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      await axiosInstance.post('/health-plans/generate', {});
      console.log('Health plan generated successfully');

      const response = await axiosInstance.get('/health-plans/');
      setHealthPlan(response.data);
    } catch (err) {
      console.error("Error in health plan process:", err.response?.data || err.message);
      setError("Failed to generate or fetch health plan.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to render nested JSON content
  const renderPlanSection = (section, title) => {
    if (!section) return null;

    return (
        <View>
          <Text style={styles.sectionTitle}>{title}</Text>
          {Object.entries(section).map(([key, value]) => (
              <View key={key} style={styles.subSection}>
                <Text style={styles.subSectionTitle}>{key.replace(/_/g, ' ').toUpperCase()}</Text>
                {typeof value === 'object' ? (
                    Object.entries(value).map(([subKey, subValue]) => (
                        <Text key={subKey} style={styles.healthPlanText}>
                          {`${subKey.replace(/_/g, ' ')}: ${subValue}`}
                        </Text>
                    ))
                ) : (
                    <Text style={styles.healthPlanText}>{value}</Text>
                )}
              </View>
          ))}
        </View>
    );
  };

  return (
      <LinearGradient colors={['#FFF', '#FCFCFC']} style={styles.gradientContainer}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>✨ Hi, Mom!</Text>
          <Text style={styles.introText}>
            Let’s take a moment to care for you and your baby today
          </Text>

          <TouchableOpacity
              style={styles.conditionsContainer}
              onPress={generateAndFetchHealthPlan}
              disabled={loading}
          >
            <Text style={styles.conditionsTitle}>Your AI-Generated Health Plan</Text>
          </TouchableOpacity>

          {loading ? (
              <ActivityIndicator size="large" color="#007AFF" />
          ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
          ) : healthPlan ? (
              <View style={styles.healthPlanContainer}>
                {(() => {
                  const planDetails = JSON.parse(healthPlan.planDetails);
                  return (
                      <>
                        {renderPlanSection(planDetails.diet, 'Diet')}
                        {renderPlanSection(planDetails.exercise, 'Exercise')}
                        {renderPlanSection(planDetails.medical_recommendations, 'Medical Recommendations')}
                      </>
                  );
                })()}
              </View>
          ) : (
              <Text style={styles.noPlanText}>Click above to generate your health plan.</Text>
          )}

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
  heading: { fontSize: 24, fontWeight: '700', marginBottom: 8, textAlign: 'center', color: '#333333' },
  introText: { fontSize: 14, fontWeight: '400', color: '#555', textAlign: 'center', marginBottom: 20 },
  conditionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    padding: 10,
    backgroundColor: '#E0F7FF',
    borderRadius: 8
  },
  conditionsTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  healthPlanContainer: { backgroundColor: '#CAF4FF', padding: 15, borderRadius: 8, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#007AFF', marginTop: 15, marginBottom: 5 },
  subSection: { marginLeft: 10, marginBottom: 10 },
  subSectionTitle: { fontSize: 14, fontWeight: '500', color: '#333', marginBottom: 2 },
  healthPlanText: { fontSize: 13, color: '#333', lineHeight: 18 },
  noPlanText: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 10 },
  errorText: { color: 'red', fontSize: 14, textAlign: 'center', marginBottom: 10 },
  button: { backgroundColor: '#B4E4FF', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25, alignSelf: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});