const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://127.0.0.1/mydatabase', { useNewUrlParser: true });
var Schema = mongoose.Schema;

const db = mongoose.connection;
db.on("Database error!",console.log);

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

// Get all db entries
app.get('/get', function (req, res) {
    mongoose.model('Example').find(function(error,example){
        res.send(example);
    })
});

// Update a specific entry in db
/*

Usage : localhost:8080/update?id=ObjectId&browser=BrowserName
Where :

ObjectId -> Row unique id
BrowserName -> The name of the browser

*/
app.get('/update', function (req, res) {

    var id = req.query.id;
    var browser = req.query.browser;

    if(id == null || Object.keys(id).length === 0) {
        console.log('Invalid id');
    } else if(browser == null || Object.keys(browser).length === 0) {
        console.log('Invalid browser name!');
    } else {
        mongoose.model('Example').update({"_id": id}, {$set: { browserName: browser} },function(error,result){
            if(error === null) 
                console.log('Obj has been updated');
            else
                console.log("Update failed!");
        })
    }

    res.end(); // End execution

});


app.get('/delete',function(req,res){
    let id = req.query.id;
    
    example.findById(id, function(error,object){
        if(error){
            console.log(error);
        }else{
            example.deleteOne({_id:id},function(error){
                console.log(error);
            })
        }
    })

    res.send("Done!");
})

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, "share/test.html"));
})

app.get('/collect.js', (req, res) => {
    res.sendFile(path.join(__dirname, "share/collect.js"));
})

app.post('/collect', (req, res) => {
    let newObj = new example;
    newObj = Object.assign(newObj, req.body);
    Object.keys(newObj).forEach(key =>{
        if(!newObj[key]){
            delete(newObj[key]);
        }
    })
    newObj.save(function(error,data){
        console.log("New object saved!")
        if(error){
            console.log(error);
        }
    })
    res.json({status:"Ok"});
})

app.listen(process.env.PORT || 8080);