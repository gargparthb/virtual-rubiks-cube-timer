// gets the server pkg
const express = require('express');
// allows the add routes
const router = express.Router();
const database = require('./database').data;

// get request send all possible matches
router.get('/api/:username/:pin', function (request, response) {
    console.log('data requested');

    const _username = request.params.username;
    const _pin = request.params.pin;

    database.find({
        username: _username,
        pin: _pin
    }, function (error, docs) {
        if (error) {
            response.json({
                status: 'failed'
            });
            throw error;
        } else {
            response.json({
                status: 'success',
                users: docs
            });
        }
    });
});

router.get('/api/:id', function (request, response) {
    const userID = request.params.id;

    database.find({
        _id: userID
    }, function (error, docs) {
        if (error) {
            response.json({
                status: 'failed'
            });
            throw error;
        } else {
            response.json({
                status: 'success',
                users: docs
            });
        }
    });
});

router.post('/api', function (request, response) {

    const newDoc = {
        username: request.body.username,
        pin: request.body.pin,
        x2times: request.body.x2times,
        x3times: request.body.x3times,
        x4times: request.body.x4times,
        x5times: request.body.x5times
    };

    database.insert(newDoc, function (error, newDoc) {
        if (error) {
            response.json({
                status: 'failed'
            });
        } else {
            response.json({
                status: 'success',
                user: newDoc
            });
        }
    });
});

router.put('/api', function (request, response) {
    const userID = request.body.id;
    const _time = request.body.time;
    const _order = request.body.order;

    database.update({
        _id: userID
    }, {
        $push: updater()
    }, {}, function (err, numAffected) {
        if (err) {
            response.json({
                status: 'failed',
            });
        } else {
            response.json({
                status: 'success',
                updatedEntries: numAffected
            });
        }
    });

    database.persistence.compactDatafile();

    function updater() {
        switch (_order) {
            case 2:
                return {
                    x2times: _time
                };
                break;
            case 3:
                return {
                    x3times: _time
                };
                break;
            case 4:
                return {
                    x4times: _time
                };
                break;
            case 5:
                return {
                    x5times: _time
                };
                break;
        }
    }
});

router.delete('/api', function (request, response) {
    const userID = request.body.id;

    database.remove({
        _id: userID
    }, {}, function (err, numRemoved) {
        if (err) {
            response.json({
                status: 'failed',
            });
        } else {
            response.json({
                status: 'success',
                deletedEntries: numRemoved
            });
        }
    });
    database.persistence.compactDatafile();
});

module.exports = router;