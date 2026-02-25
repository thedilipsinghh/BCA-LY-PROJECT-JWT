require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const session = require("express-session")
const passport = require("./config/passport.js")
const { FRONTEND_URL } = require("./utils/config.js")


const app = express()

mongoose.connect(process.env.MONGO_URL)

app.use(express.json())

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))

// express-session is required by Passport for the OAuth handshake only.
// The app itself is stateless (JWT cookies). Session data is not persisted.
app.use(session({
    secret: process.env.SESSION_SECRET || process.env.JWT_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" }
}))

app.use(passport.initialize())

app.use("/api/auth", require("./routes/auth.route.js"))
app.use("/api/admin", require("./routes/admin.route.js"))

mongoose.connection.once("open", () => {
    console.log("mongo Connected")
    app.listen(process.env.PORT, () => {
        console.log(`Server Running On Port  ${process.env.PORT}`)
        console.log(`Cors allowed  ${FRONTEND_URL}`)
        console.log(`Node env  ${process.env.NODE_ENV}`)
    })
})
