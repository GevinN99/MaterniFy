import React from "react";
import { View, Text } from "react-native";

function epdsScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-gray-100 px-6">
            <Text className="text-2xl font-bold text-gray-800 mb-6">EPDS Assessment</Text>
            <Text className="text-lg text-gray-800 mb-6">Take the Edinburgh Postnatal Depression Scale</Text>
        </View>        
    );
}

export default epdsScreen;