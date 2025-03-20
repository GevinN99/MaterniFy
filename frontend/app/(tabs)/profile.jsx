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

import { getProfile, updateProfile } from '../../api/profileAPI';

export default function ProfileScreen() {
  // We’ll store the user’s profile in state
  const [profile, setProfile] = useState({
    _id: '',
    fullName: '',
    email: '',
  });

  // Track loading state (for fetching data)
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Example: an API endpoint for fetching/updating the profile
  const PROFILE_API_URL = 'https://example.com/api/profile';

  /**
   * On mount, fetch the user's profile from the REST API
   */
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
      setLoading(true);
      try {
          const data = await getProfile();
          setProfile(data);
      } catch (error) {
          Alert.alert("Error", "Failed to load profile.");
      }
      setLoading(false);
  };

  /**
   * Send updated profile info to the REST API (PUT or PATCH)
   */
  const handleUpdateProfile = async () => {

		try {
      setLoading(true);
			const response = await updateProfile(JSON.stringify(profile));			
			setLoading(false);
      setIsEditing(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
  };

  return (
<View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Content */}
      <View style={styles.content}>
        {/* PROFILE IMAGE */}
        <View style={styles.avatarContainer}>
          <Image
            source={profile.profileImage}
            style={styles.avatar}
          />
        </View>

        {/* LOADING INDICATOR */}
        {loading && <ActivityIndicator size="large" color="#0078fe" style={{ marginVertical: 10 }} />}

        {/* PROFILE FIELDS */}
        <ProfileField label="Name" value={profile.fullName} editable={isEditing} onChangeText={(val) => setProfile({ ...profile, fullName: val })} />
        <ProfileField label="Email" value={profile.email} editable={isEditing} onChangeText={(val) => setProfile({ ...profile, email: val })} />
          
        {/* EDIT BUTTON */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>

        {/* SAVE BUTTON (only visible in edit mode) */}
        {isEditing && (
          <TouchableOpacity
            style={[styles.saveButton, loading && { opacity: 0.7 }]}
            onPress={handleUpdateProfile}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Reusable Profile Field Component
const ProfileField = ({ label, value, editable, onChangeText }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    {editable ? (
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
    ) : (
      <Text style={styles.value}>{value || 'N/A'}</Text>
    )}
  </View>
);

// STYLES
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // Header
  header: {
    backgroundColor: '#0078fe',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },

  // Main content
  content: { flex: 1, padding: 16 },

  // Avatar
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  avatarLabel: { marginTop: 8, fontSize: 16, fontWeight: '600' },

  // Profile Field Styling
  fieldContainer: { marginBottom: 10 },
  label: { fontSize: 14, fontWeight: '600' },
  value: { fontSize: 16, paddingVertical: 6, color: '#333' },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },

  // Edit Button
  editButton: {
    backgroundColor: '#0078fe',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },

  // Save Button (only in edit mode)
  saveButton: {
    backgroundColor: '#28a745',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 16,
  },

  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
