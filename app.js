// setting up express server
const express = require('express');
const app = express();
const port = 3000;

// starts listening
app.listen(port, () => console.log(`listening to port: ${port}`));

// imports data base
const db = require('./database');

app.use(express.static('public'));
app.use(express.json({
    limit: '1mb'
}));