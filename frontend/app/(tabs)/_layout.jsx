import { Tabs } from "expo-router"
import React from "react"
import TabBar from "../../components/TabBar"
import Octicons from "@expo/vector-icons/Octicons"
import Feather from "@expo/vector-icons/Feather"

export default function TabsLayout() {
	return (
		<Tabs			
			tabBar={(props) => <TabBar {...props} />}
		>
			<Tabs.Screen
				name="index"
				options={{
					headerTitle: "Home",
					headerShown: false,
					tabBarLabel: "Home",
					tabBarIcon: ({ color }) => (
						// <House
						// 	className={`text-${focused ? "blue-500" : "gray-500"}`}
						// 	size={26}
						// />
						<Feather
							name="home"
							size={24}
							color={color}
						/>
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
						// <Bot
						// 	className={`text-${focused ? "blue-500" : "gray-500"}`}
						// 	size={26}
						// />
						<Octicons
							name="dependabot"
							size={24}
							color={color}
						/>
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
						// <UsersRound
						// 	className={`text-${focused ? "blue-500" : "gray-500"}`}
						// 	size={26}
						// />
						<Feather
							name="users"
							size={24}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	)
}
