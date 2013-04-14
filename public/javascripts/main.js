/**
 * Author: Ken
 * Date: 13/04/2013
 * Time: 21:36
 */
require(["jquery","imageDealer",'ejs'], function($,ImageDealer,EJS) {
    var aImageDealer = new ImageDealer();
    aImageDealer.fetchImageURLFromPage();
});