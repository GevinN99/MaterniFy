const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: {
		type: String,
		enum: ['mother', 'partner', 'admin'],
		default: 'mother',
	},
	healthHistory: { type: String, default: '' },
	languagePreference: {
		type: String,
		enum: ['Sinhala', 'English', 'Tamil'],
		default: 'English',
	},
	createdAt: { type: Date, default: Date.now },
})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel
