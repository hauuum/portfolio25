// 문자
$('.number-inc').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-max');
    $({ countNum: $this.text()}).animate({
        countNum: countTo
    },
    {
        duration: 1500,
        easing:'linear',
        step: function() {
            $this.text(Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        },
        complete: function() {
            $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }
    });
});

// 기관별 공공저작물
new Swiper(".agency-swiper", {
    loop:false,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: ".agency-swiper__button-next",
        prevEl: ".agency-swiper__button-prev",
    },
    breakpoints: {
        375: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        1460: {
            slidesPerView: 6,
            spaceBetween: 20,
        },
    },
});

// 배너 swiper
var mainBannerSwiper = new Swiper(".main-banner__list", {
    slidesPerView: 1,
	loop:false,
    navigation: {
        nextEl: ".main-banner__button-next",
        prevEl: ".main-banner__button-prev",
    },
    pagination: {
        el: ".main-banner__pagination",
        clickable: true,
        type: 'bullets',
        renderBullet: function (index, className) { 
            return '<a href="javascript:void(0);"  class="' + className + '"> <span class="sr-only">' + (index + 1) + '번째 배너</span></a>'
        },
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span> / ' +
                '<span class="' + totalClass + '"></span>';
        }
    },
    a11y: {
        prevSlideMessage: '이전 슬라이드',
        nextSlideMessage: '다음 슬라이드',
        // slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    on: {
        init: function() {
            $(".main-banner__ctrl .swiper-pagination-bullet-active").attr('aria-label', '선택됨')
        },
        slideChange: function() {
            $(".main-banner__ctrl .swiper-pagination-bullet-active").attr('aria-label', '선택됨').siblings().removeAttr('aria-label')
        }
    }

});
$('.main-banner__button-stop').on('click',function(){
    $(this).addClass('dn')
    $('.main-banner__button-play').removeClass('dn')
    mainBannerSwiper.autoplay.stop();
});
$('.main-banner__button-play').on('click',function(){
    $(this).addClass('dn')
    $('.main-banner__button-stop').removeClass('dn')
    mainBannerSwiper.autoplay.play();
});

// 메인 - 테마로 보는 저작물
var mainThemeSwiper = undefined;
function initSwiper(){
	var screenWidth = $(document).width();
	if (screenWidth < 992 && mainThemeSwiper == undefined) {
		$('.main-content__theme').addClass('swiper');
		$('.main-content__theme .row').addClass('swiper-wrapper')
		$('.main-content__theme-item').addClass('swiper-slide')
		mainThemeSwiper = new Swiper(".main-content__theme.swiper", {
			slidesPerView: 1,
            spaceBetween: 0,
			loop: false,
			pagination: {
				el: ".main-content__theme-pagination",
                clickable: true,
                type: 'bullets',
                renderBullet: function (index, className) { 
                    return '<a href="javascript:;"  class="' + className + '"> <span class="sr-only">' + (index + 1) + '번째 테마로 보는 저작물</span></a>'
                },
                renderFraction: function (currentClass, totalClass) {
                    return '<span class="' + currentClass + '"></span> / ' +
                        '<span class="' + totalClass + '"></span>';
                }
			}
		});
	} else if(screenWidth > 991  && mainThemeSwiper != undefined) {
		$('.main-content__theme').removeClass('swiper swiper-initialized swiper-horizontal swiper-pointer-events')
		$('.main-content__theme .row').removeClass('swiper-wrapper').removeAttr('id style aria-live');
		$('.main-content__theme-item').removeClass('swiper-slide swiper-slide-active swiper-slide-next').removeAttr('style role aria-label')
		mainThemeSwiper.destroy();
        mainThemeSwiper = undefined;
	}
}
initSwiper();

$(window).bind('resize load', function () {
	// 메인 - 테마로 보는 저작물
	initSwiper();
})

// 테마로 보는 저작물1
new Swiper(".theme-swiper1 .main-content__theme-swiper", {
    loop:false,
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
        nextEl: ".theme-swiper1 .main-content__theme-button-next",
        prevEl: ".theme-swiper1 .main-content__theme-button-prev",
    },
    breakpoints: {
        500: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        992: {
            slidesPerView: 5,
            spaceBetween: 20,
        }
    },
});

// 테마로 보는 저작물2
new Swiper(".theme-swiper2 .main-content__theme-swiper", {
    loop:false,
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
        nextEl: ".theme-swiper2 .main-content__theme-button-next",
        prevEl: ".theme-swiper2 .main-content__theme-button-prev",
    },
    breakpoints: {
        500: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        992: {
            slidesPerView: 5,
            spaceBetween: 20,
        }
    },
});

