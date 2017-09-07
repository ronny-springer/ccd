const esprima = require('esprima')

function Parser () {}

const isEmpty = ( obj = {} ) => {
    return Object.keys(obj).length
        ? false
        : true
}

// convert block comment strings into a list of each comment line
const normalizeBlockComments = ( data ) => {
    let comment = {}

     data

        // create a list of comment lines based on line breaks
        .split(/\n/)

        // remove whitespaces and leading Asterisks 
        .map(item => item.replace(/[\s,\/\**]/g, '').trim())

        // remove empty items at the list
        .filter(item => item.length)

        // convert the parsed comment lines into wanted semantics
        .map(item => {
            const markerChar = item.charAt(0)
            const commentValue = item.substr(1, item.length)

            switch (markerChar) {
                case '~':
                    comment['section'] = commentValue
                    break
                case '#':
                    comment['title'] = commentValue
                    break
                case '-':
                    comment['description'] = commentValue
                    break
                case '`':
                    comment['code'] = commentValue
                    break
                default:
                    null
            }
        })

    return comment
}

Parser.prototype.grabComment = ( fileData ) => {
    const options = { comment: true }

    return new Promise(( resolve, reject ) => {
        (typeof fileData === 'string' && fileData.length)
            ? resolve(esprima
                .tokenize( fileData, options )

                // filter block comments from file
                .filter( data => ((data.type === 'BlockComment') ? data : null )))
            : reject(new Error('Error while grabbing the comments from file. No file data.'))
    })
}

Parser.prototype.normalizeComment = ( rawData ) => {

    return new Promise(( resolve, reject ) => {
        (rawData.length)
            ? resolve(rawData
                .map( data => normalizeBlockComments(data.value) )
                .filter( data => !isEmpty(data) ))
            : reject(new Error('Error while normalizing the comments. No raw data.'))
    })
}

Parser.prototype.sortComments = ( comments ) => {
    return new Promise(( resolve, reject ) => {
        (comments.length)
            ? resolve(comments
                .sort( (prev, next) => prev.section > next.section ))
            : reject(new Error('Error while sorting the comments. No comments.'))
    })
}

exports = module.exports = new Parser()
