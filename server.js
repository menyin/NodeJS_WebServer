/**
 * Created by CNY on 2016/7/14.
 */
var http = require('http');
var server = http.createServer();
server.listen('8080', 'localhost');
server.on('listening', function () {
    console.log('listening...')
});
server.on('error',function(e) {
    console.log('excepti' +
        'on：' +
        e.message)
});
var url = require('url');
var fs = require('fs');
server.on('request', function (req,resp) {
    console.log('有客户端请求了...');
    console.log(req.method);

    var urlObj = url.parse(req.url);
    sendClientData(urlObj.pathname, resp);
});

function sendClientData(sPath,resp){
    sPath=sPath=='/'?'/index.html':sPath;
    var sDir = __dirname + '/html' + sPath;
    fs.readFile(sDir,function(e,data){
        if (e) {
            resp.writeHead(404,'Not find',{'content-type':'text/html'});
            var sDirError=__dirname+'/html/error.html';
            fs.readFile(sDirError, function (eError, errorData) {
                resp.end(errorData);
            });
        }else {
            resp.writeHead(200,'ok',{'content-type':'text/html'});
            resp.end(data);
        }

    });
}

console.log()

