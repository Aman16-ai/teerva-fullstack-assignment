const mongoose = require('mongoose')

const formattedFileSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    path : {
        type:String,
        require:true
    },
    
},{timestamps:true})

module.exports = mongoose.model("FormattedFile",formattedFileSchema)