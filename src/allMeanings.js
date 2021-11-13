const axios = require("axios");
const cheerio = require("cheerio");
const sanitizeWord = require("./utils/sanitizeWord");

module.exports = async (req, res) => {
  const { word } = req.params;
  const sanitizedWord = sanitizeWord(word);

  try {
    const meanings = [];
    var noError = true;

    var i = 1;
    while (noError) {
      try {
        var title = "";
        var dicioResp = "";
        if (i === 1) {
          const { data: dicioHTML } = await axios.get(
            `https://dicio.com.br/${sanitizedWord}`
          );
          dicioResp = dicioHTML;
        } else {
          const { data: dicioHTML } = await axios.get(
            `https://dicio.com.br/${sanitizedWord}-${i}`
          );
          dicioResp = dicioHTML;
        }

        const $ = cheerio.load(dicioResp);
        const structure = {
          title: "",
          class: "",
          meanings: [],
          etymology: "",
        };
        meanings.push(structure);

        $(".title-header").each((_, element) => {
          let text = $(element).text();
          title = text
            .trim()
            .replace(/(\r\n|\n|\r)/gm, "")
            .substring(15)
            .trim();
          meanings[meanings.length - 1].title = title
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
                title : title,
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
        noError = false;        
      }
    }

    res.json(meanings);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};