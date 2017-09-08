const program = require('commander')
const fileHandler = require('./script/FileHandler')
const parser = require('./script/Parser')

program
    .version('1.0.0')

program
    .option('-f, --file <file ...>', 'read css file')
    .parse(process.argv)

if (program.file) {
    console.log('file', program.file)

    fileHandler.readFile(program.file)
        .then(parser.grabComments)
        .then(parser.normalizeComments)
        .then(parser.sortComments)
        .then(( data ) => {
        	console.log('return', data)
        })
        .catch(( error ) => {
            console.log('no', error)
        })

}
