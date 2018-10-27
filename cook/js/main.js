// управление меню в мобильной версии

var a=document.getElementsByTagName('a');
for (var i=0;i<a.length;i++ ) {
    a[i].addEventListener('click', activeClick);
}


function activeClick(event){
    document.getElementsByClassName('active')[0].classList.remove('active');
    this.classList.add('active');
}
//активная текущая ссылка
for (var i=0;i<a.length;i++ ) {
    a[i].addEventListener('click', activeClick);
}
//скролл для навигации
jQuery(document).ready(function() {
    jQuery(".scrollto a").click(function () {
        elementClick = jQuery(this).attr("href");
        destination = jQuery(elementClick).offset().top - 0;
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
        return false;
    });
});


var main = function() { //главная функция
    var nav=$('nav');
    var body=$('body');
    var navRight=0;
    var bodyRight=135;
    var navRightBegin=-135;
    var bodyRightBegin=0;
    nav.css('right',navRightBegin);
    body.css('right',bodyRightBegin);
    $('.navButton').on('click', function() {
        if (nav.css('right') == navRightBegin+'px') {

            nav.animate({
               right:navRight
            }, 200);

            body.animate({
               right:bodyRight
            }, 200);
        }
        if (nav.css('right') == navRight+'px') {
            nav.animate({
               right:navRightBegin
            }, 200);

            body.animate({
               right:bodyRightBegin
            }, 200);
        }
    });
};


    /* Закрытие меню */
//
//     $('.icon-close').click(function() { //выбираем класс icon-close и метод click
//
//         $('.menu').animate({ //выбираем класс menu и метод animate
//
//             right: '-285px' /* при клике на крестик меню вернется назад в свое
//              положение и скроется */
//
//         }, 200); //скорость движения меню в мс
//
//         $('body').animate({ //выбираем тег body и метод animate
//
//             right: '0px' //а содержимое страницы снова вернется в положение 0px
//
//         }, 200); //скорость движения меню в мс
//     });
// };

$(document).ready(main); /* как только страница полностью загрузится, будет
 вызвана функция main, отвечающая за работу меню *//**
 * Created by Ника on 04.05.2018.
 */
