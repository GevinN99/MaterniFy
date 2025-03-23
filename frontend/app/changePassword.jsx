import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { changePassword } from '../api/profileAPI';

const ChangePasswordScreen = () => {

    const router = useRouter();
    const navigation = useNavigation();
  
    useEffect(() => {
      navigation.setOptions({
        title: "Change Password",
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#0078fe" }, // Add this line
        headerLeft: () => (
          <View className="flex-row items-center pl-2">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ),
      });
    }, []);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await changePassword(JSON.stringify({
                                                oldPassword: oldPassword,
                                                newPassword: newPassword
                                             }))

      Alert.alert("Success", response.message);
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      console.error("Error changing password:", error);
      Alert.alert("Error", error.response?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
        Change Password
      </Text>

      {/* Old Password Input */}
      <Text>Old Password</Text>
      <TextInput
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
        placeholder="Enter old password"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 10,
          marginBottom: 15
        }}
      />

      {/* New Password Input */}
      <Text>New Password</Text>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        placeholder="Enter new password"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 10,
          marginBottom: 20
        }}
      />

      {/* Change Password Button */}
      <TouchableOpacity 
        onPress={handleChangePassword}
        disabled={loading}
        style={{
          backgroundColor: '#1976D2', // Material Blue
          paddingVertical: 12,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialIcons name="lock" size={20} color="white" style={{ marginRight: 5 }} />
        <Text style={{ color: 'white', fontSize: 16 }}>
          {loading ? "Changing..." : "Change Password"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;
