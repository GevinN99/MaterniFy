import axiosInstance from "./axiosInstance";

export const getProfile = async () => {
    try {
        const response = await axiosInstance.get("/users/profile");
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return [];
    }
};

export const updateProfile = async (data) => {
	const response = await axiosInstance.put("/users/profile", data)

	return response.data
}

export const deleteProfile = async (data) => {
	const response = await axiosInstance.delete("/users/profile", data)

	return response.data

  
export const changePassword = async (data) => {
	const response = await axiosInstance.put("/users/password", data)

	return response.data
}