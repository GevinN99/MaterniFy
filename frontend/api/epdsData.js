export const questions = [
    {
        question: "I have been able to laugh and see the funny side of things",
        options: [
            { text: "As much as I always could", score: 0 },
            { text: "Not quite so much now", score: 1 },
            { text: "Definitely not so much now", score: 2 },
            { text: "Not at all", score: 3 }
        ]
    },
    {
        question: "I have looked forward with enjoyment to things",
        options: [
            { text: "As much as I ever did", score: 0 },
            { text: "Rather less than I used to", score: 1 },
            { text: "Definitely less than I used to", score: 2 },
            { text: "Hardly at all", score: 3 }
        ]
    },
    {
        question: "I have blamed myself unnecessarily when things went wrong",
        options: [
            { text: "Yes, most of the time", score: 3 },
            { text: "Yes, some of the time", score: 2 },
            { text: "Not very often", score: 1 },
            { text: "No, never", score: 0 }
        ]
    },
    {
        question: "I have been anxious or worried for no good reason",
        options: [
            { text: "No, not at all", score: 0 },
            { text: "Hardly ever", score: 1 },
            { text: "Yes, sometimes", score: 2 },
            { text: "Yes, very often", score: 3 }
        ]
    },
    {
        question: "I have felt scared or panicky for no very good reason",
        options: [
            { text: "Yes, quite a lot", score: 3 },
            { text: "Yes, sometimes", score: 2 },
            { text: "No, not much", score: 1 },
            { text: "No, not at all", score: 0 }
        ]
    },
    {
        question: "Things have been getting on top of me",
        options: [
            { text: "Yes, most of the time I haven't been able to cope at all", score: 3 },
            { text: "Yes, sometimes I haven't been coping as well as usual", score: 2 },
            { text: "No, most of the time I have coped quite well", score: 1 },
            { text: "No, I have been coping as well as ever", score: 0 }
        ]
    },
    {
        question: "I have been so unhappy that I have had difficulty sleeping",
        options: [
            { text: "Yes, most of the time", score: 3 },
            { text: "Yes, sometimes", score: 2 },
            { text: "Not very often", score: 1 },
            { text: "No, not at all", score: 0 }
        ]
    },
    {
        question: "I have felt sad or miserable",
        options: [
            { text: "Yes, most of the time", score: 3 },
            { text: "Yes, quite often", score: 2 },
            { text: "Not very often", score: 1 },
            { text: "No, not at all", score: 0 }
        ]
    },
    {
        question: "I have been so unhappy that I have been crying",
        options: [
            { text: "Yes, most of the time", score: 3 },
            { text: "Yes, quite often", score: 2 },
            { text: "Only occasionally", score: 1 },
            { text: "No, never", score: 0 }
        ]
    },
    {
        question: "The thought of harming myself has occurred to me",
        options: [
            { text: "Yes, quite often", score: 3 },
            { text: "Sometimes", score: 2 },
            { text: "Hardly ever", score: 1 },
            { text: "Never", score: 0 }
        ]
    }
];

export const getRecommendations = (score) => {
    if (score <= 9) {
      return { message: "Your score indicates a low risk of depression.", actions: [] };
    } else if (score <= 12) {
      return {
        message: "Your score suggests moderate depressive symptoms. Consider mental health exercises.",
        actions: [
          { label: "Try Guided Exercises", route: "/guided-exercises" }
        ]
      };
    } else {
      return {
        message: "Your score indicates high risk of depression. We recommend speaking to a professional.",
        actions: [
          { label: "Find a Therapist", route: "/therapist-list" },
          { label: "Emergency Help", route: "/emergency" }
        ]
      };
    }
  };
  