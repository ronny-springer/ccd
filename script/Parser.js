const esprima = require('esprima')

function Parser () {}

const normalizeCommentLines = ( data ) => {
    return data
        // create a list of comment lines based on line breaks
        .split(/\n/)
        // remove whitespaces and leading Asterisks 
        .map(item => item.replace(/[\s,\/\**]/g, '').trim()) 
        // remove empty items at the list
        .filter(item => item.length)
}

Parser.prototype.grabComment = ( fileData ) => {
    const options = { comment: true }

    return new Promise(( resolve, reject ) => {
        (typeof fileData === 'string' && fileData.length)
            ? resolve(esprima
                .tokenize( fileData, options )

                // filter block comments from file
                .filter( data => (
                    (data.type === 'BlockComment')
                        ? data
                        : null
                )))
            : reject(new Error('Error while grabbing the comments from file.'))
    })
}

Parser.prototype.normalizeComment = ( data ) => {
    let blockComments = []

    return new Promise(( resolve, reject ) => { 
        (data.length)
            ? resolve(data

                // convert block comment strings into a list of each comment line
                .map( data =>  ({ 
                    'blockComment': normalizeCommentLines(data.value)
                }))
            )
            : reject(new Error('Error while normalizing the comments.'))
    })
}

exports = module.exports = new Parser()
