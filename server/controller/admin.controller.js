const settings = require("../model/settings")

exports.getSettings = async (req, res) => {
    try {
        const result = await settings.findOne()
        res.status(200).json({
            message: "Setting Fetch Success",
            result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to fetch " })
    }
}
exports.UpdateSettings = async (req, res) => {
    try {
        const { sid } = req.params
        await settings.findByIdAndUpdate(sid, req.body)
        res.status(200).json({ message: "Setting Fetch succee " })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to fetch " })
    }
}