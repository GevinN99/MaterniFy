const express = require("express")
const userModel = require("../../models/userModel.js")
const auth = require("../../middlewares/auth")
const postController = require("../../controllers/community-controllers/postController")
const router = express.Router()

router.post("/create", auth.authenticate, postController.createPost)
router.get("/post/:postId", auth.authenticate, postController.getPostById)
router.get("/community/:communityId", auth.authenticate, postController.getPostsByCommunity)
router.get("/:userId",auth.authenticate, postController.getPostsByAllCommunities)
router.delete("/delete/:postId", auth.authenticate, postController.deletePost)
router.post("/like-unlike/:postId", auth.authenticate, postController.likeUnlikePost)

module.exports = router