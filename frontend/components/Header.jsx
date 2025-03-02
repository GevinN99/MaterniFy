import { View, Text, Animated, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from "expo-router"
// import { Ionicons } from "@expo/vector-icons"
import { ArrowLeft } from "lucide-react-native"

const Header = ({backLink, title}) => {
  return (
		<View className="px-4 pt-4 pb-6 flex flex-row items-center bg-[#E7EDEF]">
			<Link
				href={backLink}
				className="mr-2"
			>
				<ArrowLeft strokeWidth={3}/>
			</Link>
			<Text className="text-2xl font-bold">{title}</Text>
		</View>
	)
}

export default Header
