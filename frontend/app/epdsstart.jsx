import { useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Platform, Image } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Ionicons} from "@expo/vector-icons";

export default function EPDSWelcome() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "EPDS Assessment",
      headerStyle: { backgroundColor: "#A3C8E8" }, // Soft blue for MaterniFy theme
      headerTintColor: "#333",
      headerLeft: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={{ width: 10 }} />
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 0 : undefined}}
    className="flex-1 bg-[#F0F4F8] p-5">
      <View className="flex-1 items-center justify-center">

        {/* Image */}
        <Image
          source={require("../assets/images/epdsHome.jpeg")}
          className="w-40 h-40 rounded-full mb-4"
          resizeMode="cover"
        />
        {/* Title */}
        <Text className="text-2xl font-bold text-gray-800 text-center">
          Edinburgh Postnatal Depression Scale
        </Text>

        {/* Shortened Description */}
        <Text className="text-md text-gray-600 text-center mt-2">
          A quick screening tool to assess emotional well-being in new mothers.
        </Text>

        {/* Buttons Container */}
        <View className="w-full mt-6 space-y-4">
          {/* Take the EPDS Test */}
          <TouchableOpacity
            className="w-full bg-[#A3C8E8] p-5 rounded-lg shadow-md items-center active:opacity-80"
            onPress={() => router.push("epds")}
          >
            <Text className="text-lg font-bold text-white">Take the EPDS Test</Text>
          </TouchableOpacity>

          {/* View Past Scores */}
          <TouchableOpacity
            className="w-full bg-[#6c757d] p-5 rounded-lg shadow-md items-center active:opacity-800"
            onPress={() => router.push("epdsResults")}
          >
            <Text className="text-lg font-bold text-white">View Past Scores</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
