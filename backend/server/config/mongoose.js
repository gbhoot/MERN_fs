const mongoose = require('mongoose');

const dbRoute = "mongodb://jelo:a9bc839993@ds151382.mlab.com:51382/jelotest";

mongoose.connect(
    dbRoute,
    {useNewUrlParser: true}
);

let db = mongoose.connection;

db.once('open', () => {
    console.log("Connected to the database");
});

// Check if connection with the database is successful
db.on('error', () => {
    console.error.bind(console, "MonngoDB connection error");
});

module.exports = mongoose;