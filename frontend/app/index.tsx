import { Text, View } from 'react-native'

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text className='text-blue-400'>
				Edit app/index.tsx to edit this screen :)
			</Text>
			<Text className='text-gray-500'>Welcome to the Maternify App!</Text>
			<Text className='text-gray-500'>
				Your journey to motherhood starts here.
			</Text>
			<Text className='text-gray-500'>
				Explore our features and resources to support you.
			</Text>
			<Text className='text-gray-500'>
				Join our community and connect with other mothers.
			</Text>
			<View className='m-2 p-2 border border-gray-300 rounded'>
				<Text className='text-gray-500'>This is a card component.</Text>
			</View>
		</View>
	)
}
