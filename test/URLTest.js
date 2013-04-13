/**
 * User: Ken
 * Date: 04/04/2013
 * Time: 05:14
 *
 * cd ./URLCrawlers/
 * to test: mocha ./test/URLTest.js -R spec -u qunit -t 10000
 *
 */
var assert = require("assert")
  , URLCrawler = require('../lib/URLCrawler')
  , Constant = require('../lib/Constant')
  , express = require('express')
  , chai = require('chai')
  , util = require('util')
  , fs = require('fs')
  , SaveData = require('../lib/SaveData')
  , path = require('path')
  , CouchDB = require('../lib/CouchDB');
//  , url = require('url');

function ok(expr, msg) {
    if (!expr) throw new Error(msg);
}

suite('URLCrawler initial');
test('property', function() {
    var aURLCrawler = new URLCrawler();

    assert.equal(aURLCrawler.url,Constant.URL.default);
    assert.equal(aURLCrawler.url,'http://www.telenor.com');
    assert.deepEqual(aURLCrawler.urls,[aURLCrawler.url]);
    assert.deepEqual(aURLCrawler.urls,['http://www.telenor.com']);
    assert.equal(aURLCrawler.depth,Constant.Middleware.default.Depth);
    assert.equal(aURLCrawler.depth,1);
    assert.equal(aURLCrawler.state,Constant.State.stop);
    assert.equal(aURLCrawler.state,'stop');
});

test('update property 1',function() {
    var aURLCrawler = new URLCrawler();

    var options = {
        url : 'www.google.com',
        depth : 4,
        state : Constant.State.pause
    }
    // before configuration
    var oldURL = aURLCrawler.url;
    // configuration
    aURLCrawler.configureURLClaws(options);
    // after configuration
    assert.equal(aURLCrawler.url,'www.google.com');
    assert.deepEqual(aURLCrawler.urls,[oldURL,aURLCrawler.url]);
    assert.deepEqual(aURLCrawler.urls,['http://www.telenor.com','www.google.com']);
    assert.equal(aURLCrawler.depth,4);
    assert.equal(aURLCrawler.state,Constant.State.pause);
    assert.equal(aURLCrawler.state,'pause');
});

test('update property 2 - urls is a string',function() {
    var aURLCrawler = new URLCrawler();

    var options = {
        url : 'www.google.com',
        urls : 'www.aalto.fi'
    };
    // configuration
    aURLCrawler.configureURLClaws(options);
    // after configuration
    assert.equal(aURLCrawler.url,'www.google.com');
    assert.deepEqual(aURLCrawler.urls,'www.aalto.fi');
});

test('update property 3 - urls is an array',function() {
    var aURLCrawler = new URLCrawler();

    var options = {
        url : 'www.google.com',
        urls : ['www.aalto.fi','www.ucc.ie']
    }
    // configuration
    aURLCrawler.configureURLClaws(options);
    // after configuration
    assert.equal(aURLCrawler.url,'www.google.com');
    assert.deepEqual(aURLCrawler.urls,['www.aalto.fi','www.ucc.ie']);
});

test('update property 4 - url is null',function() {
    var aURLCrawler = new URLCrawler();

    var options = {
        url : null,
        urls : ['www.aalto.fi','www.ucc.ie']
    }
    // configuration
    aURLCrawler.configureURLClaws(options);
    // after configuration
    assert.equal(aURLCrawler.url,null);
    assert.deepEqual(aURLCrawler.urls,['www.aalto.fi','www.ucc.ie']);
});

test('update property 5 - url is an empty string',function() {
    var aURLCrawler = new URLCrawler();

    var options = {
        url : '',
        urls : ['www.aalto.fi','www.ucc.ie']
    }
    // configuration
    aURLCrawler.configureURLClaws(options);
    // after configuration
    assert.equal(aURLCrawler.url,'');
    assert.deepEqual(aURLCrawler.urls,['www.aalto.fi','www.ucc.ie']);
});

suite('URLCrawler behaviours');
/**
 * to test this function, remember to set mocah timeout
 * mocha ./test/URLTest.js -R spec -u qunit -t 6000
 */
test('getHTMLContentFromURL(callback)',function(done){
    // design a callback function so that mocha knows where to stop
    function successCB (req,res){
        assert.equal(req.statusCode,200);
//        console.log(res);
        done();
    }
    // create a URLCrawler object
    var aURLCrawler = new URLCrawler();

    // URL Crawler configuration
    var options = {
        url : 'http://www.telenor.com',
        deep : Constant.Middleware.default.Depth,
        state : Constant.State.run
    }
    // configuration
    aURLCrawler.configureURLClaws(options);
    assert.equal(aURLCrawler.getHTMLContentFromURL(null,successCB),true);
});
//mocha ./test/URLTest.js -R spec -u qunit -t 6000 -g re-location
test('getHTMLContentFromURL(callback) - re-location',function(done){
    // design a callback function so that mocha knows where to stop
    function successCB (req,res){
        if (req.statusCode == 301){
            aURLCrawler.getHTMLContentFromURL(req.headers.location,successCB);
        }else{
            assert.equal(req.statusCode,200);
            done();
        }
    }
    // create a URLCrawler object
    var aURLCrawler = new URLCrawler();

    // URL Crawler configuration
    var options = {
        // THIS PAGE WILL MOVE TWICE
        url : 'http://telenor.com/?page_id=206',
        state : Constant.State.run
    }
    // configuration
    aURLCrawler.configureURLClaws(options);
    assert.equal(aURLCrawler.getHTMLContentFromURL(null,successCB),true);
});

