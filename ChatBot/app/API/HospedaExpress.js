const express = require('express');
const http = require('http');
const app = express();

const port = process.env.PORT || 7000;
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(port, function () {
    console.log('O app está rodando ' + port);
  });

exports.app = app;