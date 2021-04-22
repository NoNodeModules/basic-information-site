// import the modules that we need
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const PORT = 8080;


http.createServer((req, res) => {
    const filePath = path.join(
        __dirname,
        'public', 
        req.url === '/' ? 'index.html' : req.url)

    let contentType = 'text/html';

    const extName = path.extname(filePath);
    
    if(extName === '.css'){
        contentType = 'text/css';
    }

    fs.readFile(filePath, (error, data) => {
    
        if(error) {
            res.writeHead(404, {"Content-Tupe":"text/html"});
            return res.end('<h1>404 - Not Found</h1>');
        } else {
            res.writeHead(200, {"Content-Type":contentType})
            res.end(data);
        }
    });

}).listen(PORT, 
    () => console.log('Server running on port ' + PORT));