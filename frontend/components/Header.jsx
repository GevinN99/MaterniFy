import { View, Text, Animated, StyleSheet } from "react-native"
import React from "react"
import { Link } from "expo-router"
import { ArrowLeft, ChevronLeft } from "lucide-react-native"
import Feather from "@expo/vector-icons/Feather"

const Header = ({ backLink, title }) => {
	return (
		<View className="px-4 pt-4 pb-6 flex flex-row items-center bg-[#E7EDEF]">
			<Link
				href={backLink}
				className="mr-2"
			>
				{/* <ChevronLeft strokeWidth={3}/> */}
				<Feather
					name="chevron-left"
					size={28}
					color="black"
				/>
			</Link>
			<Text className="text-2xl font-bold">{title}</Text>
		</View>
	)
}

export default Header
