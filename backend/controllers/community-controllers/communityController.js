import CommunityModel from '../../models/community/communityModel.js'

// Get all communities
export const getAllCommunities = async (req, res) => {
	try {
        // Find all communities
		const communities = await CommunityModel.find()
		res.status(200).json(communities)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Faild to fetch communities' })
	}
}

// Get user communities
export const getUserCommunities = async (req, res) => {
	try {
		const { userId } = req.params
		if (!userId) return res.status(400).json({ error: "User ID is required" })
		console.log(`Fetching communities for user ID: ${userId}`)

		const userCommunities = await CommunityModel.find({ members: userId })

		res.status(200).json(userCommunities)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Failed to fetch user's communities" })
	}
}


// Create a new community
export const createCommunity = async (req, res) => {
	try {		
		const { name, description, imageUrl } = req.body		
		const admin = req.user.id		

		if (!name) {
			return res.status(400).json({ error: 'Name required' })
		}

		if (!description) {
			return res.status(400).json({ error: 'Community description required' })
		}
        
		const newCommunity = new CommunityModel({
			name,
			description,
			imageUrl,
			admin,
			members: [admin],
		})

		await newCommunity.save()

		res
			.status(201)
			.json({ message: 'Community created successfully', community: newCommunity })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Failed to create community' })
	}
}


// Delete a community
export const deleteCommunity = async (req, res) => {
	try {
		const { communityId } = req.params

        // Find the community by id and delete it
		const community = await CommunityModel.findByIdAndDelete(communityId)

		if (!community) {
			return res.status(404).json({ error: 'Community not found' })
		}

		res.status(200).json({ message: 'Community deleted successfully' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal server error' })
	}
}
