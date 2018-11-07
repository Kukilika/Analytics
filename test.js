// Load required packages
var http = require('http');
var useragent = require('useragent');
var ip = require("ip");

useragent(true); // Enable useragent

http.createServer(function (req, res) {
    var pageStart = Date.now(); // Get current date before the page loads
    var agent = useragent.parse(req.headers['user-agent']); // Get user info

    var userBrowser = agent.family; // Get user browser
    var userOS = agent.os; // Get user OS version
    var userIP = ip.address(); // Get user IP address

    res.writeHead(200, {'Content-Type': 'text/html'});

    //Show user information
    res.write('User browser : ' + userBrowser);
    res.write('<br/>');
    res.write('User OS : ' + userOS);
    res.write('<br/>');
    res.write('IP : ' + userIP);
    res.write('<br/>');
    res.write('Page load time: ');
    var pageEnd = new Date(Date.now() - pageStart); // Get page load time
    res.write(pageEnd.getMilliseconds() + ' ms');
    res.end();

}).listen(8080);