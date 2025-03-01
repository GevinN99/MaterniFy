import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

const CommunityDetails = ({ community }) => {
    const blurhash =
			"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
  return (
		<View className='p-4 bg-white rounded-lg flex items-center'>
			<Image
				source={community.imageUrl}
				style={styles.communityImage}
				contentFit="cover"
				placeholder={{ blurhash }}
				transition={1000}
			/>
			<Text className='font-bold text-xl'>{community.name}</Text>
			<Text>{community.description}</Text>
			<View className='flex flex-row items-center gap-2 my-4'>
				<Image
					source={community.admin.profileImage}
					style={styles.adminImage}
					contentFit="cover"
					placeholder={{ blurhash }}
					transition={1000}
				/>
				<Text>{community.admin.fullName}</Text>
          </View>
          <Text>{community.members.length} Members</Text>          
		</View>
	)
}

const styles = StyleSheet.create({
	communityImage: {
		width: 70,
		height: 70,
		borderRadius: 10,
	},
	adminImage: {
		width: 30,
		height: 30,
		borderRadius: 50,
	},
})

export default CommunityDetails