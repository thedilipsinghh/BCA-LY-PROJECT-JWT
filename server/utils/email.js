// const nodemailer = require("nodemailer")

// exports.sendEmail = ({ email, subject, message }) => new Promise(async (resolve, reject) => {
//     try {
//         const transport = nodemailer.createTransport({
//             service: "gmail",
//             auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
//         })
//         await transport.sendMail({
//             to: email,
//             subject: subject,
//             text: message
//         })
//         resolve("Email send Success")
//     } catch (error) {
//         console.log(error)
//         reject("Unable to send Email")

//     }


// })


const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})

exports.sendEmail = async ({ email, subject, message }) => {
    try {
        await transport.sendMail({
            to: email,
            subject,
            html: message,   // ✅ THIS FIXES YOUR PROBLEM
            text: "Open this email in an HTML supported client"
        })

        return "Email sent successfully"
    } catch (error) {
        console.error(error)
        throw new Error("Unable to send email")
    }
}