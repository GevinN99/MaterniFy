const express = require("express")
const userModel = require("../../models/userModel.js")
const auth = require("../../middlewares/auth")
const replyController = require("../../controllers/community-controllers/replyController")
const router = express.Router()

router.post("/create", auth.authenticate, replyController.createReply)
router.get(
	"/post/:postId",
	auth.authenticate,
	replyController.getRepliesForPost
)
router.post(
	"/like-unlike/:replyId",
	auth.authenticate,
	replyController.likeUnlikeReply
)

module.exports = router
