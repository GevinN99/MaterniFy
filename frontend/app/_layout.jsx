import "../global.css";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { CommunityProvider } from "../context/communityContext";
import Header from "../components/Header";

function RootLayout() {
	return (
		<AuthProvider>
			<CommunityProvider>
				<Stack>
					<Stack
						name="auth/Login"
						options={{ headerShown: false }}
						screenOptions={{
							initialRouteName: "auth/Login",
						}}
						/>
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false }}
					/>
					{/*<Stack.Screen*/}
					{/*	name="auth/Login"*/}
					{/*	options={{ headerShown: false }}*/}
					{/*/>*/}
					<Stack.Screen
						name="auth/Signup"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="auth/DoctorLogin"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="communities"
						options={{
							header: () => (
								<Header
									backLink={"community"}
									title="Communities"
								/>
							),
							animation: "fade",
						}}
					/>
					<Stack.Screen
						name="epds"
						options={{ headerShown: false, title: "EPDS" }}
					/>
					<Stack.Screen
						name="community/[communityId]"
						options={{
							header: () => (
								<Header
									title="Community"
									backLink={"communities"}
								/>
							),
							animation: "fade",
						}}
					/>
					<Stack.Screen
						name="communityUser/[userId]"
						options={{
							header: () => <Header title="" />,
							animation: "fade",
						}}
					/>
					<Stack.Screen
						name="community/post/[postId]"
						options={{
							header: () => <Header title="Post" />,
							animation: "fade",
						}}
					/>
					<Stack.Screen
						name="community/post/reply/[postId]"
						options={{
							header: () => <Header title="Reply" />,
							animation: "fade",
						}}
					/>
					<Stack.Screen
						name="appointments/UserAppointments"
						options={{
							header: () => (
								<Header
									backLink="/"
									title="My Appointments"
								/>
							),
						}}
					/>
					<Stack.Screen
						name="appointments/DoctorAppointments"
						options={{
							header: () => (
								<Header
									backLink="/"
									title="Doctor Appointments"
								/>
							),
							presentation: "modal",
						}}
					/>
					<Stack.Screen
						name="(tabs)/doctorProfile"
						options={{
							header: () => (
								<Header
									backLink="/"
									title=" "
								/>
							),
							presentation: "modal",
						}}
					/>
					<Stack.Screen
						name="HealthPlanScreen"
						options={{
							headerShown: true,
							title: "Health Plan",
							headerTransparent: true,
						}}
					/>
					<Stack.Screen
						name="AiGeneratedHealthTipsScreen"
						options={{
							headerShown: true,
							title: "AI Health Plan",
						}}
					/>

					<Stack.Screen
						name="DailyHealthChecklistScreen"
						options={{
							headerShown: true,
							title: "Daily Health Checklist",
						}}
					/>

					<Stack.Screen
						name="epdsResults"
						options={{
							headerShown: true,
							title: "EPDS Results",
						}}
					/>

					<Stack.Screen
						name="emergency"
						options={{
							headerShown: true,
							title: "Emergency",
						}}
					/>
				</Stack>
			</CommunityProvider>
		</AuthProvider>
	)
}

export default RootLayout;