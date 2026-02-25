const mongoose = require("mongoose")

module.exports = mongoose.model("user", new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String },          // optional — Google users don't have one
    password: { type: String },        // optional — Google users don't have one
    googleId: { type: String },        // set for Google OAuth accounts
    photo: { type: String },           // Google profile picture URL
    isActive: { type: Boolean, default: true },
    otp: { type: String },
    otpSendOn: { type: Date },
    resetToken: { type: String }
}, { timestamps: true }))