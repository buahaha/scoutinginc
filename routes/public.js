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
const { Alliance } = require('../models/Alliance');
const { CorporationIcons } = require('../models/CorporationIcons');
const { AllianceIcons } = require('../models/AllianceIcons');
const { CharacterCorporationHistory } = require('../models/CharacterCorporationHistory');
const { CorporationAllianceHistory } = require('../models/CorporationAllianceHistory');
const { AllianceCorporations } = require('../models/AllianceCorporations');
const { CharacterPortrait } = require('../models/CharacterPortrait');
const { Status } = require('../models/Status');

const PORT = process.env.PORT || 9000;

router.use((req, res, next) => {
  console.log(req.hostname);
  if (req.hostname != 'localhost' || req.hostname != 'scoutinginc.herokuapp.com') {
    res.sendStatus(403);
  }
  next()
})

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

router.get('/corporations/:corporationID/icons', async (req, res) => {
  var corporationID = req.params.corporationID;
  await Corporation.findOne({corporation_id: corporationID})
    .then(async (corp, error) => {
      if (error) {
        console.log(error)
        res.sendStatus(500).end()
      } else if (corp == null) {
        throw 'corporation not found';
      }
      var imageOfCorp = corp.corporation_id;
      await got.get('https://esi.evetech.net/latest/corporations/' + imageOfCorp + '/icons/?datasource=tranquility', {
          responseType: 'json'
      })
        .then(async function(esi_response) {
          var body = esi_response.body;
          await CorporationIcons.updateOne({
            corporation_id: corporationID
          }, {
            px128x128: body.px128x128,
            px256x256: body.px256x256,
            px64x64: body.px64x64,
            corporation_id: corporationID
          }, {
            upsert: true
          })
            .then(async function(corp) {
              await CorporationIcons.findOne({corporation_id: corporationID}).then(function(icons, error) {
                if (error) {
                  res.send(500)
                } else {
                  res.json(icons)
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
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      })
})

router.get('/corporations/:corporationID/alliancehistory', async (req, res) => {
  var corporationID = req.params.corporationID;
  await Corporation.findOne({corporation_id: corporationID})
    .then(async (corporation, error) => {
      if (error) {
        console.log(error)
        res.sendStatus(500).end()
      } else if (corporation == null) {
        throw 'corporation not found'
      }
      var corporationHistoryOf = corporation.corporation_id;
      await got.get('https://esi.evetech.net/latest/corporations/' + corporationHistoryOf + '/alliancehistory/?datasource=tranquility', {
          responseType: 'json'
      })
        .then(async function(esi_response) {
          var body = esi_response.body;
          await CorporationAllianceHistory.updateOne({
            corporation_id: corporationID
          }, {
            history: body,
            corporation_id: corporationHistoryOf
          }, {
            upsert: true
          })
            .then(async function(corp) {
              await CorporationAllianceHistory.findOne({corporation_id: corporationID}).then(function(history, error) {
                if (error) {
                  res.send(500)
                } else {
                  res.json(history)
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
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
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

router.get('/characters/:characterID/corporationhistory', async (req, res) => {
  var characterID = req.params.characterID;
  await Character.findOne({character_id: characterID})
    .then(async (char, error) => {
      if (error) {
        console.log(error)
        res.sendStatus(500).end()
      } else if (char == null) {
        throw 'character not found'
      }
      var characterHistoryOf = char.character_id;
      await got.get('https://esi.evetech.net/latest/characters/' + characterHistoryOf + '/corporationhistory/?datasource=tranquility', {
          responseType: 'json'
      })
        .then(async function(esi_response) {
          var body = esi_response.body;
          await CharacterCorporationHistory.updateOne({
            character_id: characterID
          }, {
            history: body,
            character_id: characterHistoryOf
          }, {
            upsert: true
          })
            .then(async function(corp) {
              await CharacterCorporationHistory.findOne({character_id: characterID}).then(function(history, error) {
                if (error) {
                  res.send(500)
                } else {
                  res.json(history)
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
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      })
})

router.get('/characters/:characterID/portrait', async (req, res) => {
  var characterID = req.params.characterID;
  await Character.findOne({character_id: characterID})
    .then(async (character, error) => {
      if (error) {
        console.log(error)
        res.sendStatus(500).end()
      } else if (character == null) {
        throw 'no character found';
      }
      var imageOfCharacter = character.character_id;
      await got.get('https://esi.evetech.net/latest/characters/' + imageOfCharacter + '/portrait/?datasource=tranquility', {
          responseType: 'json'
      })
        .then(async function(esi_response) {
          var body = esi_response.body;
          await CharacterPortrait.updateOne({
            character_id: characterID
          }, {
            px128x128: body.px128x128,
            px256x256: body.px256x256,
            px512x512: body.px512x512,
            px64x64: body.px64x64,
            character_id: characterID
          }, {
            upsert: true
          })
            .then(async function(corp) {
              await CharacterPortrait.findOne({character_id: characterID}).then(function(icons, error) {
                if (error) {
                  res.send(500)
                } else {
                  res.json(icons)
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
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
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
            } else if (station == null) {
              res.sendStatus(404).end()
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
            } else if (system == null) {
              res.sendStatus(404).end()
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
        creator_corporation_id: body.creator_corporation_id,
        creator_id: body.creator_id,
        date_founded: body.date_founded,
        executor_corporation_id: body.executor_corporation_id,
        name: body.name,
        ticker: body.ticker,
        alliance_id: allianceID
      }, {
        upsert: true
      }).then(async function(corp) {
        await Alliance.findOne({alliance_id: allianceID}).then(function(alliance, error) {
          if (error) {
            res.send(500)
          } else {
            res.json(alliance)
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

router.get('/alliances/:allianceID/icons', async (req, res) => {
  var allianceID = req.params.allianceID;
  await Alliance.findOne({alliance_id: allianceID})
    .then(async (alliance, error) => {
      if (error) {
        console.log(error)
        res.sendStatus(500).end()
      } else if (alliance == null) {
        throw 'no alliance found';
      }
      var imageOfAlliance = alliance.alliance_id;
      await got.get('https://esi.evetech.net/latest/alliances/' + imageOfAlliance + '/icons/?datasource=tranquility', {
          responseType: 'json'
      })
        .then(async function(esi_response) {
          var body = esi_response.body;
          await AllianceIcons.updateOne({
            alliance_id: allianceID
          }, {
            px128x128: body.px128x128,
            px256x256: body.px256x256,
            px64x64: body.px64x64,
            alliance_id: allianceID
          }, {
            upsert: true
          })
            .then(async function(corp) {
              await AllianceIcons.findOne({alliance_id: allianceID}).then(function(icons, error) {
                if (error) {
                  res.send(500)
                } else {
                  res.json(icons)
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
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      })
})

router.get('/alliances/:allianceID/corporations', async (req, res) => {
  var allianceID = req.params.allianceID;
  await Alliance.findOne({alliance_id: allianceID})
    .then(async (alliance, error) => {
      if (error) {
        console.log(error)
        res.sendStatus(500).end()
      } else if (alliance == null) {
        throw 'no alliance found';
      }
      var corporationsOfAlliance = alliance.alliance_id;
      await got.get('https://esi.evetech.net/latest/alliances/' + corporationsOfAlliance + '/corporations/?datasource=tranquility', {
          responseType: 'json'
      })
        .then(async function(esi_response) {
          var body = esi_response.body;
          await AllianceCorporations.updateOne({
            alliance_id: allianceID
          }, {
            corporation_ids: body,
            alliance_id: allianceID
          }, {
            upsert: true
          })
            .then(async function(corp) {
              await AllianceCorporations.findOne({alliance_id: allianceID}).then(function(corporations, error) {
                if (error) {
                  res.send(500)
                } else {
                  res.json(corporations)
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
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      })
})

router.get('/status', async (req, res) => {
  await got.get('https://esi.evetech.net/latest/status/?datasource=tranquility', {
    responseType: 'json'
  })
    .then(async function(esi_response) {
      var body = esi_response.body;
      await Status.updateOne({}, {
        players: body.players,
        server_version: body.server_version,
        start_time: body.start_time,
        vip: body.vip
      }, {
        upsert: true
      })
        .then(async function(corp) {
          await Status.findOne({}).then(function(status, error) {
            if (error) {
              res.send(500)
            } else {
              res.json(status)
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