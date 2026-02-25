const mongoose = require("mongoose")
const settings = require("../model/settings")
require("dotenv").config({ path: "./../.env" })


const seedSetting = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("db conncted")
        const result = await settings.findOne()
        if (result) {
            console.log("Settings Already Present")
            process.exit()
        }
        await settings.create({
            email: true,
            sma: false,
            whatsapp: false
        })
        console.log("setting seed success")
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

seedSetting()