const jwt = require("jsonwebtoken")
const { FRONTEND_URL } = require("../utils/config.js")

/* =====================================================
   GOOGLE OAUTH CALLBACK
   req.user is set by Passport after successful auth
===================================================== */
exports.googleCallback = (req, res) => {
    try {
        const user = req.user

        // Reuse the exact same JWT signing as the existing login controller
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        )

        // Reuse the exact same cookie options as the existing login controller
        res.cookie("USER", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            secure: process.env.NODE_ENV === "production"
        })

        // Redirect to the admin dashboard (same destination as normal login)
        res.redirect(`${FRONTEND_URL}/admin`)

    } catch (err) {
        console.error(err)
        res.redirect(`${FRONTEND_URL}/login?error=oauth_failed`)
    }
}
