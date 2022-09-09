// const parse = require('csv-parse').parse
const csv = require('csvtojson')
const path = require("path")
const fs = require("fs")
const reader = require('xlsx')
const FormattedFile = require("../../model/FormattedFile")

async function generateExcelFile(data) {

    //getting path of download dir to write file 
    const reqpath = path.join(__dirname, `../../../download/formatted-excel-${new Date().getMilliseconds()}.xlsx`)

    //creating the path for a file in download dir
    // const myfilePath = `${reqpath}/formatted-excel-${new Date().getMilliseconds()}.xlsx`

    //creating file in the download dir
    fs.writeFileSync(reqpath, "", err => console.log(err));


    //converting json to excel sheet and then writing it to file
    const myfile = reader.readFile(reqpath)
    const ws = reader.utils.json_to_sheet(data)
    reader.utils.book_append_sheet(myfile, ws, "sheet2")
    reader.writeFile(myfile, reqpath)

    //  FormattedFile({name:`formatted-excel-${new Date.now()}`,path:myfilePath})
    const formattedFile = await FormattedFile.create({
        name: `formatted-excel-${Date.now()}`,
        path: reqpath
    })
    return formattedFile
}

function fetchInsightFromData(data) {
    /*
        Require fields : PRODUCTLINE , TERRITORY, QUANTITYORDERED, SALES
        GETTING_DATA_FOR_YEAR_ID : 2004
    */

    let outputData = new Array();
    data.forEach((d) => {
        if (d.YEAR_ID === '2004') {
            outputData.push({
                "ProductLine": d.PRODUCTLINE,
                "Territory": d.PRODUCTLINE,
                "Shipped Units": d.QUANTITYORDERED,
                "Net Sales": d.SALES
            })
        }
    })

    return outputData
}

module.exports = async (req, res) => {
    const file = req.file
    try {
        const data = await csv().fromFile(file.path);
        const foramttedData = fetchInsightFromData(data)
        const result = await generateExcelFile(foramttedData)
        if (result !== null && result !== undefined) {
            // const allFormattedFiles = await FormattedFile.find({})
            return res.status(200).json({ formattedFile: result })
        }
        else {
            return res.status(400).json({error:"failed to formate data"})
        }

    }
    catch (err) {
        console.error(err)
        return res.status(400).json({ error: "something went wrong" })
    }

    return res.json({ parse: "click me" })
}