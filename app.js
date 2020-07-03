// setting up express server
const express = require('express');
const app = express();
const port = 3000;
const api = require('./routes');

// starts listening
app.listen(port, () => console.log(`listening to port: ${port}`));

app.use(express.static('public'));
app.use(express.json({
    limit: '1mb'
}));

app.use('/', api);