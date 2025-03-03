// app/(tabs)/DailyHealthChecklistScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Image,TouchableOpacity } from 'react-native';
import checklist from '../../assets/images/checklist.png';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';


export default function DailyHealthChecklistScreen() {
  const navigation = useNavigation();
  // State variables to track if the user has completed each task
  const [hydration, setHydration] = useState(false);
  const [physicalActivity, setPhysicalActivity] = useState(false);
  const [prenatalCare, setPrenatalCare] = useState(false);
  const [balancedDiet, setBalancedDiet] = useState(false);
  const [kegel, setKegel] = useState(false);
  const [mindfulSleep, setMindfulSleep] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
     

      {/* Main title */}
      <Text style={styles.title}>Your Daily Health Checklist</Text>

      <View style={styles.imageContainer}>
              <Image source={checklist} style={styles.image} />
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

   

    {/* "GO BACK" button -> navigate to HealthPlanScreen; assuming route name is 'index' */}
        <TouchableOpacity
      style={styles.goBackButton}
      onPress={() => navigation.navigate('Home')}
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
  illustration: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  // Base card style
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Android elevation
    elevation: 2,
  },
  // Distinct card colors for each item
  cardHydration: {
    backgroundColor: '#D0F8FE', // Light teal
  },
  cardPhysical: {
    backgroundColor: '#E0ECFF', // Light blue
  },
  cardPrenatal: {
    backgroundColor: '#FFE3E3', // Light pink
  },
  cardDiet: {
    backgroundColor: '#F9FAD0', // Light yellow
  },
  cardKegel: {
    backgroundColor: '#FFF2E7', // Light peach
  },
  cardSleep: {
    backgroundColor: '#E9E6FF', // Light purple
  },
  // Row for Switch + text
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
   // GO BACK button
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

