const CommunityPost = require('../models/CommunityPostModel');

// Create a post with images
exports.createPost = async (req, res) => {
    try {
        const { content, images } = req.body;
        const userId = req.user.id;

        const newPost = new CommunityPost({
            userId,
            content,
            images,
        });

        await newPost.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all posts with images
exports.getPosts = async (req, res) => {
    try {
        const posts = await CommunityPost.find().populate('userId', 'fullName');
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update images in a post
exports.updatePostImages = async (req, res) => {
    try {
        const { postId } = req.params;
        const { images } = req.body;

        const updatedPost = await CommunityPost.findByIdAndUpdate(
            postId,
            { $set: { images } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post images updated successfully', post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await CommunityPost.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
