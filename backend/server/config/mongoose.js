const mongoose = require('mongoose');

const dbRoute = "mongodb://root:co10gb89@jello-r2aaa.mongodb.net/test?retryWrites=true";

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