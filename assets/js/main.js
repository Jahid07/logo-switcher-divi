; (function($){

    $(window).load(function(){        
        
        $('.logo_container a').addClass('main-logo'); //Add class to main logo
        $('.logo_container').append('<a class="second-logo" href="'+ dslLogoAttr.homeUrl +' "><img src="'+ dslLogoAttr.dlsLogo +' " alt=" '+ dslLogoAttr.imgAlt +'" id="logo" data-height-percentage="'+ dslLogoAttr.logoHeight +'" /></a>'); // Add scrolling logo 
        
        $('.second-logo').hide(); //Hide second logo by default
       

        $(window).scroll(function () {

            if ($('#main-header').hasClass('et-fixed-header')) {
                $('.main-logo').hide(); // Hide main logo on scroling
                $('.second-logo').show(); // Show second logo on scroling               
            }
            else {
                $('.main-logo').show(); // Show main logo
                $('.second-logo').hide(); // Hide second logo on scroling                
            }
        }); 
    })

})(jQuery);