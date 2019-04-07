const express = require('express'),
    path = require('path');
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    API_PORT = 3001;
var cors = require('cors');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));

require('./server/config/routes.js')(app);

app.listen(API_PORT, () => {
    console.log('LISTENING ON PORT '+ API_PORT);
});

