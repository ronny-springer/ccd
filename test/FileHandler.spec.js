const expect = require('chai').expect
const path = require('path')
const fileHandler = require('./../script/FileHandler')

describe('The FileHandler', () => {

    describe('read file:', () => {
        it('should read the file', () => {
            const file = './style.mock.css'
            const filePath = path.join(__dirname, file)
            const promise = fileHandler.readFile(filePath)

            promise
                .then( fileData => {
                    expect(fileData).to.be.a('string')
                    expect(fileData).to.include('/* normal block comment */')
                })
        })

        it('should throw an error if no file.', () => {
                const cases = [ [], {}, null, 0, undefined, NaN, false ]
                const errorMessage = 'Could not read the file. No data.'
                cases
                    .map( testCase => {
                        const promise = fileHandler.readFile(testCase)

                        promise
                            .catch( error => {
                                expect(error.message).to.be.equal(errorMessage)
                            })
                    })
        })
    })
})
