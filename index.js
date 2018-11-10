const mongoose = require('mongoose');

const express = require('express');

const app = express();
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

var m = new example;

m.id = 1;
m.name = "Negura";
m.prename = "Andi-Mihai";
m.phoneNumber = "0736115363";
m.steph = false;

m.save(function(error){
    console.log("your m have been saved");
    if(error){
        console.log(error);
    }
})


app.get('/get', function (req, res) {
    mongoose.model('Example').find(function(error,example){
        res.send(example);
    })
});

app.listen(process.env.PORT || 8080);