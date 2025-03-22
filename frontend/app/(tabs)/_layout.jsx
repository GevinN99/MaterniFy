import { Tabs } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
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
			setRole(storedRole);
		};
		fetchRole();
	}, [user]);

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
			</Tabs>
		);
	}

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
			<Tabs.Screen
				name="profile"
				options={{
					headerTitle: "Profile",
					headerShown: false,
					tabBarLabel: "Profile",
					tabBarIcon: ({ color }) => (
						// <UsersRound
						// 	className={`text-${focused ? "blue-500" : "gray-500"}`}
						// 	size={26}
						// />
						<Feather 
							name="user" 
							size={24} 
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}