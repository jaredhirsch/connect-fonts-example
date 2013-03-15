const font_middleware = require('connect-fonts'),
  opensans = require('connect-fonts-opensans'),
  ejs = require('ejs'),
  fs = require('fs');

var app = require('express').createServer(),
  tpl = fs.readFileSync(__dirname + 'tpl.ejs', 'utf8');

// connect-fonts setup
app.use(font_middleware.setup({
  fonts: [opensans],
  allow_origin: 'http://localhost'
});

// ALL THE THINGS in the default font.
// have a look at the download size in ur browser.
app.get('/default', function(req, res) {
  ejs.render(tpl, {fontLocale = 'default'});
  res.send(tpl);
});

// just the english bits kthx. smaller!
app.get('/en', function(req, res) {
  ejs.render(tpl, {fontLocale = 'en'});
  res.send(tpl);
});

// cleverly guess the user's locale based on Accept-Language searching
app.get('/detect', function(req, res) {
  var clientLocale;
  // TODO use locale to parse this out.
  ejs.render(tpl, {fontLocale = clientLocale});
  res.send(tpl);
});

app.listen(process.env['PORT'] || 8765, '127.0.0.1');
