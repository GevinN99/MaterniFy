// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";
import TabBar from "../../components/TabBar";
import { House, Bot, UsersRound } from "lucide-react-native";


// Import visible and hidden screens
import HealthPlanScreen from "./HealthPlanScreen";
import AiGeneratedHealthTipsScreen from "./AiGeneratedHealthTipsScreen";
import DailyHealthChecklistScreen from "./DailyHealthChecklistScreen";
import chatbot from "./chatbot";

export default function TabsLayout() {
  return (
    // Use your custom TabBar provided by your main branch
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      {/* Visible Tab: Home */}
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

      {/* Visible Tab: Chatbot */}
      <Tabs.Screen
        name="chatbot"
        options={{
          headerTitle: "Chatbot",
          headerShown: false,
          tabBarLabel: "Chatbot",
          tabBarIcon: ({ focused }) => (
            <Bot
              className={`text-${focused ? "blue-500" : "gray-500"}`}
              size={26}
            />
          ),
        }}
      />

      {/* Visible Tab: Community */}
      <Tabs.Screen
        name="community"
        options={{
          headerTitle: "Community",
          headerShown: false,
          tabBarLabel: "Community",
          tabBarIcon: ({ focused }) => (
            <UsersRound
              className={`text-${focused ? "blue-500" : "gray-500"}`}
              size={26}
            />
          ),
        }}
      />

      {/* Hidden Tab: AiTips */}
      <Tabs.Screen
        name="AiTips"
        component={AiGeneratedHealthTipsScreen}
        options={{
          headerTitle: "AI Tips",
          headerShown: false,
          tabBarItemStyle: { display: "none" },
          tabBarStyle: { display: "none" },
        }}
      />

      {/* Hidden Tab: Checklist */}
      <Tabs.Screen
        name="Checklist"
        component={DailyHealthChecklistScreen}
        options={{
          headerTitle: "Checklist",
          headerShown: false,
          tabBarItemStyle: { display: "none" },
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
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
});
