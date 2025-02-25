import { useRouter } from "expo-router";
import { Text,TextInput, TouchableOpacity, View, StyleSheet } from "react-native";

export default function Location(){
    const router = useRouter();
    return(
        <View
            style={{
                alignItems:"center",
                paddingVertical:20
            }}
        
        >
            <Text
                style={{
                    fontSize:50,
                    fontWeight:"bold"
                }}
            >
                Nearest Hospital
            </Text>
            <Text
                style={{
                    margin:20,
                    fontSize:30,
                    right:30
                }}
            >
                Add your Home Address
            </Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for a location..."
                    
                />
                <TouchableOpacity style={styles.searchButton}>
                   
                <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                    style={{
                      backgroundColor:"#64A8F1",
                      borderRadius:10,
                      marginTop:20,
                      paddingHorizontal:40,
                      paddingVertical:15,
                      bottom:-350
            
                    }}
            
                    onPress={()=>router.push("/doctor")}
                  
                  >
                    <Text
                      style={{
                        fontSize:30,
                        color:"#FFFF"
                        
                        
                      }}
                    
                    >
                        Next
                    </Text>
                  </TouchableOpacity>
        </View>

        

    );
}
//Styles
const styles = StyleSheet.create({
    searchContainer: {
      position:"static",
      top: 50,
      left: 20,
      right: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 5,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      marginHorizontal:20
    },
    searchInput: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
      fontSize: 16,
    },
    searchButton: {
      backgroundColor: "#007AFF",
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    backButton: {
      position: "absolute",
      bottom: 50,
      left: 20,
      backgroundColor: "#007AFF",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      
    },
  });
  