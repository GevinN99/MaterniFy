import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

export default function ProfileScreen() {
  // We’ll store the user’s profile in state
  const [profile, setProfile] = useState({
    id: '',
    name: '',
    email: '',
    dueDate: '',
    bloodType: '',
    allergies: '',
  });

  // Track loading state (for fetching data)
  const [loading, setLoading] = useState(false);

  // Example: an API endpoint for fetching/updating the profile
  const PROFILE_API_URL = 'https://example.com/api/profile';

  /**
   * On mount, fetch the user's profile from the REST API
   */
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      // Example: GET request
      const response = await fetch(`${PROFILE_API_URL}/123`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // authorization headers, if needed
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      // data should have fields like: { id, name, email, dueDate, bloodType, allergies, ... }
      setProfile({
        id: data.id || '',
        name: data.name || '',
        email: data.email || '',
        dueDate: data.dueDate || '',
        bloodType: data.bloodType || '',
        allergies: data.allergies || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      Alert.alert('Error', 'Could not load profile data.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send updated profile info to the REST API (PUT or PATCH)
   */
  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      // Example: PUT request with updated data
      const response = await fetch(`${PROFILE_API_URL}/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // authorization headers, if needed
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Show success alert (or any other UI feedback)
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Scrollable content if needed, or wrap in a ScrollView */}
      <View style={styles.content}>

        {/* PROFILE IMAGE */}
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
            }}
            style={styles.avatar}
          />
          <Text style={styles.avatarLabel}>MaterniFy User</Text>
        </View>

        {/* LOADING INDICATOR */}
        {loading && <ActivityIndicator size="large" color="#0078fe" style={{ marginVertical: 10 }} />}

        {/* FIELDS */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(val) => setProfile({ ...profile, name: val })}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={profile.email}
          onChangeText={(val) => setProfile({ ...profile, email: val })}
        />

        <Text style={styles.label}>Expected Due Date</Text>
        <TextInput
          style={styles.input}
          value={profile.dueDate}
          onChangeText={(val) => setProfile({ ...profile, dueDate: val })}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>Blood Type</Text>
        <TextInput
          style={styles.input}
          value={profile.bloodType}
          onChangeText={(val) => setProfile({ ...profile, bloodType: val })}
          placeholder="e.g. O+"
        />

        <Text style={styles.label}>Allergies</Text>
        <TextInput
          style={styles.input}
          value={profile.allergies}
          onChangeText={(val) => setProfile({ ...profile, allergies: val })}
          placeholder="e.g. Penicillin"
        />

        {/* UPDATE BUTTON */}
        <TouchableOpacity
          style={[styles.updateButton, loading && { opacity: 0.7 }]}
          onPress={handleUpdateProfile}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Header
  header: {
    backgroundColor: '#0078fe',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Main content
  content: {
    flex: 1,
    padding: 16,
  },

  // Avatar
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarLabel: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },

  // Form Fields
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },

  // Update Button
  updateButton: {
    backgroundColor: '#0078fe',
    borderRadius: 20,
    paddingVertical: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
