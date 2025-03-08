import { useEffect, useState } from "react";

const Exercises = ({ userId }) => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(`http://localhost:8070/api/exercises/${userId}`);
                if (!response.ok) throw new Error("Failed to fetch exercises");
                const data = await response.json();
                setExercises(data);
            } catch (error) {
                console.error("Failed to fetch exercises:", error);
            }
        };

        fetchExercises();
    }, [userId]);

    return (
        <div>
            <h2>Recommended Mental Exercises</h2>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise._id}>
                        <h3>{exercise.title}</h3>
                        <p>{exercise.description}</p>
                        {exercise.type === "text" && <p>{exercise.content}</p>}
                        {exercise.type === "audio" && <audio controls src={exercise.content}></audio>}
                        {exercise.type === "video" && <video controls src={exercise.content}></video>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Exercises;
