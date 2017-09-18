const fs = require('fs')

function FileHandler () {}

FileHandler.prototype.readFile = ( filePath ) => {
    const fileEncoding = {encoding: 'UTF-8'}

    return new Promise(( resolve, reject ) => {
        (filePath && filePath.length)
            ? fs.readFile(filePath, fileEncoding, ( error, data ) => {
                (data && data.length)
                    ? resolve(data)
                    : reject(new Error (error))
            })
            : reject(new Error ('Could not read the file. No data.'))
    })
}

exports = module.exports = new FileHandler()
