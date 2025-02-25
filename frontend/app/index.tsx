
import { Text,Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function Index() {
  return (
    <LinearGradient
      colors={["#64A8F1","#E7EDEF"]}
      style={{
        flex: 1,
        alignItems: "center",
        
        
        
      }}
    >
      <Text
        style={{
          fontSize:60,
          fontWeight:"bold",
          
          
        }}
        >
          Emergency Assesment
          </Text>

      <Text
        style={{
          fontSize:22,
          fontStyle: "italic",
          marginTop:5,
          marginBottom:20
        }}
      
      >
        Stay Prepared, Stay Safe!
      </Text>

      <Image
        source={require("../assets/images/rec.png")} // Ensure the image is in the assets folder
        style={{
          width: 275, // Set image width
          height: 275, // Set image height
          marginBottom: 20, // Add spacing below the image
          marginTop: 30,
          borderRadius: 250,
        }}
        resizeMode="contain" // Keep aspect ratio
      
      />

<Text
        style={{
          fontSize:18,
          fontStyle: "italic",
          margin: 30,
          textAlign:"center"
        }}
      
      >
        Add your hospital, doctors, and emergency contacts to get instant support when you need it most.
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor:"#64A8F1",
          borderRadius:10,
          marginTop:20,
          paddingHorizontal:40,
          paddingVertical:15

        }}

        onPress={()=>router.push("/location")}
      
      >
        <Text
          style={{
            fontSize:30,
            color:"#FFFF"
            
            
          }}
        
        >Get Started</Text>
      </TouchableOpacity>
      
    </LinearGradient>
  );
}
