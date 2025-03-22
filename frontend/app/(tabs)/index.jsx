// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import moment from "moment";
// import { Svg, Circle } from "react-native-svg";
// import { LinearGradient } from "expo-linear-gradient";
// import { LineChart } from "react-native-chart-kit";
// import { Dimensions } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage"; 
// import BabyGrowthTracker from "../../components/GrowthTracker";
// import axiosInstance from "../../api/axiosInstance";

// const Landing = () => {
//   const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
//   const [currentWeek, setCurrentWeek] = useState(moment());
//   const [scores, setScores] = useState([5, 10, 15]); 
//   const [conceptionDate, setConceptionDate] = useState(null);
//   const [profilePic, setProfilePic] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const fetchUserName = async () => {
//       const storedName = await AsyncStorage.getItem("userName");
//       if (storedName) {
//         setUserName(storedName);
//       }
//       const fetchScores = async () => {
//         try {
//           const response = await axiosInstance.get("/quizzes/get-response" 
//              // headers: { Authorization: `Bearer ${token}` },
//           );

//         const thisWeekScores = response.data.filter(item => {
//           const itemDate = new Date(item.createdAt);
//           const now = new Date();
//           const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
//           return itemDate >= startOfWeek;
//         });

//         setScores(thisWeekScores);
//         setScores(response.data);
//       } catch (err) {
//         console.log("Error fetching scores:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchScores();
//     };
//     fetchUserName();
    
//   }, []);

//   if (loading) return <ActivityIndicator size="large" color="#A3C8E8" />;
//   // if (error)
//   //   return (
//   //     <View style={{ padding: 20 }}>
//   //       <Text style={{ color: "red", textAlign: "center" }}>Error: {error}</Text>
//   //     </View>
//   //   );

//   const screenWidth = Dimensions.get("window").width;
//   const chartData = {
//     labels: scores.map(item => new Date(item.createdAt).toLocaleDateString()),
//     datasets: [{ data: scores.map(item => item.totalScore) }],
//   };

//   useEffect(() => {
//     const fetchConceptionDate = async () => {
//       try {
//         const storedDate = await AsyncStorage.getItem("conceptionDate");
//         if (storedDate) {
//           setConceptionDate(storedDate);
//         }
//       } catch (error) {
//         console.error("Error fetching conception date:", error);
//       }
//     };
//     fetchConceptionDate();
//   }, [conceptionDate]); 
  
//     useEffect(() => {
//       const fetchProfilePic = async () => {
//         const storedPic = await AsyncStorage.getItem("profilePic");
//         if (storedPic) {
//           setProfilePic(storedPic);
//         }
//       };
//       fetchProfilePic();
//     }, []);

//   const getWeekDates = () => {
//     const startOfWeek = currentWeek.startOf("isoweek");
//     return [...Array(7)].map((_, i) => startOfWeek.clone().add(i, "days"));
//   };

//   const handlePrevWeek = () => {
//     setCurrentWeek((prev) => prev.clone().subtract(1, "week"));
//   };

//   const handleNextWeek = () => {
//     setCurrentWeek((prev) => prev.clone().add(1, "week"));
//   };

//   const CircularProgress = ({ percentage }) => {
//     const radius = 40;
//     const strokeWidth = 10;
//     const circumference = 2 * Math.PI * radius;
//     const progress = (percentage / 100) * circumference;
  
//     return (
//       <View style={{ justifyContent: "center", alignItems: "center" }}>
//         <Svg width={100} height={100}>
//           <Circle cx="50" cy="50" r={radius} stroke="#E0E0E0" strokeWidth={strokeWidth} fill="none" />
//           <Circle
//             cx="50"
//             cy="50"
//             r={radius}
//             stroke="orange"
//             strokeWidth={strokeWidth}
//             fill="none"
//             strokeDasharray={circumference}
//             strokeDashoffset={circumference - progress}
//             strokeLinecap="round"
//           />
//         </Svg>
//         <View style={{ position: "absolute", justifyContent: "center", alignItems: "center" }}>
//           <Text style={{ fontSize: 16, fontWeight: "bold" }}>{percentage}%</Text>
//         </View>
//       </View>
//     );
//   };
  

//   return (
//     <SafeAreaView style={styles.safeContainer}>
//       <ScrollView contentContainerStyle={styles.container}>
//       {profilePic ? (
//       <Image source={{ uri: profilePic }} style={styles.profileImage} />
//         ) : (
//           <Image source={require("../../assets/images/landing.png")} style={styles.profileImage} />
//         )} 
//         <Text style={styles.title}>Welcome, {userName ? userName : "Mom"}!</Text>


