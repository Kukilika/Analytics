/*jslint node: true */
'use strict';

const express = require('express');
const path = require('path');

const config = require('../../config');
const util = require('../util');
const userData = util.userData;

module.exports = (app) => {

    app.get('/', (req, res) => {
        userData.find(function (error, result) {
            res.render('home');
        });
    });

    // View charts
    app.get('/charts', (req, res) => {
        userData.find(function (error, result) {
            res.render('charts', {
                data: result
            });
        });
    });

    // View Data
    app.get('/data', function (req, res) {
        userData.find(function (error, result) {
            res.render('view_data', {
                data: result
            });
        });
    });

    // Get all db records
    app.get('/get', function (req, res) {
        userData.find(function (error, result) {
            res.send(result);
        });
    });

    app.get('/update', function (req, res) {

        var id = req.query.id;
        var browser = req.query.browser;

        if (!id || !browser) {
            res.json({ status: "NotOk" });
        } 
        else {
            userData.updateOne({
                "_id": id
            }, {
                $set: {
                    browserName: browser
                }
            }, function (error, result) {
                if (error) {
                    res.json({ status: "NotOk" });
                }
                else {
                    res.json({ status: "Ok" });
                }
            });
        }
    });

    app.get('/delete', function (req, res) {
        let id = req.query.id;
        let ok = 1;

        userData.deleteOne({
            _id: id
        }, err => {
            if(err) {
                res.json({ status: "NotOk" });
            }
            else {
                res.json({ status: "Ok" });
            }
        });
    });
};