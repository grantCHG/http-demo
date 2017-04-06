var url = require('url');
var fs = require('fs');

function serverControl(request, response) {
    var pathname = url.parse(request.url).pathname;
    
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