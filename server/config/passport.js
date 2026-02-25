const passport = require("passport")
const { Strategy: GoogleStrategy } = require("passport-google-oauth20")
const User = require("../model/User.js")

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value
                const googleId = profile.id
                const name = profile.displayName
                const photo = profile.photos[0]?.value

                // Find by googleId first, then by email (for accounts created via email/password)
                let user = await User.findOne({ $or: [{ googleId }, { email }] })

                if (user) {
                    // Update googleId / photo if missing (first Google login for existing email account)
                    if (!user.googleId) {
                        user.googleId = googleId
                        user.photo = photo
                        await user.save()
                    }
                } else {
                    // New user — create without password/mobile (those fields are now optional)
                    user = await User.create({ name, email, googleId, photo })
                }

                return done(null, user)
            } catch (err) {
                return done(err, null)
            }
        }
    )
)

module.exports = passport
