module.exports = word => {
  const wordLowerCased = word.toLowerCase()
  const wordWithoutSpaces = wordLowerCased.trim()
  const wordWithoutEspecialCharacters = wordWithoutSpaces
    .replace("ç", "c")
    .replace("á", "a")
    .replace("é", "e")
    .replace("í", "i")
    .replace("ó", "o")
    .replace("ú", "u")
    .replace("ã", "a")
    .replace("õ", "o")
    .replace("â", "a")
    .replace("ê", "e")
    .replace("ô", "o")

  return wordWithoutEspecialCharacters
}
