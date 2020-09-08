const express = require("express")
const meanings = require("./meanings")
const synonyms = require("./synonyms")
const syllables = require("./syllables")

const app = express()

app.get("/:word", meanings)

app.get("/meanings/:word", meanings)
app.get("/synonyms/:word", synonyms)
app.get("/syllables/:word", syllables)

app.listen(process.env.PORT || 3333)
