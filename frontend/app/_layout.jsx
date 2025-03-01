import "../global.css"
import { Stack } from "expo-router"
import { CommunityProvider } from "../context/communityContext"

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
						headerShown: false,
						title: "Communities",
					}}
				/>

				<Stack.Screen
					name="community/[id]"
					options={{
						headerShown: false,
						title: "Community Details",
					}}
				/>
			</Stack>
		</CommunityProvider>
	)
}

export default RootLayout
