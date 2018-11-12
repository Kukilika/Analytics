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
    id: Number,
    name: String,
    prename: String,
    phoneNumber: String,
    steph: Boolean
});

var example = mongoose.model('Example', exemplu);

example.remove({},()=>{
   // var m = new example;

    // m.save(function(error){
    //     console.log("your m have been saved");
    //     if(error){
    //         console.log(error);
    //     }
    // })
} );




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
    console.log(req.body);
    res.json({status:"Ok"});
})


app.listen(process.env.PORT || 8080);