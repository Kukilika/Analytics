/*jslint node: true */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1/mydatabase', {
    useNewUrlParser: true
});
mongoose.connection.on("error", console.log);

const userDataScheme = new Schema({
    timeOpened: String,
    timeZone: String,
    pageon: String,
    referrer: String,
    previousSites: String,
    browserName: String,
    browserEngine: String,
    browserVersion1a: String,
    browserVersion1b: String,
    browserLanguage: String,
    browserOnline: String,
    browserPlatform: String,
    javaEnabled: String,
    dataCookiesEnabled: String,
    sizeScreenW: Number,
    sizeScreenH: Number,
    sizeDocW: Number,
    sizeDocH: Number,
    sizeInW: Number,
    sizeInH: Number,
    sizeAvailW: Number,
    sizeAvailH: Number,
    scrColorDepth: String,
    scrPixelDepth: String,
});

const userData = mongoose.model('UserData', userDataScheme);

module.exports.userData = userData;