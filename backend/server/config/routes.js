const datas = require('../controllers/datas.js');

module.exports = function(app) {
    app.get('/db/v1/getData', function(req, res) {
        datas.getAll(req, res);
    });

    app.post('db/v1/updateData', function(req, res) {
        datas.update(req, res);
    });

    app.delete('/db/v1/deleteData', function(req, res) {
        datas.delete(req, res);
    });

    app.post('/db/v1/putData', function(req, res) {
        datas.create(req, res);
    });
}