const axios = require('axios');
const cheerio = require('cheerio');
const sanitizeWord = require('./utils/sanitizeWord');

module.exports = async (req, res) => {

  const { word } = req.params;
  const sanitizedWord = sanitizeWord(word);

  try {

    const { data: dicioHTML } = await axios.get(`https://dicio.com.br/${sanitizedWord}`);

    const $ = cheerio.load(dicioHTML);

    const sentences = [];

    $('.frase').each((_, element) => {

      $('br', element).replaceWith(' ');

      const author = $('em', element).remove();

      sentences.push({
        sentence: $(element).text().replace(/\n/g, '').trim(),
        author: $(author).text().trim()
      });

    });

    res.json(sentences);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }

}
