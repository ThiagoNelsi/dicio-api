const express = require('express');
const cors = require('cors');
const allMeanings = require('./allMeanings');
const meanings = require('./meanings');
const synonyms = require('./synonyms');
const syllables = require('./syllables');
const sentence = require('./sentences');

const app = express();

app.use(cors());
app.disable('x-powered-by');

app.get('/:word', meanings);

app.get('/allMeanings/:word', allMeanings);
app.get('/meanings/:word', meanings);
app.get('/synonyms/:word', synonyms);
app.get('/syllables/:word', syllables);
app.get('/sentences/:word', sentence);


app.listen(process.env.PORT || 3333);
