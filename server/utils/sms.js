// exports.sendSMS = ({ numbers, message }) => new Promise(async (resolve, reject) => {
//     const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.SMS_API_KEY}&route=q&numbers=${numbers}&message=${message}`;
//     const options = {
//         method: 'GET',
//         headers: { accept: 'application/json' },
//     };

//     try {
//         const response = await fetch(url, options)
//         const result = await response.json()
//         console.log(result)
//         resolve("sms send success")
//     } catch (error) {
//         console.log(error)
//         reject("unable to send sms")
//     }
// })