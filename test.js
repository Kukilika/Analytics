var http = require('http');
var useragent = require('useragent');
var ip = require("ip");
useragent(true);

http.createServer(function (req, res) {
    var pageStart = Date.now(); // Get current date before the page loads
    var agent = useragent.parse(req.headers['user-agent']); // Get user info

    var browser = agent.family; // Get user browser
    var os = agent.os; // Get user OS version
    var hostIP = ip.address(); // Get user Ip address

    res.writeHead(200, {'Content-Type': 'text/html'});

    //Show user information
    res.write('User browser : ' + browser);
    res.write('<br/>');
    res.write('User OS : ' + os);
    res.write('<br/>');
    res.write('IP : ' + hostIP);
    res.write('<br/>');
    res.write('Page load time: ');
    var pageEnd = new Date(Date.now() - pageStart); // Get page load time
    res.write(pageEnd.getMilliseconds() + ' ms');
    res.end();

}).listen(8080);