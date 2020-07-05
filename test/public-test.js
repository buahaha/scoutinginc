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
          // console.log('in test')
          if (error) {
            // console.log('after test')
            throw done(error);
          } else if (corp.corporation_id == 98648529) {
            done()
          } else {
            throw "not found"
            done()
          }
        })
    })
  })

  describe('Character', function(done) {

    it('should send 404 when character not found', function(done) {
      request(app)
        .get('/public/character/2113883361')
          .expect(404)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return OK', function(done) {
      request(app)
        .get('/public/character/2113883361')
          .expect(200)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should return json', function(done) {
      request(app)
        .get('/public/character/2113883361')
          .expect('Content-Type', /json/)
            .end(function(err, res){
              if (err) throw err;
              else done()
            });
    })

    it('should save to db', function(done) {
      Character.findOne({character_id: 2113883361})
        .then(function(corp, error) {
          if (error) {
            throw done(error);
          }
          else done()
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
  })
})