/**
 * Author: Ken
 * Date: 13/04/2013
 * Time: 21:36
 */
require(["jquery","imageDealer"],
    function($,ImageDealer) {
    var aImageDealer = new ImageDealer();
    var URLs = aImageDealer.fetchImageURLFromPage();
    var images = aImageDealer.putImageOnShelf(URLs,successCS,errorCB);

    function successCS(imageZone){
    }

    function errorCB(err){
        console.log(err);
    }
});