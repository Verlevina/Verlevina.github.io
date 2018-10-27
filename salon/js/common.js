$(document).ready(function() {

    /* Mmenu */
    $("#my-menu").mmenu({
        extensions: ['effect-menu-slide','theme-black', 'pagedim-black'],
        offCanvas: {
            position: "right"
        },
        navbar: {
            title: '<img src="../img/logo-1.svg" alt="" width="125px" height="24px"/>'
        }
    }, {
        offCanvas: {
            pageSelector: "#page-wrapper",
        },
        drag: {
            menu: true,
        },

    });

    var API = $("#my-menu").data("mmenu");
    var $menuBtn = $("header .hamburger");

    API.bind( "open:finish", function() {
        $menuBtn.addClass('is-active');
    });

    API.bind( "close:finish", function() {
        $menuBtn.removeClass('is-active');
    });


    // карусель
    $('.carousel__services').on('initialized.own.carousel', function(){
        setTimeout(function() {
            carouselService();
        },100)
    });
    $('.carousel__services').owlCarousel({
            loop:true,
            margin:0,
            nav:true,
            dots:false,
            smartSpeed:700,
            responsiveClass:true,
            responsive:{
            0:{
                items:1,
            },
            800:{
              items:2,
            },
            1100:{
                items:3,
            }
            },
            navText:['<i class="fa fa-angle-double-left"></i>','<i class="fa fa-angle-double-right"></i>']});

$('select').selectize({
    create: true,
    sortField: 'text'

});
    //
    // $('.owl-carousel-2').owlCarousel({
    //     loop:true,
    //     margin:100px,
    //     nav:true,
    //     dots:false,
    //     smartSpeed:700,
    //     responsiveClass:true,
    //     });


    //E-mail Ajax Send
    $("form.callback").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            $(th).find('.success').addClass('active').css('display','flex').hide().fadeIn();
            setTimeout(function() {
                $(th).find('.success').removeClass('active').fadeOut();
                th.trigger("reset");
            }, 3000);
        });
        return false;
    });
$('.rewievs').owlCarousel({
    loop:true,
    margin:20,
    items:1,
    smartSpeed:700,
    nav:false,
    dots:true,
    responsiveClass:true,
    autoHeight:true,
    });
    $('.partners-carousel').owlCarousel({
        loop:true,
        margin:40,
        items:4,
        smartSpeed:700,
        nav:true,
        dots:false,
        responsiveClass:true,
        responsive:{
            0:{
                items:2,
            },
            800:{
                items:4,
            },
            1100:{
                items:4,
            }
        },
    });

});
