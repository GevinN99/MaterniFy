import { router, useRouter } from "expo-router";
import { Text,TextInput, TouchableOpacity, View, StyleSheet } from "react-native";

export default function Doctor(){
    const router = useRouter();
    return(
        <View
            style={{

            }}
            
        
        >
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 55,
                    fontWeight: "bold"


            }}
            >
                Find Doctors</Text>

            <Text
                style={{
                    fontSize:24,
                    right:30
                }}
            >
                Add your Doctor Details
            </Text>

            <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                            />
                            <TouchableOpacity style={styles.searchButton}>
                               
                            <Text style={styles.buttonText}>Search</Text>
                            </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor:"#64A8F1",
                    alignSelf:"center",
                    width:200,
                    margin:20,
                    padding:10,
                    borderRadius:10
                }}
                onPress={()=>router.push("/partner")}
                  
            >

                <Text
                    style={{
                            fontSize:30,
                            color:"#FFFF",
                            textAlign:"center"
                    }}>Next</Text>
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
  
  });