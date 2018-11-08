// Load required packages
var http = require('http');
var express = require('express');
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

    var referer = req.headers.referer // Get HTTP referer
    var userBrowser = agent.family; // Get user browser
    var userOS = agent.os; // Get user OS version
    var userIP = ip.address(); // Get user IP address
    var userCountry = ipCountry.country(userIP); // Get user country
    var userDevice = agent.device // Get user device

    res.writeHead(200, {'Content-Type': 'text/html'});

    // Head
    res.write('<!DOCTYPE html><html><head><link rel="stylesheet" href="/static/style.css"><title>Test Analytics Page</title>');

    // Temporary stylesheet
    res.write('<style>body { background-color: #161616; font-family: Tahoma, Arial, Helvetica, Sans-Serif; font-size: 8pt; color: white; padding: 5pt; text-align: center; }');
    res.write('a:link, a:visited, a:active { color: #ffffff; text-decoration: none; } a:hover { color: #c0c0c0; text-decoration: none; }</style>');
    res.write('</head>');

    // Show user information
    // Body
    res.write('<body>');
    res.write('Device : ' + userDevice);
    res.write('<br/><br/>');
    res.write('Browser : ' + userBrowser);
    res.write('<br/><br/>');
    res.write('OS : ' + userOS);
    res.write('<br/><br/>');
    res.write('Country : ' + userCountry);
    res.write('<br/><br/>');
    res.write('IP : ' + userIP);
    res.write('<br/><br/>');
    res.write('URL origin : ' + referer);
    res.write('<br/><br/>');
    res.write('Page load time : ');
    var pageEnd = new Date(Date.now() - pageStart); // Get page load time
    res.write(pageEnd.getMilliseconds() + ' ms');

    res.write('<br/><br/>');
    res.write('<a href="http://localhost:8080"><b>- HTTP referer test -</b></a>'); // Test HTTP referer header

    res.write('</body>');
    res.end();

}).listen(8080);