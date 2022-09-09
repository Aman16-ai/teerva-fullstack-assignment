const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = require("./app/router")
const cors = require("cors")
const port = 5000
const connectToMongo = require("./db")

connectToMongo()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use("/api",router)

app.get("/",(req,res)=> {
    return res.json({message:"welcome to the formatter"})
})

app.listen(port,()=>{
    console.log(`Listning at ${port}` )
})
