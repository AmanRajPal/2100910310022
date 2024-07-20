const http = require('http');
const host = 'localhost';
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req,res) =>{
    if(req.method == 'GET'){
        var fileurl;
        if(req.url == '/') fileurl = '/index.html';
        else fileurl = req.url;
          
        var filepath = path.resolve('./public'+fileurl);
        console.log(filepath);
        const filext = path.extname(filepath);
        console.log(filext);
        if(filext=='.html') {
            fs.exists(filepath,(exists)=>{
                if(!exists){
                    res.statusCode=404;
                    res.setHeader('Content-type','text/html');
                    res.end('<html><body><h1> file not found </h1><body><html>');
                    return;
                }
                res.statusCode=200;
                res.setHeader('Content-type','text/html');
                fs.createReadStream(filepath).pipe(res);
            })   
        }
        else{
        res.statusCode=404;
        res.setHeader('Content-type','text/html');
        res.end('<html><body><h1> error 404'+ fileurl +'</h1><body><html>');
        }

        
    }
    else{
    console.log(req);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1> not a GET request</h1></body></html');
    }
})
server.listen(port,host,() => {
    console.log(`server running at http://${host}:${port}`);
})