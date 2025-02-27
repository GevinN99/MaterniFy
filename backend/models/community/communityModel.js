const mongoose = require('mongoose')
const { Schema } = mongoose

const communitySchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
	admin: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Admin field added
	createdAt: { type: Date, default: Date.now },
})

const CommunityModel = mongoose.model('Community', communitySchema)

module.exports = CommunityModel
