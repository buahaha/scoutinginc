const express = require('express');
const path = require('path');
const app = express();
// var axios = require('axios');
// var enforce = require('express-sslify');
var cors = require("cors");
const morgan = require('morgan')

const PORT = process.env.PORT || 9000;

bodyParser = require("body-parser");
app.use(cors());

app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true}));

app.use(morgan('combined'))

const mongoose = require('mongoose');
const dbuser = process.env.DB_USER || require('./secrets/db').dbSecrets.user;
const dbpassword = process.env.DB_PASSWORD || require('./secrets/db').dbSecrets.password;
if (process.env.NODE_ENV == 'test') {
  mongoose.connect('mongodb://' + dbuser + ':' + dbpassword + '@ds014808.mlab.com:14808/scoutinginc-test', {useNewUrlParser: true, useUnifiedTopology: true});
} else {
  mongoose.connect('mongodb://' + dbuser + ':' + dbpassword + '@ds054128.mlab.com:54128/scoutinginc', {useNewUrlParser: true, useUnifiedTopology: true});
}
mongoose.set('useCreateIndex', true);

// why my db is ofF?
// if (process.env.NODE_ENV == 'production') {
//   // Use enforce.HTTPS({ trustProtoHeader: true }) in case you are behind
//   // a load balancer (e.g. Heroku). See further comments below
//   app.use(enforce.HTTPS({ trustProtoHeader: true }));
// }

app.use(express.static(path.join(__dirname, './scoutinginc/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './scoutinginc/build', 'index.html'));
});

const passport = require("passport");
const EveSSO = require("passport-eveonline-v2");

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new EveSSO(
    {
      clientID: process.env.EVE_USER_ID || require('./secrets/eve').eveAuth.clientID,
      clientSecret: process.env.EVE_SECRET_KEY || require('./secrets/eve').eveAuth.secretKey,
      callbackURL: '/callback/',
      scope: [
        'publicData',
        // 'esi-calendar.respond_calendar_events.v1',
        // 'esi-calendar.read_calendar_events.v1',
        // 'esi-location.read_location.v1',
        // 'esi-location.read_ship_type.v1',
        // 'esi-mail.organize_mail.v1',
        // 'esi-mail.read_mail.v1',
        // 'esi-mail.send_mail.v1',
        // 'esi-skills.read_skills.v1',
        // 'esi-skills.read_skillqueue.v1',
        // 'esi-wallet.read_character_wallet.v1',
        // 'esi-search.search_structures.v1',
        // 'esi-clones.read_clones.v1',
        // 'esi-characters.read_contacts.v1',
        // 'esi-universe.read_structures.v1',
        // 'esi-bookmarks.read_character_bookmarks.v1',
        // 'esi-killmails.read_killmails.v1',
        // 'esi-corporations.read_corporation_membership.v1',
        // 'esi-assets.read_assets.v1',
        // 'esi-planets.manage_planets.v1',
        // 'esi-fleets.read_fleet.v1',
        // 'esi-fleets.write_fleet.v1',
        // 'esi-ui.write_waypoint.v1',
        // 'esi-characters.write_contacts.v1',
        // 'esi-fittings.read_fittings.v1',
        // 'esi-fittings.write_fittings.v1',
        // 'esi-markets.structure_markets.v1',
        // 'esi-corporations.read_structures.v1',
        // 'esi-characters.read_loyalty.v1',
        // 'esi-characters.read_opportunities.v1',
        // 'esi-characters.read_chat_channels.v1',
        // 'esi-characters.read_medals.v1',
        // 'esi-characters.read_standings.v1',
        // 'esi-characters.read_agents_research.v1',
        // 'esi-industry.read_character_jobs.v1',
        // 'esi-markets.read_character_orders.v1',
        // 'esi-characters.read_blueprints.v1',
        // 'esi-characters.read_corporation_roles.v1',
        // 'esi-location.read_online.v1',
        // 'esi-contracts.read_character_contracts.v1',
        // 'esi-clones.read_implants.v1',
        // 'esi-characters.read_fatigue.v1',
        // 'esi-killmails.read_corporation_killmails.v1',
        // 'esi-corporations.track_members.v1',
        // 'esi-wallet.read_corporation_wallets.v1',
        // 'esi-characters.read_notifications.v1',
        // 'esi-corporations.read_divisions.v1',
        // 'esi-corporations.read_contacts.v1',
        // 'esi-assets.read_corporation_assets.v1',
        // 'esi-corporations.read_titles.v1',
        // 'esi-corporations.read_blueprints.v1',
        // 'esi-bookmarks.read_corporation_bookmarks.v1',
        // 'esi-contracts.read_corporation_contracts.v1',
        // 'esi-corporations.read_standings.v1',
        // 'esi-corporations.read_starbases.v1',
        // 'esi-industry.read_corporation_jobs.v1',
        // 'esi-markets.read_corporation_orders.v1',
        // 'esi-corporations.read_container_logs.v1',
        // 'esi-industry.read_character_mining.v1',
        // 'esi-industry.read_corporation_mining.v1',
        // 'esi-planets.read_customs_offices.v1',
        // 'esi-corporations.read_facilities.v1',
        // 'esi-corporations.read_medals.v1',
        // 'esi-characters.read_titles.v1',
        // 'esi-alliances.read_contacts.v1',
        // 'esi-characters.read_fw_stats.v1',
        // 'esi-corporations.read_fw_stats.v1',
        // 'esi-characterstats.read.v1'
      ],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("New Login:", profile);
      var myProfile = profile;
      myProfile.refreshToken = refreshToken;
      done(null, myProfile);
    }
  )
);

app.use(
  require("express-session")({
    secret: "super secret cat key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/eveonline/error', function(req, res) {
  res.send('Error while logging into EVE Online SSO...')
})
app.get("/login", (req, res) => res.redirect("/auth/eveonline"));
app.get(
  "/auth/eveonline",
  passport.authenticate("eveonline-v2", { state: "1statehere" }),
  (req, res) => {}
);

app.get(
  "/callback",
  passport.authenticate("eveonline-v2", { failureRedirect: "/auth/eveonline/error" }),
  (req, res) => res.redirect("/profile")
);
 
app.get("/profile", (req, res) => {
  // req.session.refreshToken = req.user.refreshToken;
  // req.session.characterID = req.user.character_id;
  
  res.json(req.user)
})

var publicRoutes = require('./routes/public');
app.use('/public', publicRoutes);



// (req, res, next) {
//   if (req.user) {
//       next();
//   } else {
//       res.redirect('/login');
//   }
// }











// app.set('trust proxy', true);

var scoutinginc = app.listen(PORT);

exports.scoutinginc = scoutinginc;

