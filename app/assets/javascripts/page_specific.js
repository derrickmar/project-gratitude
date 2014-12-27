var NotesController = Paloma.controller('Notes');

NotesController.prototype.all = function() {
    (function($, window, document) {
        console.log('Executing page specific javascript notes#all');

        var isotopy = {
            container: null,
            onReady: function() {
                WebFont.load({
                    active: isotopy.triggerIsotope(),
                    inactive: isotopy.triggerIsotope()
                });
                this.randomRotate($('.note-holder'));

                $('.notes-holder').infinitescroll({
                    navSelector: ".note-pagination-links",
                    nextSelector: ".page > a[rel='next']",
                    itemSelector: ".note-holder-link",
                    loading: {
                        img: "http://i.imgur.com/qkKy8.gif",
                        msgText: "Loading new Graddys...",
                        finishedMsg: "That's all the Graddys we have for now. Add more! :)",
                        speed: "fast"
                    }
                }, function(arrayOfNewElems) {
                    // console.log("newElems", arrayOfNewElems);
                    var $newElems = $(arrayOfNewElems);

                    $newElems.imagesLoaded(function() {
                        isotopy.container.isotope('appended', $newElems);
                    });
                });
            },
            triggerIsotope: function() {
                isotopy.container = $('.notes-holder').imagesLoaded(function() {
                    isotopy.container.isotope({
                        itemSelector: '.note-holder',
                        transformsEnabled: false,
                        masonry: {
                            columnWidth: 50,
                            gutter: 10
                        }
                    })
                });
            },
            randomRotate: function(el) {
                var randRotation = Math.floor((Math.random() * 5) + 1);
                if (el.length == 1) {
                    randRotation *= Math.random() > 0.5 == 0 ? 1 : -1;
                    el.css("transform", "rotate(" + randRotation + "deg)")
                } else {
                    el.each(function(index) {
                        // randRotation *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
                        randRotation *= index % 2 == 0 ? 1 : -1;
                        $(this).css("transform", "rotate(" + randRotation + "deg)");
                    });
                }
            }
        }

        var modals = {
            init: function() {
                console.log('running modals init right?');
                this.bindListeners();
                this.startModalShow();
                $('#create-new-note').on('click', function() {
                    console.log("it doesn't show it multiple times?");
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

        var inits = {
            initialize: function() {
                // $(window).load(function() {
                // console.log('running window load in notes#all');
                // TODO: Will this run correctly alhtough we can't put it in window.load?
                isotopy.onReady();
                // })

                // Infinite scroll actions
                $(".notes-holder").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", ".note-holder", function(event) {
                    // IF CASE IS TO PREVENT RANDOMROTATE BEING CALLED MULTIPLE TIMES FOR A NOTE HOLDER
                    if (event.originalEvent.propertyName == 'opacity') {
                        // console.log($(this));
                        isotopy.randomRotate($(this));
                    }
                });

                var search = location.search.substring(1);
                var params = search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
                    function(key, value) {
                        return key === "" ? value : decodeURIComponent(value)
                    }) : {}
                if ("id" in params) {
                    // If params exist in url then show the note
                    $.ajax({
                        type: "GET",
                        dataType: "script",
                        url: window.location.origin + "/notes/" + params["id"],
                    }).done(function(result) {
                        console.log("AJAX show note successful");
                    }).fail(function(result) {
                        console.log("Something wrong with ajax call");
                    });
                }

                // initialize modals
                $(document).ready(function() {
                    console.log('in document the ready');
                    modals.init();
                });
            },
        }

        inits.initialize();

    }(window.jQuery, window, document));
};