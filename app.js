const
ejs = require('ejs'),
express = require('express'),
fs = require('fs'),
// note! we set the port via env var
port = process.env['PORT'] || 8765,
font_middleware = require('connect-fonts'),
opensans = require('connect-fonts-opensans');

var app = express.createServer(),
  tpl = fs.readFileSync(__dirname + '/tpl.ejs', 'utf8');

// connect-fonts setup.
//
// allow_origin sets an 'Access-Control-Allow-Origin' header,
// required by Firefox to serve fonts cross-domain.
app.use(font_middleware.setup({
  fonts: [opensans],
  allow_origin: 'http://localhost:' + port
}));

// this endpoint serves up the whole default font.
// have a look at the download size in your browser.
app.get('/default', function(req, res) {
  var rendered = ejs.render(tpl, {fontLocale: 'default'});
  res.send(rendered);
});

// here, just the english bits. much smaller!
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
  // for instance, see https://github.com/mozilla/i18n-abide/blob/648dec4e203fbe93ea99cb7718b5106be9a30c82/lib/i18n.js#L188
  // hard-coding to keep the example simple.
  return 'en';
}

app.listen(port, '127.0.0.1');
console.log('connect-fonts-example now running on 127.0.0.1, port ' + port);
