const fs = require('fs')

function startScan() {
    let fileScan = fs.readFileSync('autoload.json', async (err, dataDir) => {
        if (err) throw err
    })

    fileScan = JSON.parse(fileScan).dir.root
    
    let dir = fs.readdirSync(fileScan, (err) => {
        if (err) throw err
    })

    let result = {}

    if (dir.length > 1) {
        for (const dataFile of dataInsideDir) {
            const data = require(`./${fileScan}/${dataFile}`)
            console.log(data)
        }
    } else {
        const data = require(`./${fileScan}/${dir[0]}`)
        let val = 0
        if (Object.keys(data).length > 1) {
            for (const dataInsideFile in data) {
                result[Object.keys(data)[val]] = data[dataInsideFile]
                val++
            }
        }
    }

    return result
}

module.exports = startScan()