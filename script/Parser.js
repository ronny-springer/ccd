const esprima = require('esprima')

// convert block comment strings into a list of each comment line
const normalizeBlockComments = ( data ) => {
    let comment = { section: '', title: '', description: [], code: [] }

    data
        // create a list of comment lines based on line breaks
        .split(/\n/)

        // remove whitespaces and leading Asterisks 
        .map( item => item.replace(/[\/\**]/g, '').trim() )

        // convert the parsed comment lines into wanted semantics
        .map( item => {
            const markerChar = item.charAt(0)
            const commentValue = item.substr(2, item.length)

            switch (markerChar) {
                case '~':
                    comment.section = commentValue
                    break
                case '#':
                    comment.title = commentValue
                    break
                case '-':
                    comment.description.push(commentValue)
                    break
                case '>':
                    comment.code.push(commentValue)
                    break
                default:
                    null
            }
        })

    return comment
}

function Parser () {}

Parser.prototype.grabComments = ( fileData ) => {
    const options = { comment: true }

    return new Promise(( resolve, reject ) => {
        (typeof fileData === 'string' && fileData.length)
            ? resolve(esprima
                .tokenize( fileData, options )

                // filter block comments from file
                .filter( data => (data.type === 'BlockComment') ? data : null ))
            : reject(new Error('Error while grabbing the comments from file. No file data.'))
    })
}

Parser.prototype.normalizeComments = ( rawData ) => {
    return new Promise(( resolve, reject ) => {
        (rawData && rawData.length)
            ? resolve(rawData
                .map( data => normalizeBlockComments(data.value) )

                // skip empty data entries
                .filter( data => (data.section.length) ? data : null ))
            : reject(new Error('Error while normalizing the comments. No raw data.'))
    })
}

Parser.prototype.sortComments = ( comments ) => {
    return new Promise(( resolve, reject ) => {
        (comments && comments.length)
            ? resolve(comments
                .sort(( prev, next ) => prev.section > next.section ))
            : reject(new Error('Error while sorting the comments. No comments.'))
    })
}

exports = module.exports = new Parser()
