var dialogSwiper
//KOGL-K-1-V
$(function () {
    // 상세페이지
    boardViewSwiper = new Swiper('.board-view__inner .board-view__swiper', {
        slidesPerView: 1,
        loop: false,
        pagination: {
            el: '.board-view__inner .board-view__swiper-ctrl-pagination',
            type: 'fraction',
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.board-view__inner .board-view__swiper-ctrl-button-next',
            prevEl: '.board-view__inner .board-view__swiper-ctrl-button-prev',
        },
    });
    $(".board-view__inner .board-view__swiper-ctrl-button-stop").click(function () {
        $(this).addClass('dn')
        $('.board-view__inner .board-view__swiper-ctrl-button-play').removeClass('dn')
        boardViewSwiper.autoplay.stop();
    });

    $(".board-view__inner .board-view__swiper-ctrl-button-play").click(function () {
        $(this).addClass('dn')
        $('.board-view__inner .board-view__swiper-ctrl-button-stop').removeClass('dn')
        boardViewSwiper.autoplay.start();
    });

    // 상세페이지 관련저작물
    var boardViewRelevantSwiper = new Swiper('.board-view__relevant-swiper', {
        slidesPerView: 1,
        loop: false,
        spaceBetween: 20,
        watchSlidesProgress: true,
        touchRatio: 0,
        observer: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.board-view__relevant .board-view__swiper-ctrl-button-next',
            prevEl: '.board-view__relevant .board-view__swiper-ctrl-button-prev',
        },
        breakpoints: {
            500: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1300: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1600: {
                slidesPerView: 4,
                spaceBetween: 30,
            }
        }, 
        on: {
            init: function(boardViewRelevantSwiper) {
                boardViewRelevantSwiper.autoplay.stop();
                var item = $('.board-view__relevant-swiper')
                item.find('.swiper-slide').removeAttr('tabindex')
                item.find('button,a').attr('tabindex', -1)
                item.find('.swiper-slide-visible button,.swiper-slide-visible ,a').removeAttr('tabindex')
            },
            slideChangeTransitionEnd: function () {
                var item = $('.board-view__relevant-swiper')
                item.find('button,a').attr('tabindex', -1)
                item.find('.swiper-slide-visible button,.swiper-slide-visible ,a').removeAttr('tabindex')
            }
        }
    });
    $(".board-view__relevant .board-view__swiper-ctrl-button-stop").click(function () {
        $(this).addClass('dn')
        $('.board-view__relevant .board-view__swiper-ctrl-button-play').removeClass('dn')
        boardViewRelevantSwiper.autoplay.stop();
    });
    $(".board-view__relevant .board-view__swiper-ctrl-button-play").click(function () {
        $(this).addClass('dn')
        $('.board-view__relevant .board-view__swiper-ctrl-button-stop').removeClass('dn')
        boardViewRelevantSwiper.autoplay.start();
    });
    // 다른테마 보기
    new Swiper('.theme-swiper__list', {
        slidesPerView: 1,
        loop: false,
        spaceBetween: 20,
        navigation: {
            nextEl: '.theme-swiper__button-next',
            prevEl: '.theme-swiper__button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1300: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1500: {
                slidesPerView: 4,
                spaceBetween: 20,
            }
        },
    });
    // 상세페이지 타이틀 중복 복사
    const viewTitleClone = $('.board-view__info h2').clone();
    const viewTitlehtml = $('.board-view__inner').prepend(viewTitleClone);
     //글꼴
    $('.board-view__inner-wide-view').addClass('swiper');
    $('.board-view__inner-wide-view-inner').addClass('swiper-wrapper')
    $('.board-view__inner-wide-view-inner .thumbnail').addClass('swiper-slide')
    fontViewSwiper = new Swiper('.board-view__inner-wide-view', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        navigation: {
            prevEl: '.board-view__inner-wide-view-button-prev',
            nextEl: '.board-view__inner-wide-view-button-next',
        },
        breakpoints: {
            991: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
        },
    })



    $(".photo-list__thumnail").removeAttr("tabindex");
});