//         <View style={styles.growthTrackerCard}>
//           {conceptionDate ? (
//             <BabyGrowthTracker conceptionDate={conceptionDate} />
//           ) : (
//             <View style={styles.noConceptionContainer}>
//               <ActivityIndicator size="large" color="#0000ff" />
//               <Text style={styles.noConceptionText}>
//                 Please set your conception date to track Baby's Growth..
//               </Text>
              
//             </View>
//           )}
//         </View>


//         <View style={styles.secContainer}>
//           <View style={styles.row}>
//             <TouchableOpacity onPress={() => router.push("/HealthPlanScreen")}>
//             <View style={styles.buttonbox}>
//             <Text style={styles.topic}>Health Plan</Text>
//             <Image source={require("../../assets/images/health_plan.png")} style={styles.sectors} />
//             </View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => router.push("/emergency")}>
//             <View style={styles.buttonbox}>
//             <Text style={styles.topic}>Mental Health</Text>
//             <Image source={require("../../assets/images/mental_health.png")} style={styles.sectors} />
//             </View>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.row}>
//             <TouchableOpacity onPress={() => router.push("/HealthPlanScreen")}>
//             <View style={styles.buttonbox}>
//             <Text style={styles.topic}>Appointments</Text>
//             <Image source={require("../../assets/images/apoinment.png")} style={styles.sectors} />
//             </View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => router.push("/emergency")}>
//             <View style={styles.buttonbox}>
//             <Text style={styles.topic}>Emergency</Text>
//             <Image source={require("../../assets/images/emergency.png")} style={[styles.sectors, { tintColor: "white" }]} />
//             </View>
//             </TouchableOpacity>
//           </View>
//         </View>


//         <View style={styles.calendarContainer}>
//           <View style={styles.weekHeader}>
//             <TouchableOpacity onPress={handlePrevWeek}>
//               <Ionicons name="chevron-back" size={24} color="#64A8F1" />
//             </TouchableOpacity>
//             <Text style={styles.weekTitle}>{currentWeek.format("  MMMM D  ")}</Text>
//             <TouchableOpacity onPress={handleNextWeek}>
//               <Ionicons name="chevron-forward" size={24} color="#64A8F1" />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.weekDays}>
//             {getWeekDates().map((date) => (
//               <TouchableOpacity key={date.format("YYYY-MM-DD")} onPress={() => setSelectedDate(date.format("YYYY-MM-DD"))}>
//                 <Text style={[styles.dayText, selectedDate === date.format("YYYY-MM-DD") && styles.selectedDay]}>
//                 {date.format("dd").charAt(0)}{"\n"}{"\n"}{date.format("D")}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//           {selectedDate && (
//             <View style={{ alignItems: "center", marginTop: 10 }}>
//               <Text style={styles.dateText}>Doctor Checkup</Text>
//               <Text>{selectedDate}</Text>
//             </View>
// )}

//         </View>
//         <LinearGradient 
//           colors={['#E2E0E0', '#64A8F1']} 
//           style={styles.healthplan}>
//           <Text style={styles.healthtitle}>
//             Today's Health plan
//           </Text>
//           <Text style={styles.texthealth}>
//           "You need 8 glasses of water today 💧"
//           </Text>
//           <Text style={styles.texthealth}>
//           "Remember to take your iron supplements"
//           </Text>
//           <Text style={styles.texthealth}>
//           "Mild back pain detected? Try 5 mins of stretching."
//           </Text>
//           <CircularProgress percentage={100} />
          
//       </LinearGradient>

//       <View style={{ alignItems: "center", padding: 20 }}>
//           <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
//             Mental Health Summary
//           </Text>

//           <View>
//             {scores.length === 0 ? (<Text>No users scores found for now</Text>) : (
//             <LineChart
//               data={chartData}
//               width={screenWidth - 32}
//               height={220}
//               yAxisInterval={1}
//               chartConfig={{
//                 backgroundColor: "#FCFCFC",
//                 backgroundGradientFrom: "#FCFCFC",
//                 backgroundGradientTo: "#FCFCFC",
//                 decimalPlaces: 0,
//                 color: (opacity = 1) => `rgba(163, 200, 232, ${opacity})`,
//                 labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
//                 style: { borderRadius: 16 },
//                 propsForDots: { r: "6", strokeWidth: "2", stroke: "#A3C8E8" },
//               }}
//               bezier
//               style={{ marginVertical: 8, borderRadius: 16, backgroundColor: "#EAEFF4" }}
//             />)}
//             </View>
//         </View>

//             </ScrollView>
//     </SafeAreaView>
//   );
// };

// const getRiskMessage = (score) => {
//   if (score <= 10) return "Low Risk: Keep maintaining a healthy lifestyle!";
//   if (score <= 20) return "Moderate Risk: Try relaxation exercises & connect with support groups.";
//   return "High Risk: Seek professional help immediately!";
// };
// const styles = StyleSheet.create({
//   safeContainer: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//   },
//   container: {
//     alignItems: "center",
//     paddingVertical: 30,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 48,
//     fontWeight: "bold",
//     marginBottom:25
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap:10,
//     marginBottom:10
//   },
//   sectors: {
//     width: 50, 
//     height: 50,
//     resizeMode: "contain",
//     marginTop: 5,
      
