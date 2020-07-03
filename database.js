// loads the database
const Datastore = require('nedb');

let db = new Datastore({
    filename: 'user.db',
    autoload: true
});

module.exports = {
    data: db
};