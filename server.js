const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use('/public', express.static('./public/'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const connectionString =
  'mongodb+srv://root:root@cluster0.6qegf.mongodb.net/test?retryWrites=true&w=majority';

// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//   .then((client) => {
//     console.log('Connected to Database');
//     app.listen(3000);
//     const db = client.db('test');
//     const airportsCollection = db.collection('airports');

//     app.get('/', (req, res) => {
//       airportsCollection
//         .find()
//         .toArray()
//         .then((results) => {
//           res.render('index.ejs', { airportsArray: results });
//         })
//         .catch(/* ... */);
//     });

//     app.post('/quotes', (req, res) => {
//       airportsCollection
//         .insertOne(req.body)
//         .then((result) => {
//           console.log(result);
//         })
//         .catch((error) => console.error(error));
//     });
//     app.put('/quotes', (req, res) => {
//       airportsCollection
//         .findOneAndUpdate(
//           { name: 'd' },
//           {
//             $set: {
//               name: req.body.name,
//               country: req.body.country,
//             },
//           },
//           {
//             upsert: true,
//           }
//         )
//         .then((result) => {
//           console.log(result);
//         })
//         .catch((error) => console.error(error));
//     });

//     app.delete('/quotes', (req, res) => {
//       airportsCollection
//         .deleteOne({ name: req.body.name })
//         .then((result) => {
//           console.log(result);
//         })
//         .catch((error) => console.error(error));
//     });
//   })
//   .catch((error) => console.error(error));

mongoose.connect(connectionString);

const airportSchema = {
  code: String,
  name: String,
  icao: String,
  type: String,
  phone: String,
  email: String,
  url: String,
  city: String,
  state: String,
  country: String,
  elev: String,
  lat: String,
  lon: String,
  tz: String,
  woeid: String,
  carriers: String,
  direct_flights: String,
  runway_length: String,
};

const Airport = mongoose.model('Airport', airportSchema);

// get all airports
app.get('/airports', (req, res) => {
  Airport.find({}, function (err, airports) {
    res.render('index.ejs', {
      airportsArray: airports,
    });
  });
});

// Get single airport by id
app.get('/airports/show/:id', (req, res) => {
  Airport.findOne({ _id: req.params.id }, function (err, airport) {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.render('show.ejs', {
        airport: airport,
      });
    }
  });
});

// add new airport
app.post('/addAirport', async (req, res) => {
  let data = req.body;
  try {
    data = await Airport.create(data);
    res.json(data);
  } catch (err) {
    console.error('# Post Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

app.get('/airports/:id/edit', (req, res) => {
  Airport.findOne({ _id: req.params.id }, (error, airport) => {
    if (error) {
      res.redirect('/airports');
    } else {
      res.render('edit.ejs', { airport: airport });
    }
  });
});

// update new airport
// app.post('/airports/update/:id', async (req, res) => {
//   let data = req.body;
//   console.log(data);
//   try {
//     data = await Airport.findByIdAndUpdate(req.params.id, data);

//     res.redirect('/airports/show/' + req.params.id);
//   } catch (err) {
//     console.error('# Post Error', err);
//     res.status(500).send({ error: err.name + ', ' + err.message });
//   }
// });
app.post('/airports/update/:id', (req, res) => {
  Airport.findOneAndUpdate(
    req.params.id,
    {
      $set: {
        code: req.body.code,
        name: req.body.name,
        icao: req.body.icao,
        type: req.body.type,
        phone: req.body.phone,
        email: req.body.email,
        url: req.body.url,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        elev: req.body.elev,
        tz: req.body.tz,
        lat: req.body.lat,
        lon: req.body.lon,
        woeid: req.body.woeid,
        carriers: req.body.carriers,
        direct_flights: req.body.direct_flights,
        runway_length: req.body.runway_length,
      },
    },
    { new: true },
    function (err, airport) {
      if (err) {
        console.log(err);
        res.render('edit.ejs', { airport: req.body });
      } else {
        res.redirect('/airports/show/' + airport._id);
      }
    }
  );
});

//UPDATE ROUT
// app.get('/airports/:id', (req, res) => {
//   Airport.findByIdAndUpdate(req.params.id, req.body, (err, airport) => {
//     if (err) {
//       console.log(err);
//       res.render('edit.ejs', { airport: req.body });
//     } else {
//       res.redirect('/airports/show/' + airport._id);
//     }
//   });
// });

// delete - method 1
app.get('/airports/:id/delete', (req, res) => {
  console.log('# Delete Airport', req.params.id);
  Airport.findByIdAndRemove(req.params.id, (error) => {
    if (error) {
      res.redirect('/airports');
    } else {
      res.redirect('/airports');
    }
  });
});

// delete inside edit.ejs - method 2
app.delete('/airports/:id/delete', function (req, res) {
  Airport.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Airport deleted!');
      res.redirect('/airports');
    }
  });
});

app.get('/', (req, res) => {
  res.redirect('/airports');
});

app.listen(4000, function () {
  console.log('server is running');
});
