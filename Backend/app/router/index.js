const router = require("express").Router({mergeParams:true})
const parser = require("./Parser")
router.use("/parser",parser)

module.exports = router
