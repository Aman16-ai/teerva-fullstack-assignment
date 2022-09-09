const FormattedFile = require("../../model/FormattedFile")

module.exports = async (req, res) => {
    try {
        const fileId = req.params.id
        console.log(fileId)
        const file = await FormattedFile.findById(fileId)
        console.log(file)
        res.download(file.path, (err) => {
            console.log(err)
        })
    }
    catch(err) {
        res.status(400).json({error:"something went wrong"})
    }
}