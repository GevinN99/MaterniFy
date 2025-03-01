import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const EpdsQuestions = [

    { id: 1,
        question: "I have been able to laugh and see the funny side of things",
         options: [
            { text: "As much as I always could", score: 3 },
            { text: "Not quite so much now", score: 2 },
            { text: "Definitely not so much now", score: 1 },
            { text: "Not at all", score: 0 }
        ] 
    },

    { id: 2,
        question: "I have looked forward with enjoyment to things", 
        options: [
            { text: "As much as I ever did", score: 3 },
            { text: "Rather less than I used to", score: 2 },
            { text: "Definitely less than I used to", score: 1 },
            { text: "Hardly at all", score: 0 }
        ] 
    },

    { id: 3,
        question: "I have blamed myself unnecessarily when things went wrong", 
        options: [
            { text: "Yes, most of the time", score: 0 },
            { text: "Yes, some of the time", score: 1 },
            { text: "Not very often", score: 2 },
            { text: "No, never", score: 3 }
        ]
    },

    { id: 4,
        question: "I have been anxious or worried for no good reason", 
        options: [
            { text: "No, not at all", score: 3 },
            { text: "Hardly ever", score: 2 },
            { text: "Yes, sometimes", score: 1 },
            { text: "Yes, very often", score: 0 }
        ] 
    },

    { id: 5,
        question: "I have felt scared or panicky for no very good reason", 
        options: [
            { text: "Yes, quite a lot", score: 0 },
            { text: "Yes, sometimes", score: 1 },
            { text: "No, not much", score: 2 },
            { text: "No, not at all", score: 3 }
        ] 
    },

    { id: 6,
        question: "Things have been getting on top of me", 
        options: [
            { text: "Yes, most of the time I haven't been able to cope at all", score: 0 },
            { text: "Yes, sometimes I haven't been coping as well as usual", score: 1 },
            { text: "No, most of the time I have coped quite well", score: 2 },
            { text: "No, I have been coping as well as ever", score: 3 }
        ] 
    },

    { id: 7,
        question: "I have been so unhappy that I have had difficulty sleeping", 
        options: [
            { text: "Yes, most of the time", score: 0 },
            { text: "Yes, sometimes", score: 1 },
            { text: "Not very often", score: 2 },
            { text: "No, not at all", score: 3 }
        ] 
    },

    { id: 8,
        question: "I have felt sad or miserable", 
        options: [
            { text: "Yes, most of the time", score: 0 },
            { text: "Yes, quite often", score: 1 },
            { text: "Not very often", score: 2 },
            { text: "No, not at all", score: 3 }
        ] 
    },

    { id: 9,
        question: "I have been so unhappy that I have been crying", 
        options: [
            { text: "Yes, most of the time", score: 0 },
            { text: "Yes, quite often", score: 1 },
            { text: "Only occasionally", score: 2 },
            { text: "No, never", score: 3 }
        ] 
    },

    { id: 10,
        question: "The thought of harming myself has occurred to me", 
        options: [
            { text: "Yes, quite often", score: 0 },
            { text: "Sometimes", score: 1 },
            { text: "Hardly ever", score: 2 },
            { text: "Never", score: 3 }
        ] 
    },
];