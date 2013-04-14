/**
 * User: Ken
 * Date: 07/04/2013
 * Time: 23:13
 */

var  Constant = require('./Constant')
   , fs = require('fs')
   ;

function SaveData(dataToSave) {
    var self = this;
    // Buffer is a type in Node.js and it is a global type
    self.dataToSave = ( (dataToSave !=null) &&
        ( typeof dataToSave == 'string' || Buffer.isBuffer(dataToSave) ) ) ?
        dataToSave : Constant.SaveFile.default.DataToSave;

    self.currentFile = function () {

    }

    self.saveURLsToCouchDB = function () {

    }

    self.saveURLsToFile = function (isAppend, fileName, successCallback, errorCallback) {
        // optional value setting
        isAppend = ( (isAppend != null) && typeof isAppend === 'boolean' ) ?
            isAppend : Constant.SaveFile.default.IsAppend;
        fileName = ( (fileName != null) && typeof fileName === 'string') ?
            fileName : Constant.SaveFile.default.FileName;

        var dir = __dirname + '/' + fileName;

        if (isAppend) {
            // append URLs to the current file
            fs.appendFile(dir, self.dataToSave, function (err) {
                if (err) {
                    //throw err;
                    /* NOT IN USE YET */
                    if (errorCallback && typeof errorCallback === 'function'){
                        errorCallback(err);
                    }
                }else{
                    if (successCallback && typeof successCallback === 'function'){
                        successCallback();
                    }
                }
            });
        }else{
            // write to a new file
            fs.writeFile(dir, self.dataToSave, function (err) {
                if (err) {
                    // throw err;
                    /* NOT IN USE YET */
                    if (errorCallback && typeof errorCallback === 'function'){
                        errorCallback(err);
                    }
                }else{
                    if (successCallback && typeof successCallback === 'function'){
                        successCallback();
                    }
                }
            });
        }
    }
}

module.exports = SaveData;