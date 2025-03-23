import React from "react";
import { View } from "react-native";
import VideoCall from "../components/VideoCall";
import { useLocalSearchParams } from "expo-router";

export default function VideoCallScreen() {
    const { appointmentId } = useLocalSearchParams();

    return (
        <View style={{ flex: 1 }}>
            <VideoCall appointmentId={appointmentId} />
        </View>
    );
}