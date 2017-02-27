const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
const io = require('socket.io')(https);
const app = require('./app');
const port = process.env.PORT || 3000;


// const port = process.env.PORT;
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
dotenv.load();


// const app = express();
const whitelist = ['http://example1.com', 'http://example2.com'];

const corsOptionsDelegate = (req, callback) => {

    var corsOptions;

    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }

    callback(null, corsOptions); // callback expects two parameters: error and options

};

app.get('/', cors(corsOptionsDelegate), (req, res, next) => {
    res.json({ msg: 'This is CORS-enabled for a whitelisted domain.' });
});

const server = https.createServer(options, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!!!');
});

io.on('connection', function(socket) {
    socket.on('event', function(data) {});
    socket.on('disconnect', function() {});
    console.log('a user connected');
});

server.listen(port, (err) => {

    if (err) {
        throw err;
    }

    console.log(`server is listening on ${port}...`);
});
