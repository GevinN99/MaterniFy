import React from "react"
import { View, Text } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HealthPlanScreen from "./HealthPlanScreen";
import AiGeneratedHealthTipsScreen from "./AiGeneratedHealthTipsScreen";
import DailyHealthChecklistScreen from "./DailyHealthChecklistScreen";

const Tab = createBottomTabNavigator();
function home() {
	return (
		<View>
			<Text>Welcome to Maternify!</Text>
		</View>
	)
}
export default function App() {
	return (
	  <Tab.Navigator initialRouteName="HealthPlan" screenOptions={{ headerShown: false }}>
		<Tab.Screen name="HealthPlan" component={HealthPlanScreen} options={{ tabBarLabel: 'Health Plan' }} />
		<Tab.Screen name="AiTips" component={AiGeneratedHealthTipsScreen} options={{ tabBarLabel: 'AI Tips' }} />
		<Tab.Screen name="Checklist" component={DailyHealthChecklistScreen} options={{ tabBarLabel: 'Checklist' }} />
	  </Tab.Navigator>
	);
  }


