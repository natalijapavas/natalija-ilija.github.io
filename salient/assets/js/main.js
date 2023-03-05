
var $ = jQuery.noConflict();

$(document).ready(function($) {
    "use strict";

    /* global google: false */

    /* ==============================================
        Full height home-section
    =============================================== */
    
	var windowHeight = $(window).height(),
		topSection = $('#start-section');
	topSection.css('height', windowHeight);

	$(window).resize(function(){
		var windowHeight = $(window).height();
		topSection.css('height', windowHeight);       
	});

    /* ==============================================
        Slideshow
    =============================================== */

    var imagesDesktop = [
        'images/venecija_landscape.jpg',
        'images/valensija1_landscape.jpg',
        'images/ronjenje_landscape.jpg',
        'images/barselona2_landscape.jpg', 
        'images/budimpesta_landscape.jpg',
        'images/egipat1_landscape.jpg',
        'images/hercegnovi2017_landscape.jpg',
        'images/atina1_landscape.jpg',
        'images/barselona5_landscape.jpg',
        'images/atina2_landscape.jpeg',
        'images/lubenice_landscape.jpg',
        'images/prag_landscape.jpg',
        'images/egipat3_landscape.jpg',
        'images/veridba_landscape.jpg',
        'images/skijanjekop_landscape.jpg',
        'images/sah_landscape.jpg',
        'images/madrid_landscape.jpg',
        'images/zlatibor_landscape.jpeg',
        'images/ivanjica_landscape.webp',
        'images/skijanjebansko_landscape.jpg',
        'images/egipat2_landscape.jpg',
        'images/skijanjebansko2_landscape.jpg',
        'images/valensija2_landscape.jpg',
        'images/pariz2_landscape.jpg'
    ];

    var imagesMobile = [
        'images/egipat1_landscape.jpg',
        'images/barselona4_portrait.jpg',
        'images/plaza_portrait.jpg',
        'images/barselona_portrait.jpg',
        'images/atina_portrait.jpg',
        'images/madrid1_portrait.jpg',
        'images/lubenice_landscape.jpg',
        'images/prag_landscape.jpg',
        'images/egipat3_landscape.jpg',
        'images/barselona2_portrait.jpg',
        'images/rafting_portrait.jpg',
        'images/skijanjekop_landscape.jpg',
        'images/atina2_portrait.jpg',
        'images/madrid_landscape.jpg',
        'images/barselona3_portrait.jpg',
        'images/ivanjica_landscape.webp',
        'images/barselona5_portrait.jpg',
        'images/atina3_portrait.jpeg',
        'images/valensija2_landscape.jpg',
        'images/pariz_portrait.jpg'
    ];

    var images = imagesDesktop;
    
    if ($(window).width() < 768) {
        images = imagesMobile;
    }

    var loadedImages = [];
    var imageCount = 0;
    for (var i = 0; i < images.length; i++) {
        var img = new Image();
        img.onload = function() {
            imageCount++;
            if (imageCount === images.length) {
            startSlideshow();
            }
            };
        img.src = images[i];
        loadedImages.push(img);
    
    // add an event listener for window resize
    $(window).on('resize', function() {
        if ($(window).width() < 768) {
            images = imagesMobile;
        } else {
            images = imagesDesktop;
        }
    });
    //-------------------------------------------------------------------

    function startSlideshow() {
        var imageIndex = 0;
        var landingStart = document.querySelector('.landing-start');
        landingStart.style.backgroundImage = 'url("' + images[imageIndex] + '")';
      
         setInterval(function() {
            imageIndex = (imageIndex + 1) % images.length;
        
            landingStart.classList.add('fadeout');
            setTimeout(function() {
            landingStart.style.backgroundImage = 'url("' + images[imageIndex] + '")';
            landingStart.classList.remove('fadeout');
            }, 500);
        }, 5000);
      }
    }        
    /* ==============================================
        Collapse menu on click
    =============================================== */

        $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
            if($(window).width() < 768 )
                $('.navbar-collapse').collapse('hide');
        });

    /* ==============================================
        Scrollspy
    =============================================== */

        $('body').scrollspy({
           target: '#navigation-nav',
           offset: 140      //px/
        });

    /* ==============================================
        Parallax
    =============================================== */
    
    $.stellar({
        responsive: true,
        horizontalScrolling: false,
        verticalOffset: 0
    });

    /* ==============================================
        Smooth Scroll on anchors
    =============================================== */  

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
                  scrollTop: target.offset().top -66
            }, 1000);
            return false;
          }
        }
    });

    /* ==============================================
     Bootstrap Tooltip
    =============================================== */

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    /* ==============================================
        Counter increment
    =============================================== */

    function countUp() {   
        var dataperc;   
        $('.statistic-percent').each(function(){
            dataperc = $(this).attr('data-perc'),
            $(this).find('.percentfactor').delay(6000).countTo({
                from: 0,                 // number to begin counting
                to: dataperc,      
                speed: 1000,             // ms
                refreshInterval: 10,
            });  
        });
    }
        
    $('.statistic-percent').waypoint(function() {
        countUp();
    },
    {
        offset: '95%',                 
        triggerOnce: true
    });

    /* ==============================================
    Placeholder
    =============================================== */ 

    $('input, textarea').placeholder();

    /* ==============================================
        Animated content
    =============================================== */

    $('.animated').appear(function(){
        var el = $(this);
        var anim = el.data('animation');
        var animDelay = el.data('delay');
        if (animDelay) {

            setTimeout(function(){
                el.addClass( anim + " in" );
                el.removeClass('out');
            }, animDelay);

        }

        else {
            el.addClass( anim + " in" );
            el.removeClass('out');
        }    
    },{accY: -150});  


    /* ==============================================
    RSVP Form
    =============================================== */

    // Get the success message element
    var successMessage = $('#success-message');

    // If the success message element exists
    if (successMessage.length) {
    // Fade it out after 5 seconds
    setTimeout(function() {
        successMessage.fadeOut();
    }, 5000);
    }

    /* ==============================================
    Countdown
    =============================================== */
    // To change date, simply edit: var endDate = "June 26, 2015 20:39:00";
    $(function() {
      var endDate = "May 19, 2023 17:00:00";
      $('.soon-countdown .row').countdown({
        date: endDate,
        render: function(data) {
          $(this.el).html('<div><div><span>' + (parseInt(this.leadingZeros(data.years, 2)*365) + parseInt(this.leadingZeros(data.days, 2))) + '</span><span>days</span></div><div><span>' + this.leadingZeros(data.hours, 2) + '</span><span>hours</span></div></div><div class="lj-countdown-ms"><div><span>' + this.leadingZeros(data.min, 2) + '</span><span>minutes</span></div><div><span>' + this.leadingZeros(data.sec, 2) + '</span><span>seconds</span></div></div>');
        }
      });
    });


    /* ==============================================
    Fade In .back-to-top
    =============================================== */

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0,
            easing: 'swing'
        }, 750);
        return false;
    });

    /* ==============================================
        Responsive video
    =============================================== */
    
        $(".project-video, .video-creative, .video-post").fitVids();
        

    /* ==============================================
        MagnificPopup - lightbox effect
    =============================================== */
    
        // Example with multiple objects
        $('.zoom').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });

        $('.video-pop-up').magnificPopup({
            type: 'iframe',
        });

});

$(window).load(function(){
    "use strict";
    
    /* ==============================================
    Isotope
    =============================================== */

        // FIlter
        if( $("#filter").length>0 ) {
            var container = $('#filter');
            container.isotope({
                itemSelector: '.gallery-item',
                transitionDuration: '0.8s'
            });
            $(".filter").click(function(){
                $(".filter.active").removeClass("active");
                $(this).addClass("active");
                var selector = $(this).attr('data-filter');
                container.isotope({ 
                    filter: selector
                });
                return false;
            });

            $(window).resize(function(){
                setTimeout(function(){
                    container.isotope();
                },1000);
            }).trigger('resize');
        }


            if ( $('#type-masory').length ) {

            var $container = $('#type-masory');

            $container.imagesLoaded( function(){
              $container.fadeIn(1000).isotope({
                itemSelector : '.masonry-item'
              });
            });
        }

    /* ==============================================
    Preloader
    =============================================== */

    // will first fade out the loading animation
    $("#loading-animation").fadeOut();
    // will fade out the whole DIV that covers the website.
    $("#preloader").delay(600).fadeOut("slow");

});