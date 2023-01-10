const express = require('express');
const axios = require('axios');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

const favourites = [];

const nextId = favouritesArray => {
  const highestId = favouritesArray.reduce(
    (accumulator, currentValue) => (currentValue.id > accumulator ? currentValue.id : accumulator),
    0
  );
  return Number.parseInt(highestId, 10) + 1;
};

const createFavourite = favourite => {
  console.log(favourite);
  const createObjWithId = {
    id: String(nextId(favourites))
  };
  const createdFavourite = Object.assign(createObjWithId, favourite);
  favourites.push(createdFavourite);
  return createdFavourite;
}

app.get('/api/movies', (req, res) => {
  axios.get(`http://www.omdbapi.com/?s=${req.query.searchTerm}&apikey=fb5c6012`)
    .then(response => {
      res.set('Access-Control-Allow-Origin', '*');
      res.json(response.data);
    }).catch(err => {console.log(err);});
})

app.get('/api/favourites', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).json(favourites);
})

app.post('/api/favourites', (req, res) => {
  console.log(JSON.stringify(req.body));
  const createdFavourite = createFavourite(req.body);
  console.log(JSON.stringify(createdFavourite));
  res.setHeader('date', (new Date()).toUTCString());
  res.status(201).json(createdFavourite);
})

app.delete('/api/favourites/:id', (req, res) => {
  const getIndexOfFavourite = favourites.findIndex(object => object.id === req.params.favouriteId);
  favourites.splice(getIndexOfFavourite, 1);
  console.log(JSON.stringify(favourites));
  res.set('Access-Control-Allow-Methods', 'OPTIONS,POST,DELETE,GET,PUT');
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).json(favourites);
})

app.listen(5000, () => { console.log('Server started on port 5000')})