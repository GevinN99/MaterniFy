import { createContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import LoadingSpinner from "../components/LoadingSpinner"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {	
	const [user, setUser] = useState(null)
	const [userId, setUserId] = useState(null)
	const router = useRouter()

	useEffect(() => {
		const loadUser = async () => {			
			const token = await AsyncStorage.getItem("token")
			const storedUserId = await AsyncStorage.getItem("userId")
			if (token) {
				setUser(token)
                setUserId(storedUserId)                
				router.replace("/") // Redirect to home page if user is logged in
			} else {
				router.replace("/auth/Login") // Redirect to login if no token
			}			
		}
		loadUser()
	}, [])

	const logout = async () => {
		await AsyncStorage.removeItem("token")
		await AsyncStorage.removeItem("userId")
		setUser(null)
		setUserId(null)
		router.replace("/auth/Login") // Redirect to login page on logout
	}

	return (
		<AuthContext.Provider value={{ user, userId, setUser, setUserId, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
