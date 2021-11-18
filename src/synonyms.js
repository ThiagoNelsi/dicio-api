const axios = require('axios');
const cheerio = require('cheerio');
const sanitizeWord = require('./utils/sanitizeWord');

module.exports = async (req, res) => {

  const { word } = req.params;
  const sanitizedWord = sanitizeWord(word);

  try {

    const { data: dicioHTML } = await axios.get(`https://dicio.com.br/${sanitizedWord}`);

    const $ = cheerio.load(dicioHTML);

    const synonyms = [];

    $('.sinonimos').each((_, children) => {

      if ($(children).text().includes("é sinônimo de:")) {

        $('a', children).each((_, element) => {

          const text = $(element).text();

          if (text) synonyms.push(text)

        });

      }

    });

    res.json(synonyms);

  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
