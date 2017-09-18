const expect = require('chai').expect
const parser = require('./../script/Parser')

describe('The Parser', () => {

    describe('grabs comments:', () => {
        it('should be empty block comments', () => {
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

        it('should only grab block comments', () => {
            const cases = [ '', '//', 'a', '0' ]

            cases
                .map( testCase => {
                    const promise = parser.grabComments(testCase)

                    promise
                        .then( data => {
                            expect(data).to.be.an('array')
                            expect(data).to.have.lengthOf(0)
                        })
                })
        })

        it('should throw an Error if file does not provide block comments', () => {
            const cases = [ [], {}, null, undefined, 0, NaN, false ]
            const errorMessage = 'Error while grabbing the comments from file. No file data.'

            cases
                .map( testCase => {
                    const promise = parser.grabComments(testCase)

                    promise
                        .catch( error => {
                            expect(error).to.have.string(errorMessage);
                        })
                })
        })      
    })
})
