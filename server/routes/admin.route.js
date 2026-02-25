const { getSettings, UpdateSettings } = require("../controller/admin.controller")

const router = require("express").Router()

router
    .get("/setting", getSettings)
    .put("/setting/:sid", UpdateSettings)

module.exports = router