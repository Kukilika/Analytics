/*jslint node: true */
'use strict';

const path = require('path');

module.exports = {
    port: 8080,
    staticPath: path.join(__dirname, '../../share'),
    viewsPath: path.join(__dirname, '../views')
};