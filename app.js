// app.js
const
ejs = require('ejs'),
express = require('express'),
fs = require('fs'),
// add requires:
connect_fonts = require('connect-fonts'),
opensans = require('connect-fonts-opensans');

var app = express.createServer(),
  tpl = fs.readFileSync(__dirname + '/tpl.ejs', 'utf8');

// add this app.use call:
app.use(connect_fonts.setup({
  fonts: [opensans],
  allow_origin: 'http://localhost:8765'
}));

app.get('/time', function(req, res) {
  var output = ejs.render(tpl, {
    // pass the user's locale to the template
    userLocale: detectLocale(req),
    currentTime: new Date()
  });
  res.send(output);
});

// oversimplified locale detection
function detectLocale(req) {
  return req.headers['accept-language'].slice(0,2);
}

app.listen(8765, '127.0.0.1');
