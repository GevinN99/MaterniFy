import { Tabs } from "expo-router"
import React from "react"
import TabBar from "../../components/TabBar"
import { House, Bot, UsersRound } from "lucide-react-native"

export default function TabsLayout() {
	return (
		<Tabs tabBar={(props) => <TabBar {...props} />}>
			<Tabs.Screen
				name="index"
				options={{
					headerTitle: "Home",
					headerShown: false,
					tabBarLabel: "Home",
					tabBarIcon: ({ focused }) => (
						<House
							className={`text-${focused ? "blue-500" : "gray-500"}`}
							size={26}
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
					tabBarIcon: ({ focused, color }) => (
						<Bot
							className={`text-${focused ? "blue-500" : "gray-500"}`}
							size={26}
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
					tabBarIcon: ({ focused, color }) => (	
						<UsersRound
							className={`text-${focused ? "blue-500" : "gray-500"}`}
							size={26}
						/>
					),
				}}
			/>
		</Tabs>
	)
}
