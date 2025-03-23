import axiosInstance from "./axiosInstance";

export const getChatHistory = async () => {
    try {
        const response = await axiosInstance.get("/chat/history");
        return response.data;
    } catch (error) {
        console.error("Error fetching chat history:", error);
        return [];
    }
};

export const sendMessage = async (data) => {
	const response = await axiosInstance.post("/chat/send", data)

	return response.data
}