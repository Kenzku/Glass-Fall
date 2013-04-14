/**
 * Author: Ken
 * Date: 13/04/2013
 * Time: 23:08
 */
define(['../javascripts/imageDealer.js'],
    function (ImageDealer) {
        return {
            RunTests: function () {
                module('ImageDealer');
                test('self.fetchImageURLFromPage - fetch URL from urlCrawler_desktop page',function(){
                    var aImageDealer = new ImageDealer();
                    var URLs = aImageDealer.fetchImageURLFromPage();
                    if (URLs){
                        deepEqual(Object.prototype.toString.call(URLs.urls),'[object Array]');
                        deepEqual(Object.prototype.toString.call(URLs.names),'[object Array]');
                        equal(URLs.urls.length,URLs.length);
                        equal(URLs.names.length,URLs.length);
                    }
                });

                test('self.putImageOnShelf - put image in <div id="imageZone"></div>',function(){
                    var aImageDealer = new ImageDealer();
                    var URLs = aImageDealer.fetchImageURLFromPage();
                    aImageDealer.putImageOnShelf(URLs,successCS,errorCB);

                    function successCS(imageZone){
                        equal(imageZone.length,$('#qunit-fixture #content #imageZone').children().length);
                    }
                    function errorCB(err){
                        console.log(err);
                    }
                });
            }
        };
    });