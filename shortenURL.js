function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}
function generateCode() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  let collection = []
  collection = collection
    .concat(lowerCaseLetters.split(''))
    .concat(upperCaseLetters.split(''))
    .concat(numbers.split(''))
  let code = ''
  for (let i = 0; i < 5; i++) {
    code += sample(collection)
  }
  return code
}

module.exports = generateCode
