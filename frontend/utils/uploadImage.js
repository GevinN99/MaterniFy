import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

const uploadImage = async (uri, folder = "uploads") => {
	try {
		// Convert image to blob
		const response = await fetch(uri);
		const blob = await response.blob();

		// Generate a unique filename
		const fileName = `${Date.now()}-${uri.split("/").pop()}`;

		// Create a reference for the storage path dynamically
		const storageRef = ref(storage, `${folder}/${fileName}`);

		// Upload the file
		await uploadBytes(storageRef, blob);

		// Get the download URL
		const downloadURL = await getDownloadURL(storageRef);
		return downloadURL;
	} catch (error) {
		console.error("Error uploading image: ", error);
		throw error;
	}
};

export default uploadImage;