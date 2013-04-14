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

    self.saveDocument = function (doc,successCallback_1,errorCallback_1){
        var aDigest = messageDigest(doc);

        var dataToSave = {
            date:new Date().toJSON(),
            URLs:doc,
            hash:aDigest
        };

        isDuplicate(aDigest,successCallback_2,errorCallback_2);

        function successCallback_2(isDuplicate) {
            if (!isDuplicate){
                // insert 'dataToSave' to CouchDB
                db.insert(dataToSave,
                    function (err,http_body,http_headers) {
                        if(err) {
                            if (errorCallback_1 && typeof errorCallback_1 === 'function'){
                                errorCallback_1(err);
                            }
                        }else{
                            /**
                             * body example:
                             * { ok: true,
                             *   id: '8361e3dfb52f0e28784c3cb5340055bd',
                             *   rev: '1-0d19569e40b9abc88b79e55d71a48bec' }
                             */
                            if (successCallback_1 && typeof successCallback_1 === 'function'){
                                successCallback_1(http_body);
                            }
                        }
                    }
                );
            }else{
                if (errorCallback_1 && typeof errorCallback_1 === 'function'){
                    errorCallback_1("Document Existed Already");
                }
            }
        }
        function errorCallback_2(error){
            if (errorCallback_1 && typeof errorCallback_1 === 'function'){
                errorCallback_1(error);
            }
        }
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

        /**
         * check if a hashed value is already exist
         * @param digest {String} MD5 hashed value
         * @param successCallback called when find out if it is duplicate or not
         * @param errorCallback called when an error happen
         * when looking for the entry whether it is duplicate:
         * either failed to read the 'byHash' view or wrong parameter
         * @returns {boolean} return true, if no `digest` given or wrong digest
         */
        function isDuplicate(digest,successCallback,errorCallback){
            if (!digest && typeof digest === 'function') {
                if (errorCallback && typeof errorCallback === 'function'){
                    errorCallback("no hash parameter given");
                    return true;
                }else{
                    throw "no hash parameter given";
                }
            }
            var isDuplicate = false;

            self.readView('byHash',null,successCB, errorCallback);

            function successCB(body){
                var data = body.rows;
                for (var i = 0; i < data.length; i++){
                    if (digest == data[i].value.hash){
                        isDuplicate = true;
                        break;
                    }
                }
                if (successCallback && typeof successCallback === 'function'){
                    successCallback(isDuplicate);
                }
            }
        }
    }

    /**
     * read a given view
     * @param view {String} the view that is to be looked for
     * @param filter {String} or {[String]} it is key of the view, that you want to show
     * @param successCallback called when it is succeed to get the view
     * @param errorCallback called when it is failed to get the view
     */
    self.readView = function(view, filter, successCallback,errorCallback) {
        filter = filter ? filter : '';
        db.view('glassfall', view, filter,
            function(err, body) {
                if (err) {
                    if (errorCallback && typeof errorCallback === 'function'){
                        errorCallback(err);
                    }
                } else {
                    if (successCallback && typeof successCallback === 'function'){
                        successCallback(body);
                    }
                }
        });
    }
}

module.exports = CouchDB;