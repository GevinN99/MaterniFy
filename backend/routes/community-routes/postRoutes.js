const express = require("express")
const userModel = require("../../models/userModel.js")
const postController = require("../../controllers/community-controllers/postController")

const router = express.Router()

// Helper function to inject dummy user for testing
const injectDummyUser = async (req, res, next) => {
	if (process.env.NODE_ENV === "development" || req.query.bypassAuth) {
		try {
			const dummyUserId = "67bc9ceff607c265056765af" // Replace with actual ID

			// Use userModel instead of undefined User
			const dummyUser = await userModel.findById(dummyUserId).exec()
			if (!dummyUser) {
				return res
					.status(404)
					.json({ message: "Dummy user not found", dummyUserId })
			}

			req.user = { id: dummyUser._id, email: dummyUser.email }
			return next() // Skip authentication
		} catch (error) {
			console.error("Error fetching dummy user:", error)
			return res.status(500).json({ message: "Error fetching dummy user" })
		}
	} else {
		return next()
	}
}

// Define routes
router.post("/create", injectDummyUser, postController.createPost)
router.get("/post/:postId", postController.getPostById)
router.get("/community/:communityId", injectDummyUser, postController.getPostsByCommunity)
router.get("/:userId", postController.getPostsByAllCommunities)
router.delete("/delete/:postId", injectDummyUser, postController.deletePost)
router.post("/like-unlike/:postId", injectDummyUser, postController.likeUnlikePost)

module.exports = router
