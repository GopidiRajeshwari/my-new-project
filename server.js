const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3002;


const server = http.createServer((req, res) => {
    let filePath = './public' + req.url;

    if (req.url === '/') {
        filePath = './public/index.html';
    } else if (req.url === '/about') {
        filePath = './public/about.html';
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';

    if (extname === '.js') {
        contentType = 'text/javascript';
    } else if (extname === '.css') {
        contentType = 'text/css';
    } else if (extname === '.json') {
        contentType = 'application/json';
    } else if (extname === '.png') {
        contentType = 'image/png';
    } else if (extname === '.jpg') {
        contentType = 'image/jpg';
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>', 'utf-8');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
