$(window).load(function() {
    modals.init();
    // masonry.init();
    $('.masonry').masonry({
        "itemSelector": '.note-holder',
        // columnWidth: function(containerWidth) {
        //     return containerWidth / 6;
        // },
        "gutter": 10
    });
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
        acceptedFiles: "image/*",
        // changed the passed param to one accepted by
        // our rails app
        paramName: "image[pic]",
        // show remove links on each image upload
        addRemoveLinks: true,
        init: function() {
            this.on("success", function(file, response) {
                console.log(response);
                $('#image_id_for_note').val(response.image_id);
                // TODO: Remember in note controller to clear this value of successful submission
            });
        }
    });



    // $('.note-holder').each(function(index) {
    //     var randRotation = Math.floor((Math.random() * 10) + 1);
    //     // randRotation *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    //     randRotation *= index % 2 == 0 ? 1 : -1;
    //     $(this).css("transform", "rotate(" + randRotation + "deg)")
    // })
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
        $('.masonry').masonry({
            "itemSelector": '.note-holder',
            // "columnWidth": ".note-holder",
            columnWidth: function(containerWidth) {
                return containerWidth / 4;
            },
            "gutter": 10
        });
        
        $('.masonry').imagesLoaded({
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