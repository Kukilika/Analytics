const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


mongoose.connect('mongodb://127.0.0.1/mydatabase');
var Schema = mongoose.Schema;

const db = mongoose.connection;
db.on("error",console.log);

var exemplu = new Schema ({ 
    _id: Number,
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

// example.remove({},()=>{
//    // var m = new example;
//     // m.save(function(error){
//     //     console.log("your m have been saved");
//     //     if(error){
//     //         console.log(error);
//     //     }
//     // })
// } );


//insert an object to db
app.post('/create', function(req, res) {
    
});


//read
app.get('/get', function (req, res) {
    mongoose.model('Example').find(function(error,example){
        res.send(example);
    })
});

app.get('/test', (req, res) => {
    res.sendfile(path.join(__dirname, "share/test.html"));
})


app.get('/collect.js', (req, res) => {
    res.sendfile(path.join(__dirname, "share/collect.js"));
})


app.post('/collect', (req, res) => {
    let newObj = new example;
    newObj._id = 1;
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