$(document).ready(function(){
    modals.init();
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
        });
    }
}

var modals = {
    init: function() {
        this.bindListeners();
        this.startModalShow();
    },
    bindListeners: function() {
        $('.form-control').on('keydown', function() {
            this.displayNumChars();
        }.bind(this));
    },
    displayNumChars: function() {
        var numChars = $('.form-control').val().length;
        var max = 250;
        var total = max - numChars;
        $('.num-chars').text(total);
    },
    startModalShow: function() {
        if (window.location.pathname == '/'){
        $('#home-modal').modal('show');
        }
        $('.make-note').on('click', function(e) {
            $('#home-modal').modal('hide');
            $('#createModal').modal('show');
        });
        $('.create').on('click', function() {
            console.log($('.create').val())
            if ($('.create').val().length > 5) {
                $('#createModal').hide();
                $('#shareModal').modal('show');
            }
        });
    }
    }