const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true, lowercase: true },
password: { type: String, required: true },
role: { type: String, enum: ['student','organizer','admin'], default: 'student' },
createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('User', userSchema)