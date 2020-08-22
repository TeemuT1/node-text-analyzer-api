const logger = require('../utils/logger')

const analyzeRouter = require('express').Router()

//analyze text sent in the request body in format {"text":"some text"}
analyzeRouter.post('/', (request, response) => {
  //check whether the request has the "text" property
  const body = request.body
  if(!body.text) {
    return response.status(400).json({
      error: 'The request body must have an object with a property called \'text\' which is not empty'
    })
  }
  //check whether the text is a string
  if(typeof body.text !== 'string') {
    return response.status(400).json({
      error: 'The text to analyze must be a string'
    })
  }

  //create the result of the analysis
  const result = {
    textLength: {
      withSpaces: body.text.length,
      withoutSpaces: body.text.split(' ').join('').length
    },
    wordCount: countWords(body.text),
    characterCount: countChars(body.text),
  }
  logger.info('Result: ' + JSON.stringify(result))
  response.json(result)
})

//count words(one or more charactes separated by whitespace) in a string
function countWords(string) {
  if (string.length === 0)
    return 0
  else {
    let resultStr = string
    resultStr = resultStr.replace(/(^\s*)|(\s*$)/gi,'')
    resultStr = resultStr.replace(/[ ]{2,}/gi,' ')
    resultStr = resultStr.replace(/\n /,'\n')
    return resultStr.split(' ').length
  }
}

//count the frequencies of characters in a string and return them in an array of objects for
//each character sorted alphabetically
function countChars(string) {
  let charCountArr = []
  let str = string
  str = str.toLowerCase()

  //count only english alphabet
  str = str.replace(/[^a-z]/gi, '')
  //sort in alphabetical order
  str = [...str].sort((a, b) => a.localeCompare(b))
  //count the characters
  for (let c of str) {
    if(charCountArr[c])
      charCountArr[c]++
    else
      charCountArr[c] = 1
  }

  //convert the array of key value pairs into an array of objects containing the counts
  const resultArr = []
  for (const property in charCountArr){
    let charFreq = {}
    charFreq[property] = charCountArr[property]
    resultArr.push(charFreq)
  }
  return resultArr
}

module.exports = analyzeRouter