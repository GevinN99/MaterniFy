import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null)
    const router = useRouter();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const storedRole = await AsyncStorage.getItem("role");
                const storedUserId = await AsyncStorage.getItem("userId")
                console.log("AuthContext - Initial Load - Token:", token);
                console.log("AuthContext - Initial Load - Role:", storedRole);

                if (token) {
                    setUser(token);
                    setRole(storedRole);
                    // Only redirect if not already on a valid page
                    const currentPath = router.pathname; // Note: router.pathname might not work directly with expo-router; adjust if needed
                    if (!currentPath || currentPath === "/auth/Login" || currentPath === "/auth/DoctorLogin") {
                        if (storedRole === "doctor") {
                            router.replace("/(tabs)/doctor-home");
                        } else {
                            router.replace("/(tabs)/index");
                        }
                    }
                } else {
                    router.replace("/auth/Login");
                }
            } catch (error) {
                console.error("Error loading user from AsyncStorage:", error);
                router.replace("/auth/Login");
            }
        };
        loadUser();
    }, []); // Empty dependency array ensures this runs only once on mount

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("userId");
            await AsyncStorage.removeItem("role");
            setUser(null);
            setRole(null);
            router.replace("/auth/Login");
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, role, logout }}>
            {children}
        </AuthContext.Provider>
    );
};