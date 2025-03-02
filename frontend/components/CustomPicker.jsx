import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native"
import { ChevronDown, ChevronUp } from "lucide-react-native"
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated"

const CustomPicker = ({ items, selectedValue, onValueChange }) => {
	const [dropdownVisible, setDropdownVisible] = useState(false)
	const heightValue = useSharedValue(0)
	
	const toggleDropdown = () => {
		setDropdownVisible(!dropdownVisible)
		heightValue.value = dropdownVisible
			? withTiming(0)
			: withTiming(items.length === 1 ? 80 : 150) 
	}

	const handleSelect = (value) => {
		onValueChange(value)
		toggleDropdown()
	}

	const selectedItem = items.find((item) => item.value === selectedValue)

	const animatedDropdownStyle = useAnimatedStyle(() => ({
		height: heightValue.value,
		overflow: "hidden",
	}))

	return (
		<View>
			<TouchableOpacity
				className="flex flex-row items-center justify-between border border-gray-200 rounded-md p-2"
				onPress={toggleDropdown}
			>
				{selectedItem ? (
					<View className="flex flex-row gap-4 items-center">
						<Image
							source={{ uri: selectedItem.imageUrl }}
							className="w-10 h-10 rounded-full"
						/>
						<Text>{selectedItem.label}</Text>
					</View>
				) : (
					<Text>Select a community</Text>
				)}
				{dropdownVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
			</TouchableOpacity>

			{/* Accordion Dropdown with Scrolling */}
			<Animated.View
				style={animatedDropdownStyle}
				className="mt-2 rounded-md"
			>
				<ScrollView
					className="py-2 mt-2 border border-gray-200 rounded-md"
					nestedScrollEnabled={true}
				>
					{items.map((item) => (
						<TouchableOpacity
							key={item.value}
							className="flex flex-row items-center gap-4 p-2"
							onPress={() => handleSelect(item.value)}
						>
							<Image
								source={{ uri: item.imageUrl }}
								className="w-10 h-10 rounded-full"
							/>
							<Text>{item.label}</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</Animated.View>
		</View>
	)
}

export default CustomPicker
