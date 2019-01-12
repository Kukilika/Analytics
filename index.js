/*jslint node: true */
'use strict';

const config = require('./app/config');
const app = require('express')();
require('./app/core/express')(app);

app.listen(config.port, () => {
    console.log(`listening on ${config.port}`);
});