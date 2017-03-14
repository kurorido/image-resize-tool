const sharp = require('sharp')
const fs = require('fs')
const parse = require('csv-parse')

const fileFolder = __dirname +  '/files'
const outputFolder = __dirname + '/outputs'

const parser = parse({delimiter: ','}, function(err, data) {
  for (let row of data) {
    let columns = row
    let inputFileName = `${fileFolder}/${columns[0]}`
    let width = parseInt(columns[1])
    let height = parseInt(columns[2])
    let outputFileName = `${outputFolder}/${columns[0]}`
    resize(inputFileName, outputFileName, width, height)
  }
});

fs.createReadStream(__dirname + '/files.csv').pipe(parser)

function resize(inputFileName, outputFileName, width, height) {
  sharp(inputFileName)
    .resize(width, height)
    .toFile(outputFileName)
}
