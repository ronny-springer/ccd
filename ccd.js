const program = require('commander')
const fr = require('./script/FileReader')
const parser = require('./script/Parser')

program
    .version('1.0.0')

program
    .option('-f, --file <file ...>', 'read css file')
    .parse(process.argv)

if (program.file) {
    console.log('file', program.file)

    fr.readFile(program.file)
        .then(parser.grabComment)
        .then(parser.normalizeComment)
        .then(parser.sortComments)
        .then(( data ) => {
        	console.log('return', data)
        })
        .catch(( error ) => {
            console.log('no', error)
        })

}
