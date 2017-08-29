	$(document).ready(function() {



	// fade images
	var duration = 36; // duration in seconds
	var fadeAmount = 0.4; // fade duration amount relative to the time the image is visible


  var images = $("#slideshow img");
  var numImages = images.size();
  var durationMs = duration * 1000;
  var imageTime = durationMs / numImages; // time the image is visible 
  var fadeTime = imageTime * fadeAmount; // time for cross fading
  var visibleTime = imageTime  - (imageTime * fadeAmount * 2);// time the image is visible with opacity == 1
  var animDelay = visibleTime * (numImages - 1) + fadeTime * (numImages - 2); // animation delay/offset for a single image 
  
  images.each( function( index, element ){
    if(index != 0){
      $(element).css("opacity","0");
      setTimeout(function(){
        doAnimationLoop(element,fadeTime, visibleTime, fadeTime, animDelay);
      },visibleTime*index + fadeTime*(index));
    }else {
      setTimeout(function(){
        $(element).animate({opacity:0},fadeTime, function(){
          setTimeout(function(){
            doAnimationLoop(element,fadeTime, visibleTime, fadeTime, animDelay);
          },animDelay)
        });
      },visibleTime + fadeTime);
      $(element).animate({opacity:1}, fadeTime);
    }
  });


// creates a animation loop
function doAnimationLoop(element, fadeInTime, visibleTime, fadeOutTime, pauseTime){
  fadeInOut(element,fadeInTime, visibleTime, fadeOutTime ,function(){
    setTimeout(function(){
      doAnimationLoop(element, fadeInTime, visibleTime, fadeOutTime, pauseTime);
    },pauseTime);
  });
}

// shorthand for in- and out-fading
function fadeInOut( element, fadeIn, visible, fadeOut, onComplete){
  return $(element).animate( {opacity:1}, fadeIn ).delay( visible ).animate( {opacity:0}, fadeOut, onComplete);
}


	// Scroll Events
	$(window).scroll(function(){

		var wScroll = $(this).scrollTop();

		// Activate menu
		if (wScroll > 20) {
			$('#main-nav').addClass('active');
			$('#slide_out_menu').addClass('scrolled');
		}
		else {
			$('#main-nav').removeClass('active');
			$('#slide_out_menu').removeClass('scrolled');
		};


		//Scroll Effects

	});


	// Navigation
	$('#navigation').on('click', function(e){
		e.preventDefault();
		$(this).addClass('open');
		$('#slide_out_menu').toggleClass('open');

		if ($('#slide_out_menu').hasClass('open')) {
			$('.menu-close').on('click', function(e){
				e.preventDefault();
				$('#slide_out_menu').removeClass('open');
			})
		}
	});


	// Price Table
	var individual_price_table = $('#price_tables').find('.individual');
	var company_price_table = $('#price_tables').find('.company');


	$('.switch-toggles').find('.individual').addClass('active');
	$('#price_tables').find('.individual').addClass('active');

	$('.switch-toggles').find('.individual').on('click', function(){
		$(this).addClass('active');
		$(this).closest('.switch-toggles').removeClass('active');
		$(this).siblings().removeClass('active');
		individual_price_table.addClass('active');
		company_price_table.removeClass('active');
	});

	$('.switch-toggles').find('.company').on('click', function(){
		$(this).addClass('active');
		$(this).closest('.switch-toggles').addClass('active');
		$(this).siblings().removeClass('active');
		company_price_table.addClass('active');
		individual_price_table.removeClass('active');			
	});


	// Wow Animations
    wow = new WOW(
      {
      boxClass:     'wow',      // default
      animateClass: 'animated', // default
      offset:       0,          // default
      mobile:       true,       // default
      live:         true        // default
    }
    )
    wow.init();


    // Menu For Xs Mobile Screens
    if ($(window).height() < 450) {
    	$('#slide_out_menu').addClass('xs-screen');
    }

    $(window).on('resize', function(){
	    if ($(window).height() < 450) {
	    	$('#slide_out_menu').addClass('xs-screen');
	    } else{
	    	$('#slide_out_menu').removeClass('xs-screen');
	    }
    });


    // Magnific Popup
    $(".lightbox").magnificPopup();



});
