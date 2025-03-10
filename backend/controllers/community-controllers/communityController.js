import CommunityModel from "../../models/community-models/communityModel.js"

// Get all communities
// export const getAllCommunities = async (req, res) => {
// 	try {
//         // Find all communities
// 		const communities = await CommunityModel.find()
// 		res.status(200).json(communities)
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ error: 'Faild to fetch communities' })
// 	}
// }

// Get user communities
// export const getUserCommunities = async (req, res) => {
// 	try {
// 		const { userId } = req.params
// 		if (!userId) return res.status(400).json({ error: "User ID is required" })
// 		console.log(`Fetching communities for user ID: ${userId}`)

// 		const userCommunities = await CommunityModel.find({ members: userId })

// 		res.status(200).json(userCommunities)
// 	} catch (error) {
// 		console.error(error)
// 		res.status(500).json({ error: "Failed to fetch user's communities" })
// 	}
// }

// Get both user communities and non-user communities
export const getAllCommunities = async (req, res) => {
	try {
		const { userId } = req.params
		if (!userId) return res.status(400).json({ error: "User ID is required" })

		const userCommunities = await CommunityModel.find({ members: userId })
		const nonUserCommunities = await CommunityModel.find({
			members: { $ne: userId },
		})

		res.status(200).json({ userCommunities, nonUserCommunities })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Failed to fetch communities" })
	}
}

// Create a new community
export const createCommunity = async (req, res) => {
	try {
		const { name, description, imageUrl } = req.body
		const admin = req.user.id

		if (!name) {
			return res.status(400).json({ error: "Name required" })
		}

		if (!description) {
			return res.status(400).json({ error: "Community description required" })
		}

		const newCommunity = new CommunityModel({
			name,
			description,
			imageUrl,
			admin,
			members: [admin],
		})

		await newCommunity.save()

		res.status(201).json({
			message: "Community created successfully",
			community: newCommunity,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Failed to create community" })
	}
}

// Get community by Id
export const getCommunityById = async (req, res) => {
	try {
		const { communityId } = req.params

		const community = await CommunityModel.findById(communityId)
			.populate("admin", "fullName profileImage")
			.populate({
				path: "posts", // Populates the posts array
				populate: {
					path: "userId", // Further populates the user inside each post
					select: "fullName profileImage email", // Fetches only these fields from the user
				},
			})

		if (!community) {
			return res.status(404).json({ error: "Community not found" })
		}

		res.status(200).json(community)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

// Delete a community
export const deleteCommunity = async (req, res) => {
	try {
		const { communityId } = req.params

		// Find the community by id and delete it
		const community = await CommunityModel.findByIdAndDelete(communityId)

		if (!community) {
			return res.status(404).json({ error: "Community not found" })
		}

		res.status(200).json({ message: "Community deleted successfully" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

// Join community
export const joinCommunity = async (req, res) => {
	try {
		const { communityId } = req.params
		const userId = req.user.id

		const community = await CommunityModel.findById(communityId)
		if (!community) {
			return res.status(404).json({ message: "Community not found" })
		}
		if (community.members.includes(userId)) {
			return res
				.status(400)
				.json({ message: "User is already a member of the community" })
		}
		community.members.push(userId)
		await community.save()
		res.status(200).json({ message: "Joined community successfully" })
	} catch (error) {
		res.status(500).json({ message: "Server error", error })
	}
}

export const leaveCommunity = async (req, res) => {
	try {
		const { communityId } = req.params
		const userId = req.user.id
		const community = await CommunityModel.findById(communityId)
		if (!community) {
			return res.status(404).json({ message: "Community not found" })
		}
		if (!community.members.includes(userId)) {
			return res
				.status(400)
				.json({ message: "User is not a member of the community" })
		}
		community.members = community.members.filter(
			(member) => member.toString() !== userId.toString()
		)
		await community.save()
		res.status(200).json({ message: "Left community successfully" })
	} catch (error) {
		res.status(500).json({ message: "Server error", error })
	}
}
