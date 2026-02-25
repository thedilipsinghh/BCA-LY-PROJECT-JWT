const { differenceInSeconds } = require("date-fns")

const current = new Date()
const old = new Date("2026-02-18T03:24:02.508+00:00")

const result = differenceInSeconds(current, old)