//   },
//   secContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   topic: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     color:"white"
//   },
//   calendarContainer:{
//     margin: 30,
//     alignItems:"center",
//     backgroundColor:"#9DD2D8",
//     paddingVertical:20,
//     paddingHorizontal:20,
//     height:220,
//     width:350,
//     borderRadius:20
//   },
//   weekHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   weekTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   weekDays: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//   },
//   dayText: {
//     fontSize: 18,
//     color: "gray",
//     textAlign:"center",
//     padding:10,
//   },
//   selectedDay: {
//     fontSize: 19,
//     fontWeight: "bold",
//     color: "#64A8F1",
//   },
//   dateText: {
//     marginTop: 10,
//     fontSize: 20,
//     textAlign: "center",
//     color:"#005F80",
//     fontWeight:"bold"
//   },
//   healthplan:{
//     padding:15,
//     borderRadius:20,
//     width:350
//   },
//   healthtitle:{
//     textAlign:"center",
//     fontSize:20,
//     fontWeight:"bold",
//     padding:10,

//   },
//   texthealth:{
//     textAlign:"center",
//     paddingVertical:5,
//   },
//   emojiImage: {
//     width: 40, 
//     height: 40,
//     resizeMode: "contain",
//   },
//   growthTrackerCard: {
//     backgroundColor: "#FADCE4",
//     padding: 15,
//     borderRadius: 15,
//     width: "90%",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   noConceptionContainer: {
//     alignItems: "center",
//     padding: 10,
//   },
//   noConceptionText: {
//     marginTop: 5,
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#FF4500",
//   },
//   buttonbox:{
//     flexDirection: "row", 
//     justifyContent: "space-between",
//     alignItems: "center", 
//     width: 170, 
//     height: 100, 
//     backgroundColor: "#9DC3E2", 
//     borderRadius: 10, 
//     padding: 10,
//   }
// });

