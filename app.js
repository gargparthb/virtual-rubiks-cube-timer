const express = require('express');
const app = express();
const port = 3000;
const server = app.listen(port, () => console.log(`listening to port: ${port}`));

const Datastore = require('nedb');

app.use(express.static('public'));
app.use(express.json({
    limit: '1mb'
}));

app.get('/api', function (request, response) {
    console.log('requested')
    response.json({
        status: 'success'
    })
})