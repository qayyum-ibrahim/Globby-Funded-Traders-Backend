const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
module.exports = async (req, res, next) => {
const auth = req.headers.authorization
if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' })
const token = auth.split(' ')[1]
try {
const payload = jwt.verify(token, process.env.JWT_SECRET)
const user = await User.findById(payload.id).select('-password')
if (!user) return res.status(401).json({ message: 'Unauthorized' })
req.user = user
next()
} catch (err) {
res.status(401).json({ message: 'Unauthorized' })
}
}