import "../global.css"
import { Stack } from "expo-router"
import { CommunityProvider } from "../context/communityContext"
import { AuthProvider } from "../context/AuthContext"
import Header from "../components/Header"

function RootLayout() {
	return (
		<AuthProvider>
			<CommunityProvider>
				<Stack>
					<Stack.Screen
						name="(tabs)"
						options={{ headerShown: false }}
					/>

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
									backLink="/community"
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
									backLink="/community"
									title="Post"
								/>
							),
						}}
					/>

					<Stack.Screen
						name="community/post/reply/[postId]"
						options={{
							header: () => (
								<Header
									backLink="/community"
									title="Reply"
								/>
							),
						}}
					/>

					<Stack.Screen name="appointments/UserAppointments" options={{ header: () => <Header backLink="/" title="My Appointments" /> }} />
					<Stack.Screen name="appointments/DoctorAppointments" options={{ header: () => <Header backLink="/" title="Doctor Appointments" /> }} />

				</Stack>
			</CommunityProvider>
		</AuthProvider>
	)
}

export default RootLayout
