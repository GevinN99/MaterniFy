import "../global.css";
import {Stack} from "expo-router";
import {AuthProvider} from "../context/AuthContext";
import {CommunityProvider} from "../context/communityContext";
import Header from "../components/Header";

function RootLayout() {
    return (
        <AuthProvider>
            <CommunityProvider>
                <Stack>
                    <Stack.Screen name="(tabs)"
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="auth/Login"
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="auth/Signup"
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="auth/DoctorLogin"
                                  options={{headerShown: false}}/>
                    <Stack.Screen name="communities"
                                  options={{header: () => <Header title="Communities"/>}}/>
                    <Stack.Screen name="epds"
                                  options={{headerShown: false, title: "EPDS"}}/>
                    <Stack.Screen name="community/[communityId]"
                                  options={{header: () => <Header title="Community Details"/>}}/>
                    <Stack.Screen name="communityUser/[userId]"
                                  options={{header: () => <Header title="Community User Profile"/>}}/>
                    <Stack.Screen name="community/post/[postId]" options={{header: () => <Header title="Post"/>}}/>
                    <Stack.Screen name="community/post/reply/[postId]"
                                  options={{header: () => <Header title="Reply"/>}}/>
                    <Stack.Screen name="appointments/UserAppointments"
                                  options={{header: () => <Header backLink="/" title="My Appointments"/>}}/>
                    <Stack.Screen name="appointments/DoctorAppointments"
                                  options={{header: () => <Header backLink="/" title="Doctor Appointments"/>}}/>
                    <Stack.Screen
                        name="HealthPlanScreen/post/reply/[postId]"
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack>
            </CommunityProvider>
        </AuthProvider>
    );
}

export default RootLayout;