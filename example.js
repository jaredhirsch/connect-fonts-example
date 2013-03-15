const font_middleware = require('connect-fonts'),
  opensans = require('connect-fonts-opensans'),
  ejs = require('ejs'),
  fs = require('fs'),
  port = process.env['PORT'] || 8765;

var app = require('express').createServer(),
  tpl = fs.readFileSync(__dirname + '/tpl.ejs', 'utf8');

// connect-fonts setup
app.use(font_middleware.setup({
  fonts: [opensans],
  allow_origin: 'http://localhost:' + port
}));

// ALL THE THINGS in the default font.
// have a look at the download size in ur browser.
app.get('/default', function(req, res) {
  var rendered = ejs.render(tpl, {fontLocale: 'default'});
  res.send(rendered);
});

// just the english bits kthx. smaller!
app.get('/en', function(req, res) {
  var rendered = ejs.render(tpl, {fontLocale: 'en'});
  res.send(rendered);
});

// cleverly guess the user's locale based on Accept-Language searching
app.get('/detect', function(req, res) {
  // TODO use locale to parse this out.
  var clientLocale;
  var rendered = ejs.render(tpl, {fontLocale: clientLocale});
  res.send(rendered);
});

app.listen(port, '127.0.0.1');
