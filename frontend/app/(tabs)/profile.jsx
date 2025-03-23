import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView ,
} from 'react-native';
import { Image } from "expo-image"
import { Feather } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from "expo-image-picker";

import { getProfile, updateProfile } from '../../api/profileAPI';
import { AuthContext } from '../../context/AuthContext';
import { uploadImageToFirebase } from '../../utils/firebaseImage';

export default function ProfileScreen() {
  const { logout } = useContext(AuthContext);

  // We’ll store the user’s profile in state
  const [profile, setProfile] = useState({
    id: '',
    fullName: '',
    email: '',
    languagePreference: '',
    profileImage: '',
    address: '',
    weight: '',
    pregnancyDate: '',
    partnerName: '',
    partnerEmail: '',
    partnerPhone: '',
    age: '',
    parentingDay: '',
  });

  // Track loading state (for fetching data)
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);

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
          setProfile({
            id: data._id || '',
            fullName: data.fullName || '',
            email: data.email || '',
            languagePreference: data.languagePreference || '',
            profileImage: data.profileImage || 'https://cdn-icons-png.flaticon.com/512/10363/10363647.png',
            address: data.homeLocation?.address || '',
            pregnancyDate: data.pregnancyDate ? data.pregnancyDate.split('T')[0] : '',
            partnerName: data.partnerDetails?.husbandName || '',
            partnerEmail: data.partnerDetails?.email || '',
            partnerPhone: data.partnerDetails?.phoneNumber || '',
            age: data.age || '',
            parentingDay: data.parentingDay ? data.parentingDay.split('T')[0] : '',
            weight: data.weight || ''
          });
          setImage(data.profileImage);
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
      let imageUrl = 'https://cdn-icons-png.flaticon.com/512/10363/10363647.png';

      if (image) {
          imageUrl = await uploadImageToFirebase(image, "profile_pics");
      } else {
          imageUrl = profile.profileImage;
      }

      setLoading(true);
			const response = await updateProfile(JSON.stringify({
        fullName: profile.fullName,
        email: profile.email,
        languagePreference: profile.languagePreference,
        homeLocation: { address: profile.address }, // Update Address
        pregnancyDate: profile.pregnancyDate,
        partnerDetails: {
          husbandName: profile.partnerName,
          email: profile.partnerEmail,
          phoneNumber: profile.partnerPhone,
        },
        age: profile.age,
        weight: profile.weight,
        profileImage: imageUrl,
      }));			
			setLoading(false);
      setIsEditing(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => logout() },
    ]);
  };

  // Pick an Image
  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
      });
      if (!result.canceled) {
          setImage(result.assets[0].uri);
      }
  };

  return (
<View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Feather name="log-out" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Profile Content */}
        <View style={styles.content}>
          {/* PROFILE IMAGE */}
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
            <Image
              source={image}
              style={styles.avatar}
            />
          </TouchableOpacity>

          {/* LOADING INDICATOR */}
          {loading && <ActivityIndicator size="large" color="#0078fe" style={{ marginVertical: 10 }} />}

          {/* Personal Information */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <ProfileField label="Full Name" value={profile.fullName} editable={isEditing} onChangeText={(val) => setProfile({ ...profile, fullName: val })} />
      <ProfileField label="Age" value={isEditing ? String(profile.age) : profile.age} editable={isEditing} onChangeText={(val) => setProfile({ ...profile, age: val })} />
      
      {/* Language Picker */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Language Preference</Text>
        {isEditing ? (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={profile.languagePreference}
              onValueChange={(itemValue) => setProfile({ ...profile, languagePreference: itemValue })}
              style={styles.picker}
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Sinhala" value="Sinhala" />
              <Picker.Item label="Tamil" value="Tamil" />
            </Picker>
          </View>
        ) : (
          <Text style={styles.value}>{profile.languagePreference}</Text>
        )}
      </View>
    </View>

    {/* Health & Pregnancy Details */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Health & Pregnancy Details</Text>
      <ProfileField label="Weight (kg)" value={profile.weight} editable={isEditing} onChangeText={(val) => setProfile({ ...profile, weight: val })} />
      <ProfileField label="Pregnancy Date" value={profile.pregnancyDate} editable={isEditing} onChangeText={(val) => setProfile({ ...profile, pregnancyDate: val })} />
      <ProfileField label="Parenting Day" value={profile.parentingDay} editable={isEditing} onChangeText={(val) => setProfile({ ...profile, parentingDay: val })} />
    </View>

    {/* Location Information */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Location Information</Text>
      <ProfileField label="Address" value={profile.address} editable={isEditing} onChangeText={(val) => setProfile({ ...profile, address: val })} />
    </View>

    {/* Partner Details */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Partner Details</Text>
      <ProfileField label="Partner Name" value={profile.partnerName} editable={isEditing} onChangeText={(val) => setProfile({ ...profile, partnerName: val })} />
      <ProfileField label="Partner Email" value={profile.partnerEmail} editable={isEditing} onChangeText={(val) => setProfile({ ...profile, partnerEmail: val })} />
      <ProfileField label="Partner Phone" value={profile.partnerPhone} editable={isEditing} onChangeText={(val) => setProfile({ ...profile, partnerPhone: val })} />
    </View>

          {/* BUTTONS ROW */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(!isEditing)}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
            </TouchableOpacity>

            {isEditing && (
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleUpdateProfile}
                disabled={loading}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  logoutButton: { padding: 8 },

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

// Buttons Row
buttonRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 10,
  marginTop: 20,
},

// Edit Button
editButton: {
  backgroundColor: '#0078fe',
  borderRadius: 20,
  paddingVertical: 8,
  paddingHorizontal: 20,
},

// Save Button (compact and blue)
saveButton: {
  backgroundColor: '#0056b3',
  borderRadius: 20,
  paddingVertical: 8,
  paddingHorizontal: 20,
},

buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

fieldContainer: {
  marginBottom: 15,
},
label: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 5,
},
pickerContainer: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  backgroundColor: '#fff',
},
picker: {
  height: 50,
  width: '100%',
},

section: {
  marginBottom: 20,
  padding: 10,
  backgroundColor: '#f9f9f9',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
},
sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
},

});
