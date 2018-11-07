// Load required packages
var http = require('http');
var useragent = require('useragent');
var ip = require("ip");
var ipCountry = require('ip-country');

useragent(true); // Enable useragent

// Initiate the ipCountry module with custom options
ipCountry.init({
    fallbackCountry: 'Not found',
    exposeInfo: false
});

http.createServer(function (req, res) {
    var pageStart = Date.now(); // Get current date before the page loads
    var agent = useragent.parse(req.headers['user-agent']); // Get user info

    var userBrowser = agent.family; // Get user browser
    var userOS = agent.os; // Get user OS version
    var userIP = ip.address(); // Get user IP address
    var userCountry = ipCountry.country(userIP); // Get user country

    res.writeHead(200, {'Content-Type': 'text/html'});

    //Show user information
    res.write('<body bgcolor="#161616" style="font-family: Tahoma, Arial, Helvetica, Sans-Serif; font-size: 8pt; color: white; padding: 5pt; text-align: center">');
    res.write('Browser : ' + userBrowser);
    res.write('<br/><br/>');
    res.write('OS : ' + userOS);
    res.write('<br/><br/>');
    res.write('Country : ' + userCountry);
    res.write('<br/><br/>');
    res.write('IP : ' + userIP);
    res.write('<br/><br/>');
    res.write('Page load time : ');
    var pageEnd = new Date(Date.now() - pageStart); // Get page load time
    res.write(pageEnd.getMilliseconds() + ' ms');
    res.write('</body>')
    res.end();

}).listen(8080);