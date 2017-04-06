var url = require('url');
var fs = require('fs');

function serverControl(request, response) {
    var pathname = url.parse(request.url).pathname;
    fs.exists(pathname, function(err) {
            if (!err) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
            } else {
                fs.readFile(filePath, function(err, data) {
                    if (err) {
                        res.end("<h1>500</h1>服务器内部错误！");
                    } else {
                        res.writeHead(200, {
                            'content-type': contentType
                        });
                        res.end(data.toString());
                    }
                }); //fs.readfile
            }
        });
        //getList接口
    if (pathname.indexOf("getList") != -1) {
        var data = fs.readFileSync("./data/list.json", "utf-8");
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        // response.write();
        response.end(data);
    } else {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
    }
}
module.exports = serverControl;