/**
 * Author: Ken
 * Date: 13/04/2013
 * Time: 22:02
 */
define(['ejs'],function(ESJ){
   return ImageDealer;
});
function ImageDealer(){
    var self = this;

    self.image = {
        urls : [],
        names : [],
        length : 0
    };

    self.fetchImageURLFromPage = function (successCallback, errorCallback) {
        var urls = $('.urlLink a');

        for (var i = 0; i < urls.length; i++ ){
            var url = $(urls[i]).attr('data-tag');

            var splitURL = url.split(".");

            var splitURLBySlash = url.split("/");

            if (splitURL) {
                var type = splitURL[splitURL.length - 1];
                if ( type == 'png' ||
                    type == 'jpg' ||
                    type =='jpeg' ||
                    type == 'gif' ||
                    type ==  'ico'){
                    self.image.urls.push(url);
                    var name = splitURLBySlash ? splitURLBySlash[splitURLBySlash.length - 1] : 'Unknown Name';
                    self.image.names.push(name);
                    self.image.length++;
                }
            }
        }

        if (successCallback && typeof successCallback === 'function'){
            successCallback(self.image);
        }

        return self.image;
    }

    self.putImageOnShelf = function (images, successCallback, errorCallback) {
        images = images ? images : self.image;
        if (!images) {
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback("NO image URLs");
            }
            return false;
        }
        var imageZone = [];
        for (var i = 0; i < images.length; i++) {
            var image = {
                name : images.names[i],
                url : images.urls[i]
            }
            var image = new EJS({url: '/templates/image.ejs'}).render({image : image});
            imageZone.push(image);
            $('#imageZone').append(image);
        }
        if (successCallback && typeof successCallback === 'function'){
            successCallback(imageZone);
        }
        return imageZone;
    }
}