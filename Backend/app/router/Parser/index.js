const router = require("express").Router({mergeParams:true})
const ParseFile = require("./ParseFile")
const DownloadFile = require("./downloadFormattedFile")
const multer  = require('multer')
const os = require('os')
const upload = multer({ dest: os.tmpdir() })

router.post("/parseFile",upload.single('file'),ParseFile)
router.get("/downloadFile/:id",DownloadFile)
module.exports = router
