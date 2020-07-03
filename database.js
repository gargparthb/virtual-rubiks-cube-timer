// loads the database
const Datastore = require('nedb');

let db = new Datastore({
    filename: 'users.db',
    autoload: true
});

module.exports = {
    data: db
};