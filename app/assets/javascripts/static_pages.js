$(document).ready(function() {
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
        $('.fb-share-button[data-href]').val(window.location);
        $('#create-new-note').on('click', function() {
            console.log('should be clicking!!');
            $('#home-modal').modal('show');
        })
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
        if (window.location.pathname == '/' && localStorage.visited !== 'true'){
            localStorage.visited = true;
            $('#home-modal').modal('show');
        }
        $('.make-note').on('click', function(e) {
            $('#home-modal').modal('hide');
            $('#createModal').modal('show');
        });
        $('#create-note-button').on('click', function() {
            console.log('Clicked note button');
            $('#createModal').hide();
            $('#shareModal').modal('show');
        });
    }
}
