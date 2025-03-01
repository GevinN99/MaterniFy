import { View, Text } from 'react-native'
import React from 'react'

const ErrorMessage = ({error, styles}) => {
  return (
	  <View className={`flex-1 justify-center items-center ${styles}`}>
	  <Text className="text-red-500">{ error}</Text>
		</View>
	)
}

export default ErrorMessage