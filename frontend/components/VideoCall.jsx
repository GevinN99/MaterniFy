import React, { useState, useContext } from "react";
import { View, Button, StyleSheet, Dimensions, Text } from "react-native";
import {
    AgoraRTCProvider,
    useRTCClient,
    usePublish,
    useJoin,
    useRemoteUsers,
    useLocalMicrophoneTrack,
    useLocalCameraTrack,
    RemoteVideoTrack,
    LocalVideoTrack,
} from "agora-rtc-react";
import { AuthContext } from "../context/AuthContext";

const { width, height } = Dimensions.get("window");

const VideoCall = ({ appointmentId }) => {
    const { role } = useContext(AuthContext);
    const [inCall, setInCall] = useState(false);

    const APP_ID = "81a265a7b69b42cb8d76d2b147d02df5";
    const channelName = appointmentId;

    const client = useRTCClient();

    return (
        <View style={styles.container}>
            {!inCall ? (
                <Button
                    title={`Start ${role === "doctor" ? "Doctor" : "Mother"} Call`}
                    onPress={() => setInCall(true)}
                />
            ) : (
                <AgoraRTCProvider client={client}>
                    <CallScreen
                        appId={APP_ID}
                        channelName={channelName}
                        role={role}
                        endCall={() => setInCall(false)}
                    />
                </AgoraRTCProvider>
            )}
        </View>
    );
};

const CallScreen = ({ appId, channelName, role, endCall }) => {
    const client = useRTCClient();

    const { localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { localCameraTrack } = useLocalCameraTrack();

    useJoin({
        appid: appId,
        channel: channelName,
        token: null,
        uid: role === "doctor" ? 1 : 2,
    });

    usePublish([localMicrophoneTrack, localCameraTrack]);

    const remoteUsers = useRemoteUsers();

    return (
        <View style={styles.callContainer}>
            {localCameraTrack && (
                <View style={styles.localVideo}>
                    <LocalVideoTrack track={localCameraTrack} play={true} />
                    <Text style={styles.localLabel}>{role === "doctor" ? "Doctor" : "You"}</Text>
                </View>
            )}

            {remoteUsers.length > 0 ? (
                remoteUsers.map((user) => (
                    <View key={user.uid} style={styles.remoteVideo}>
                        <RemoteVideoTrack track={user.videoTrack} play={true} />
                        <Text style={styles.remoteLabel}>{role === "doctor" ? "Mother" : "Doctor"}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.waitingText}>Waiting for the other participant...</Text>
            )}

            <View style={styles.controls}>
                <Button
                    title={localMicrophoneTrack?.enabled ? "Mute" : "Unmute"}
                    onPress={() => localMicrophoneTrack?.setEnabled(!localMicrophoneTrack.enabled)}
                />
                <Button
                    title={localCameraTrack?.enabled ? "Camera Off" : "Camera On"}
                    onPress={() => localCameraTrack?.setEnabled(!localCameraTrack.enabled)}
                />
                <Button title="End Call" color="red" onPress={endCall} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },
    callContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: "#000",
    },
    localVideo: {
        width: width * 0.3,
        height: height * 0.2,
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
        borderWidth: 2,
        borderColor: "#fff",
    },
    localLabel: {
        position: "absolute",
        bottom: 5,
        left: 5,
        color: "#fff",
        fontSize: 12,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 2,
    },
    remoteVideo: {
        width: width,
        height: height * 0.7,
    },
    remoteLabel: {
        position: "absolute",
        top: 5,
        left: 5,
        color: "#fff",
        fontSize: 16,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 5,
    },
    waitingText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        marginTop: height * 0.3,
    },
    controls: {
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
});

export default VideoCall;