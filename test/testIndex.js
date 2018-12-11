const assert = require('chai').assert;
const fetch = require('node-fetch');
const testData = require('./testData');


function insertTestData(){
    return new Promise((resolve, reject)=>{
        fetch("http://localhost:8080/collect", {
            method:"post",
            body:JSON.stringify(testData.collect1),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            resolve(data);
        })
        .catch(function(error){
            reject(error);
        });
    })
}




function getTest(){
    return new Promise((resolve, reject) => {
        fetch("http://localhost:8080/get")
        .then(res=>res.json())
        .then(function(r){
            resolve(r.length)
        })
        .catch(error => {
            reject(error);  
        }) 
    })
}

function getLastInsertedObject(){
    return new Promise((resolve, reject) => {
        fetch("http://localhost:8080/get")
        .then(res=>res.json())
        .then(object =>{
            resolve(object[object.length - 1])
        })
        .catch(error => {
            reject(error);
        })
    })
}

function getUpdate(id, newName){
    return new Promise((resolve, reject) => {
        fetch("http://localhost:8080/update?id=" + id + "&browser=" + newName)
        .then(res => res.json())
        .then(data => {
            resolve(data);
        })
        .catch(function(error){
            reject(error);
        })
    })
}

//testing the get endpoint and the insert
describe('Get',function(){
    let initialCount = Infinity;
    let insertedObject = {};
    it('should get initial count of database objects',function(done){
        getTest()
        .then(result =>{
            if(typeof result === 'number'){
                initialCount = result;
                done();
            }else{
                done("Initial count not a numebr");
            }
        })
        .catch(error => {
            done(error);
        })
    })
    
    it('should insert a test object',function(done){
        insertTestData()
        .then(result =>{
            if(result.status == "Ok"){
                done();
            }else{
                done("Status not ok");
            }
        })
        .catch(error => {
            done(error);
        })
    })
    it('should get the number of objects inside db after the insert',function(done){
        getTest()
        .then(finalCount => {
            if(finalCount >= initialCount + 1){
                done();
            }else{
                done("Final count did not increase");
            }
        })
        .catch(error => {
            done(error);
        })
    });
    it("yep",function(done){
        getLastInsertedObject()
        .then(obj => {
            getUpdate(obj._id, "pateu")
            .then(result => {
                if(result.status == "Ok"){
                    done();
                }else{
                    done("Couldnt update the test object");
                }
            })
            .then(error => {
               // done(error);
                console.log(error);
            })
        })
        .catch(error => {
            //done(error);
            console.log(error);
        })
    });
});
