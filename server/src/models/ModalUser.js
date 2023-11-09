// modalUser.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = mongoose.createConnection(process.env.MONGO_DB, { dbName: 'QuanLyPhongHoc' });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    createAt: Date,
    isAdmin: { type: Boolean, default: false, require: true },
});

const User = db.model('Users', userSchema);

module.exports = User;
