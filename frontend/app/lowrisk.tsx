import { View, Text } from 'react-native'
import React from 'react'

const lowrisk = () => {
  return (
    <View style={{alignItems:"center"}}>
      <Text 
        style={{
            fontSize:48,
            fontWeight:"bold",
            textAlign:"center",
            padding:30
        }}>Low Risk</Text>

        <Text>Mild headache detected. Drink a glass of water and rest. If it continues, consult your doctor.</Text>
    </View>
  )
}

export default lowrisk