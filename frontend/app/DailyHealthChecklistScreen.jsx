

import { useState, useEffect } from "react"
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native"
import Checkbox from "expo-checkbox"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function DailyHealthChecklistScreen() {
	const router = useRouter()
	const [hydration, setHydration] = useState(false)
	const [physicalActivity, setPhysicalActivity] = useState(false)
	const [prenatalCare, setPrenatalCare] = useState(false)
	const [balancedDiet, setBalancedDiet] = useState(false)
	const [kegel, setKegel] = useState(false)
	const [mindfulSleep, setMindfulSleep] = useState(false)
	const [progressPercent, setProgressPercent] = useState(0)
	const [lastResetDate, setLastResetDate] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	// Function to save all data to AsyncStorage
	const saveToAsyncStorage = async (tasks, percentage, resetDate) => {
		try {
			const promises = [
				AsyncStorage.setItem("healthChecklist", JSON.stringify(tasks)),
				AsyncStorage.setItem("progressPercent", JSON.stringify(percentage)),
			]

			// Only update the reset date if provided
			if (resetDate) {
				promises.push(
					AsyncStorage.setItem("lastResetDate", JSON.stringify(resetDate))
				)
			}

			await Promise.all(promises)
	
		} catch (error) {
			console.error("Error saving to AsyncStorage", error)
		}
	}

	// Function to reset all tasks
	const resetTasks = async () => {
	
		const resetTasks = {
			hydration: false,
			physicalActivity: false,
			prenatalCare: false,
			balancedDiet: false,
			kegel: false,
			mindfulSleep: false,
		}
		const today = new Date().toDateString()

		setHydration(false)
		setPhysicalActivity(false)
		setPrenatalCare(false)
		setBalancedDiet(false)
		setKegel(false)
		setMindfulSleep(false)
		setProgressPercent(0)
		setLastResetDate(today)

		await saveToAsyncStorage(resetTasks, 0, today)
	}

	// Load initial data and check for reset only once
	useEffect(() => {
		const loadData = async () => {
			try {
				setIsLoading(true)
				

				const [storedTasks, storedProgress, storedResetDate] =
					await Promise.all([
						AsyncStorage.getItem("healthChecklist"),
						AsyncStorage.getItem("progressPercent"),
						AsyncStorage.getItem("lastResetDate"),
					])

		

				const today = new Date().toDateString()
				

				// If there's a stored reset date, check if we need to reset
				if (storedResetDate) {
					const lastReset = JSON.parse(storedResetDate)
					

					if (lastReset !== today) {
				
						await resetTasks()
					} else {
					
						// Load stored tasks if they exist
						if (storedTasks) {
							const tasks = JSON.parse(storedTasks)
							setHydration(tasks.hydration || false)
							setPhysicalActivity(tasks.physicalActivity || false)
							setPrenatalCare(tasks.prenatalCare || false)
							setBalancedDiet(tasks.balancedDiet || false)
							setKegel(tasks.kegel || false)
							setMindfulSleep(tasks.mindfulSleep || false)
						}

						// Load stored progress
						if (storedProgress) {
							setProgressPercent(JSON.parse(storedProgress) || 0)
						}

						// Ensure last reset date is set
						setLastResetDate(lastReset)
					}
				} else {
					// No reset date found, this is first run
				
					setLastResetDate(today)
					await AsyncStorage.setItem("lastResetDate", JSON.stringify(today))
				}
			} catch (error) {
				console.error("Error loading data from AsyncStorage", error)
			
			} finally {
				setIsLoading(false)
			}
		}

		loadData()
	}, []) // Empty dependency array ensures this runs only on mount

	// Update progress and save when tasks change
	useEffect(() => {
		// Skip saving during initial loading
		if (isLoading) return

		const updateProgressAndSave = async () => {
			const totalTasks = 6
			const completedTasks =
				(hydration ? 1 : 0) +
				(physicalActivity ? 1 : 0) +
				(prenatalCare ? 1 : 0) +
				(balancedDiet ? 1 : 0) +
				(kegel ? 1 : 0) +
				(mindfulSleep ? 1 : 0)

			const newProgressPercent = Math.round((completedTasks / totalTasks) * 100)
			setProgressPercent(newProgressPercent)

			const updatedTasks = {
				hydration,
				physicalActivity,
				prenatalCare,
				balancedDiet,
				kegel,
				mindfulSleep,
			}

			// Don't update the reset date here, just save the tasks and progress
			await saveToAsyncStorage(updatedTasks, newProgressPercent, null)
		}

		updateProgressAndSave()
	}, [
		hydration,
		physicalActivity,
		prenatalCare,
		balancedDiet,
		kegel,
		mindfulSleep,
		isLoading,
	])

	// Handle individual task changes
	const handleTaskChange = (taskName, value) => {
		switch (taskName) {
			case "hydration":
				setHydration(value)
				break
			case "physicalActivity":
				setPhysicalActivity(value)
				break
			case "prenatalCare":
				setPrenatalCare(value)
				break
			case "balancedDiet":
				setBalancedDiet(value)
				break
			case "kegel":
				setKegel(value)
				break
			case "mindfulSleep":
				setMindfulSleep(value)
				break
		}
	}

	// Determine motivational message based on progress
	let progressMessage
	if (progressPercent === 0) {
		progressMessage = "Let's get started!"
	} else if (progressPercent < 20) {
		progressMessage = "You can do it!"
	} else if (progressPercent < 40) {
		progressMessage = "Keep going!"
	} else if (progressPercent < 60) {
		progressMessage = "Don't give up!"
	} else if (progressPercent < 80) {
		progressMessage = "Almost there!"
	} else if (progressPercent < 100) {
		progressMessage = "You're almost done!"
	} else {
		progressMessage = "Great job, complete!"
	}

	if (isLoading) {
		return (
			<View style={[styles.container, styles.loadingContainer]}>
				<Text>Loading your health checklist...</Text>
			</View>
		)
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>			
			<View style={styles.imageContainer}>
				<Image
					source={require("../assets/images/checklist.png")}
					style={styles.image}
				/>
			</View>

			<View style={styles.progressContainer}>
				<Text style={styles.progressText}>{progressMessage}</Text>
				<View style={styles.progressBarBackground}>
					<View
						style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
					/>
				</View>
			</View>

			<View style={[styles.card, styles.cardHydration]}>
				<View style={styles.row}>
					<Checkbox
						value={hydration}
						onValueChange={(value) => handleTaskChange("hydration", value)}
						color={hydration ? "#007AFF" : undefined}
					/>
					<View style={styles.textColumn}>
						<Text style={styles.cardTitle}>💧 Hydration Reminder</Text>
						<Text style={styles.cardSubtext}>"Drink 8 glasses of water"</Text>
					</View>
				</View>
			</View>

			<View style={[styles.card, styles.cardPhysical]}>
				<View style={styles.row}>
					<Checkbox
						value={physicalActivity}
						onValueChange={(value) =>
							handleTaskChange("physicalActivity", value)
						}
						color={physicalActivity ? "#007AFF" : undefined}
					/>
					<View style={styles.textColumn}>
						<Text style={styles.cardTitle}>🚶 Physical Activity</Text>
						<Text style={styles.cardSubtext}>"Walk for 15 minutes"</Text>
					</View>
				</View>
			</View>

			<View style={[styles.card, styles.cardPrenatal]}>
				<View style={styles.row}>
					<Checkbox
						value={prenatalCare}
						onValueChange={(value) => handleTaskChange("prenatalCare", value)}
						color={prenatalCare ? "#007AFF" : undefined}
					/>
					<View style={styles.textColumn}>
						<Text style={styles.cardTitle}>💊 Prenatal Care</Text>
						<Text style={styles.cardSubtext}>"Take prenatal vitamins"</Text>
					</View>
				</View>
			</View>

			<View style={[styles.card, styles.cardDiet]}>
				<View style={styles.row}>
					<Checkbox
						value={balancedDiet}
						onValueChange={(value) => handleTaskChange("balancedDiet", value)}
						color={balancedDiet ? "#007AFF" : undefined}
					/>
					<View style={styles.textColumn}>
						<Text style={styles.cardTitle}>🥗 Balanced Diet</Text>
						<Text style={styles.cardSubtext}>
							"Include fruits, veggies, and protein daily"
						</Text>
					</View>
				</View>
			</View>

			<View style={[styles.card, styles.cardKegel]}>
				<View style={styles.row}>
					<Checkbox
						value={kegel}
						onValueChange={(value) => handleTaskChange("kegel", value)}
						color={kegel ? "#007AFF" : undefined}
					/>
					<View style={styles.textColumn}>
						<Text style={styles.cardTitle}>🩺 Kegel Exercises</Text>
						<Text style={styles.cardSubtext}>
							"Strengthen pelvic floor daily"
						</Text>
					</View>
				</View>
			</View>

			<View style={[styles.card, styles.cardSleep]}>
				<View style={styles.row}>
					<Checkbox
						value={mindfulSleep}
						onValueChange={(value) => handleTaskChange("mindfulSleep", value)}
						color={mindfulSleep ? "#007AFF" : undefined}
					/>
					<View style={styles.textColumn}>
						<Text style={styles.cardTitle}>😴 Mindful Sleep</Text>
						<Text style={styles.cardSubtext}>
							"Aim for at least 8 hours of restful sleep"
						</Text>
					</View>
				</View>
			</View>
			
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		paddingHorizontal: 16,
		alignItems: "center",
		backgroundColor: "#FFF",
	},
	loadingContainer: {
		justifyContent: "center",
		flex: 1,
	},
	progressContainer: {
		width: "100%",
		marginBottom: 20,
		alignItems: "center",
	},
	progressText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
		marginBottom: 5,
	},
	progressBarBackground: {
		width: "100%",
		height: 10,
		backgroundColor: "#e0e0e0",
		borderRadius: 5,
		overflow: "hidden",
	},
	progressBarFill: {
		height: "100%",
		backgroundColor: "#007AFF",
	},
	imageContainer: {
		marginBottom: 20,
	},
	image: {
		width: 700,
		height: 300,
		resizeMode: "contain",
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		marginBottom: 20,
		textAlign: "center",
		color: "#333",
	},
	card: {
		width: "100%",
		borderRadius: 12,
		padding: 15,
		marginBottom: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 2,
	},
	cardHydration: {
		backgroundColor: "#D0F8FE",
	},
	cardPhysical: {
		backgroundColor: "#E0ECFF",
	},
	cardPrenatal: {
		backgroundColor: "#FFE3E3",
	},
	cardDiet: {
		backgroundColor: "#F9FAD0",
	},
	cardKegel: {
		backgroundColor: "#FFF2E7",
	},
	cardSleep: {
		backgroundColor: "#E9E6FF",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	textColumn: {
		marginLeft: 10,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: "700",
		color: "#333",
		marginBottom: 4,
	},
	cardSubtext: {
		fontSize: 14,
		color: "#555",
		fontStyle: "italic",
	},
	
})
