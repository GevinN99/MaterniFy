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
		</Stack>
	)
}

export default RootLayout
