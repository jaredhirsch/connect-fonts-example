const
ejs = require('ejs'),
express = require('express'),
fs = require('fs'),
port = process.env['PORT'] || 8765,
font_middleware = require('connect-fonts'),
opensans = require('connect-fonts-opensans');

var app = express.createServer(),
  tpl = fs.readFileSync(__dirname + '/tpl.ejs', 'utf8');

// connect-fonts setup.
// allow_origin is used to add an 'Access-Control-Allow-Origin' header,
// required by FF to serve fonts cross-domain
app.use(font_middleware.setup({
  fonts: [opensans],
  allow_origin: 'http://localhost:' + port
}));

// this endpoint serves up ALL THE THINGS: the default font.
// have a look at the download size in ur browser.
app.get('/default', function(req, res) {
  var rendered = ejs.render(tpl, {fontLocale: 'default'});
  res.send(rendered);
});

// here, just the english bits.
// compare in ur dev tools. much smaller!
app.get('/en', function(req, res) {
  var rendered = ejs.render(tpl, {fontLocale: 'en'});
  res.send(rendered);
});

// this is how you'd do it in real life:
// guess the user's locale based on parsing the 'Accept-Language' header.
// Persona uses the i18n-abide library for this. YMMV.
app.get('/detect', function(req, res) {
  var clientLocale = somehowGetLocale();
  var rendered = ejs.render(tpl, {fontLocale: clientLocale});
  res.send(rendered);
});

function somehowGetLocale() {
  // in real life, use 'i18n-abide' or 'locale' to get this info.
  // hard-coding to keep the example simple. /me ducks...
  return 'en';
}

app.listen(port, '127.0.0.1');