test('it is a string is a regex',function(){
    assert.equal(util.isRegExp(Constant.URLRegexp.Steady.v3),true);
});

/**
 * this is a synchronous function
 */
test('getURLFromContent - read from an HTML file on localhost',function (done){
    // create a URLCrawler object
    var aURLCrawler = new URLCrawler();

    // URL Crawler configuration
    var options = {
        url : 'http://www.telenor.com',
        deep : Constant.Middleware.default.Depth,
        state : Constant.State.run
    }

    // configuration
    aURLCrawler.configureURLClaws(null,options);

    // get HTML content
    fs.readFile(__dirname + '/testhtml.html', 'utf8',function (err, data) {
        if (err) throw err;
//        console.log(data);
        var result = aURLCrawler.getURLsFromContent(data,null);
        chai.expect(result).to.be.a('array');
        assert.deepEqual(result,Constant.TestArray);
        done();
    });
});

//mocha ./test/URLTest.js -R spec -u qunit -t 10000 -g getHTMLContentFromURL
test('getURLFromContent - from getHTMLContentFromURL',function (done){
    // design a callback function so that mocha knows where to stop
    function successCB (req,res) {
        assert.equal(req.statusCode,200);
        var result = aURLCrawler.getURLsFromContent(res,null);
        chai.expect(result).to.be.a('array');
        done();
    }
    // create a URLCrawler object
    var aURLCrawler = new URLCrawler();

    // URL Crawler configuration
    var options = {
        url : 'http://www.telenor.com',
        deep : Constant.Middleware.default.Depth,
        state : Constant.State.run
    }
    // configuration
    aURLCrawler.configureURLClaws(options);
    // with configure url
    aURLCrawler.getHTMLContentFromURL(null,successCB);
});

suite('SaveData');
//mocha ./test/URLTest.js -R spec -u qunit -t 10000 -g SaveData
test('SaveData - to a file - initial property', function(){
    var aSaveData = new SaveData();

    assert.equal(aSaveData.dataToSave,Constant.SaveFile.default.DataToSave);
    assert.equal(aSaveData.dataToSave,'');
});

//mocha ./test/URLTest.js -R spec -u qunit -t 10000 -g SaveData
test('SaveData - save to file', function(done){
    var dir = path.join(__dirname,'../','lib/',Constant.SaveFile.default.FileName);
    // design a callback function so that mocha knows where to stop
    function successCB_1 () {
        fs.exists(dir,function(isExist){
            assert.equal(isExist,true);
        });
    }
    function successCB_2 () {
        fs.readFile(dir, Constant.SaveFile.default.Encoding,function (err, data) {
            if (err) throw err;
            chai.expect(data).to.be.a('string');
            assert.equal(data,'This is a testAppend NEW');
            done();
        });
    }
    function errorCB () {
        assert.ok;
        done();
    }

    var aSaveData = new SaveData('This is a test');

    // Test writing, renew the file every time
    assert.equal(aSaveData.dataToSave,'This is a test');
    /* null is to set, otherwise CB would not be call :( */
    aSaveData.saveURLsToFile(null,null,successCB_1,errorCB);

    // Test appending
    aSaveData.dataToSave = 'Append NEW';
    aSaveData.saveURLsToFile(true,null,successCB_2,errorCB);
});

//mocha ./test/URLTest.js -R spec -u qunit -t 10000 -g CouchDB
//mocha ./test/URLTest.js -R spec -u qunit -t 10000 -g documents
suite('CouchDB');
test('CouchDB - documents - readDocument and saveDocument',function(done){
    var aCouchDB = new CouchDB();
    aCouchDB.saveDocument(Constant.TestArray,successCB_1,errorCB);

    // success callback to aCouchDB.saveDocument
    function successCB_1 (body){
        // test the return body
        chai.expect(body).to.be.an('object');
        chai.expect(body).to.include.keys('id');
        chai.expect(body).to.include.keys('rev');
        chai.expect(body).to.include.keys('ok');
        chai.expect(body.ok).to.be.true;

        // test if the saved document valid in general
        var id = body.id;
        aCouchDB.readDocument(body.id, successCB_1_1, errorCB);

        // success callback to aCouchDB.readDocument
        function successCB_1_1 (body){
            // behaviour test
            chai.expect(body).to.be.an('object');
            chai.expect(body).to.include.keys('_id');
            chai.expect(body).to.include.keys('_rev');
            chai.expect(body).to.include.keys('URLs');
            chai.expect(body).to.include.keys('date');
            chai.expect(body).to.include.keys('hash');

            // value LOOSE test in general
            chai.expect(body.URLs).to.be.an('array');
            chai.expect(new Date(body.date).toJSON()).to.match(/^\d{4}(-\d{2}){2}T\d{2}(:\d{2}){2}\.\d{0,5}Z?/);
            chai.expect(body.hash).to.have.length.of('f9195c5c3c7edf17f1b52c7d8535dedb'.length);
            done();
        }
    }

    // error callback to aCouchDB.saveDocument and aCouchDB.readDocument
    function errorCB (err){
        console.log(err);
        assert.ok;
        done();
    }
});

//mocha ./test/URLTest.js -R spec -u qunit -t 10000 -g readView
test('CouchDB - readView',function(done){
    var aCouchDB = new CouchDB();
    aCouchDB.readView('byHash',null,successCB,errorCB);

    function successCB(body){
        console.log(body.rows[0].value);
        assert.ok(true);
        done();
    }

    function errorCB(err){
        console.log(err);
        assert.ok(true);
        done();
    }
});