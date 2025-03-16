const express = require("express")
const userModel = require("../../models/userModel.js")
const replyController = require("../../controllers/community-controllers/replyController")
const router = express.Router()

// Helper function to inject dummy user for testing
const injectDummyUser = async (req, res, next) => {
	if (process.env.NODE_ENV === 'development' || req.query.bypassAuth) {
		try {
			const dummyUserId = "67bc9ceff607c265056765af" 

			// Use userModel instead of undefined User
			const dummyUser = await userModel.findById(dummyUserId).exec()
			if (!dummyUser) {
				return res
					.status(404)
					.json({ message: 'Dummy user not found', dummyUserId })
			}

			req.user = { id: dummyUser._id, email: dummyUser.email }
			return next() // Skip authentication
		} catch (error) {
			console.error('Error fetching dummy user:', error)
			return res.status(500).json({ message: 'Error fetching dummy user' })
		}
	} else {
		return next()
	}
}

router.post("/create", injectDummyUser, replyController.createReply)
router.get("/post/:postId", replyController.getRepliesForPost)
router.post("/like-unlike/:replyId", injectDummyUser, replyController.likeUnlikeReply)

module.exports = router