// export default Landing;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import moment from "moment";
import { Svg, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BabyGrowthTracker from "../../components/GrowthTracker";
import axiosInstance from "../../api/axiosInstance";

const Landing = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [currentWeek, setCurrentWeek] = useState(moment());
  const [scores, setScores] = useState([]);
  const [conceptionDate, setConceptionDate] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user name
        const storedName = await AsyncStorage.getItem("userName");
        if (storedName) {
          setUserName(storedName);
        }

        // Fetch scores
        const response = await axiosInstance.get("/quizzes/get-response");
        const thisWeekScores = response.data.filter((item) => {
          const itemDate = new Date(item.createdAt);
          const now = new Date();
          const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
          return itemDate >= startOfWeek;
        });

        setScores(thisWeekScores);

        // Fetch conception date
        const storedDate = await AsyncStorage.getItem("conceptionDate");
        if (storedDate) {
          setConceptionDate(storedDate);
        }

        // Fetch profile picture
        const storedPic = await AsyncStorage.getItem("profilePic");
        if (storedPic) {
          setProfilePic(storedPic);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#A3C8E8" />;
  // if (error)
  //   return (
  //     <View style={{ padding: 20 }}>
  //       <Text style={{ color: "red", textAlign: "center" }}>Error: {error}</Text>
  //     </View>
  //   );

  const screenWidth = Dimensions.get("window").width;
  const chartData = {
    labels: scores.map((item) => new Date(item.createdAt).toLocaleDateString()),
    datasets: [{ data: scores.map((item) => item.totalScore) }],
  };

  const getWeekDates = () => {
    const startOfWeek = currentWeek.startOf("isoweek");
    return [...Array(7)].map((_, i) => startOfWeek.clone().add(i, "days"));
  };

  const handlePrevWeek = () => {
    setCurrentWeek((prev) => prev.clone().subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => prev.clone().add(1, "week"));
  };

  const CircularProgress = ({ percentage }) => {
    const radius = 40;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const progress = (percentage / 100) * circumference;

    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Svg width={100} height={100}>
          <Circle cx="50" cy="50" r={radius} stroke="#E0E0E0" strokeWidth={strokeWidth} fill="none" />
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke="orange"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
          />
        </Svg>
        <View style={{ position: "absolute", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{percentage}%</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
        ) : (
          <Image source={require("../../assets/images/landing.png")} style={styles.profileImage} />
        )}
        <Text style={styles.title}>Welcome, {userName ? userName : "Mom"}!</Text>

        <View style={styles.growthTrackerCard}>
          {conceptionDate ? (
            <BabyGrowthTracker conceptionDate={conceptionDate} />
          ) : (
            <View style={styles.noConceptionContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.noConceptionText}>
                Please set your conception date to track Baby's Growth..
              </Text>
            </View>
          )}
        </View>

        <View style={styles.secContainer}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => router.push("/HealthPlanScreen")}>
              <View style={styles.buttonbox}>
                <Text style={styles.topic}>Health Plan</Text>
                <Image source={require("../../assets/images/health_plan.png")} style={styles.sectors} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/emergency")}>
              <View style={styles.buttonbox}>
                <Text style={styles.topic}>Mental Health</Text>
                <Image source={require("../../assets/images/mental_health.png")} style={styles.sectors} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => router.push("/HealthPlanScreen")}>
              <View style={styles.buttonbox}>
                <Text style={styles.topic}>Appointments</Text>
                <Image source={require("../../assets/images/apoinment.png")} style={styles.sectors} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/emergency")}>
              <View style={styles.buttonbox}>
                <Text style={styles.topic}>Emergency</Text>
                <Image source={require("../../assets/images/emergency.png")} style={[styles.sectors, { tintColor: "white" }]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.calendarContainer}>
          <View style={styles.weekHeader}>
            <TouchableOpacity onPress={handlePrevWeek}>
              <Ionicons name="chevron-back" size={24} color="#64A8F1" />
            </TouchableOpacity>
            <Text style={styles.weekTitle}>{currentWeek.format("  MMMM D  ")}</Text>
            <TouchableOpacity onPress={handleNextWeek}>
              <Ionicons name="chevron-forward" size={24} color="#64A8F1" />
            </TouchableOpacity>
          </View>
          <View style={styles.weekDays}>
            {getWeekDates().map((date) => (
              <TouchableOpacity key={date.format("YYYY-MM-DD")} onPress={() => setSelectedDate(date.format("YYYY-MM-DD"))}>
                <Text style={[styles.dayText, selectedDate === date.format("YYYY-MM-DD") && styles.selectedDay]}>
                  {date.format("dd").charAt(0)}
                  {"\n"}
                  {"\n"}
                  {date.format("D")}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedDate && (
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={styles.dateText}>Doctor Checkup</Text>
              <Text>{selectedDate}</Text>
            </View>
          )}
        </View>

        <LinearGradient colors={['#E2E0E0', '#64A8F1']} style={styles.healthplan}>
          <Text style={styles.healthtitle}>Today's Health plan</Text>
          <Text style={styles.texthealth}>"You need 8 glasses of water today 💧"</Text>
          <Text style={styles.texthealth}>"Remember to take your iron supplements"</Text>
          <Text style={styles.texthealth}>"Mild back pain detected? Try 5 mins of stretching."</Text>
          <CircularProgress percentage={100} />
        </LinearGradient>

        <View style={{ alignItems: "center", padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Mental Health Summary</Text>
          {scores.length > 0 ? (
            <View>
              {scores.length === 0 ? (<Text>No users scores found for now</Text>) : (
              <LineChart
                data={chartData}
                width={screenWidth - 32}
                height={220}
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: "#FCFCFC",
                  backgroundGradientFrom: "#FCFCFC",
                  backgroundGradientTo: "#FCFCFC",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(163, 200, 232, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
                  style: { borderRadius: 16 },
                  propsForDots: { r: "6", strokeWidth: "2", stroke: "#A3C8E8" },
                }}
                bezier
                style={{ marginVertical: 8, borderRadius: 16, backgroundColor: "#EAEFF4" }}
              />)}
            </View>
          ) : (
            <Text style={{ fontSize: 16, textAlign: "center", color: "#64A8F1", marginTop: 20 }}>
              No scores available. Try the EPDS test to track your mental health.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    alignItems: "center",
    paddingVertical: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 25,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  sectors: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginTop: 5,
  },
  secContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  topic: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  calendarContainer: {
    margin: 30,
    alignItems: "center",
    backgroundColor: "#9DD2D8",
    paddingVertical: 20,
    paddingHorizontal: 20,
    height: 220,
    width: 350,
    borderRadius: 20,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  dayText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    padding: 10,
  },
  selectedDay: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#64A8F1",
  },
  dateText: {
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
    color: "#005F80",
    fontWeight: "bold",
  },
  healthplan: {
    padding: 15,
    borderRadius: 20,
    width: 350,
  },
  healthtitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  texthealth: {
    textAlign: "center",
    paddingVertical: 5,
  },
  growthTrackerCard: {
    backgroundColor: "#FADCE4",
    padding: 15,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },
  noConceptionContainer: {
    alignItems: "center",
    padding: 10,
  },
  noConceptionText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF4500",
  },
  buttonbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 170,
    height: 100,
    backgroundColor: "#9DC3E2",
    borderRadius: 10,
    padding: 10,
  },
});

export default Landing;