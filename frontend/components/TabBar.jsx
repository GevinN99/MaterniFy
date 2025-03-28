import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Feather from "@expo/vector-icons/Feather";

const TabBar = ({ state, descriptors, navigation }) => {
	const { user } = useContext(AuthContext);
	const role = user?.role;

	return (
		<View className="flex flex-row justify-between items-center bg-white py-2 px-5 shadow-lg">
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;

				// Skip these routes
				if (["_sitemap", "+not-found"].includes(route.name)) return null;

				// Only show doctor-home and doctor-profile for doctors
				if (role === "doctor" && !["doctor-home", "doctor-profile"].includes(route.name)) return null;

				// Only show regular tabs for non-doctors
				if (role !== "doctor" && ["doctor-home", "doctor-profile"].includes(route.name)) return null;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const color = isFocused ? "#3b82f6" : "#6b7280";

				// Only render if tabBarIcon is defined
				if (!options.tabBarIcon) return null;

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
						{options.tabBarIcon({ color })}
						<Text
							className={`text-xs mt-2 ${
								isFocused ? "text-blue-500" : "text-gray-500"
							}`}
						>
							{label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default TabBar;