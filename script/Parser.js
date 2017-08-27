const esprima = require('esprima')

function Parser () {}

Parser.prototype.grabComment = ( fileData ) => {
    const options = { comment: true }

    return new Promise(( resolve, reject ) => {
        (typeof fileData === 'string' && fileData.length)
            ? resolve(esprima
                .tokenize( fileData, options )

                // filter line and block comments from file
                .filter( data => (
                    (data.type === 'BlockComment')
                        ? data
                        : null
                ))

                // convert block comment strings into a list of each comment line
                .map( data =>  ({ 
                    'raw': data.value
                            // create a list of comment lines based on line breaks
                            .split(/\n/)
                            // remove whitespaces and leading Asterisks 
                            .map(item => item.replace(/\s\*/g, '').trim())
                            // remove empty items at the list
                            .filter(item => item.length)
                })))
            : reject(new Error('Error while grabbing the comments from file.'))
    })
}

exports = module.exports = new Parser();
