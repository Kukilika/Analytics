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

        if (id == null || Object.keys(id).length === 0) { // Check if giver parameters are valid
            console.log('Invalid id');
            //res.json({status:"NotOk"});
        } else if (browser == null || Object.keys(browser).length === 0) {
            console.log('Invalid browser name!');
            //res.json({status:"NotOk"});
        } else {
            userData.findById(id, function (error, result) { // Check if record exists
                if (error) {
                    console.log(error);
                    // res.json({status:"NotOk"});
                } else {
                    userData.updateOne({
                        "_id": id
                    }, {
                        $set: {
                            browserName: browser
                        }
                    }, function (error, result) { // Update the record
                        if (error)
                            console.log(error);
                        // res.json({status:"NotOk"});
                    })
                }
            })
        }

        console.log('Obj has been updated');
        res.json({
            status: "Ok"
        });

    });

    app.get('/delete', function (req, res) {
        let id = req.query.id;
        let ok = 1;

        userData.findById(id, function (error, object) { // Check if record exists
            if (error) {
                ok = 0;
                res.json({
                    status: "NotOk"
                });
                //console.log(error);
            } else {
                userData.deleteOne({
                    _id: id
                }, function (error) { // Delete the record from db
                    if (error)
                        if (ok == 1) {
                            ok = 0;
                            res.json({
                                status: "Ok"
                            });
                        }
                    //console.log(error);
                })
            }
        })
        if (ok == 1) {
            res.json({
                status: "Ok"
            });
            //console.log('Obj has been deleted');
        }
        //res.end();
        res.json({
            status: "Ok"
        });
    });
};