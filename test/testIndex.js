/*jslint node: true */
'use strict';

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

function deleteTest(id){
    return new Promise((resolve,reject) => {
        fetch("http://localhost:8080/delete?id=" + id)
        .then(res =>res.json())
        .then(data => {
            resolve(data);
        })
        .catch(function(error){
            reject(error);
        })
    })
}

//testing get, insert, update, delete
describe('Get/insert/update/delete',function(){
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
    it("should update the browser name of the last inserted object into (andal)",function(done){
        getLastInsertedObject()
        .then(obj => {
            getUpdate(obj._id, "andal")
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
    it("should delete the last inserted object (browser name: andal)",function(done){
        getLastInsertedObject()
        .then(obj => {
            deleteTest(obj._id)
            .then(result => {
                if(result.status == "Ok"){
                    done();
                }else{
                    done("could not delete the object");
                }
            })
        })
        .catch(error =>{
            console.log(error);
        })
    })
});
