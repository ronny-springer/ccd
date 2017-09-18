const expect = require('chai').expect
const parser = require('./../script/Parser')

describe('The Parser', () => {

    describe('grabs comments:', () => {
        it('should be empty block comments.', () => {
            const cases = [ '/* */' ]

            cases
                .map( testCase => {
                    const promise = parser.grabComments(testCase)

                    promise
                        .then( data => {
                            expect(data).to.be.an('array')
                            expect(data).to.have.lengthOf(1)
                            expect(data[0]).to.deep.equal({ type: 'BlockComment', value: ' ' })
                        })
                })
        })

        it('should only grab block comments.', () => {
            const cases = [ '//', 'a', '0' ]

            cases
                .map( testCase => {
                    const promise = parser.grabComments(testCase)

                    promise
                        .then( data => {
                            expect(data).to.be.an('array').that.is.empty
                        })
                })
        })

        it('should throw an Error if file does not provide block comments.', () => {
            const cases = [ [], {}, null, undefined, 0, NaN, false, '' ]
            const errorMessage = 'Error while grabbing the comments from file. No file data.'

            cases
                .map( testCase => {
                    const promise = parser.grabComments(testCase)

                    promise
                        .catch( error => {
                            expect(error.message).to.be.equal(errorMessage)
                        })
                })
        })      
    })

    describe('normalize comments:', () => {
        it('should ignore normal block comments without semantic statements.', () => {
            const blockComment = `/* normal block comment */`

            const promise = parser.grabComments(blockComment)

            promise
                .then(parser.normalizeComments)
                .then( data => {
                    expect(data).to.be.an('array').that.is.empty
                })
        })


        it('should normalize semantic statements based on used marker chars.', () => {
            const blockComment = `/**
                                   * ~ section
                                   * # title 
                                   * - description
                                   * > code
                                   */`

            const promise = parser.grabComments(blockComment)

            promise
                .then(parser.normalizeComments)
                .then( data => {
                    expect(data).to.be.an('array')
                    expect(data).to.have.lengthOf(1)

                    expect(data[0]).to.be.an('object')
                        .that.has.all.keys('section', 'title', 'description', 'code');

                    expect(data[0].section).to.be.a('string')
                    expect(data[0].section).to.equal('section')

                    expect(data[0].title).to.be.a('string')
                    expect(data[0].title).to.equal('title')

                    expect(data[0].description).to.be.an('array')
                    expect(data[0].description).to.have.lengthOf(1)
                    expect(data[0].description[0]).to.equal('description')


                    expect(data[0].code).to.be.an('array')
                    expect(data[0].code).to.have.lengthOf(1)
                    expect(data[0].code[0]).to.equal('code')
                })
        })

        it('should throw an error if no blockcomment.', () => {
            const cases = [ [], {}, null, undefined, 0, NaN, false, '' ]
            const errorMessage = 'Error while normalizing the comments. No raw data.'

            cases
                .map( testCase => {
                    const promise = parser.normalizeComments(testCase)

                    promise
                        .catch( error => {
                            expect(error.message).to.be.equal(errorMessage)
                        })
                })
        })
    })

    describe('sort comments:', () => {
        it ('should keep the sorting for multiple comments by section number.', () => {
            const blockComments = `/* ~ 1.5.2.1 */ /* ~ 2.4.2.1 */`
            const sortedComments = [
                { section: '1.5.2.1', title: '', description: [], code: [] },
                { section: '2.4.2.1', title: '', description: [], code: [] },
            ]
            const promise = parser.grabComments(blockComments)

            promise
                .then(parser.normalizeComments)
                .then(parser.sortComments)
                .then( comments => {
                    expect(comments[0]).to.deep.own.include(sortedComments[0]);
                    expect(comments[1]).to.deep.own.include(sortedComments[1]);
                })
        })

        it ('should sort multiple comments by section number.', () => {
            const blockComments = `/* ~ 4.2.1 */ /* ~ 1.5.1 */`
            const sortedComments = [
                { section: '1.5.1', title: '', description: [], code: [] },
                { section: '4.2.1', title: '', description: [], code: [] },
            ]
            const promise = parser.grabComments(blockComments)

            promise
                .then(parser.normalizeComments)
                .then(parser.sortComments)
                .then( comments => {
                    expect(comments[0]).to.deep.own.include(sortedComments[0]);
                    expect(comments[1]).to.deep.own.include(sortedComments[1]);
                })
        })


        it('should throw an error if no comments for sorting.', () => {
            const cases = [ [], {}, null, undefined, 0, NaN, false, '' ]
            const errorMessage = 'Error while sorting the comments. No comments.'

            cases
                .map( testCase => {
                    const promise = parser.sortComments(testCase)

                    promise
                        .catch( error => {
                            expect(error.message).to.be.equal(errorMessage)
                        })
                })
        })
    })
})
