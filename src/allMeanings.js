const axios = require("axios");
const cheerio = require("cheerio");
const sanitizeWord = require("./utils/sanitizeWord");

module.exports = async (req, res) => {
  const { word } = req.params;
  const sanitizedWord = sanitizeWord(word);

  try {
    const meanings = [];

    var i = 1;
    while (true) {
      try {
        let word = "";
        let baseUrl = `https://www.dicio.com.br/${sanitizedWord}`
        let followUrl = `https://www.dicio.com.br/${sanitizedWord}-${i}`
        if (i === 1) {
          const { data: dicioHTML } = await axios.get(
            baseUrl
          );
          dicioResp = dicioHTML;
        } else {
          const { data: dicioHTML } = await axios.get(
            followUrl
          );
          dicioResp = dicioHTML;
        }

        const $ = cheerio.load(dicioResp); 

        if (isRedirectUrl(followUrl, i, $)) {break;}

        const structure = {
          word: "",
          class: "",
          meanings: [],
          etymology: "",
        };
        meanings.push(structure);

        //Sanitização da palavra no título - Remove quebras de linha, espaços, e o texto do botão do facebook no título
        $(".title-header").each((_, element) => {
          let text = $(element).text();
          word = text
            .trim()
            .replace(/(\r\n|\n|\r)/gm, "")
            .substring(15)
            .trim();
          meanings[meanings.length - 1].word = word
        });
        
        $(".significado span").each((_, element) => {
          const text = $(element).text();
          const cheerioElement = $(element);

          if (cheerioElement.hasClass("cl")) {
            if ( meanings[meanings.length - 1].class === "" && meanings[meanings.length - 1].meanings.length === 0
            ) {
              meanings[meanings.length - 1].class = text;
            } else {
              meanings.push({
                word : word,
                class: text,
                meanings: [],
                etymology: "",
              });
            }
          } else if (cheerioElement.hasClass("etim")){
            meanings[meanings.length - 1].etymology = text;}
            
          else if (!cheerioElement.hasClass("tag")){
            meanings[meanings.length - 1].meanings.push(text);
          }
        });
        $(".conjugacao span").each((_, element) => {
          const text = $(element).text();
          const cheerioElement = $(element);

          if (cheerioElement.hasClass("etim")){
            meanings[meanings.length].etymology = text;}
          else if (!cheerioElement.hasClass("tag")){
            meanings[meanings.length].meanings.push(text);}
        });
        i++;
      } catch (err) {
        break        
      }
    }
    res.json(meanings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Verifica se é um redireciomento
function isRedirectUrl(followUrl, i, $) {  
  if (followUrl +"/" != $("[rel$='canonical']").attr("href") && i > 1) {
    return true;
  }
  return false;
}