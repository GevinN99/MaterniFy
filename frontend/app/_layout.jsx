import "../global.css"
import { Stack } from "expo-router"
import { CommunityProvider } from "../context/communityContext"
import Header from "../components/Header" 

function RootLayout() {
	return (
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
					name="community/[id]"
					options={{
						header: ({ route }) => (
							<Header
								backLink="/communities"
								title="Community Details"
							/>
						),
					}}
				/>

				<Stack.Screen
					name="communityUserProfile/[userId]"
					options={{
						header: () => (
							<Header
								backLink="/community"
								title="Community User Profile"
							/>
						),
					}}
				/>
			</Stack>
		</CommunityProvider>
	)
}

export default RootLayout
