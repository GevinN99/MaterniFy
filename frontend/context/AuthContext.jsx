import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const loadUser = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                setUser(token);
                router.replace("/"); // Redirect to home page if user is logged in
            } else {
                router.replace("/auth/Login"); // Redirect to login if no token
            }
        };
        loadUser();
    }, []);

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        setUser(null);
        router.replace("/auth/Login"); // Redirect to login page on logout
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
