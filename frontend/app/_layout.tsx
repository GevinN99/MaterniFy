import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";


export default function Layout() {
  

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#64A8F1" }, // Change header background
          headerTintColor: "#fff", // Change header text color
          headerTitleStyle: { fontFamily: "Poppins-Regular", fontSize: 18 }, // Apply custom font
          contentStyle: { backgroundColor: "#F5F5F5" }, // Set background color for screens
          title: "MaterniFy",
          headerBackTitle:"Back"
        }}
      />
    </View>
  );
}
//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Set global background color
  },
});
