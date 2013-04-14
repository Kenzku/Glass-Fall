/**
 * Author: Ken
 * Date: 13/04/2013
 * Time: 21:36
 */
require(["jquery","imageDealer"],
    function($,ImageDealer) {
    var aImageDealer = new ImageDealer();
    var URLs = aImageDealer.fetchImageURLFromPage();
    var images = aImageDealer.putImageOnShelf(URLs,successCB_1,errorCB);

    function successCB_1(imageZone){
    }

    function errorCB(err){
        console.log(err);
    }
});