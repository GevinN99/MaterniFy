import { View, Text, TouchableOpacity } from "react-native"
import React from "react"

const TabBar = ({ state, descriptors, navigation }) => {

	return (
		<View className="flex flex-row justify-between items-center bg-white py-2 px-5 rounded-3xl shadow-lg absolute bottom-6 left-0 right-0 mx-5">
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
				
				const icon = options.tabBarIcon({
					// focused: isFocused,		
					color
				})

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
		</View>
	)
}

export default TabBar
