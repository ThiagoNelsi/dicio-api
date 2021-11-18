const axios = require('axios');
const cheerio = require('cheerio');
const sanitizeWord = require('./utils/sanitizeWord');

module.exports = async (req, res) => {

  const { word } = req.params;
  const sanitizedWord = sanitizeWord(word);

  try {

    const { data: dicioHTML } = await axios.get(`https://dicio.com.br/${sanitizedWord}`);

    const $ = cheerio.load(dicioHTML);

    const additionalText = $('.adicional').text();
    const syllabicMatches = additionalText.match(/(?<=silábica: ).+(\n|$)/i);
    if (!syllabicMatches)
      throw `Could not parse silabic matches from "${additionalText}"`;

    const syllablesInfo = {
    syllablesText: syllabicMatches[0].trim(),
    syllablesCount: syllabicMatches[0].split('-').length
    }

    res.json(syllablesInfo);


  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
