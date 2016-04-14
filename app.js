var express = require('express');
var app = express();

app.use(express.static('./'))
app.use(express.static('./public'))

var port = process.env.PORT || 1337;
app.listen(port, function(){ console.log("Listening on port " + port)})
