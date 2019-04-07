var Data = require('../models/data.js');

module.exports = {
    getAll: function(req, res) {
        console.log("Helllooo");
        Data.find({}, function(error, data) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {
                    message: "Session",
                    data: data
                };
                res.json(response);
            };
        });
    },

    update: function(req, res) {
        let id = req.body['id'];
        let update = req.body['update'];
        Data.findOneAndUpdate(id, update, function(error) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {
                    message: "Session"
                };
                res.json(response);
            };
        });
    },

    delete: function(req, res) {
        let id = req.body['id'];
        Data.findOneAndDelete(id, function(error) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {
                    message: "Success"
                };
                res.json(response);
            };
        });
    },

    create: function(req, res) {
        let data = new Data();
        let id = req.body['id'];
        let message = req.body['message'];

        let response = {
            message: "Failure"
        };
        if ((!id && id !==0) || !message) {
            response['content'] = "INVALID INPUTS";
            res.json(response);
        } else {
            data.message = message;
            data.id = id;
            data.save(function(error) {
                if (error) {
                    response['error'] = error;
                    res.json(response);
                } else {
                    response['message'] = "Success";
                    res.json(response);
                };
            });
        };
    }
}