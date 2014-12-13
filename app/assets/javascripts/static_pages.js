$(document).ready(function(){
    masonry.init();
        });

var masonry = {
        init: function() {
            var container = $('.masonry')[0];
            var msnry = new Masonry(container, {
                columnWidth: '.item',
                itemSelector: '.item',
                'isFitWidth': true
});
            var imgLoad = imagesLoaded(container, function() {
                msnry.layout();
});        }
    }