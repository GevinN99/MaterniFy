const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
    comments: [
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            commentText: {type: String},
            createdAt: {type: Date, default: Date.now},
        },
    ],
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('CommunityPost', communityPostSchema);
