// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// endpoint - /api/whoami
app.get('/api/whoami', function (req, res) {
  let remoteAddress = req.socket.remoteAddress;
  // Check if the remote address is IPv4
  if (remoteAddress.includes(':')) {
    // Remove the IPv6 prefix
    remoteAddress = remoteAddress.substring(7);
  }
  res.json({
    ipaddress: remoteAddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent'],
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
