import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../firebaseConfig" // Adjust the import path as needed

const uploadImage = async (uri) => {
	try {
		// Convert the image to a blob
		const response = await fetch(uri)
		const blob = await response.blob()

		// Extract the original file name from the URI
		const fileName = uri.split("/").pop()

		// Create a reference to the storage location using the original file name
		const storageRef = ref(storage, `community/${fileName}`)

		// Upload the image
		await uploadBytes(storageRef, blob)

		// Get the download URL
		const downloadURL = await getDownloadURL(storageRef)

		return downloadURL
	} catch (error) {
		console.error("Error uploading image: ", error)
		throw error
	}
}

export default uploadImage
