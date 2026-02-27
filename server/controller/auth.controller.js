
const User = require("../model/User.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const differenceInSeconds = require("date-fns/differenceInSeconds")

const { sendEmail } = require("../utils/email.js")
const { sendSMS } = require("../utils/sms.js")
const { FRONTEND_URL } = require("../utils/config.js")

const forgetPasswordTem = require("../email-tem/forgetPasswordtem.js").default
const otpTem = require("../email-tem/otpTem.js").default
const registerTem = require("../email-tem/register.js").default


/* =====================================================
   REGISTER
===================================================== */
exports.register = async (req, res) => {
    try {
        const { email, mobile, password, name } = req.body

        const exists = await User.findOne({ $or: [{ email }, { mobile }] })
        if (exists)
            return res.status(409).json({ message: "Email or mobile already exists" })

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({
            ...req.body,
            password: hash
        })

        await sendEmail({
            email: user.email,
            subject: "Welcome to AuthSystem",
            message: registerTem({ name: user.name })
        })

        res.status(201).json({ message: "Register success" })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Unable to register" })
        // res.status(139).json({ message: "Email or mobile already exists" })
    }
}


/* =====================================================
   LOGIN
===================================================== */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user)
            return res.status(401).json({ message: "Invalid email or password" })

        const match = await bcrypt.compare(password, user.password)
        if (!match)
            return res.status(401).json({ message: "Invalid email or password" })

        if (!user.isActive)
            return res.status(403).json({ message: "Account blocked" })

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        )

        res.cookie("USER", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            semeSite: "None",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({
            message: "Login success",

            result: {
                name: user.name,
                email: user.email,
                mobile: user.mobile
            }
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Unable to login" })
    }
}


/* =====================================================
   LOGOUT
===================================================== */
exports.logout = async (req, res) => {
    res.clearCookie("USER")
    res.status(200).json({ message: "Logout success" })
}


/* =====================================================
   SEND OTP
===================================================== */
exports.sendOTP = async (req, res) => {
    try {
        const { username } = req.body

        const user = await User.findOne({
            $or: [{ email: username }, { mobile: username }]
        })

        if (!user)
            return res.status(401).json({ message: "Invalid user" })

        const otp = crypto.randomInt(100000, 999999)

        const hash = await bcrypt.hash(String(otp), 10)

        await User.findByIdAndUpdate(user._id, {
            otp: hash,
            otpSendOn: new Date()
        })

        await sendEmail({
            email: user.email,
            subject: "Your Login OTP",
            message: otpTem({
                name: user.name,
                otp,
                min: 5
            })
        })

        if (user.mobile)
            await sendSMS({ numbers: user.mobile, message: `Your OTP is ${otp}` })

        res.status(200).json({ message: "OTP sent successfully" })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Unable to send OTP" })
    }
}


/* =====================================================
   VERIFY OTP
===================================================== */
exports.verifyOTP = async (req, res) => {
    try {
        const { username, otp } = req.body

        const user = await User.findOne({
            $or: [{ email: username }, { mobile: username }]
        })

        if (!user || !user.otp)
            return res.status(401).json({ message: "OTP not requested" })

        const valid = await bcrypt.compare(String(otp), user.otp)
        if (!valid)
            return res.status(401).json({ message: "Invalid OTP" })

        const expired =
            differenceInSeconds(new Date(), new Date(user.otpSendOn)) >
            process.env.OTP_EXIPIRY

        if (expired)
            return res.status(401).json({ message: "OTP expired" })

        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
            expiresIn: "1d"
        })

        res.cookie("USER", token, { httpOnly: true, semeSite: "none", })

        await User.findByIdAndUpdate(user._id, { otp: null })

        res.status(200).json({ message: "OTP verified" })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Unable to verify OTP" })
    }
}


/* =====================================================
   FORGOT PASSWORD
===================================================== */
exports.forgetPassword = async (req, res) => {
    try {

        const { username } = req.body
        const user = await User.findOne({
            $or: [{ email: username }, { mobile: username }]
        })

        if (!user)
            return res.status(401).json({ message: "Invalid user" })

        const rawToken = crypto.randomBytes(32).toString("hex")
        const hashedToken = await bcrypt.hash(rawToken, 10)

        const resetLink = `${FRONTEND_URL}/reset-password?token=${rawToken}`

        await User.findByIdAndUpdate(user._id, {
            resetToken: hashedToken
        })

        await sendEmail({
            email: user.email,
            subject: "Password Reset",
            message: forgetPasswordTem({
                name: user.name,
                resetLink
            })
        })
        res.status(200).json({ message: "Reset link sent" })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Unable to send reset link" })
    }
}


/* =====================================================
   RESET PASSWORD
===================================================== */
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.query
        const { password } = req.body

        if (!token)
            return res.status(400).json({ message: "Token required" })

        const users = await User.find({ resetToken: { $ne: null } })

        let matchedUser = null

        for (const u of users) {
            if (await bcrypt.compare(token, u.resetToken)) {
                matchedUser = u
                break
            }
        }

        if (!matchedUser)
            return res.status(401).json({ message: "Invalid or expired token" })

        const hash = await bcrypt.hash(password, 10)

        await User.findByIdAndUpdate(matchedUser._id, {
            password: hash,
            resetToken: null
        })

        res.status(200).json({ message: "Password reset success" })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Unable to reset password" })
    }
}