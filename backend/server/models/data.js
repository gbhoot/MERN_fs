const mongoose = require('../config/mongoose.js');

const DataSchema = new mongoose.Schema({
    id: {type: Number},
    message: {type: String}
}, {timestamps: true});

var Data = mongoose.model('Data', DataSchema);

module.exports = Data;