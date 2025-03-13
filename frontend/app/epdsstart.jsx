import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function EPDSWelcome() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "EPDS Assessment" }); // Change the title
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-6">
      <Text className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Edingburg Postnatal Depression Scale
      </Text>

      <Text className="text-md text-gray-600 mb-6 text-center px-4">
        The Edinburgh Postnatal Depression Scale (EPDS) is a screening tool
        designed to help identify symptoms of postpartum depression in new
        mothers. It consists of 10 simple questions to assess emotional well-being.
      </Text>

      <TouchableOpacity
        className="w-full bg-blue-400 p-6 rounded-2xl shadow-lg items-center"
        onPress={() => router.push("epds")}
      >
        <Text className="text-xl font-bold text-white">Take the EPDS Test</Text>
        <Text className="text-sm text-white">
          Assess your emotional well-being today
        </Text>
      </TouchableOpacity>
    </View>
  );
}
