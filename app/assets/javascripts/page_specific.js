var NotesController = Paloma.controller('Notes');

NotesController.prototype.all = function() {
    (function($, window, document) {
        console.log('Executing page specific javascript notes#all');

        $(window).load(function() {
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

            $('.note-holder').each(function(index) {
                // console.log("BEING CALLED?");
                var randRotation = Math.floor((Math.random() * 5) + 1);
                // randRotation *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
                randRotation *= index % 2 == 0 ? 1 : -1;
                $(this).css("transform", "rotate(" + randRotation + "deg)")
            })

        })

        $(document).ready(function() {
            modals.init();
        });

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
                    $('#home-modal').modal('hide');
                    $('#create-modal').modal('show');
                });
                $('#create-note-button').on('click', function() {
                    console.log('Clicked create note');
                    $('#create-modal').hide();
                    $('#share-modal').modal('show');
                });
            }
        }
    }(window.jQuery, window, document));
};

NotesController.prototype.show = function() {
    (function($, window, document) {
        console.log('Executing page specific javascript notes#show');
    }(window.jQuery, window, document));
};

// NotesController.prototype.all = function() {
//  (function($, window, document) {
//      var causesHover = {
//          onReady: function() {
//              causesHover.fadeInOutTitle($('.causes-holder'))
//              .hoverDirectionAware($('.da-thumbs-2 > li'))
//          },
//          fadeInOutTitle: function(el) {
//                 // hover functionality but using event delegation strategy
//                 // event handler only attached to causes-holder
//                 // event bubbling means you can add extra li's dynamically and funciton will still work
//                 el.on('mouseenter', 'li', function() {
//                  // TODO - setTimeout to 100 as in hoverDelay
//                  $(this).find('.all-causes-title').fadeOut(250);
//                  console.log('in hover');
//                 }).on('mouseleave', 'li', function() {
//                     $(this).find('.all-causes-title').fadeIn(250); // repetition!!
//                 });
//                 return causesHover;
//             },
//             hoverDirectionAware: function(el) {
//              el.each(function() {
//                  $(this).hoverdir({
//                      speed: 300,
//                      hoverDelay: 100
//                  });
//              });
//              return causesHover;
//             }
//         }

//         $(document).ready(function() {
//          console.log('StaticPages#causes');
//          causesHover.onReady();
//         });
//     }(window.jQuery, window, document));
// };