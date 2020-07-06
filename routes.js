// gets the server pkg
const express = require('express');
// allows the add routes
const router = express.Router();
const database = require('./database').data;

router.get('/api/:name/:password', function (request, response) {
    const username = request.params.name;
    const password = request.params.password;

    database.find({ username: username, password: password }, function (
        error,
        docs
    ) {
        if (!error) {
            response.send({
                status: 'success',
                users: docs,
            });
        } else {
            response.send({
                status: 'failed',
            });
        }
    });
});

router.get('api/:id', function (request, response) {
    const id = request.params.id;

    database.find({ _id: id }, function (error, docs) {
        if (!error) {
            response.send({
                status: 'success',
                users: docs,
            });
        } else {
            response.send({
                status: 'failed',
            });
        }
    });
});

router.post('/api', function (request, response) {
    const username = request.body.username;
    const password = request.body.password;

    const newDoc = {
        username: username,
        password: password,
        x2times: [],
        x3times: [],
        x4times: [],
        x5times: [],
    };

    database.insert(newDoc, function (err, doc) {
        if (!err) {
            response.json({
                status: 'success',
                added: doc,
            });
        } else {
            response.json({
                status: 'failed',
            });
        }
    });

    database.persistence.compactDatafile();
});

router.put('/api', function (request, response) {
    const time = request.body.time;
    const order = request.body.order;
    const id = request.body.id;

    database.update(
        { _id: id },
        { $push: getUpdaterObj(time, order) },
        { returnUpdatedDocs: true },
        function (err, numAffected, affectedDocs) {
            if (!err) {
                response.json({
                    status: 'success',
                    numAffected: numAffected,
                    affected: affectedDocs,
                });
            } else {
                response.json({
                    status: 'failed',
                });
            }
        }
    );

    function getUpdaterObj(result, order) {
        switch (order) {
            case 2:
                return { x2times: result };
                break;
            case 3:
                return { x3times: result };
                break;
            case 4:
                return { x4times: result };
                break;
            case 5:
                return { x5times: result };
                break;
        }
    }

    database.persistence.compactDatafile();
});

router.delete('/api', function (request, response) {
    const id = request.body.id;

    database.remove({ _id: id }, {}, function (err, numRemoved) {
        if (!err) {
            response.json({
                status: 'success',
                numRemoved: numRemoved,
            });
        } else {
            response.json({
                status: 'failed',
            });
        }
    });

    database.persistence.compactDatafile();
});

module.exports = { router };
