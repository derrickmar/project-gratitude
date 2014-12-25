var NotesController = Paloma.controller('Notes');

NotesController.prototype.all = function() {
    (function($, window, document) {
        console.log('Executing page specific javascript notes#all');

    // $(document).ready(function(){
    //     $('#content').infinitescroll({
    //         navSelector: "#next:last",
    //         nextSelector: "#next:last",
    //         itemSelector: "#content",
    //         debug: false,
    //         dataType: 'html',
    //     maxPage: 6,
    //         path: function(index) {
    //             return "index" + index + ".html";
    //         }
    //         // appendCallback   : false, // USE FOR PREPENDING
    //     }, function(newElements, data, url){
    //       // used for prepending data
    //         // $(newElements).css('background-color','#ffef00');
    //         // $(this).prepend(newElements);
    //     });
    // });

        var isotopy = {
            onReady: function() {
                WebFont.load({
                    active: isotopy.triggerIsotope(),
                    inactive: isotopy.triggerIsotope()
                });
                this.randomRotate();
                $('.notes-holder').infinitescroll({

                    navSelector: ".note-pagination-links",
                    // selector for the paged navigation (it will be hidden)
                    nextSelector: ".page > a[rel='next']",
                    // selector for the NEXT link (to page 2)
                    itemSelector: ".note-holder"
                        // selector for all items you'll retrieve
                });
            },
            triggerIsotope: function() {
                var $container = $('.notes-holder').imagesLoaded(function() {
                    $container.isotope({
                        itemSelector: '.note-holder',
                        transformsEnabled: false,
                        masonry: {
                            columnWidth: 50,
                            gutter: 10
                        }
                    })
                });
            },
            randomRotate: function() {
                $('.note-holder').each(function(index) {
                    var randRotation = Math.floor((Math.random() * 5) + 1);
                    // randRotation *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
                    randRotation *= index % 2 == 0 ? 1 : -1;
                    $(this).css("transform", "rotate(" + randRotation + "deg)")
                })
            }
        }

        var modals = {
            init: function() {
                console.log('running modals init right?');
                this.bindListeners();
                this.startModalShow();
                $('#create-new-note').on('click', function() {
                    console.log("it doesn't show it multiple times?");
                    // TODO for some reason create modal doesn't show after creating a note
                    // Need to hide and show it?
                    $('#create-modal').modal('show');
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
                if (window.location.pathname == '/' && localStorage.visited !== 'true') {
                    localStorage.visited = true;
                    $('#home-modal').modal('show');
                }
                $('.make-note').on('click', function(e) {
                    console.log('running click note');
                    $('#home-modal').modal('hide');
                    $('#create-modal').modal('show');
                });
                $('#create-note-button').on('click', function() {
                    console.log('Clicked create note');
                    $('#create-modal').modal('hide');
                    $('#share-modal').modal('show');
                });
            }
        }

        // $(window).load(function() {
        // console.log('running window load in notes#all');
        // TODO: Will this run correctly alhtough we can't put it in window.load?
        isotopy.onReady();
        // })

        // if (isotopy.ranOnce) {
        //     isotopy.onReady();
        // }

        $(document).ready(function() {
            console.log('in document the ready');
            modals.init();
        });

    }(window.jQuery, window, document));
};