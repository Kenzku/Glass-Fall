/**
 * User: Ken
 * Date: 04/04/2013
 * Time: 00:18
 */
var URLCrawler = require('../lib/URLCrawler')
  , Constant = require('../lib/Constant')
  , CouchDB = require('../lib/CouchDB')
  ;

/**
 * a function return true,
 * if the user is from a mobile device
 * @param ua user agent from header field in lower case
 * @returns {*}
 */
var isMobile = function(ua) {
    // a regexp to identify mobile browsers based on user-agent string
    // from: http://detectmobilebrowser.com/
    return (/(android|bb\d+|meego|android|ipad|playbook|silk).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4)));
};

var aURLCrawler = function(){
    // create a URLCrawler object
    var aURLCrawler = new URLCrawler();

    // URL Crawler configuration
    var options = {
        url : Constant.URL.default,
        state : Constant.State.run
    }

    // configuration
    aURLCrawler.configureURLClaws(options);
    return aURLCrawler;
}();

/**
 * a helper function that
 * get HTML content from the default web page
 * @param url the url you want to get Content from
 * @param successCB(request, response)
 * @param errorCB(error)
 * @private
 */
var _getHTMLContentFromURL = function (url,successCB, errorCB){
    aURLCrawler.getHTMLContentFromURL(url,successCB,errorCB);
};

var _saveDocument = function (doc,successCallback,errorCallback) {
    if (!doc) {
        if (successCallback && typeof successCallback === 'function'){
            successCallback(null);
        }
    }else{
        var aCouchDB = new CouchDB();
        aCouchDB.saveDocument(doc,successCB,errorCB);

        // success callback to aCouchDB.saveDocument
        function successCB (body){
            if (successCallback && typeof successCallback === 'function'){
                successCallback(body);
            }
        }

        // error callback to aCouchDB.saveDocument and aCouchDB.readDocument
        function errorCB (err){
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback(err);
            }
        }
    }
}

exports.show = function(req, res){
    var ua = req.headers['user-agent'].toLowerCase();
    // get HTML content from the default web page
    _getHTMLContentFromURL (Constant.URL.default,successCB, errorCB);

    function successCB (req_1,res_1){
        // if the page has moved
        if (req_1.statusCode == 301 || req_1.statusCode == 302){
            _getHTMLContentFromURL (req_1.headers.location,successCB, errorCB);
        }
        // keep it simple, assume the default page is always a text/html
        var result = aURLCrawler.getURLsFromContent(res_1,null);
        if (!result) {
            result = [];
        }
        if(isMobile(ua)){
            res.render('urlCrawler_mobile', { title: 'URL Crawler', 'urls': result});
        }else{
            res.render('urlCrawler_desktop', { title: 'URL Crawler', 'urls': result});
        }
    }
    function errorCB (req,res){
        console.log(res);
    }
};

exports.ParseThenShow = function(req, res){
    var newURL = req.params.url;
    var ua = req.headers['user-agent'].toLowerCase();
    // get HTML content from the new url
    _getHTMLContentFromURL (newURL,successCB_1, errorCB_1);

    function successCB_1 (req_1,res_1){
        // if the page has moved
        if (req_1.statusCode == 301 || req_1.statusCode == 302){
            _getHTMLContentFromURL (req_1.headers.location, successCB_1, errorCB_1);
        }else{
            if (req_1.headers['content-type'].search("text/html") >= 0){
                // it is an HTML page
                var result = aURLCrawler.getURLsFromContent(res_1,null);
                // save URLs
                _saveDocument(result,successCB_2,errorCB_2);
                // NEED TO IMPROVE
                function successCB_2(body){
                }
                // NEED TO IMPROVE
                function errorCB_2(err){
                    console.log(err);
                }
                if(isMobile(ua)){
                    res.render('urlCrawler_mobile', { title: 'URL Crawler', 'urls': result});
                }else{
                    console.log(result);
                    res.render('urlCrawler_desktop', { title: 'URL Crawler', 'urls': result});
                }
            }else{
                // it is not an HTML Page
                var result = [newURL];
                if(isMobile(ua)){
                    res.render('urlCrawler_mobile', { title: 'URL Crawler', 'urls': result});
                }else{
                    res.render('urlCrawler_desktop', { title: 'URL Crawler', 'urls': result});
                }
            }
        }
    }
    function errorCB_1 (req,res){
        console.log(res);
    }
};

exports.test = function(req,res) {
    var ua = req.headers['user-agent'].toLowerCase();

    // get HTML content from the default web page
    _getHTMLContentFromURL (null,successCB, errorCB);

    function successCB (req_1,res_1){
        // if the page has moved
        if (req_1.statusCode == 301 || req_1.statusCode == 302){
            _getHTMLContentFromURL (req_1.headers.location,successCB, errorCB);
        }
        // keep it simple, assume the default page is always a text/html
        var result = aURLCrawler.getURLsFromContent(res_1,null);

        if(isMobile(ua)){
            res.render('urlCrawler_mobile_test', { title: 'URL Crawler', 'urls': result});
        }else{
            res.render('urlCrawler_desktop_test', { title: 'URL Crawler', 'urls': result});
        }
    }
    function errorCB (req,res){
        console.log(res);
    }
}