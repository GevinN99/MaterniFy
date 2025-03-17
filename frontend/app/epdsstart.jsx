// import { useEffect } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";
// import { useNavigation } from "@react-navigation/native";

// export default function EPDSWelcome() {
//   const router = useRouter();
//   const navigation = useNavigation();

//   useEffect(() => {
//     navigation.setOptions({
//       title: "EPDS Assessment",
//       headerStyle: { backgroundColor: "#90CAF9" }, // Soft blue for MaterniFy theme
//       headerTintColor: "#333", // Dark text for contrast
//     });
//   }, []);

//   return (
//     <View className="flex-1 items-center justify-center bg-gray-100 px-6">
//       <Text className="text-3xl font-bold text-gray-800 mb-4 text-center">
//         Edinburgh Postnatal Depression Scale
//       </Text>

//       <Text className="text-md text-gray-600 mb-6 text-center px-4">
//         The Edinburgh Postnatal Depression Scale (EPDS) is a screening tool
//         designed to help identify symptoms of postpartum depression in new
//         mothers. It consists of 10 simple questions to assess emotional well-being.
//       </Text>

//       <View className="w-full space-y-4">
//         <TouchableOpacity
//           className="w-full bg-[#90CAF9] p-5 rounded-xl shadow-md items-center"
//           onPress={() => router.push("epds")}
//         >
//           <Text className="text-xl font-bold text-white">Take the EPDS Test</Text>
//           <Text className="text-sm text-white">
//             Assess your emotional well-being today
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className="w-full bg-[#BDBDBD] p-5 rounded-xl shadow-md items-center"
//           onPress={() => router.push("epdsResults")}
//         >
//           <Text className="text-xl font-bold text-white">View Past Scores</Text>
//           <Text className="text-sm text-white">Check your previous assessments</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function EPDSWelcome() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "EPDS Assessment",
      headerStyle: { backgroundColor: "#90CAF9" }, // Soft blue for MaterniFy theme
      headerTintColor: "#333", // Dark text for contrast
    });
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-[#f0f4f8] px-6 pt-4 mt-[-10px]">
      {/* Title */}
      <Text className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Edinburgh Postnatal Depression Scale
      </Text>

      {/* Description */}
      <Text className="text-md text-gray-600 mb-6 text-center px-4">
        The Edinburgh Postnatal Depression Scale (EPDS) is a screening tool
        designed to help identify symptoms of postpartum depression in new
        mothers. It consists of 10 simple questions to assess emotional well-being.
      </Text>

      {/* Buttons Container */}
      <View className="w-full space-y-5">
        {/* Take the EPDS Test */}
        <TouchableOpacity
          className="w-full bg-[#90CAF9] p-5 rounded-2xl shadow-lg items-center active:opacity-80"
          onPress={() => router.push("epds")}
        >
          <Text className="text-xl font-bold text-white">Take the EPDS Test</Text>
          <Text className="text-sm text-white mt-1">
            Assess your emotional well-being today
          </Text>
        </TouchableOpacity>

        {/* View Past Scores */}
        <TouchableOpacity
          className="w-full bg-[#6c757d] p-5 rounded-2xl shadow-lg items-center active:opacity-80"
          onPress={() => router.push("epdsResults")}
        >
          <Text className="text-xl font-bold text-white">View Past Scores</Text>
          <Text className="text-sm text-white mt-1">
            Check your previous assessments
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
