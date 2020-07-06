// setting up express server
const express = require('express');
const app = express();
const port = 3000;
const api = require('./routes');

// starts listening
app.listen(port, () => console.log(`listening to port: ${port}`));

// serving the public
app.use(express.json({
    limit: '1mb'
}));

app.use('/', express.static(__dirname + '/public'));

app.use('/', api);