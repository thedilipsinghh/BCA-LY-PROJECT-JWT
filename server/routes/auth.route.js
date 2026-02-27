const { register, login, logout, sendOTP, verifyOTP, resetPassword, forgetPassword } = require("../controller/auth.controller.js")
const { registerLimiter, loginLimiter, otpLimiter } = require("../middleware/limiter.js")
const { googleCallback } = require("../controller/google.controller.js")
const passport = require("passport")

const router = require("express").Router()

router
    .post("/signup", registerLimiter, register)
    .post("/signin", login)
    .post("/signout", logout)
    .post("/send-otp", otpLimiter, sendOTP)
    .post("/verify-otp", otpLimiter, verifyOTP)
    .post("/reset-password", resetPassword)
    .post("/forget-password", forgetPassword)

    // ── Google OAuth ──────────────────────────────────────────
    .get("/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
    )
    .get("/google/callback",
        passport.authenticate("google", { failureRedirect: "/login", session: false }),
        googleCallback
    )

module.exports = router