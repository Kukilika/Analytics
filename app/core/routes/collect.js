/*jslint node: true */
'use strict';

const express = require('express');
const path = require('path');

const config = require('../../config');
const util = require('../util');
const userData = util.userData;

module.exports = (app) => {
    app.post('/collect', (req, res) => {

        let newExample = new userData;
        newExample = Object.assign(newExample, req.body); // Create the object

        Object.keys(newExample).forEach(key => { // Check for invalid fields
            if (!newExample[key]) {
                delete(newExample[key]);
            }
        })

        newExample.save(function (error, data) { // Add record in db
            console.log("New object saved!")
            if (error) {
                res.json({
                    status: "NotOk"
                });
                console.log(error);
            } else {
                res.json({
                    status: "Ok"
                });
            }
        });
    });
};