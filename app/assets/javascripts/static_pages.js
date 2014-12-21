$(document).ready(function() {
    modals.init();
    masonry.init();
    var fileSelect = $('#image-select'),
    fileElem = $('#image-btn');

    fileElem.on("click", function(e) {
        console.log('calling func?');
        fileSelect.trigger("click");
        e.preventDefault();
    })

    Dropzone.autoDiscover = false;

    // grap our upload form by its id
    $("#image_upload").dropzone({
        maxFiles: 1,
        // restrict image size to a maximum 1MB
        maxFilesize: 4,
        // changed the passed param to one accepted by
        // our rails app
        paramName: "image[pic]",
        // show remove links on each image upload
        addRemoveLinks: true
    });

});

function handleFiles(files) {
    console.log('calling handle files');
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;

        if (!file.type.match(imageType)) {
            continue;
        }

        // var img = document.createElement("img");
        var img = $('<img>');
        img.addClass("image-preview");
        // img.file = file;

        preview = $('.image-preview-holder')
        preview.append(img);
        var reader = new FileReader();
        reader.onload = (function(aImg) {
            return function(e) {
                console.log(aImg);
                // aImg.src = e.target.result;
                $(aImg).attr("src", e.target.result)
                    // Add jquery attr
                };
            })(img);
            reader.readAsDataURL(file);
        }
    }

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
        // $('.fb-share-button[data-href]').val(window.location);
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
        // if (window.location.pathname == '/' && localStorage.visited !== 'true') {
            // localStorage.visited = true;
            $('#home-modal').modal('show');
        // }
        $('.make-note').on('click', function(e) {
            console.log('activting??');
            $('#home-modal').modal('hide');
            $('#create-modal').modal('show');
        });
        $('#create-note-button').on('click', function() {
            console.log('Clicked note button');
            $('#create-modal').hide();
            $('#share-modal').modal('show');
        });
    }
}