// 다른 테마 보기 버튼
$(function () {
    $('#mainContentSelect .select-btn').on('click', function(){
        $(this).siblings('.main-content__select-list').toggleClass('on')
        if($('.main-content__select-list').hasClass('on')){
            $(this).attr('title', '다른 테마 목록 열림');
        }else{
            $(this).attr('title', '다른 테마 목록 보기');
        }
    })
    // 이달의 인기저작물
    $(".main-content01 .tabpanel").hide();
    $(".main-content01 .tabpanel:first").show();

    $(".main-content01 .tablist a").click(function () {
        $(this).removeAttr('tabindex')
        $(".main-content01 .tablist a").removeClass("on").removeAttr('title');
        $(this).addClass("on").attr('title', '선택됨');
        $(".main-content01 .tabpanel").hide();
        var activeTab = $(this).attr("href");
        $(activeTab).fadeIn(0);
        return false;
    });


    // 공지사항 / 보도자료 
    $(".main-content05 .tabpanel").hide();
    $(".main-content05 .tabpanel:first").show();
    $(".notice-tab a").click(function () {
        $(this).removeAttr('tabindex')
        $(".notice-tab a").removeClass("on").removeAttr('title');
        $(this).addClass("on").attr('title', '선택됨');
        $(".main-content05 .tabpanel").hide();
        var activeTab = $(this).attr("href");
        $(activeTab).fadeIn(0);
        return false;
    });


    // // 모바일 select toggle UI
    // var tabSelectedSpan = $('.tablist').prepend('<button type="button" class="selected"></button>')
    // var selectBtn = $(".tablist .selected");
    // let allOptions = $(".tablist ul a")


    // $('.tablist').each(function(index, item){
    //     var tabSelected = $(item).find('li .tab.on').html();
    //     var tabSelectedhtml = $(item).find('.selected').html(tabSelected);
    // })
    
    // selectBtn.on("click", function () {
    //     $(this).toggleClass('on')
    
    //     if( $(this).hasClass("on") ) {
    //         $(this).attr('title', "열림");
    //         $(this).next('ul').addClass('show');
    //     }
    //     else {
    //         $(this).removeAttr('title');
    //         $(this).next('ul').removeClass('show');
    //     }
    // });

    // allOptions.on("click", function () {
    //     $(this).parents('.tablist').find('.selected').html()
    //     var tabSelectedTxt = $(this).parents('.tablist').find('li .tab.on').html();

    //     $(this).parents('.tablist').find('.selected').html(tabSelectedTxt)
    //     //allOptions.removeClass('on')
        
    //     $(this).parents('.tablist').find('.selected').removeClass("on").next("ul").removeClass("show");
    // });



});

// 금주의 검색어 
var swiper = new Swiper(".tagSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        enabled: true,
        nextEl: ".tag__button-next",
        prevEl: ".tag__button-prev",
    },
    breakpoints: {
        767: {
            slidesPerView: 'auto',
            spaceBetween: 30,
        }
    }
});
$('.tag__button-next, .tag__button-prev').attr('tabindex', 0)

//검색창 자동완성 기능 사용안함 처리
$(".auto-complete .toggle").on("click", function(){
    if( $(this).is(":checked") ) {
        $(".auto-complete").addClass("disuse")
        $(this).closest('.auto-complete__footer').find('span').text('자동완성 켜기')
    }
    else {
        $(".auto-complete").removeClass("disuse")
        $(this).closest('.auto-complete__footer').find('span').text('자동완성 끄기')
    }
})

//메인 관리자 팝업존 swiper
var options = {};
if ( $("#popupArea .swiper .swiper-slide").length == 1) {
    options = {
        slidesPerView: 1,	// 보여지는 슬라이드 갯수
        spaceBetween: 0,	// 마진값
        watchOverflow: true,
        touchRatio: 0,
        loop: false,
        autoplay: false,
        pagination: false,
    }
    $(".swiper__bottom").css({display: "none"});
} 
else {
    options = {
        slidesPerView: 1,	// 보여지는 슬라이드 갯수
        spaceBetween: 0,	// 마진값
        watchOverflow: true,
        loop: true,
        touchRatio: 0,
        pagination: {
            el: ".swiper-pagination",
            clickable: true, 
        },
        autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
            delay : 5000,  //시간 설정
            disableOnInteraction : false,
        },
        loopedSlides: 1,
        on: {
            slideChangeTransitionStart: function () {
                $(".pop-tt").text($(".swiper-slide-active a").data("atta"))
            }
        },
        a11y: {
            prevSlideMessage: '이전 슬라이드',
            nextSlideMessage: '다음 슬라이드',
            slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
        },
    }
    $(".swiper__bottom").css({display: "flex"});
}
var popupSwiper = new Swiper("#popupArea .swiper", options);

//관리자 팝업존 자동재생 멈춤
$('#popupArea .swiper__stop').on('click', function () {
    $(this).hide().next().show().focus()
    popupSwiper.autoplay.stop();
});

//관리자 팝업존 자동재생 시작
$('#popupArea .swiper__play').on('click', function () {
    $(this).hide().prev().show().focus()
    popupSwiper.autoplay.start();
});


// //팝업 내 마지막 요소 blur시 맨 첫번쨰 요소로 포커스 이동하기
// $(".sh-detail-pop button:last").on("blur", function(){
//     $(".sh-detail-pop").find(".i-close").focus();
// })

//이용조건 팝업 열기
// $(".shInfo").on("click", function(){
//     $(".use-info").addClass('on').attr('tabindex', 0)
//     $(".use-info.on").find('.use-info__body').attr('tabindex', 0)
//     $(".sh-detail-pop").attr('tabindex', -1).addClass("dark");
// })

// //이용조건 팝업 닫기
// $(".use-info .i-close-wh").on("click", function(){
//     $(".use-info").removeClass("on").find(".use-info__body").removeAttr('tabindex')
//     $(".sh-detail-pop").removeAttr('tabindex').removeClass("dark");
// })

//공공누리 일반 증서 이용약관 팝업 시 접근성
$('body').on('click', function(){
	
    if( $(this).hasClass('has-dialog')) {
        $(this).attr('tabindex', -1)
    }
    else {
        $(this).removeAttr('tabindex')
    }
})