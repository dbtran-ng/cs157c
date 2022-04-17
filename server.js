const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;
app.use('/public', express.static('./public/'));
app.use(bodyParser.urlencoded({ extended: true }));
const connectionString =
  'mongodb+srv://root:root@cluster0.6qegf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to Database');
    app.listen(3000);
    const db = client.db('test');
    const airportsCollection = db.collection('airports');

    app.get('/', (req, res) => {
      airportsCollection
        .find()
        .toArray()
        .then((results) => {
          res.render('index.ejs', { airportsArray: results });
        })
        .catch(/* ... */);
    });

    app.post('/quotes', (req, res) => {
      airportsCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
    });
    app.put('/quotes', (req, res) => {
      airportsCollection
        .findOneAndUpdate(
          { name: 'd' },
          {
            $set: {
              name: req.body.name,
              country: req.body.country,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
    });

    app.delete('/quotes', (req, res) => {
      airportsCollection
        .deleteOne({ name: req.body.name })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));
