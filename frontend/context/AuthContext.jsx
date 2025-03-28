import { createContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [userId, setUserId] = useState(null)
	const [role, setRole] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const loadUser = async () => {
			try {
				const token = await AsyncStorage.getItem("token")
				const storedRole = await AsyncStorage.getItem("role")
				const storedUserId = await AsyncStorage.getItem("userId")

				if (token) {
					setUser(token)
					setRole(storedRole)
					setUserId(storedUserId)
				}
			} catch (error) {
				console.error("Error loading user:", error)
			} finally {
				setIsLoading(false)
			}
		}
		loadUser()
	}, [])

	// Separate useEffect for route handling
	useEffect(() => {
		if (!isLoading) {
			if (!user) {
				router.replace("/auth/Login")
			} else {
				const currentPath = router.pathname
				const isOnAuthPage = currentPath?.startsWith("/auth")

				if (isOnAuthPage) {
					if (role === "doctor") {
						router.replace("/doctor-home")
					} else {
						router.replace("/")
					}
				}
			}
		}
	}, [user, role, isLoading])

	const logout = async () => {
		try {
			await AsyncStorage.clear()
			setUser(null)
			setRole(null)
			setUserId(null)
			router.replace("/auth/Login")
		} catch (error) {
			console.error("Logout failed:", error)
		}
	}

	if (isLoading) {
		return null
	}

	return (
		<AuthContext.Provider
			value={{ user, userId, setUserId, setUser, role, logout }}
		>
			{children}
		</AuthContext.Provider>
	)
}
