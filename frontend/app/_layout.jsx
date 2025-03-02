import "../global.css"
import { Text } from "react-native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import EPDS from "./epds";

function RootLayout() {
	// const [fontsLoaded] = useFonts({
	// 	Thin: require("../assets/fonts/Poppins-Thin.ttf"),
	// 	ExtraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
	// 	Light: require("../assets/fonts/Poppins-Light.ttf"),
	// 	Regular: require("../assets/fonts/Poppins-Regular.ttf"),
	// 	Medium: require("../assets/fonts/Poppins-Medium.ttf"),
	// 	SemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
	// 	Bold: require("../assets/fonts/Poppins-Bold.ttf"),
	// 	ExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
	// 	Black: require("../assets/fonts/Poppins-Black.ttf"),
	// })

	// if (!fontsLoaded) {
	// 	return <Text>Loading...</Text>
	// }

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
			<Stack.Screen name="EPDS" component={EPDS} />
		</Stack>
	);
}

export default RootLayout;
