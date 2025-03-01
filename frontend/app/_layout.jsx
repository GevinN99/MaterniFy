import "../global.css"
import { Stack } from "expo-router"

function RootLayout() {
	return (
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
	)
}

export default RootLayout
