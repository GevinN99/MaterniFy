import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const Landing = () => {
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    

    const handleSelectEmotion = (emotion: string) => {
        setSelectedEmotion(emotion);
        console.log(`Selected Emotion: ${emotion}`);  // Send this data to a backend 
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('../assets/images/landing.png')} 
                style={styles.image}
            />
            <Text style={styles.title}>Welcome, Sarah!</Text>
            <Text style={styles.subtitle}>How are you feeling today?</Text>

            <View style={styles.emojiContainer}>
                <TouchableOpacity onPress={() => handleSelectEmotion('Happy')}>
                    <Ionicons name="happy" size={35} color={selectedEmotion === 'Happy' ? "green" : "#64A8F1"} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSelectEmotion('Calm')}>
                    <Ionicons name="happy-outline" size={35} color={selectedEmotion === 'Calm' ? "lightgreen" : "#64A8F1"} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSelectEmotion('Confused')}>
                    <Ionicons name="help-circle" size={35} color={selectedEmotion === 'Confused' ? "#E0C412" : "#64A8F1"} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSelectEmotion('Sad')}>
                    <Ionicons name="sad" size={35} color={selectedEmotion === 'Sad' ? "orange" : "#64A8F1"} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSelectEmotion('Angry')}>
                    <Ionicons name="close-circle" size={35} color={selectedEmotion === 'Angry' ? "red" : "#64A8F1"} />
                </TouchableOpacity>
            </View>
                <View style={styles.secContainer}>
                    <View style={styles.row}>
                        <View>
                            <Image
                            source={require('../assets/images/Healthplan.png')} 
                            style={styles.sectors}
                            />
                            <Text style={styles.topic}>Health Plan</Text>
                        </View>
                    
                        <View>
                            <Image
                            source={require('../assets/images/Mentalhealth.png')} 
                            style={styles.sectors}
                            /> 
                            <Text style={styles.topic}>Mental Health</Text>
                        </View>
                    
                    </View>

                <View style={styles.row}>
                    <View>
                        <Image
                        source={require('../assets/images/Appoinments.png')} 
                        style={styles.sectors}
                        />
                        <Text style={styles.topic}>Appoinments</Text>
                    </View>
                    
                    <View>
                        <Image
                        source={require('../assets/images/Emmergency.png')} 
                        style={styles.sectors}
                        />
                        <Text style={styles.topic}>Emergency</Text>
                    </View>

                    
                    
                </View>
                <View style={styles.calandercontainer}>
                        <Text style={styles.calandertitle}>Select a Date</Text>
                        <Calendar
                        onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: 'blue' },
                        }}
                        />

                        {selectedDate ? <Text style={styles.dateText}>Selected Date: {selectedDate}</Text> : null}
                    </View>
                    
                
            </View>
            <View style={styles.page}>
                <TouchableOpacity style={styles.baricon}>
                    <Ionicons name={"calendar"} size={40} color={"white"}/>
                    <Text style={styles.icontxt}>Today</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.baricon} >
                    <Ionicons name={"globe"} size={40} color={"white"}/>
                    <Text style={styles.icontxt}>Community</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.baricon}>
                    <Ionicons name={"chatbubble-ellipses"} size={40} color={"white"}/>
                    <Text style={styles.icontxt}>Today</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.baricon}>
                    <Ionicons name={"person"} size={40} color={"white"}/>
                    <Text style={styles.icontxt}>Today</Text>
                </TouchableOpacity>

                </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold",
    },
    subtitle: {
        textAlign: "center",
        fontSize: 24,
        marginVertical:10
    },
    emojiContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
    
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    sectors:{
        width: 150,   
        height: 150,
        margin:5, 
    },
    secContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topic:{
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold"
    },
    page:{
        height:"14%",
        width:"95%",
        backgroundColor:"#64A8F1",
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius:30
    },
    baricon:{
        alignSelf:"center",
        marginHorizontal:20,
    },
    icontxt:{
        color:"white",
        textAlign:"center"
    },
    calandercontainer: {
        flex: 1,
        padding: 20,
        marginTop: 50,
    },
    calandertitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    dateText: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Landing;
