import AsyncStorage from "@react-native-async-storage/async-storage"
import { Platform } from "react-native"

const getUserId = async () => {
	if (Platform.OS === "web") {
		if (typeof localStorage !== "undefined") {
			return localStorage.getItem("userId")
		} else {
			throw new Error("localStorage is not available")
		}
	} else {
		return await AsyncStorage.getItem("userId")
	}
}

export default getUserId