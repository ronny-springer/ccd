const fs = require('fs')
const path = require('path')

function FileReader () {}

FileReader.prototype.readFile = ( file = '' ) => {
    const filePath = path.join(__dirname, file)
    const fileEncoding = {encoding: 'UTF-8'}

    return new Promise(( resolve, reject ) => {
        fs.readFile(filePath, fileEncoding, ( error, data ) => {
        	return data
        		? resolve(data)
        		: (error) 
        			? reject(new Error (error))
        			: reject(new Error ('no data'))
        })
    })
};

exports = module.exports = new FileReader();
