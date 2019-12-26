const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const allData = new Datastore('database.db');
allData.loadDatabase();
// allData.insert({
//     name: 'Sheefmahn',
//     status: '🌈'});

// allData.insert( {
//         name: 'Solar',
//         status: 'Sleepy'
//     });


app.get('/api', (request, response) => {
    allData.find({}, (error, data) => {
        allData.find({}, (err, data) => {
            if (err) {
                response.end();
                return;
            }
            response.json(data);
        })
    });
});


app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    allData.insert(data);
    response.json(data);
    console.log(allData);
});

app.get('/weather/:latlon', async (request, response) => {
    const latlon = request.params.latlon.split(',');
    const lat = latlon[0];
    const lon = latlon[1];
    const api_key = process.env.API_KEY;
    const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}/?units=si`;
    const weather_response = await fetch(weather_url)
    const weather_data = await weather_response.json();


    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
    const aq_response = await fetch(aq_url)
    const aq_data = await aq_response.json();

    const data = {
        weather: weather_data,
        air_quality: aq_data
    }

    response.json(data);
});


app.get('/solar/', async (request, response) => {
    console.log('Made it here');

    const myData = {
        username: "Dan",
        password: "PAIN",
        address: "sunshine 331"
    }

    response.json(myData);
});



app.get('/cityList/', async (request, response) => {
    const openQA_URL = 'https://api.openaq.org/v1/cities';
    const newResponse = await fetch(openQA_URL);
    const results = await newResponse.json();

    response.json(results);
})





// const express = require('express');
// const app = express();
// app.listen(3000, () => console.log('listening at 3000'));
// app.use(express.static('public'));
// app.use(express.json({limit: '1mb'}));

// const database = [];

// app.post('/api', (request, response) => {
//     console.log('I got a request');
//     console.log(request.body);
//     const data = request.body;
//     database.push(data);
//     console.log(database);

//     response.json({
//         status: 'success',
//         latitude: request.body.lat,
//         longitude: request.body.long
//     });
// });