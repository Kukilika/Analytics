var http = require('http');
var uc = require('upper-case');
var useragent = require('useragent');
var ip = require("ip");
useragent(true);

http.createServer(function (req, res) {
    var agent = useragent.parse(req.headers['user-agent']);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(ip.address());
    res.end();
}).listen(8080);