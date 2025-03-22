import { Tabs } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native"; // Add imports for loading UI
import TabBar from "../../components/TabBar";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

export default function TabsLayout() {
	const { user } = useContext(AuthContext);
	const [role, setRole] = useState(null);

	useEffect(() => {
		const fetchRole = async () => {
			const storedRole = await AsyncStorage.getItem("role");
			console.log("Fetched role from AsyncStorage:", storedRole); // Debug log
			setRole(storedRole);
		};
		fetchRole();
	}, [user]);

	console.log("Current role:", role); // Debug log

	// Show a loading indicator while role is being fetched
	if (role === null) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#007AFF" />
			</View>
		);
	}

	if (role === "doctor") {
		return (
			<Tabs tabBar={(props) => <TabBar {...props} />}>
				<Tabs.Screen
					name="doctor-home"
					options={{
						headerTitle: "Doctor Dashboard",
						headerShown: false,
						tabBarLabel: "Home",
						tabBarIcon: ({ color }) => (
							<Feather name="home" size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="chatbot"
					options={{
						headerTitle: "Chatbot",
						headerShown: false,
						tabBarLabel: "Chatbot",
						tabBarIcon: ({ color }) => (
							<Octicons name="dependabot" size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="community"
					options={{
						headerTitle: "Community",
						headerShown: false,
						tabBarLabel: "Community",
						tabBarIcon: ({ color }) => (
							<Feather name="users" size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="doctor-profile"
					options={{
						headerTitle: "Doctor Profile",
						headerShown: false,
						tabBarLabel: "Profile",
						tabBarIcon: ({ color }) => (
							<Feather name="user" size={24} color={color} />
						),
					}}
				/>
			</Tabs>
		);
	}

	// Default tabs for non-doctor roles (e.g., mothers)
	return (
		<Tabs tabBar={(props) => <TabBar {...props} />}>
			<Tabs.Screen
				name="index"
				options={{
					headerTitle: "Home",
					headerShown: false,
					tabBarLabel: "Home",
					tabBarIcon: ({ color }) => (
						<Feather name="home" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="chatbot"
				options={{
					headerTitle: "Chatbot",
					headerShown: false,
					tabBarLabel: "Chatbot",
					tabBarIcon: ({ color }) => (
						<Octicons name="dependabot" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="community"
				options={{
					headerTitle: "Community",
					headerShown: false,
					tabBarLabel: "Community",
					tabBarIcon: ({ color }) => (
						<Feather name="users" size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}