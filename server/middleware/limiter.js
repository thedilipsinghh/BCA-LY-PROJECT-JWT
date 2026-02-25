
const rateLimit = require("express-rate-limit")

exports.otpLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 2,
    message: "Too many OTP requests. Try again later."
})

exports.registerLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "Too many registrations. Try again later."
})

exports.loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 2,
    message: "Too many login attempts. Try again later."
})
