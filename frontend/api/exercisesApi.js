import axios from "axios";

const API_URL = "http://10.31.30.84:8070/api";

export const fetchExercises = async () => {
    try{
        const response = await axios.get(
            `${API_URL}/exercises/fetch-exercises`
        );
        console.log("Response:", response);
        console.log("Data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};