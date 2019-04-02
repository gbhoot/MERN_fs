var Data = require('../models/data.js');

module.exports = {
    getData: function(req, res) {
        Data.find({}, function(error, data) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {
                    success: true,
                    data: data
                };
                res.json(response):
            };
        });
    },

    updateData: function(req, res) {
        
    }
}