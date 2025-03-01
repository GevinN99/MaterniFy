import { View, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingSpinner = ({styles}) => {
  return (
      <View className={`flex-1 justify-center items-center ${styles}`}>
			<ActivityIndicator
				size="small"
				color="#38BDF8"
			/>
		</View>
	)
}

export default LoadingSpinner