import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Feather from "@expo/vector-icons/Feather";

const TabBar = ({ state, descriptors, navigation }) => {
	const { logout } = useContext(AuthContext);

	return (
		<View className="flex flex-row justify-between items-center bg-white py-2 px-5 shadow-lg">
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key]
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name

				if (["_sitemap", "+not-found"].includes(route.name)) return null

				const isFocused = state.index === index

				// Function to handle tab press
				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					})

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params)
					}
				}

				const color = isFocused ? "#3b82f6" : "#6b7280"

				// Check if the tab has a custom icon, otherwise use a fallback
				const icon =
					typeof options.tabBarIcon === "function" ? (
						options.tabBarIcon({ color })
					) : (
						<Feather
							name="alert-circle"
							size={24}
							color={color}
						/>
					)

				return (
					<TouchableOpacity
						key={route.name}
						className="flex-1 items-center py-2"
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
					>
						{icon}
						<Text
							className={`text-xs mt-2 ${
								isFocused ? "text-blue-500" : "text-gray-500"
							}`}
						>
							{label}
						</Text>
					</TouchableOpacity>
				)
			})}

			{/* Logout Button */}
			<TouchableOpacity
				onPress={logout}
				className="flex items-center px-4 py-2 bg-red-500 rounded-full"
			>
				<Feather name="log-out" size={20} color="white" />
				<Text className="text-white text-xs mt-1">Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

export default TabBar;