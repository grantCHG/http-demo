var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require("./mine").types;
var serverControl = require('./server/index');
var PORT = 3000;
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = __dirname + '/client' + pathname;
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';

    console.log(realPath);
    //访问静态资源
    fs.exists(realPath, function (err) {
        // if(request.headers['if-none-match'] == "abcd"){//设置了Etag，request就会自动加上if-none-match
        if(request.headers['if-modified-since'] == new Date("2017-4-7").getTime()){
            console.log(request.headers['if-modified-since'] == new Date("2017-4-7").getTime());
        response.writeHead(304);
        response.end();
        return;
    }
        if (!err) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.end();
        } else {
            fs.readFile(realPath, function (err, data) {
                if (err) {
                    response.end("<h1>500</h1>服务器内部错误！");
                } else {
                    var contentType = mime[ext] || "text/plain";
                    response.writeHead(200, {
                        'content-type': contentType,
                        // 'Expires': new Date("2017-5-1"),
                        'Cache-Control': 'max-age=10',
                        // 'Etag':'abcd',
                        'Last-Modified':new Date("2017-4-7").getTime()
                    });
                    response.write(data, "binary");
                    response.end();

                }
            }); //fs.readfile
        }
    });
    //接口
    serverControl(request, response);
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");