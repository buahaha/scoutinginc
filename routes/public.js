var express = require('express')
var router = express.Router()

const got = require('got');

// corporation Scouting Inc id -> 98648528
const scoutinginc = 98648528;
const Corporation = require('./../models/Corporation').Corporation;


router.get('/corporations/:corporationID', async function(req, res) {
  var corporationID = req.params.corporationID;
  // console.log(corporationID)
  if (!typeof(corporationID) == 'number') {
    res.sendStatus(400);
  }
  await got.get('https://esi.evetech.net/latest/corporations/' + corporationID + '/?datasource=tranquility', {
      responseType: 'json'
  })
    .then(async function(esi_response) {
      var body = esi_response.body;
      await Corporation.updateOne({
        corporation_id: corporationID
      }, {
        ceo_id: body.ceo_id,
        creator_id: body.creator_id,
        date_founded: body.date_founded,
        description: body.description,
        home_station_id: body.home_station_id,
        member_count: body.member_count,
        name: body.name,
        shares: body.shares,
        tax_rate: body.tax_rate,
        ticker: body.ticker,
        url: body.url,
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
          .catch(function(error) {
            console.error(error)
            res.sendStatus(500).end();
          })
    })
      .catch(function(error) {
        console.error(error)
        res.sendStatus(404).end();
      })
})

// character Volatile Mind id - 2113883361

const Character = require('./../models/Character').Character;
router.get('/characters/:characterID', async function (req, res) {
  characterID = req.params.characterID;
  await got.get('https://esi.evetech.net/latest/characters/' + characterID + '/?datasource=tranquility', {
      responseType: 'json'
  })
    .then(async function(esi_response) {
      var body = esi_response.body;
      await Character.updateOne({ character_id: characterID}, {
        ancestry_id: body.ancestry_id,
        birthday: body.birthday,
        bloodline_id: body.bloodline_id,
        corporation_id: body.corporation_id,
        description: body.description,
        gender: body.gender,
        name: body.name,
        race_id: body.race_id,
        security_status: body.security_status,
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
      .catch(function(error) {
        console.error(error)
        res.sendStatus(404).end();
      })
  
})

router.get('/', async function (req, res) {
  const PORT = process.env.PORT || 9000;

  await got.get('http://localhost:' + PORT + '/public/corporations/' + scoutinginc, {
      responseType: 'json',
      https: {
        rejectUnauthorized: false
      } 
  })
    .then(async function(esi_response) {
      var corp = esi_response.body
      // console.log(corp)
      var ceo_id = corp.ceo_id
      // console.log(ceo_id)
      var corp_data = corp
      await got.get('http://localhost:' + PORT + '/public/characters/' + ceo_id, {
        responseType: 'json',
        https: {
          rejectUnauthorized: false
        } 
      })
        .then(function(esi_response2) {
          var ceo = esi_response2.body
          // console.log(ceo)
          var response = corp_data;
          response.ceo = ceo;
          // console.log(response)
          res.json(response);
        })
          .catch(function(error) {
            console.error(error)
            res.sendStatus(500).end();
          })
    })
      .catch(function(error) {
        console.error(error)
        res.sendStatus(500).end();
      })
  
  
})

module.exports = router