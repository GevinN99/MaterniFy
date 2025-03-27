import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WebView from "react-native-webview";

const MeetingView = ({ route }) => {
    console.log("Route received in MeetingView:", route);
    const meetUrl = route?.params?.meetUrl || "https://meet.google.com/yjs-pbmz-fzo";

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: meetUrl }}
                style={styles.webview}
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onPermissionRequest={(event) => {
                    console.log("Permission request:", event.nativeEvent);
                    return event.nativeEvent.requestPermissions(["camera", "microphone"]);
                }}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.error("WebView error:", nativeEvent);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    webview: {
        flex: 1,
    },
    errorText: {
        fontSize: 16,
        color: "#FF0000",
        textAlign: "center",
        padding: 20,
    },
});

export default MeetingView;