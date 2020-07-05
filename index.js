const express = require('express');
const path = require('path');
const app = express();
var axios = require('axios');
var enforce = require('express-sslify');
var cors = require("cors");

bodyParser = require("body-parser");
app.use(cors());

app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true}));

const mongoose = require('mongoose');
const dbuser = process.env.DB_USER || require('./secrets/db').dbSecrets.user;
const dbpassword = process.env.DB_PASSWORD || equire('./secrets/db').dbSecrets.password;
mongoose.connect('mongodb://' + dbuser + ':' + dbpassword + '@ds054128.mlab.com:54128/scoutinginc', {useNewUrlParser: true, useUnifiedTopology: true});


if (process.env.PRODUCTION) {
  // Use enforce.HTTPS({ trustProtoHeader: true }) in case you are behind
  // a load balancer (e.g. Heroku). See further comments below
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}


app.use(express.static(path.join(__dirname, './scoutinginc/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './scoutinginc/build', 'index.html'));
});

var publicRoutes = require('./routes/public');
app.use('/public', publicRoutes);



// app.get('/corpo-meta-tag', function(req, res) {

// })


app.set('trust proxy', true);

const PORT = process.env.PORT || 9000;

app.listen(PORT);