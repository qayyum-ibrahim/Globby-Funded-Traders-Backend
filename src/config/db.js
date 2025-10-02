const mongoose = require('mongoose')
const connectDB = async () => {
const uri = process.env.MONGO_URI
if (!uri) throw new Error('MONGO_URI missing in env')
await mongoose.connect(uri, { dbName: process.env.DB_NAME || 'globbyfundedtraders' })
}
module.exports = connectDB