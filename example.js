const connectFonts = require('connect-fonts');

var app = require('express').createServer(),
  tpl = '<!doctype html><title>fonty mcgoodtimes at ur srvc.</title><p>eye arr a fonted one.</p>';

// ALL THE THINGS in the default font
app.get('/default', function(req, res) {
  res.send(tpl);
});

// latinates assembled, nobody mentioned the germanics, they're here too
app.get('/latin', function(req, res) {
  res.send(tpl);
});

// Just the english bits kthx
app.get('/en', function(req, res) {
  res.send(tpl);
});

app.listen(process.env['PORT'] || 8765, '127.0.0.1');
