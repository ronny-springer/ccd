const fs = require('fs')
const path = require('path')

function FileReader () {}

FileReader.prototype.readFile = ( file, callback ) => {
    const filePath = path.join(__dirname, file || '')
    const fileEncoding = 'utf-8'
    const noop = function () {}

    fs.readFile(filePath, {encoding: fileEncoding}, ( data, error ) => {
        console.log('here', data, error);


    });
};

exports = module.exports = new FileReader();
