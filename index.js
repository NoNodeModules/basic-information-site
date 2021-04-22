// import the modules that we need
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const PORT = 8080;


http.createServer((req, res) => {
    // get the file path based on the requested URL
    const filePath = path.join(
        __dirname,
        'public', 
        req.url === '/' ? 'index.html' : req.url)

    // initialize content type
    let contentType = 'text/html';

    // get the requested file's extension name
    const extName = path.extname(filePath);

    // if the extension name is .css, set the content type to css
    if(extName === '.css'){
        contentType = 'text/css';
    }

    // read the file given the file path
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