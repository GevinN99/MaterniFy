import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet } from "react-native"

export default function TabsLayout() {
	return (
        <Tabs                
            screenOptions={{                
				tabBarActiveTintColor: "#38BDF8",
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "bold",
				},
				tabBarStyle: styles.tabBar,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					headerTitle: "Home",
					title: "",
					headerShown: false,
					tabBarIcon: ({ focused, color }) => (
						<Ionicons
							name={focused ? "home" : "home-outline"}
							size={30}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="chatbot"
				options={{
					headerTitle: "Chatbot",
					title: "",
					headerShown: false,
					tabBarIcon: ({ focused, color }) => (
						<Ionicons
							name={focused ? "chatbubble" : "chatbubble-outline"}
							size={30}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="community"
				options={{
					headerTitle: "Community",
					title: "",
					headerShown: false,
                    tabBarIcon: ({ focused, color }) => (                        
						<Ionicons
							name={focused ? "people" : "people-outline"}
							size={30}
                            color={color}                            
						/>
					),
				}}
			/>
		</Tabs>
	)
}

const styles = StyleSheet.create({
	tabBar: {
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",        
		borderRadius: 50, 
        margin: 10,        
		shadowColor: "#000", 
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
})
