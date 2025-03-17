// import React, { useEffect } from "react";
// import { View, Text, TouchableOpacity, SafeAreaView, Platform, Image } from "react-native";
// import { useRouter } from "expo-router";
// import { useNavigation } from "@react-navigation/native";
// import { Ionicons} from "@expo/vector-icons";

// export default function EPDSWelcome() {
//   const router = useRouter();
//   const navigation = useNavigation();

//   useEffect(() => {
//     navigation.setOptions({
//       title: "EPDS Assessment", // Soft blue for MaterniFy theme
//       headerTintColor: "#333",
//       headerLeft: () => (
//         <View className="flex-row items-center pl-2">
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={24} color="#333" />
//           </TouchableOpacity>
//         </View>
//       ),
//     });
//   }, []);

//   return (
//     <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 0 : undefined}}
//     className="flex-1 bg-[#F0F4F8] p-5">

//       <View className="flex-1 items-center justify-center max-w-md mx-auto">

//         {/* Image */}
//         <Image
//           source={require("../assets/images/epdsHome.jpeg")}
//           className="w-40 h-40 rounded-full mb-4 aspect-square object-cover"
//           // resizeMode="cover"
//         />
//         {/* Title */}
//         <Text className="text-2xl font-bold text-gray-800 text-center">
//           Edinburgh Postnatal Depression Scale
//         </Text>

//         {/* Shortened Description */}
//         <Text className="text-md text-gray-600 text-center mt-2">
//           A quick screening tool to assess emotional well-being in new mothers.
//         </Text>

//         {/* Buttons Container */}
//         <View className="w-full mt-6 space-y-4 px-4">
//           {/* Take the EPDS Test */}
//           <TouchableOpacity
//             className="w-full bg-[#A3C8E8] p-5 rounded-lg shadow-md items-center active:opacity-80"
//             onPress={() => router.push("epds")}
//           >
//             <Text className="text-lg font-bold text-white">Take the EPDS Test</Text>
//           </TouchableOpacity>

//           {/* View Past Scores */}
//           <TouchableOpacity
//             className="w-full bg-[#6c757d] p-5 rounded-lg shadow-md items-center active:opacity-80"
//             onPress={() => router.push("epdsResults")}
//           >
//             <Text className="text-lg font-bold text-white">View Past Scores</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

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
      headerTintColor: "#333",
      headerLeft: () => (
        <View className="flex-row items-center pl-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView
      style={{ paddingTop: Platform.OS === "android" ? 0 : undefined }}
      className="flex-1 bg-[#F0F4F8] p-5"
    >
      <View className="flex-1 items-center justify-center max-w-md mx-auto">
        <Image
          source={require("../assets/images/epdsHome.jpeg")}
          className="w-40 h-40 rounded-full mb-6 aspect-square object-cover shadow-md"
        />
        <Text className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Edinburgh Postnatal Depression Scale
        </Text>
        <Text className="text-md text-gray-600 text-center mb-8 leading-6">
          A quick screening tool to assess emotional well-being in new mothers.
        </Text>
        <View className="w-full space-y-4 px-4">
          <TouchableOpacity
            className="w-60 bg-[#A3C8E8] py-4 rounded-lg shadow-md items-center active:opacity-80"
            onPress={() => router.push("epds")}
          >
            <Text className="text-lg font-semibold text-white">Take the EPDS Test</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-60 bg-gray-200 py-4 rounded-lg shadow-md items-center active:opacity-80"
            onPress={() => router.push("epdsResults")}
          >
            <Text className="text-lg font-semibold text-gray-700">View Past Scores</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}