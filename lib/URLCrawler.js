/**
 * User: Ken
 * Date: 04/04/2013
 * Time: 04:33
 * reference:
 * http://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express
 * http://stackoverflow.com/questions/6968448/where-is-body-in-a-nodejs-http-get-response
 */

var Constant = require('./Constant')
  , http = require('http')
  ;

function URLCrawler() {
    var self = this;
    /**
     * the current url
     * @type {String}
     */
    self.url = Constant.URL.default;
    /**
     * all urls that collected in [ALGORITHM] before save to [METHOD], not in used yet
     * [ALGORITHM]: NEED TO IMPROVE
     * [METHOD]: save to CouchDB by default, to file optional
     * @type {[String]}
     * @example ['url1','url2',...]
     */
    self.urls = [self.url];
    /**
     * the depth of the claw will go
     * @type {String}
     */
    self.depth = Constant.Middleware.default.Depth;
    /**
     * the state of the current claw
     * @type {*}
     */
    self.state = Constant.State.stop;


    /**
     * configuration object,
     * Do not configure url and urls at the same time,
     * because urls will be overwritten,
     * when you configure url, this url will be push into
     * urls array automatically.
     * if you configure urls, e.g.
     * {urls : "http://www.google.com"}
     * the urls will then be ["http://www.google.com"],
     * {urls : ["http://www.google.com","http://www.google.fi"]}
     * the urls will then be ["http://www.google.com","http://www.google.fi"],
     * no duplicated checking.
     * @param options {Object}
     */
    self.configureURLClaws = function (options){
        for (var option in options){
            switch (option) {
                case "url":
                    self.url = options[option]; // no need to check
                    if (self.url && self.url.length != 0) self.urls.push(options[option]);
                    break;
                case "urls": /* Not sure yet */
                    self.urls = Object.prototype.toString.call( self.urls ) === '[object Array]' ?
                        options[option] : [options[option]]; /* Not sure yet */
                    break;
                case "depth":
                    self.depth = options[option];
                    break;
                case "state":
                    self.state = options[option];
                    break;
            }
        }
    }

    /**
     * This is an asynchronous function that get HTML content from a URL
     * http://www.ietf.org/rfc/rfc1738.txt
     * @param url url {String} a URL string,
     * or null, if you have configure URLClaws, by telling it the current URL
     * @param successCallback with returned data {[urls]}
     * @param errorCallback THIS FUNCTION HASN'T BEEN TESTED
     * @returns {boolean} return false if the state is not 'run',
     * otherwise return true, but this does not mean that the data
     * that you request has been sent back already
     */
    self.getHTMLContentFromURL = function (url,successCallback,errorCallback) {
        if (self.state != Constant.State.run) return false;
        if (url) {
            var option = {
                url : url
            };
            self.configureURLClaws(option);
        }
        var body = "";
        http.get(url || self.url, function(res) {
            // the 'res' is the request that I sent, not the response that I receive
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                if (successCallback && typeof successCallback === 'function'){
                    // body is an array of urls
                    successCallback(res,body);
                }
            });
        }).on('error', function(e) {
            console.log(e.message);
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback(e);
            }
        });
        return true;
    }

    self.getURLsFromContent = function (HTMLContent, options, successCallback) {
        if (!HTMLContent) {
            return null;
        }

        // NOT IN USED YET
        var width = Constant.Middleware.default.Width,
            lastStop = self.url;

        // NOT IN USED YET
        if (options){
            for (var option in options){
                if (options){
                    switch (options) {
                        case "width":
                            width = typeof options[option] === 'number' ?
                                options[option] : Constant.Middleware.default.Width;
                            break;
                        case "lastStop": /* Not sure yet */
                            lastStop = typeof options[option] === 'string' ?
                                options[option] : self.url;
                            break;
                    }
                }
            }
        }

        // parsing html page
        var regex = Constant.URLRegexp.Steady.v3;
        var foundURLs = HTMLContent.match(regex);

        if (successCallback && typeof successCallback === 'function'){
            successCallback(foundURLs);
        }

        // [urls]
        return foundURLs;
    }

    self.getFileType = function () {

    }
    self.downloadContent = function () {

    }

    self.showURLContent = function () {

    }
}

module.exports = URLCrawler;
