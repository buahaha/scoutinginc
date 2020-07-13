var assert = require('assert');

// describe('Array', function () {
//   describe('#indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

var request = require('supertest');
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
const { AllianceCorporations } = require('../models/AllianceCorporations');
const { CharacterPortrait } = require('../models/CharacterPortrait');

var app = require('./../index').scoutinginc;


describe('Public', function() {
  before(function (done) {
    
    done()
  });

  describe('Corporation', function(done) {

    it('should send 404 when corporation not found', function(done) {
      request(app)
        .get('/public/corporations/98648')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/corporations/98648528')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/corporations/98648528')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      Corporation.findOne({corporation_id: 98648528})
        .then(function(corp, error) {
          if (error) {
            done(error);
          } else if (corp.corporation_id == 98648528) {
            done()
          }
          else throw "corporation not found"
        })
    })
  })

  describe('CorporationIcons', function(done) {

    it('should send 404 when corporation icons not found', function(done) {
      request(app)
        .get('/public/corporations/98648/icons')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/corporations/98648528/icons')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/corporations/98648528/icons')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      CorporationIcons.findOne({corporation_id: 98648528})
        .then(function(corp, error) {
          if (error) {
            done(error);
          } else if (corp.corporation_id == 98648528) {
            done()
          }
          else throw "corporation icons not found"
        })
    })
  })

  describe('CorporationAllianceHistory', function(done) {

    it('should send 404 when corporation alliance history not found', function(done) {
      request(app)
        .get('/public/corporations/98648/alliancehistory')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/corporations/98648528/alliancehistory')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/corporations/98648528/alliancehistory')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      Corporation.findOne({corporation_id: 98648528})
        .then(function(corp, error) {
          if (error) {
            done(error);
          } else if (corp.corporation_id == 98648528) {
            done()
          }
          else throw "corporation alliance history not found"
        })
    })
  })

  describe('Character', function(done) {

    it('should send 404 when character not found', function(done) {
      request(app)
        .get('/public/characters/21138')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/characters/2113883361')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/characters/2113883361')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      Character.findOne({character_id: 2113883361})
        .then(function(corp, error) {
          if (error) done(error);
          else if (corp.character_id == 2113883361) done()
          else throw "character not found"
        })
    })

  })

  describe('CharacterCorporationHistory', function(done) {

    it('should send 404 when character corporation history not found', function(done) {
      request(app)
        .get('/public/characters/21138/corporationhistory')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/characters/2113883361/corporationhistory')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/characters/2113883361/corporationhistory')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      CharacterCorporationHistory.findOne({character_id: 2113883361})
        .then(function(corp, error) {
          if (error) done(error);
          else if (corp.character_id == 2113883361) done()
          else throw "character not found"
        })
    })

  })

  describe('CorporationIcons', function(done) {

    it('should send 404 when character portrait not found', function(done) {
      request(app)
        .get('/public/characters/98648/portrait')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/characters/2113883361/portrait')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/characters/2113883361/portrait')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      CharacterPortrait.findOne({character_id: 2113883361})
        .then(function(corp, error) {
          if (error) {
            done(error);
          } else if (corp.character_id == 2113883361) {
            done()
          }
          else throw "character portrait not found"
        })
    })
  })

  describe('Ancestry', function(done) {

    it('should send 404 when ancestry not found', function(done) {
      request(app)
        .get('/public/ancestries/5000')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/ancestries/1')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/ancestries/1')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      Ancestry.findOne({ancestry_id: 1})
        .then(function(corp, error) {
          if (error) done(error);
          else if (corp.ancestry_id == 1) done()
          else throw "ancestry not found"
        })
    })

  })

  describe('Bloodline', function(done) {

    it('should send 404 when bloodline not found', function(done) {
      request(app)
        .get('/public/bloodlines/5000')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/bloodlines/1')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/bloodlines/1')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      Bloodline.findOne({bloodline_id: 1})
        .then(function(corp, error) {
          if (error) done(error);
          else if (corp.bloodline_id == 1) done()
          else throw "bloodline not found"
        })
    })

  })

  describe('Race', function(done) {

    it('should send 404 when race not found', function(done) {
      request(app)
        .get('/public/races/5000')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/races/1')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/races/1')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      Race.findOne({race_id: 1})
        .then(function(corp, error) {
          if (error) done(error);
          else if (corp.race_id == 1) done()
          else throw "race not found"
        })
    })

  })

  describe('Faction', function(done) {

    it('should send 404 when faction not found', function(done) {
      request(app)
        .get('/public/factions/1')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/factions/500003')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/factions/500003')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      Faction.findOne({faction_id: 500003})
        .then(function(corp, error) {
          if (error) done(error);
          else if (corp.faction_id == 500003) done()
          else throw "faction not found"
        })
    })

  })

  describe('Station', function(done) {

    it('should send 404 when station not found', function(done) {
      request(app)
        .get('/public/stations/21138')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/stations/60005722')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/stations/60005722')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      Station.findOne({station_id: 60005722})
        .then(function(corp, error) {
          if (error) done(error);
          else if (corp.station_id == 60005722) done()
          else throw "station not found"
        })
    })

  })

  describe('System', function(done) {

    it('should send 404 when system not found', function(done) {
      request(app)
        .get('/public/systems/21138')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/systems/30002187')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/systems/30002187')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      System.findOne({system_id: 30002187})
        .then(function(corp, error) {
          if (error) done(error);
          else if (corp.system_id == 30002187) done()
          else throw "system not found"
        })
    })

  })

  describe('Alliance', function(done) {

    it('should send 404 when alliance not found', function(done) {
      request(app)
        .get('/public/alliances/9848')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/alliances/498125261')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/alliances/498125261')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      Alliance.findOne({alliance_id: 498125261})
        .then(function(corp, error) {
          if (error) {
            done(error);
          } else if (corp.alliance_id == 498125261) {
            done()
          }
          else throw "alliance not found"
        })
    })
  })

  describe('AllianceIcons', function(done) {

    it('should send 404 when alliance icons not found', function(done) {
      request(app)
        .get('/public/alliances/98648/icons')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/alliances/498125261/icons')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/alliances/498125261/icons')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      AllianceIcons.findOne({alliance_id: 498125261})
        .then(function(corp, error) {
          if (error) {
            done(error);
          } else if (corp.alliance_id == 498125261) {
            done()
          }
          else throw "alliance icons not found"
        })
    })
  })

  describe('AllianceCorporations', function(done) {

    it('should send 404 when alliance corporations not found', function(done) {
      request(app)
        .get('/public/alliances/98648/corporations')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/alliances/498125261/corporations')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/alliances/498125261/corporations')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      AllianceCorporations.findOne({alliance_id: 498125261})
        .then(function(corp, error) {
          if (error) {
            done(error);
          } else if (corp.alliance_id == 498125261) {
            done()
          }
          else throw "alliance icons not found"
        })
    })
  })

  describe('AllianceCorporations', function(done) {

    // it('should send 404 when alliance corporations not found', function(done) {
    //   request(app)
    //     .get('/public/status')
    //       .expect(404)
    //         .end(function(err, res){
    //           if (err) throw err;
    //           else done()
    //         });
    // })

    it('should return OK', function(done) {
      request(app)
        .get('/public/status')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/status')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    // it('should save to db', function(done) {
    //   AllianceCorporations.findOne({alliance_id: 498125261})
    //     .then(function(corp, error) {
    //       if (error) {
    //         done(error);
    //       } else if (corp.alliance_id == 498125261) {
    //         done()
    //       }
    //       else throw "alliance icons not found"
    //     })
    // })
  })







  // WRONG WAY! App.js
  describe('home', function(done) {

    it('should return OK', function(done) {
      request(app)
        .get('/public')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return Scouting Inc as corporation name', function(done) {
      request(app)
        .get('/public')
          .expect(function(res) {
            assert.equal(res.body.name, 'Scouting Inc', 
              'corporation names does not match')
          })
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return Volatile Mind as CEO name', function(done) {
      request(app)
        .get('/public')
          .expect(function(res) {
            assert.equal(res.body.ceo.name, 'Volatile Mind', 
              'CEO name does not match')
          })
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

  })
})