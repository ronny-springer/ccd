const program = require('commander'),
    fr = require('./script/FileReader');

program
    .version('1.0.0');

program
    .option('-f, --file <file ...>', 'read css file')
    .parse(process.argv);

if (program.file) {
    console.log('file', program.file)

    fr.readFile(program.file)
        .then(( data ) => {
            console.log('ok', data)
        })
        .catch(( error ) => {
            console.log('no', error)
        })
}