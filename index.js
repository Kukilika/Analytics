const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
var request = require('request');
const fetch = require('node-fetch');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Database connection
mongoose.connect('mongodb://127.0.0.1/mydatabase', { useNewUrlParser: true });
const db = mongoose.connection;
db.on("Database error!",console.log);

var Schema = mongoose.Schema;

var exemplu = new Schema ({ 
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

var example = mongoose.model('Example', exemplu);


// Get all db records
app.get('/get', function (req, res) {
    example.find(function(error,result){
        res.send(result);
        //console.log(result.length);
        });
});

// module.exports = {
//     getTest:function(){
//         let returnValue = 1;
//         fetch("http://localhost:8080/get")
//         .then(res=>res.json())
//         .then(function(r){
//             returnValue = r.length;
//             console.log(r.length);
//         })
//         return returnValue;
//     }
// }

function getTest(){
    return new Promise((resolve, reject) => {
        fetch("http://localhost:8080/get")
        .then(res=>res.json())
        .then(function(r){
            resolve(r.length)
            console.log(r.length);
        })
        .catch(error => {
            reject(error);
        }) 
    })
}

module.exports.getTest = getTest;

// Update record in db
app.get('/update', function (req, res) {

    var id = req.query.id;
    var browser = req.query.browser;

    if(id == null || Object.keys(id).length === 0) { // Check if giver parameters are valid
        console.log('Invalid id');
    } else if(browser == null || Object.keys(browser).length === 0) {
        console.log('Invalid browser name!');
    } else {
        example.findById(id, function(error,result){ // Check if record exists
            if(error){
                console.log(error);
            } else {
                example.updateOne({"_id": id}, {$set: { browserName: browser} },function(error,result){ // Update the record
                    if(error) 
                       console.log(error);
                })
            }
        })
    }

    console.log('Obj has been updated');
    res.end();

});

// Delete record from db
app.get('/delete',function(req,res){
    let id = req.query.id;
    
    example.findById(id, function(error,object){ // Check if record exists
        if(error){
            console.log(error);
        }else{
            example.deleteOne({_id:id},function(error){ // Delete the record from db
                if(error)
                   console.log(error);
            })
        }
    })

    console.log('Obj has been deleted');
    res.end();

})

// Insert record in db
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, "share/test.html"));
})

app.get('/collect.js', (req, res) => {
    res.sendFile(path.join(__dirname, "share/collect.js"));
})

// Collect endpoint
app.post('/collect', (req, res) => {

    let newExample = new example;
    newExample = Object.assign(newExample, req.body); // Create the object

    Object.keys(newExample).forEach(key =>{ // Check for invalid fields
        if(!newExample[key]){
            delete(newExample[key]);
        }
    })

    newExample.save(function(error,data){ // Add record in db
        console.log("New object saved!")
        if(error){
            console.log(error);
        }
    })

    res.json({status:"Ok"});
})

app.listen(process.env.PORT || 8080); // Start process on port 8080