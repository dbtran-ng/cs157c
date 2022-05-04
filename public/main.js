// main.js: code for interacting with the client
const getURL = 'http://localhost:4000/';
const postURL = 'http://localhost:4000/addAirport';
const deleteURL = 'http://localhost:4000/deleteAirport/';

function addData() {
  const code = document.getElementById('code').value;
  const name = document.getElementById('name').value;
  const icao = document.getElementById('icao').value;
  const type = document.getElementById('type').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const url = document.getElementById('url').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const tz = document.getElementById('tz').value;
  const country = document.getElementById('country').value;
  const elev = document.getElementById('elev').value;
  const lat = document.getElementById('lat').value;
  const lon = document.getElementById('lon').value;
  const woeid = document.getElementById('woeid').value;
  const carriers = document.getElementById('carriers').value;
  const direct_flights = document.getElementById('direct_flights').value;
  const runway_length = document.getElementById('runway_length').value;

  if (!code) {
    alert('Name is required!!');
    document.getElementById('name').focus();
    return;
  }
  if (!name) {
    alert('Name is required!!');
    document.getElementById('name').focus();
    return;
  }
  if (!country) {
    alert('Country is required!!');
    document.getElementById('country').focus();
    return;
  }

  postToDB({
    code: code,
    name: name,
    icao: icao,
    phone: phone,
    email: email,
    type: type,
    url: url,
    city: city,
    state: state,
    country: country,
    elev: elev,
    tz: tz,
    lat: lat,
    lon: lon,
    woeid: woeid,
    carriers: carriers,
    direct_flights: direct_flights,
    runway_length: runway_length,
  });
}

function postToDB(doc) {
  fetch(postURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doc),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .catch((error) => {
      console.error('# Error:', error);
      const msg =
        'Error: ' +
        error.message +
        '. ' +
        'There was an error posting data to the database. ' +
        "See browser's console for more details.";
      document.getElementById('status').innerHTML = msg;
    });
}

// const update = document.querySelector('#update-button');

// update.addEventListener('click', (_) => {
//   fetch('/quotes', {
//     method: 'put',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: 'd',
//       country: 'Canada',
//     }),
//   });
// });
function updateData() {
  const code = document.getElementById('edit-code').value;
  const name = document.getElementById('edit-name').value;
  const icao = document.getElementById('edit-icao').value;
  const type = document.getElementById('edit-type').value;
  const phone = document.getElementById('edit-phone').value;
  const email = document.getElementById('edit-email').value;
  const url = document.getElementById('edit-url').value;
  const city = document.getElementById('edit-city').value;
  const state = document.getElementById('edit-state').value;
  const tz = document.getElementById('edit-tz').value;
  const country = document.getElementById('edit-country').value;
  const elev = document.getElementById('edit-elev').value;
  const lat = document.getElementById('edit-lat').value;
  const lon = document.getElementById('edit-lon').value;
  const woeid = document.getElementById('edit-woeid').value;
  const carriers = document.getElementById('edit-carriers').value;
  const direct_flights = document.getElementById('edit-direct_flights').value;
  const runway_length = document.getElementById('edit-runway_length').value;

  updateToDB({
    code: code,
    name: name,
    icao: icao,
    phone: phone,
    email: email,
    type: type,
    url: url,
    city: city,
    state: state,
    country: country,
    elev: elev,
    tz: tz,
    lat: lat,
    lon: lon,
    woeid: woeid,
    carriers: carriers,
    direct_flights: direct_flights,
    runway_length: runway_length,
  });
}
function updateToDB(doc) {
  fetch(`/airports/update/${doc._id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doc),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .catch((error) => {
      console.error('# Error:', error);
      const msg =
        'Error: ' +
        error.message +
        '. ' +
        'There was an error posting data to the database. ' +
        "See browser's console for more details.";
      document.getElementById('status').innerHTML = msg;
    });
}
