const express = require('express')
const userModel = require("../../models/userModel.js")
const {
	getAllCommunities,
	// getUserCommunities,
	// getUserAndNonUserCommunities,
	getCommunityById,
	createCommunity,
	// updateCommunity,
	deleteCommunity,
	joinCommunity,
	leaveCommunity,
} = require('../../controllers/community-controllers/communityController.js')
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

// Route to get all communities
router.get('/:userId', injectDummyUser ,getAllCommunities)

// Toute to get user communities
// router.get("/user/:userId", injectDummyUser, getUserCommunities)

// Route to get both user and non-user communities
// router.get('/userandnonuser/:userId', injectDummyUser, getUserAndNonUserCommunities)


// Route to get a single community by ID
router.get('/community/:communityId', getCommunityById)

// Route to create a new community
router.post('/create', injectDummyUser, createCommunity)

// Route to update a community by ID
// router.put('/:communityId', updateCommunity)

// Route to delete a community by ID
router.delete('/delete/:communityId', deleteCommunity)

router.post("/join/:communityId", injectDummyUser, joinCommunity)
router.post("/leave/:communityId", injectDummyUser ,leaveCommunity)

module.exports = router
