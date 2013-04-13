/**
 * User: Ken
 * Date: 08/04/2013
 * Time: 19:57
 */
var nano = require('nano')('http://iot.cs.hut.fi:5984')
  , crypto = require('crypto')
  , Constant = require('./Constant')
  ;

function CouchDB () {
    var db = nano.use('testing_do_not_delete');
    var self = this;

    self.readDocument = function (id,successfulCallback,errorCallback) {
        db.get(id, function(err, body) {
            if (err) {
                if (errorCallback && typeof errorCallback === 'function'){
                    errorCallback(err);
                }
            }else {
                if (successfulCallback && typeof successfulCallback === 'function'){
                    successfulCallback(body);
                }
            }
        });
    }

    self.saveDocument = function (doc,successfulCallback,errorCallback){
        var aDeigest = messageDigest(doc);

        var dataToSave = {
            date:new Date().toJSON(),
            URLs:doc,
            hash:aDeigest
        };
        db.insert(dataToSave,
            function (err,http_body,http_headers) {
                if(err) {
                    if (errorCallback && typeof errorCallback === 'function'){
                        errorCallback(err);
                    }
                }else{
                    /**
                     * body example:
                     * { ok: true,
                     *   id: '8361e3dfb52f0e28784c3cb5340055bd',
                     *   rev: '1-0d19569e40b9abc88b79e55d71a48bec' }
                     */
                    if (successfulCallback && typeof successfulCallback === 'function'){
                        successfulCallback(http_body);
                    }
                }
            });
        /**
         * for each page,
         * create a finger print for all of its URLs
         * @param doc should be an Array
         * @returns {String} with md5 message digest
         */
        function messageDigest(doc) {
            var dataToHash = JSON.stringify(doc);
            var md5 = crypto.createHash('md5');
            md5.update(dataToHash,Constant.SaveFile.default.Encoding);
            var digest = md5.digest('hex');
            return digest;
        }

        function isDuplicated(digest,successfulCallback,errorCallback){


        }
    }

    self.readView = function(view, filter, successfulCallback,errorCallback) {
        filter = filter ? filter : '';
        db.view('glassfall', view, filter,
            function(err, body) {
                if (err) {
                    if (errorCallback && typeof errorCallback === 'function'){
                        errorCallback(err);
                    }
                } else {
                    if (successfulCallback && typeof successfulCallback === 'function'){
                        successfulCallback(body);
                    }
                }
        });
    }
}

module.exports = CouchDB;