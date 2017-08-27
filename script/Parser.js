const esprima = require('esprima')

function Parser () {}

Parser.prototype.grabComment = ( fileData ) => {

    return new Promise(( resolve, reject ) => {
        (typeof fileData === 'string' && fileData.length)
            ? resolve(esprima
                .tokenize( fileData, { comment: true } )

                // filter line and block comments from file
                .filter( data => {
                    return (data.type === 'LineComment' || data.type === 'BlockComment')
                        ? data
                        : null
                })

                // convert block comment strings into a list of each comment line
                .map( data => {
                    return (data.type === 'BlockComment')
                        ? { 
                            'type': data.type,
                            'value': data.value
                                // create an array out of comment lines
                                .split(/\n/)
                                // remove whitespaces and leading Asterisk 
                                .map(item => item.replace(/\s\*/g, '').trim())
                                // remove empty items at the list
                                .filter(item => item.length)
                        }
                        : data
                }))
            : reject(new Error('Error while grabbing the comments from file.'))
    })
}

exports = module.exports = new Parser();
