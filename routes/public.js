var express = require('express')
var router = express.Router()
const axios = require('axios').default;

// corporation Scouting Inc id -> 98648528
const Corporation = require('./../models/Corporation').Corporation;

router.get('/corporations/:corporationID', function(req, res) {
  var corporationID = req.params.corporationID;
  // console.log(corporationID)
  if (!typeof(corporationID) == 'number') {
    res.sendStatus(400);
  }
  axios.get(
      'https://esi.evetech.net/latest/corporations/' + corporationID + '/?datasource=tranquility'
    )
    .then(async function (response) {
      if (!response) {
        res.sendStatus(404)
      }
      await Corporation.updateOne({
        corporation_id: corporationID
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
        corporation_id: corporationID
      }, {
        upsert: true
      })
        .then(async function(corp) {
          await Corporation.findOne({corporation_id: corporationID}).then(function(corpo, error) {
            if (error) {
              res.send(500)
            } else {
              res.json(corpo)
            }
          })
        })
          .catch(function(err) {
            console.error(err)
            res.sendStatus(500).json(err)
          })
    })
      .catch(function(err) {
        // console.log('catch')
        res.sendStatus(404).end()
      })
        .finally(function() {
          console.log('prononced at court')
        })
})

router.get('/', function (req, res) {

  // axios.get('/public/corporations/98648528')
  //   .then(function(corp) {
  //     var ceo_id = corp.ceo_id

  //   })


  res.sendStatus(200)
})

// character Volatile Mind id - 2113883361

const Character = require('./../models/Character').Character;
router.get('/character/:characterID', function (req, res) {
  characterID = req.params.characterID;
  axios.get('https://esi.evetech.net/latest/characters/' + characterID + '/?datasource=tranquility')
    .then(async function (response) {
      await Character.updateOne({ character_id: characterID}, {
        ancestry_id: response.data.ancestry_id,
        birthday: response.data.birthday,
        bloodline_id: response.data.bloodline_id,
        corporation_id: response.data.corporation_id,
        description: response.data.description,
        gender: response.data.gender,
        name: response.data.name,
        race_id: response.data.race_id,
        security_status: response.data.security_status,
        character_id: characterID
      }, {
        upsert: true
      }).then(async function(corp) {
        await Character.findOne({character_id: characterID}).then(function(char, error) {
          if (error) {
            res.send(500)
          } else {
            res.json(char)
          }
        })
      })
        .catch(function(err) {
          console.error(err)
          res.sendStatus(500).json(err)
        })
    })
      .catch(function(err) {
        // console.log('catch')
        res.sendStatus(404).end()
      })
        .finally(function() {
          console.log('introduced to court')
        })
})

module.exports = router