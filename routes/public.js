var express = require('express')
var router = express.Router()
const axios = require('axios').default;

// corporation Scouting Inc id -> 98648528

// define the home page route
const Corporation = require('./../models/Corporation').Corporation;
router.get('/', function (req, res) {
  axios.get('https://esi.evetech.net/latest/corporations/98648528/?datasource=tranquility')
  .then(function (response) {
    // handle success
    console.log(response.data);
    var myCorp = Corporation.updateOne({
      corp_id: 98648528
    }, {
      ceo_id: response.data.ceo_id,
      creator_id: response.data.creator_id,
      date_founded: response.data.date_founded,
      description: response.data.description,
      home_station_id: response.data.home_station_id,
      member_count: response.data.member_count,
      name: response.data.name,
      shares: response.data.shares,
      tax_rate: response.data.tax_rate,
      ticker: response.data.ticker,
      url: response.data.url,
      corp_id: 98648528
    }, {
      upsert: true
    }, (err) => console.error(err))
    res.send(response.data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.send('error')
  })
  .finally(function () {
    console.log('prononced at court')
  });
})

// define the character route
router.get('/character/:characterID', function (req, res) {
  characterID = req.params.characterID;
  axios.get('https://esi.evetech.net/latest/characters/' + characterID + '/?datasource=tranquility')
  .then(function (response) {
    // handle success
    console.log(response.data);
    res.send(response.data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.send('error')
  })
  .finally(function () {
    console.log('introduced to court')
  });
})

module.exports = router