const express = require("express")
const userModel = require("../../models/userModel.js")
const auth = require("../../middlewares/auth")
const communityController = require("../../controllers/community-controllers/communityController")
const router = express.Router()

router.get("/:userId", auth.authenticate, communityController.getAllCommunities)
router.get(
	"/community/:communityId",
	auth.authenticate,
	communityController.getCommunityById
)
router.post("/create", auth.authenticate, communityController.createCommunity)
router.put(
	"/update/:communityId",
	auth.authenticate,
	communityController.updateCommunity
)
router.delete(
	"/delete/:communityId",
	auth.authenticate,
	communityController.deleteCommunity
)
router.post(
	"/join/:communityId",
	auth.authenticate,
	communityController.joinCommunity
)
router.post(
	"/leave/:communityId",
	auth.authenticate,
	communityController.leaveCommunity
)

module.exports = router
