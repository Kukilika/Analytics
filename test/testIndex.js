const assert = require('chai').assert;
const index = require('../index');
const getTest = require('../index').getTest;

describe('Index',function(){
    it('app should return a number',function(){
        // let result = getTest().then
        //console.log(result);

        getTest()
        .then(result => {
            assert.equal(result,4)
        })
        .catch(error => {
            assert.fail(error);
        })
        // assert.equal(result,4);
    });
});