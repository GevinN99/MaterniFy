import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Platform, Image } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function EPDSWelcome() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "EPDS Assessment",
      headerTintColor: "#333333",
      headerStyle: { backgroundColor: "#B4E4FF" }, // Add this line
      headerLeft: () => (
        <View className="flex-row items-center pl-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333333" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView
      style={{ paddingTop: Platform.OS === "android" ? 0 : undefined }}
      className="flex-1 bg-[#B4E4FF]"
    >
      <View className="flex-1 justify-between">
        {/* Top Section */}
        <View className="flex-1 items-center justify-center">
        <Image
          source={require("../assets/images/EPDSstart.png")}
          className="w-60 h-60 mb-4"
          resizeMode="contain"
        />
        <Text className="text-2xl font-semibold text-[#555555] text-center mb-2">
            Resolve all your mental problems
          </Text>
          <Text className="text-md text-white text-center px-6">
            Track your mood swings, heartbeat and physical activity to identify improvements in well-being.
          </Text>
        </View>
        {/* Bottom Section */}
        <View className="bg-[#FCFCFC] rounded-t-3xl py-20 px-6">
          <TouchableOpacity
            className="w-full bg-[#B4E4FF] py-4 rounded-lg items-center"
            onPress={() => router.push("epds")}
          >
            <Text className="text-lg font-semibold text-white">Take the EPDS Test</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full bg-[#F7C8E0] py-4 rounded-lg items-center"
            onPress={() => router.push("epdsResults")}
          >
            <Text className="text-lg font-semibold text-[#333333]">View Past Scores</Text>
          </TouchableOpacity>
          <Text className="text-sm text-[#555555] text-center mt-8 px-4">
            Postnatal depression is common and help is available.
          </Text>
          </View>
      </View>
    </SafeAreaView>
  );
}