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
					{/* This screen will show the tabs after login */}
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false }}
					/>

					{/* Auth Screens */}
					<Stack.Screen
						name="auth/Login"
						options={{
							headerShown: false, // No header for login
						}}
					/>
					<Stack.Screen
						name="auth/Signup"
						options={{
							headerShown: false, // No header for signup
						}}
					/>

					{/* Community Screens */}
					<Stack.Screen
						name="communities"
						options={{
							header: () => (
								<Header
									backLink="/community"
									title="Communities"
								/>
							),
						}}
					/>

					<Stack.Screen
						name="epds"
						options={{
							headerShown: false, // No header for EPDS
							title: "EPDS",
						}}
					/>

					<Stack.Screen
						name="community/[communityId]"
						options={{
							header: () => (
								<Header
									backLink="/communities"
									title="Community Details"
								/>
							),
						}}
					/>

					<Stack.Screen
						name="communityUser/[userId]"
						options={{
							header: () => (
								<Header
									// backLink="/community"
									title="Community User Profile"
								/>
							),
						}}
					/>

					<Stack.Screen
						name="community/post/[postId]"
						options={{
							header: () => (
								<Header
									// backLink="/community"
									title="Post"
								/>
							),
						}}
					/>

					<Stack.Screen
						name="community/post/reply/[postId]"
						options={{
							header: () => <Header title="Reply" />,
						}}
					/>

                    <Stack.Screen name="appointments/UserAppointments"
                                  options={{header: () => <Header backLink="/" title="My Appointments"/>}}/>
                    <Stack.Screen name="appointments/DoctorAppointments"
                                  options={{header: () => <Header backLink="/" title="Doctor Appointments"/>}}/>

                    <Stack.Screen
                        name="HealthPlanScreen"
                        options={{
                            headerShown: false,
                            // header: () => (
                            // 	<Header
                            // 		backLink="/"
                            // 		title="Health Plan Screen"
                            // 	/>
                            // ),
                        }}
                    />
				</Stack>

			</CommunityProvider>
		</AuthProvider>
    );
}

export default RootLayout;
