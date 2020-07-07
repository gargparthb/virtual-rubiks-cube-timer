// loads the database
const Datastore = require('nedb');

// set the file
let db = new Datastore({
    filename: 'users.db',
    autoload: true
});

module.exports = {
    data: db
};