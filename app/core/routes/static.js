/*jslint node: true */
'use strict';

const express = require('express');
const path = require('path');

const config = require('../../config');

module.exports = (app) => {
    app.use('/share', express.static(config.staticPath));

    app.get('/test', (req, res) => {
        res.sendFile(config.staticPath + '/test.html');
    });

    app.get('/collect.js', (req, res) => {
        res.sendFile(config.staticPath + '/collect.js');
    });
};