import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EpdsQuestions = [
    { question: "I have been able to laugh and see the funny side of things", options: ["As much as I always could","Not quite so much now","Definietly not so much now", "Not at all"] },
    { question: "I have looked forward with enjoyment to things", options: ["As much as I ever did", "Rather less than I used to", "Definitely less than I used to", "Hardly at all"] },
    { question: "I have blamed myself unnecessarily when things went wrong", options: ["Yes, most of the time", "Yes, some of the time", "Not very often", "No, never"] },
    { question: "I have been anxious or worried for no good reason", options: ["No, not at all", "Hardly ever", "Yes, sometimes", "Yes, very often"] },
    { question: "I have felt scared or panicky for no very good reason", options: ["Yes, quite a lot", "Yes, sometimes", "No, not much", "No, not at all"] },
    { question: "Things have been getting on top of me", options: ["Yes, most of the time I haven't been able to cope at all", "Yes, sometimes I haven't been coping as well as usual", "No, most of the time I have coped quite well", "No, I have been coping as well as ever"] },
    { question: "I have been so unhappy that I have had difficulty sleeping", options: ["Yes, most of the time", "Yes, sometimes", "Not very often", "No, not at all"] },
    { question: "I have felt sad or miserable", options: ["Yes, most of the time", "Yes, quite often", "Not very often", "No, not at all"] },
    { question: "I have been so unhappy that I have been crying", options: ["Yes, most of the time", "Yes, quite often", "Only occasionally", "No, never"] },
    { question: "The thought of harming myself has occurred to me", options: ["Yes, quite often", "Sometimes", "Hardly ever", "Never"] },
];

const EpdsQuestion = () => {
    const [responses, setResponses] = useState(Array(10).fill(null));
    const navigation = useNavigation();

    const handleAnswer = (index, answer) => {
        const updatedResponses = [...responses];
        updatedResponses[index] = answer;
        setResponses(updatedResponses);
    };

    return (
        <View style={styles.container}>
            {questions.map((q, index) => (
                <view key={index} style={styles.questionBlock}>
                    <Text style={styles.question}>{q.question}</Text>
                    {q.options.map((option, i) => (
                        <TouchableOpacity key={i} style={[styles.option, responses[index] === option ? styles.selected : null]} onPress={() => handleAnswer(index, option)}>
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </view>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EpdsResults", { responses })}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

