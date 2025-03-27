import { View, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingSpinner = ({ styles, color = "#38BDF8" }) => {
	return (
		<View className={`flex-1 justify-center items-center ${styles}`}>
			<ActivityIndicator
				size="small"
				color={color}
			/>
		</View>
	)
}

export default LoadingSpinner