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

const asia = [
  'Afghanistan',
  'Armenia',
  'Azerbaijan',
  'Bahrain',
  'Bangladesh',
  'Bhutan',
  'Brunei',
  'Cambodia',
  'China',
  'Cyprus',
  'East Timor',
  'Georgia',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Israel',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Lebanon',
  'Malaysia',
  'Maldives',
  'Mongolia',
  'Myanmar',
  'Nepal',
  'North Korea',
  'Oman',
  'Pakistan',
  'Palestine',
  'Philippines',
  'Qatar',
  'Russia',
  'Saudi Arabia',
  'Singapore',
  'South Korea',
  'Sri Lanka',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Thailand',
  'Turkey',
  'Turkmenistan',
  'United Arab Emirates',
  'Uzbekistan',
  'Vietnam',
  'Yemen',
];
const europe = [
  'Russia',
  'Germany',
  'United Kingdom',
  'France',
  'Italy',
  'Spain',
  'Ukraine',
  'Poland',
  'Romania',
  'Netherlands',
  'Belgium',
  'Czechia',
  'Greece',
  'Portugal',
  'Sweden',
  'Hungary',
  'Belarus',
  'Austria',
  'Serbia',
  'Switzerland',
  'Bulgaria',
  'Denmark',
  'Finland',
  'Slovakia',
  'Norway',
  'Ireland',
  'Croatia',
  'Moldova',
  'Bosnia and Herzegovina',
  'Albania',
  'Lithuania',
  'North Macedonia',
  'Slovenia',
  'Latvia',
  'Estonia',
  'Montenegro',
  'Luxembourg',
  'Malta',
  'Iceland',
  'Channel Islands',
  'Isle of Man',
  'Andorra',
  'Faeroe Islands',
  'Monaco',
  'Liechtenstein',
  'San Marino',
  'Gibraltar',
  'Holy See',
];
const africa = [
  'Nigeria',
  'Ethiopia',
  'Egypt',
  'Congo',
  'Tanzania',
  'South Africa',
  'Kenya',
  'Uganda',
  'Algeria',
  'Sudan',
  'Morocco',
  'Angola',
  'Mozambique',
  'Ghana',
  'Madagascar',
  'Cameroon',
  "Côte d'Ivoire",
  'Niger',
  'Burkina Faso',
  'Mali',
  'Malawi',
  'Zambia',
  'Senegal',
  'Chad',
  'Somalia',
  'Zimbabwe',
  'Guinea',
  'Rwanda',
  'Benin',
  'Burundi',
  'Tunisia',
  'South Sudan',
  'Togo',
  'Sierra Leone',
  'Libya',
  'Liberia',
  'Central African Republic',
  'Mauritania',
  'Eritrea',
  'Namibia',
  'Gambia',
  'Botswana',
  'Gabon',
  'Lesotho',
  'Guinea-Bissau',
  'Equatorial Guinea',
  'Mauritius',
  'Eswatini',
  'Djibouti',
  'Réunion',
  'Comoros',
  'Western Sahara',
  'Cabo Verde',
  'Mayotte',
  'Sao Tome and Principe',
  'Seychelles',
  'Saint Helena',
];
const northAmerica = [
  'United States',
  'Canada',
  'Mexico',
  'Cuba',
  'Costa Rica',
  'Guatemala',
  'Nicaragua',
  'Belize',
  'Grenada',
  'Bahamas',
  'Haiti',
  'Dominican Republic',
  'Barbados',
  'Jamaica',
  'Saint Vincent and the Grenadines',
  'Trinidad and Tobago',
  'Panama',
  'El Salvador',
  'Honduras',
  'Dominica',
  'Antigua and Barbuda',
  'St. Lucia',
];
const southAmerica = [
  'Brazil',
  'Colombia',
  'Argentina',
  'Peru',
  'Venezuela',
  'Chile',
  'Ecuador',
  'Bolivia',
  'Paraguay',
  'Uruguay',
  'Guyana',
  'Suriname',
  'French Guiana',
  'Falkland Islands',
];

const australia = [
  'Australia',
  'Papua New Guinea',
  'New Zealand',
  'Fiji',
  'Solomon Islands',
  'Micronesia',
  'Vanuatu',
  'New Caledonia',
  'French Polynesia',
  'Samoa',
  'Guam',
  'Kiribati',
  'Tonga',
  'Marshall Islands',
  'Northern Mariana Islands',
  'American Samoa',
  'Palau',
  'Cook Islands',
  'Tuvalu',
  'Wallis and Futuna Islands',
  'Nauru',
  'Niue',
  'Tokelau',
];

