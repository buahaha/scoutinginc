var express = require('express')
var router = express.Router()

const got = require('got');
// const { Alliance } = require('../models/Alliance');
const { Corporation } = require('../models/Corporation');
const { Character } = require('../models/Character');
const { Station } = require('../models/Station');
const { Ancestry } = require('../models/Ancestry');
const { Bloodline } = require('../models/Bloodline');
const { Race } = require('../models/Race');
const { Faction } = require('../models/Faction');
const { System } = require('../models/System');

const PORT = process.env.PORT || 9000;

// corporation Scouting Inc id -> 98648528
const scoutinginc = 98648528;
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
        alliance_id: body.alliance_id,
        ceo_id: body.ceo_id,
        creator_id: body.creator_id,
        date_founded: body.date_founded,
        description: body.description,
        faction_id: body.faction_id,
        home_station_id: body.home_station_id,
        member_count: body.member_count,
        name: body.name,
        shares: body.shares,
        tax_rate: body.tax_rate,
        ticker: body.ticker,
        url: body.url,
        war_eligible: body.war_eligible,
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
router.get('/characters/:characterID', async function (req, res) {
  var characterID = req.params.characterID;
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
      })
        .then(async function(corp) {
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

router.get('/ancestries/:ancestryID', async (req, res) => {
  var ancestryID = req.params.ancestryID;
  await got.get('https://esi.evetech.net/latest/universe/ancestries/?datasource=tranquility&language=en-us', {
    responseType: 'json'
  })
    .then(async (esi_response) => {
      var body = esi_response.body;
      await body.forEach(async ancestry => {
        var id = ancestry.id
        await Ancestry.updateOne({ ancestry_id: id}, {
          bloodline_id: ancestry.bloodline_id,
          description: ancestry.description,
          icon_id: ancestry.icon_id,
          name: ancestry.name,
          short_description: ancestry.short_description,
          ancestry_id: id
        }, {
          upsert: true
        })
      })
      await Ancestry.findOne({ancestry_id: ancestryID}).then(function(ancestry, error) {
        if (error) {
          res.send(500).end()
        } else if (ancestry == null) {
          res.sendStatus(404).end()
        } else {
          res.json(ancestry).end()
        }
      })
    })
      .catch(function(err) {
        console.error(err)
        res.sendStatus(500).json(err).end()
      })
})

router.get('/bloodlines/:bloodlineID', async (req, res) => {
  var bloodlineID = req.params.bloodlineID;
  await got.get('https://esi.evetech.net/latest/universe/bloodlines/?datasource=tranquility&language=en-us', {
    responseType: 'json'
  })
    .then(async (esi_response) => {
      var body = esi_response.body;
      await body.forEach(async bloodline => {
        var id = bloodline.bloodline_id
        await Bloodline.updateOne({ bloodline_id: id}, {
          charisma: bloodline.charisma,
          corporation_id: bloodline.corporation_id,
          description: bloodline.description,
          intelligence: bloodline.intelligence,
          memory: bloodline.memory,
          name: bloodline.name,
          perception: bloodline.perception,
          race_id: bloodline.race_id,
          ship_type_id: bloodline.ship_type_id,
          willpower: bloodline.willpower,
          bloodline_id: id
        }, {
          upsert: true
        })
      })
      await Bloodline.findOne({bloodline_id: bloodlineID}).then(function(bloodline, error) {
        if (error) {
          res.send(500).end()
        } else if (bloodline == null) {
          res.sendStatus(404).end()
        } else {
          res.json(bloodline).end()
        }
      })
    })
      .catch(function(err) {
        console.error(err)
        res.sendStatus(500).json(err).end()
      })
})

router.get('/races/:raceID', async (req, res) => {
  var raceID = req.params.raceID;
  await got.get('https://esi.evetech.net/latest/universe/races/?datasource=tranquility&language=en-us', {
    responseType: 'json'
  })
    .then(async (esi_response) => {
      var body = esi_response.body;
      await body.forEach(async race => {
        var id = race.race_id
        await Race.updateOne({ race_id: id}, {
          alliance_id: race.alliance_id,
          description: race.description,
          name: race.name,
          race_id: id
        }, {
          upsert: true
        })
      })
      await Race.findOne({race_id: raceID}).then(function(race, error) {
        if (error) {
          res.send(500).end()
        } else if (race == null) {
          res.sendStatus(404).end()
        } else {
          res.json(race).end()
        }
      })
    })
      .catch(function(err) {
        console.error(err)
        res.sendStatus(500).json(err).end()
      })
})

router.get('/factions/:factionID', async (req, res) => {
  var factionID = req.params.factionID;
  await got.get('https://esi.evetech.net/latest/universe/factions/?datasource=tranquility&language=en-us', {
    responseType: 'json'
  })
    .then(async (esi_response) => {
      var body = esi_response.body;
      await body.forEach(async faction => {
        var id = faction.faction_id
        await Faction.updateOne({ faction_id: id}, {
          corporation_id: faction.corporation_id,
          description: faction.description,
          is_unique: faction.is_unique,
          militia_corporation_id: faction.militia_corporation_id,
          name: faction.name,
          size_factor: faction.size_factor,
          solar_system_id: faction.solar_system_id,
          station_count: faction.station_count,
          station_system_count: faction.station_system_count,
          faction_id: id
        }, {
          upsert: true
        })
      })
      await Faction.findOne({faction_id: factionID}).then(function(faction, error) {
        if (error) {
          res.send(500).end()
        } else if (faction == null) {
          res.sendStatus(404).end()
        } else {
          res.json(faction).end()
        }
      })
    })
      .catch(function(err) {
        console.error(err)
        res.sendStatus(500).json(err).end()
      })
})

router.get('/stations/:stationID', async (req, res) => {
  var stationID = req.params.stationID;
  await got.get('https://esi.evetech.net/latest/universe/stations/' + stationID + '/?datasource=tranquility', {
    responseType: 'json'
  })
    .then(async (esi_response) => {
      var body = esi_response.body;
      await Station.updateOne({ station_id: stationID}, {
        max_dockable_ship_volume: body.max_dockable_ship_volume,
        name: body.name,
        office_rental_cost: body.office_rental_cost,
        owner: body.owner,
        position: {
          x: body.position.x,
          y: body.position.y,
          z: body.position.z
        },
        race_id: body.race_id,
        reprocessing_efficiency: body.reprocessing_efficiency,
        reprocessing_stations_take: body.reprocessing_stations_take,
        services: body.services,
        station_id: stationID,
        system_id: body.system_id,
        type_id: body.type_id,
      }, {
        upsert: true
      })
        .then(async function(corp) {
          await Station.findOne({station_id: stationID}).then(function(station, error) {
            if (error) {
              res.send(500)
            } else {
              res.json(station)
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

router.get('/systems/:systemID', async (req, res) => {
  var systemID = req.params.systemID;
  await got.get('https://esi.evetech.net/latest/universe/systems/' + systemID + '/?datasource=tranquility', {
    responseType: 'json'
  })
    .then(async (esi_response) => {
      var body = esi_response.body;
      await System.updateOne({ system_id: systemID}, {
        constellation_id: body.constellation_id,
        name: body.name,
        planets: body.planets,
        position: {
          x: body.position.x,
          y: body.position.y,
          z: body.position.z
        },
        security_class: body.security_class,
        security_status: body.security_status,
        star_id: body.star_id,
        stargates: body.stargates,
        stations: body.stations,
        system_id: systemID
      }, {
        upsert: true
      })
        .then(async function(corp) {
          await System.findOne({system_id: systemID}).then(function(system, error) {
            if (error) {
              res.send(500)
            } else {
              res.json(system)
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

router.get('/alliances/:allianceID', async (req, res) => {
  var allianceID = req.params.allianceID;
  await got.get('https://esi.evetech.net/latest/alliances/' + allianceID + '/?datasource=tranquility', {
    responseType: 'json'
  })
    .then(async (esi_response) => {
      var body = esi_response.body;
      await Alliance.updateOne({ alliance_id: allianceID}, {

      }, {
        upsert: true
      })
    })
})

router.get('/search/:category/:strict/:string', async function(req, res) {

})










// WRONG WAY! App.js
router.get('/', async function (req, res) {
  // const corporationID = req.params.corporationID
  // console.log(corporationID)
  // if (corporationID === undefined) corporationID = scoutinginc;
  // console.log(corporationID)
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