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

describe('Index',function(){
    let initialCount = Infinity;
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
    it('should return a number',function(done){
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
});

