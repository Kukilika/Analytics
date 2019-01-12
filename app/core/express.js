/*jslint node: true */
'use strict';

const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const config = require('../config');
const util = require('./util');
const userData = util.userData;

module.exports = (app) => {
    app.set('view engine', 'ejs');
    app.set('views', config.viewsPath);

    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use('*', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    require('./routes/static')(app);
    require('./routes/collect')(app);
    require('./routes/interface')(app);
};