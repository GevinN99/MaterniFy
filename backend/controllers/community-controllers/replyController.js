import ReplyModel from "../../models/community-models/replyModel.js"
import PostModel from "../../models/community-models/postModel.js"
import CommunityModel from "../../models/community-models/communityModel.js"
import UserModel from "../../models/userModel.js"

// Create a new reply
export const createReply = async (req, res) => {
	const { content, postId, communityId, parentReplyId } = req.body
	const userId = req.user.id // Assuming the user is logged in and their ID is available in req.user

	try {
		// Validate input
		if (!content || !postId || !communityId) {
			return res
				.status(400)
				.json({ message: "Content, postId, and communityId are required" })
		}

		// Check if post exists
		const post = await PostModel.findById(postId)
		if (!post) {
			return res.status(404).json({ message: "Post not found" })
		}

		// Create the new reply
		const newReply = new ReplyModel({
			content,
			userId,
			postId,
			communityId,
			parentReplyId: parentReplyId || null, // Parent reply ID if it's a nested reply
		})

		await newReply.save()

		// Optionally, you can also update the post with the new reply (e.g., push it to the replies array)
		post.replies.push(newReply._id)
		await post.save()

		res.status(201).json(newReply)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Server error" })
	}
}

export const getRepliesForPost = async (req, res) => {
	const { postId } = req.params

	try {
		// Find the replies for the post
		const replies = await ReplyModel.find({ postId })
			.populate("communityId", "name _id") // Populate community name
			.populate("userId", "fullName profileImage") // Populate user details (name, image)
			.populate("parentReplyId") // Populate parent reply if it's a nested reply
			.populate({
				path: "postId",
				select: "_id userId",
				populate: {
					path: "userId",
					select: "fullName",
				},
			})

		res.status(200).json(replies)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Server error" })
	}
}

// Like or unlike a reply
export const likeUnlikeReply = async (req, res) => {
	try {
		const { replyId } = req.params
		const userId = req.user.id

		const reply = await ReplyModel.findById(replyId)

		if (!reply) {
			return res.status(404).json({ message: "Reply not found" })
		}

		let message = ""
		if (reply.likes.includes(userId)) {
			// Unlike the reply
			reply.likes = reply.likes.filter(
				(id) => id.toString() !== userId.toString()
			)
			message = "Reply unliked"
		} else {
			// Like the reply
			reply.likes.push(userId)
			message = "Reply liked"
		}

		await reply.save()
		return res.status(200).json({ message, likes: reply.likes })
	} catch (error) {
		console.error("Error liking/unliking reply:", error)
		return res.status(500).json({ message: "Internal server error" })
	}
}
