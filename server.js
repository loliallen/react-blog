const port = process.env.PORT || 8080

const express = require('express');
const http = require('http');

const app = express();
require('./database')();


app.use(express.static(__dirname + '/public'))

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server listening port* ${port}`)
})