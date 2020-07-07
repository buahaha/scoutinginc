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