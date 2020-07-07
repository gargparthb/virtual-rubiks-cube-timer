// setting up express server
const express = require('express');
const app = express();
const port = 3000;
const api = require('./routes');

// starts listening
app.listen(port, () => console.log(`listening to port: ${port}`));

// allows json responses
app.use(
    express.json({
        limit: '1mb',
    })
);

// serves the static content
app.use('/', express.static(__dirname + '/public'));

// process the CRUD requests
app.use('/', api);