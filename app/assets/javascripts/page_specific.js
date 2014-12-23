var NotesController = Paloma.controller('Notes');

NotesController.prototype.all = function() {
 (function($, window, document) {
     console.log('Yeah this is working');
    }(window.jQuery, window, document));
};

// NotesController.prototype.all = function() {
// 	(function($, window, document) {
// 		var causesHover = {
// 			onReady: function() {
// 				causesHover.fadeInOutTitle($('.causes-holder'))
// 				.hoverDirectionAware($('.da-thumbs-2 > li'))
// 			},
// 			fadeInOutTitle: function(el) {
//                 // hover functionality but using event delegation strategy
//                 // event handler only attached to causes-holder
//                 // event bubbling means you can add extra li's dynamically and funciton will still work
//                 el.on('mouseenter', 'li', function() {
//                 	// TODO - setTimeout to 100 as in hoverDelay
//                 	$(this).find('.all-causes-title').fadeOut(250);
//                 	console.log('in hover');
//                 }).on('mouseleave', 'li', function() {
//                     $(this).find('.all-causes-title').fadeIn(250); // repetition!!
//                 });
//                 return causesHover;
//             },
//             hoverDirectionAware: function(el) {
//             	el.each(function() {
//             		$(this).hoverdir({
//             			speed: 300,
//             			hoverDelay: 100
//             		});
//             	});
//             	return causesHover;
//             }
//         }

//         $(document).ready(function() {
//         	console.log('StaticPages#causes');
//         	causesHover.onReady();
//         });
//     }(window.jQuery, window, document));
// };