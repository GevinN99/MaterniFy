// app/(tabs)/DailyHealthChecklistScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import checklist from '../assets/images/checklist.png';


export default function DailyHealthChecklistScreen() {
  const router = useRouter();
  // State variables for each checklist item
  const [hydration, setHydration] = useState(false);
  const [physicalActivity, setPhysicalActivity] = useState(false);
  const [prenatalCare, setPrenatalCare] = useState(false);
  const [balancedDiet, setBalancedDiet] = useState(false);
  const [kegel, setKegel] = useState(false);
  const [mindfulSleep, setMindfulSleep] = useState(false);

  // Calculate progress (6 tasks total)
  const totalTasks = 6;
  const completedTasks =
    (hydration ? 1 : 0) +
    (physicalActivity ? 1 : 0) +
    (prenatalCare ? 1 : 0) +
    (balancedDiet ? 1 : 0) +
    (kegel ? 1 : 0) +
    (mindfulSleep ? 1 : 0);
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  // Determine motivational message based on progress
  let progressMessage;
  if (progressPercent === 0) {
    progressMessage = "Let's get started!";
  } else if (progressPercent < 20) {
    progressMessage = "You can do it!";
  } else if (progressPercent < 40) {
    progressMessage = "Keep going!";
  } else if (progressPercent < 60) {
    progressMessage = "Don't give up!";
  } else if (progressPercent < 80) {
    progressMessage = "Almost there!";
  } else if (progressPercent < 100) {
    progressMessage = "You're almost done!";
  } else {
    progressMessage = "Great job, complete!";
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Main title */}
      <Text style={styles.title}>Your Daily Health Checklist</Text>
      
      <View style={styles.imageContainer}>
                <Image source={checklist} style={styles.image} />
              </View>

      

      {/* Progress Message Section */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{progressMessage}</Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      

      {/* Card 1: Hydration */}
      <View style={[styles.card, styles.cardHydration]}>
        <View style={styles.row}>
          <Checkbox
            value={hydration}
            onValueChange={setHydration}
            color={hydration ? "#007AFF" : undefined}
          />
          <View style={styles.textColumn}>
            <Text style={styles.cardTitle}>💧 Hydration Reminder</Text>
            <Text style={styles.cardSubtext}>“Drink 8 glasses of water”</Text>
          </View>
        </View>
      </View>

      {/* Card 2: Physical Activity */}
      <View style={[styles.card, styles.cardPhysical]}>
        <View style={styles.row}>
          <Checkbox
            value={physicalActivity}
            onValueChange={setPhysicalActivity}
            color={physicalActivity ? "#007AFF" : undefined}
          />
          <View style={styles.textColumn}>
            <Text style={styles.cardTitle}>🚶 Physical Activity</Text>
            <Text style={styles.cardSubtext}>“Walk for 15 minutes”</Text>
          </View>
        </View>
      </View>

      {/* Card 3: Prenatal Care */}
      <View style={[styles.card, styles.cardPrenatal]}>
        <View style={styles.row}>
          <Checkbox
            value={prenatalCare}
            onValueChange={setPrenatalCare}
            color={prenatalCare ? "#007AFF" : undefined}
          />
          <View style={styles.textColumn}>
            <Text style={styles.cardTitle}>💊 Prenatal Care</Text>
            <Text style={styles.cardSubtext}>“Take prenatal vitamins”</Text>
          </View>
        </View>
      </View>

      {/* Card 4: Balanced Diet */}
      <View style={[styles.card, styles.cardDiet]}>
        <View style={styles.row}>
          <Checkbox
            value={balancedDiet}
            onValueChange={setBalancedDiet}
            color={balancedDiet ? "#007AFF" : undefined}
          />
          <View style={styles.textColumn}>
            <Text style={styles.cardTitle}>🥗 Balanced Diet</Text>
            <Text style={styles.cardSubtext}>“Include fruits, veggies, and protein daily”</Text>
          </View>
        </View>
      </View>

      {/* Card 5: Kegel Exercises */}
      <View style={[styles.card, styles.cardKegel]}>
        <View style={styles.row}>
          <Checkbox
            value={kegel}
            onValueChange={setKegel}
            color={kegel ? "#007AFF" : undefined}
          />
          <View style={styles.textColumn}>
            <Text style={styles.cardTitle}>🩺 Kegel Exercises</Text>
            <Text style={styles.cardSubtext}>“Strengthen pelvic floor daily”</Text>
          </View>
        </View>
      </View>

      {/* Card 6: Mindful Sleep */}
      <View style={[styles.card, styles.cardSleep]}>
        <View style={styles.row}>
          <Checkbox
            value={mindfulSleep}
            onValueChange={setMindfulSleep}
            color={mindfulSleep ? "#007AFF" : undefined}
          />
          <View style={styles.textColumn}>
            <Text style={styles.cardTitle}>😴 Mindful Sleep</Text>
            <Text style={styles.cardSubtext}>“Aim for at least 8 hours of restful sleep”</Text>
          </View>
        </View>
      </View>

      {/* "GO BACK" button -> using router to navigate to HealthPlanScreen */}
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => router.push('/HealthPlanScreen')}
      >
        <Text style={styles.goBackButtonText}>GO BACK</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 700,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHydration: {
    backgroundColor: '#D0F8FE',
  },
  cardPhysical: {
    backgroundColor: '#E0ECFF',
  },
  cardPrenatal: {
    backgroundColor: '#FFE3E3',
  },
  cardDiet: {
    backgroundColor: '#F9FAD0',
  },
  cardKegel: {
    backgroundColor: '#FFF2E7',
  },
  cardSleep: {
    backgroundColor: '#E9E6FF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textColumn: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
  goBackButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  goBackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
