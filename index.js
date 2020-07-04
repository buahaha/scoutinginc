const express = require('express');
const path = require('path');
const app = express();
var request = require('request');
var enforce = require('express-sslify');


bodyParser = require("body-parser");
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true}));


if (process.env.PRODUCTION) {
  // Use enforce.HTTPS({ trustProtoHeader: true }) in case you are behind
  // a load balancer (e.g. Heroku). See further comments below
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}


app.use(express.static(path.join(__dirname, './scoutinginc/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './scoutinginc/build', 'index.html'));
});



app.set('trust proxy', true);

const PORT = process.env.PORT || 9000;

app.listen(PORT);