const oceania = australia;

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
    console.log(data);
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

// delete management page: delete.ejs
app.get('/deleteAirports', (req, res) => {
  Airport.find({}, function (err, airports) {
    res.render('delete.ejs', {
      data: airports,
    });
  });
});

//delete all databases button
app.get('/deleteAll', function (req, res) {
  Airport.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Airport deleted!');
      res.redirect('/airports');
    }
  });
});

app.get('/delete', (req, res) => {
  if (req.query.choice === 'Country') {
    try {
      Airport.deleteMany(
        {
          country: { $regex: req.query.term },
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect('/deleteAirports');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  if (req.query.choice === 'Direct Flights') {
    try {
      Airport.deleteMany(
        {
          direct_flights: req.query.term,
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect('/deleteAirports');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  if (req.query.choice === 'Carriers') {
    try {
      Airport.deleteMany(
        {
          carriers: req.query.term,
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect('/deleteAirports');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  if (req.query.choice === 'No longer in use') {
    try {
      Airport.deleteMany({ carriers: 0, direct_flights: 0 }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/deleteAirports');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
});

//quick search function: search based on state or country
app.get('/search', (req, res) => {
  try {
    Airport.find(
      {
        $or: [
          { state: { $regex: req.query.dsearch } },
          { country: { $regex: req.query.dsearch } },
        ],
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.render('search.ejs', { data: data });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// search range of airports based on latitude and longitude
app.get('/searchRange', (req, res) => {
  let choice = req.query.choice;
  if (choice === 'or') {
    try {
      Airport.find(
        {
          $or: [
            { lat: { $gte: req.query.latmin, $lte: req.query.latmax } },
            { lon: { $gte: req.query.lonmin, $lte: req.query.lonmax } },
          ],
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.render('search.ejs', { data: data });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      Airport.find(
        {
          $and: [
            { lat: { $gte: req.query.latmin, $lte: req.query.latmax } },
            { lon: { $gte: req.query.lonmin, $lte: req.query.lonmax } },
          ],
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.render('search.ejs', { data: data });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
});

// search range of airports based on latitude and longitude
app.get('/searchCarriers', (req, res) => {
  let choice = req.query.choice;
  if (choice === 'LessEqual') {
    try {
      Airport.find(
        {
          carriers: { $lte: req.query.number },
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.render('search.ejs', { data: data });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      Airport.find(
        {
          carriers: { $gte: req.query.number },
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.render('search.ejs', { data: data });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
});

app.get('/searchAirports', (req, res) => {
  Airport.find({}, function (err, airports) {
    res.render('search.ejs', {
      data: airports,
    });
  });
});

app.get('/searchContinentalAirports', (req, res) => {
  try {
    if (req.query.q == 'North America') {
      Airport.find(
        {
          country: {
            $in: northAmerica,
          },
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.render('search.ejs', { data: data });
          }
        }
      );
    }
    if (req.query.q == 'Asia') {
      Airport.find(
        {
          country: {
            $in: asia,
          },
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.render('search.ejs', { data: data });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

app.get('/searchCountryAirports', (req, res) => {
  try {
    Airport.find(
      {
        country: { $regex: req.query.searchterms },
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.render('search.ejs', { data: data });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get('/searchLocation', (req, res) => {
  if (req.query.choice === 'Code') {
    try {
      Airport.find(
        {
          code: { $regex: req.query.searchterms },
        },
        (err, data) => {
          if (err) {
            res.redirect('/searchAirports');
          } else {
            res.render('search.ejs', { data: data });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  if (req.query.choice === 'City') {
    try {
      Airport.find(
        {
          city: { $regex: req.query.searchterms },
        },
        (err, data) => {
          if (err) {
            res.redirect('/searchAirports');
          } else {
            res.render('search.ejs', { data: data });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  if (req.query.choice === 'Country') {
    try {
      Airport.find(
        {
          country: { $regex: req.query.searchterms },
        },
        (err, data) => {
          if (err) {
            res.redirect('/searchAirports');
          } else {
            res.render('search.ejs', { data: data });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  if (req.query.choice === 'Continental') {
    try {
      if (req.query.searchterms === 'North America') {
        Airport.find(
          {
            country: {
              $in: northAmerica,
            },
          },
          (err, data) => {
            if (err) {
              res.redirect('/searchAirports');
            } else {
              res.render('search.ejs', { data: data });
            }
          }
        );
      } else if (req.query.searchterms === 'South America') {
        Airport.find(
          {
            country: {
              $in: southAmerica,
            },
          },
          (err, data) => {
            if (err) {
              res.redirect('/searchAirports');
            } else {
              res.render('search.ejs', { data: data });
            }
          }
        );
      } else if (req.query.searchterms === 'Europe') {
        Airport.find(
          {
            country: {
              $in: europe,
            },
          },
          (err, data) => {
            if (err) {
              res.redirect('/searchAirports');
            } else {
              res.render('search.ejs', { data: data });
            }
          }
        );
      } else if (req.query.searchterms === 'Africa') {
        Airport.find(
          {
            country: {
              $in: africa,
            },
          },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              res.render('search.ejs', { data: data });
            }
          }
        );
      } else if (req.query.searchterms === 'Asia') {
        Airport.find(
          {
            country: {
              $in: asia,
            },
          },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              res.render('search.ejs', { data: data });
            }
          }
        );
      } else if (
        req.query.searchterms == 'Oceania' ||
        req.query.searchterms == 'Australia'
      ) {
        Airport.find(
          {
            country: {
              $in: oceania,
            },
          },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              res.render('search.ejs', { data: data });
            }
          }
        );
      } else {
        res.redirect('/searchAirports');
      }
    } catch (error) {
      console.log(error);
      res.redirect('/searchAirports');
    }
  }
  if (req.query.choice === 'Timezone') {
    try {
      Airport.find(
        {
          tz: { $regex: req.query.searchterms },
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.render('search.ejs', { data: data });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
});

// aggregate management page: aggregate.ejs
app.get('/aggregateAirports', (req, res) => {
  Airport.find({}, function (err, airports) {
    res.render('aggregate.ejs', {
      data: airports,
    });
  });
});

app.get('/aggregate', async (req, res) => {
  if (req.query.choice === 'Direct Flights') {
    try {
      const pipeline = [
        {
          $match: {
            direct_flights: { $gte: req.query.term, $lte: req.query.term },
          },
        },
        { $project: { country: 1, direct_flights: 1, carriers: 1 } },
      ];
      Airport.aggregate(pipeline, (err, data) => {
        console.log(data);
        res.render('aggregate.ejs', {
          data: data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (req.query.choice === 'Airports') {
    try {
      const pipeline = [
        {
          $match: {
            type: 'Airports',
          },
        },
        { $group: { _id: req.query.term, count: { $sum: 1 } } },
      ];
      const aggCursor = Airport.aggregate(pipeline);
      for await (const doc of aggCursor) {
        console.log(doc);
        res.render('aggregate.ejs', {
          data: doc,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (req.query.choice === 'Country') {
    try {
      const pipeline = [
        {
          $match: {
            type: 'Airports',
            country: req.query.term,
          },
        },
        { $group: { _id: req.query.term, count: { $sum: 1 } } },
      ];
      const aggCursor = Airport.aggregate(pipeline);
      for await (const doc of aggCursor) {
        console.log(doc);
        res.render('aggregate.ejs', {
          data: doc,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (req.query.choice === 'Country-Ele') {
    try {
      const pipeline = [
        {
          $match: {
            country: req.query.term,
          },
        },
        { $sort: { elev: -1 } },
        { $limit: 1 },
      ];
      Airport.aggregate(pipeline, (err, data) => {
        console.log(data);
        res.render('aggregate.ejs', {
          data: data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (req.query.choice === 'Carriers') {
    try {
      const pipeline = [
        {
          $match: {
            carriers: { $gte: req.query.term, $lte: req.query.term },
          },
        },
        { $project: { country: 1, direct_flights: 1, carriers: 1 } },
      ];
      Airport.aggregate(pipeline, (err, data) => {
        console.log(data);
        res.render('aggregate.ejs', {
          data: data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (req.query.choice === 'No longer in use') {
    try {
      Airport.deleteMany({ carriers: 0, direct_flights: 0 }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/deleteAirports');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
});

app.get('/', (req, res) => {
  res.redirect('/airports');
});

app.listen(process.env.PORT || 4000, function () {
  console.log(
    'Express server listening on port %d in %s mode',
    this.address().port,
    app.settings.env
  );
});
