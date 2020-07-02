const express = require('express');
const app = express();
const port = 3000;
const server = app.listen(port, listening);

app.use(express.static('public'))

function listening() {
    console.log(`listening to port: ${port}`)
}