'use strict';

// Packages
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');

// Global vars
const PORT = 3002;
const app = express();

// Config
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error);
client.connect();
// Middleware
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

function Pokemon(obj){
  this.name = obj.name;
  // this.name = obj.name.slice(0,1).toUpperCase()+obj.name.slice(1);
  // If only the test allowed the capitalization :(

  this.img_url = `https://img.pokemondb.net/artwork/${obj.name}.jpg`;
}

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  superagent.get(apiUrl)
    .then(superResult => {
      const pokemonArr = (superResult.body.results.map(poke => new Pokemon(poke)));
      pokemonArr.sort((left, right) => (left.name > right.name) ? 1 : -1);
      res.render('show', {'allPokemon' : pokemonArr});
    });
});

app.post('/add', (req, res) => {
  const pokemonName = req.body.pokemonName;
  const pokemonUrl = req.body.pokemonUrl;

  const sqlQuery = 'INSERT INTO pokemon (name, img_url) VALUES ($1, $2)';
  const valArray = [pokemonName, pokemonUrl];
  client.query(sqlQuery, valArray)
    .then(() => res.redirect('/'));
});

app.get('/favorites', (req, res) => {
  client.query('SELECT * FROM pokemon')
    .then(result => res.render('favorites', {'favPokemon' : result.rows}));
});

app.listen(PORT, () => console.log('Listening on 3002'));
