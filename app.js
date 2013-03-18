// app.js
const
ejs = require('ejs'),
express = require('express'),
fs = require('fs');

var app = express.createServer(),
  tpl = fs.readFileSync(__dirname + '/tpl.ejs', 'utf8');

app.get('/time', function(req, res) {
  var output = ejs.render(tpl, {
    currentTime: new Date()
  });
  res.send(output);
});

app.listen(8765, '127.0.0.1');
