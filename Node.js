const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const client = new MongoClient('mongodb://localhost:27017');
client.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }

  const db = client.db('my_db');
  const collection = db.collection('players');

  app.get('/players', (req, res) => {
    const players = collection.find().toArray();
    res.json(players);
  });

  app.get('/players/:name', (req, res) => {
    const name = req.params.name;
    const player = collection.findOne({ name });
    res.json(player);
  });

  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
});
