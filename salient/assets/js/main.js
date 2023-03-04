
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


    // Slideshow TODO: resize tako da sve lepo izgledaju
    var images = [
        'images/img1.jpg',
        'images/img2.jpg',
        'images/img3.jpg',
        'images/img4.jpg',
        'images/img5.jpg',
        'images/img6.jpg'
    ];
    
    //Preload the images
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
        Start slider
    =============================================== */

    // Ovo sluzi ako imamo vise naslova da se faduju, nepotrebno sad
    // $('.caption-slides').bxSlider({
    //   pager: false,
    //   mode: 'fade',
    //   adaptiveHeight: true,
    //   controls: false,
    //   auto: true
    // });

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

    // TODO: the request is sent with status 200 but the data isn't written in weddinglistrsvp.csv
    $(document).ready(function() {
        $('#rsvpform').submit(function(event) {
          event.preventDefault(); 
      
          $('#submit').attr('disabled','disabled');
      
          var form = $(this);
          var url = form.attr('action');
          var formData = form.serialize(); 
      
          $.post(url, formData)
            .done(function(data) {
              // Parse the response to check for success message
              if (data.indexOf("success") != -1) {
                // Extract name and surname from form data
                var name = form.find('input[name="name"]').val();
                var surname = form.find('input[name="surname"]').val();
      
                // Open the CSV file and write the name and surname
                var file = 'weddinglistrsvp.csv';
                var data = [name, surname];
                var file_open = fopen($file, 'a');
                fputcsv($file_open, $data);
                fclose($file_open);
      
                // Show success message
                $('#alert').html('Hvala! Uspješno ste potvrdili svoj dolazak.').addClass('alert-success').slideDown('slow');
              } else {
                // Show error message
                $('#alert').html('Došlo je do greške, molimo pokušajte ponovo.').addClass('alert-danger').slideDown('slow');
              }
            })
            .fail(function() {
              // Show error message
              $('#alert').html('Došlo je do greške, molimo pokušajte ponovo.').addClass('alert-danger').slideDown('slow');
            })
            .always(function() {
              // Enable submit button
              $('#submit').removeAttr('disabled');
            });
        });
      });

    // Countdown
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