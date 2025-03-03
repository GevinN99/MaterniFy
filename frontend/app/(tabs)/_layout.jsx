// app/(tabs)/_layout.tsx (or .jsx)
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import HealthPlanScreen from './HealthPlanScreen';
import AiGeneratedHealthTipsScreen from './AiGeneratedHealthTipsScreen';
import DailyHealthChecklistScreen from './DailyHealthChecklistScreen';
import chatbot from './chatbot';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#38BDF8',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* VISIBLE TAB (Home) */}
      <Tab.Screen
        name="Home"
        component={HealthPlanScreen}
        options={{
          headerTitle: 'Home',
          title: '',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={30}
              color={color}
            />
          ),
        }}
      />
       {/* VISIBLE TAB (Home) */}
       <Tab.Screen
        name="chatbot"
        component={chatbot}
        options={{
          headerTitle: 'Chatbot',
          title: '',
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
      

      {/* HIDDEN TAB (AiTips) */}
      <Tab.Screen
        name="AiTips"
        component={AiGeneratedHealthTipsScreen}
        options={{
          // Hide this tab from the bar
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      />

       {/* HIDDEN TAB (AiTips) */}
       <Tab.Screen
        name="Checklist"
        component={DailyHealthChecklistScreen}
        options={{
          // Hide this tab from the bar
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      /> 

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 50,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
