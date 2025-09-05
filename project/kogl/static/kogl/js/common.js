var currentFocus = null;
var currentBtn=null;
var ismobile = false;
var winWidth;

$(document).on('click','#dialogVideoPreview > div.head > button', function () {
	// 비디오 미리보기 미리보기 종료시 제거
	$('#myvideo').empty()
});

// 모달 키보드 접근성 처리
$(document).on('click','.photo-list__layer-top button', function () {
	currentBtn=$(this)
	console.log(currentBtn)
	console.log(currentBtn[0].dataset.value);
	
});

$(document).on('click','[id^="audioButton_"]', function () {
	currentBtn=$(this)
	console.log(currentBtn)
    $('.sound-play__close').focus()
});

$(document).on('click','.dialog-close, .sound-play__close', function () {
	console.log(currentBtn)
	if(currentBtn!==null)
		currentBtn.focus()
});

function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('GET', url, false);
    http.send();
    return http.status!=404;
}
function isMobile(){
	var UserAgent = navigator.userAgent;
	if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
	{
		return true;
	}else{
		return false;
	}
}


// 팝업
// function lpopOpen(trigger, target) {
// 	$(target).addClass('active');
// 	$(target).attr('tabindex', 0).focus();
// 	currentfocus = trigger;
// 	$('body').addClass('ovh');
// }
// function lpopClose(target) {
// 	$('body').removeClass('ovh');
// 	$(target).removeClass('active');
// 	if (currentfocus !== null) currentfocus.focus();
// }


if (window.innerWidth < 1200) {
	ismobile = true;
}
$(window).resize(function () {
	if (window.innerWidth < 1200) {
		ismobile = true;
	} else {
		ismobile = false;
	}
});

// 스크롤 이벤트
var scrollEvent = {
	// top-button 메뉴
	topBtn: function () {
		$(window).on('scroll', function () {
			let scrTop = $(window).scrollTop();
			let scrlBottom = $(document).height() - $(window).height() - $(window).scrollTop();
			if (scrlBottom >= 300) {
				$('.top-button').addClass('fixed');
			} else {
				$('.top-button').removeClass('fixed');
			}
			if (scrTop < 150) {
				$('.top-button').removeClass('fixed');
			}
		});
	},
	// 오디오 미리듣기
	soundBtn: function () {
		$(window).on('scroll', function () {
			let scrlBottom = $(document).height() - $(window).height() - $(window).scrollTop();
			let mainFooter = $('#footer').height()
			if (scrlBottom - 30 >= mainFooter) {
				$('.sound-play').removeClass('on');
			} else {
				$('.sound-play').addClass('on');
			}
		});
	}
}

var imgListSetting = {
	init: function() {
		$('.photo-list__img .img img').each(function() {
			var $img = $(this);
			var imgSrc = $img.attr('src');
			
			// 이미지 로드 이벤트 처리
			$img.one('load', function() {
				if(this.naturalWidth === 0) {
					$img.attr('src', '/static/kogl/img/common/NO-IMG.jpg');
					imgListSetting.complete(this);
				} else {
					imgListSetting.complete(this);
				}
			}).one('error', function() {
				$img.attr('src', '/static/kogl/img/common/NO-IMG.jpg');
				imgListSetting.complete(this);
			});

			// 이미 이미 로드된 경우
			if(this.complete) {
				$(this).trigger('load');
			}
		});
	},

	complete: function(target) {
		var $target = $(target);
		var w = $target[0].naturalWidth;
		var h = $target[0].naturalHeight;
		var fg = w / h;
		var fb = 220 * fg;
		var mw = fb * 1.3363;
		var paddingtop = (h / w * 100) + '%';

		$target.parents('.photo-list__img .img').css({
			'padding-top': paddingtop
		});

		$target.parents('.photo-list__img')
			.parents('.photo-list__item')
			.attr('style', `
				flex-basis: ${fb}px;
				flex-grow: ${fg};
				max-width: ${mw}px
			`)
			.addClass('loadcomplete');
	}
};
$(".photo-list__thumnail").removeAttr("tabindex");

var HoverEvent = {
    photoList : function(){
        $('.photo-list__img').on('mouseenter focus keyup', function () {
            $(this).siblings('.photo-list__layer').addClass('on')
        })
        $('.photo-list__thumnail').on('mouseenter focus keyup', function () {
            $(this).siblings('.photo-list__layer').addClass('on').focus()
        })
        $('.photo-list__inner').on('mouseleave blur', function () {
            $(this).find('.photo-list__layer').removeClass('on')
        })
        $('.photo-list__layer').on('mouseleave blur', function () {
            $(this).removeClass('on')
        })
        $('.photo-list__layer .like').on('keydown', function(){
            $(this).parents('.photo-list__layer').removeClass('on')
        })
        $('.photo-list__button').on('mouseenter focus keyup', function () {
            $(this).siblings('.photo-list__layer').removeClass('on')
        })
        $('.photo-list__title a').on('mouseenter focus keyup', function () {
            $(this).parent('.photo-list__title').siblings('.photo-list__inner').find('.photo-list__layer').removeClass('on')
        })
    },
}

$(function () {
	// 스크롤 이벤트
	scrollEvent.topBtn();
	scrollEvent.soundBtn();
	// 마우스 이벤트
	// HoverEvent.photoList();
    //클릭이벤트
    //ClickEvent.dialogPreview();
    //ClickEvent.dialogPreview2();
    ClickEvent.audioPreview();//오디오 영역 셋팅
})

$(document).on('focusout','#startDate, #endDate',function(index, el) {
	if (!dateTypeCheck($(this).val()) && $(this).val()!="") {
		showtooltip();
		var title=$(this).attr('title')
		if ($(this)[0].id!='') {
			labelTitle=true;
		}else{labelTitle=false}
		if (title!=undefined) {
			alert(title+'형식이 올바르지 않습니다. 입력예 '+today());
		}else if(labelTitle){
			alert($('label[for='+$(this)[0].id+']').text()+'형식이 올바르지 않습니다. 입력예 '+today());
		}else{
			alert('날짜형식이 올바르지 않습니다. 입력예 '+today());
		}
		$(this).val('')
		dateValidatorTarget=$(this)
	}
});

//datepicker 설정
$(function () {
	if ($.datepicker!=undefined){
		$.datepicker.regional['ko'] = {
			closeText: '닫기',
			prevText: '이전달',
			nextText: '다음달',
			currentText: '오늘',
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNames: ['일','월','화','수','목','금','토'],
			dayNamesShort: ['일','월','화','수','목','금','토'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			weekHeader: 'Wk',
			dateFormat: 'yy-mm-dd',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: '년'
		};
		$.datepicker.setDefaults($.datepicker.regional['ko']);
		$("input#startDate").datepicker({
			showOn: 'button', buttonImage: '/static/commons/img/calendar.png', buttonImageOnly: true, changeMonth: true, changeYear: true, showMonthAfterYear:false,
		});
		$("input#endDate").datepicker({
			showOn: 'button', buttonImage: '/static/commons/img/calendar.png', buttonImageOnly: true, changeMonth: true, changeYear: true, showMonthAfterYear:false
		});
	}
	// 달력 언어설정
	if (typeof $.fn.datepicker != 'undefined') {
		$.fn.datepicker.dates.ko = {
			days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
			daysShort: ['일', '월', '화', '수', '목', '금', '토'],
			daysMin: ['일', '월', '화', '수', '목', '금', '토'],
			months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			today: '오늘',
			clear: '삭제',
			format: 'yyyy-mm-dd',
			titleFormat: 'yyyy년mm월',
			weekStart: 0
		};
		// yyyy
		$('input.year')
			.datepicker({
				language: "ko",
				format: "yyyy",
				dateFormat: "yyyy",
				viewMode: "years",
				minViewMode: "years",
				autoclose:true,
				ignoreReadonly: true,
			})

		// $('input.year').attr("readonly",true);
		$('input.year[name="startYear"]').attr('title','조회시작연도')
		$('input.year[name="endYear"]').attr('title','조회종료연도')
	}
	// 달력
	if(!isMobile() && typeof $.fn.datepicker != "undefined"){
		//yyyy-mm-dd
		$('input#startDate, input#endDate, input.date')
			.datepicker({
				format: "yyyy-mm-dd",
				language: "ko",
				todayHighlight: true,
				autoclose:true
			}).attr('placeholder','YYYY-MM-DD')

		$('input.year')
			.datepicker({
				language: "ko",
				format: "yyyy",
				dateFormat: "yyyy",
				viewMode: "years",
				minViewMode: "years",
				autoclose:true,
				ignoreReadonly: true,
			})

	}
});

// 링크 접근성
$('#content a').each(function () {
	if ($(this).attr('target') == '_blank' && $(this).attr('title') != '') {
		$(this).attr('title', '새창열림');
	}
});
// 공공누리 유형 모달  class="opencode-dialog-contents" load
$("#content .opencode-dialog-contents").load("/static/html/opencode.html")
// 이미지 미리보기 유형 모달  class="image-dialog-contents" load
$(".image-dialog-contents").load("/static/html/layerPopup-image.html")
// 동영상 미리보기 유형 모달  class="video-dialog-contents" load
$(".video-dialog-contents").load("/static/html/layerPopup-video.html")


// top-menu 중복 복사
const topMenuClone = $('#top-menu .top-menu-left').clone().removeClass().addClass('top-menu');
const topMenuhtml = $('#all-menu h2').after(topMenuClone);
const topMenuLink = $('#top-menu .top-menu-right').clone().removeClass().addClass('logo-link');
const topMenuLinkhtml = $('#all-menu #gnb-all-nav').after(topMenuLink);
const headerLogo = $('#header .logo > a').clone().addClass('logo');
const headerLogohtml = $('#all-menu .top-menu').prepend(headerLogo);
// 인기검색어 중복 복사
const rankingClone = $('.popular-ranking__list.swiper > .swiper-wrapper > *').clone();
const rankinghtml = $('.popular-ranking__all .popular-ranking__list').html(rankingClone);

// 안씀
// $(".popular-ranking__all .swiper-slide").removeClass('swiper-slide').addClass('item');
// $('.sub-search .popular-ranking .popular-ranking__title').on('mouseenter keyup touchdown', function(){
// 	$(this).siblings('.sub-search .popular-ranking__all').addClass('on').attr('tabindex',0)
// })
// $('.popular-ranking__all .popular-ranking__list >div:last-child a').on('focusout', function(){
// 	$(this).parents('.popular-ranking__all').removeClass('on').attr('tabindex',-1)
// })
// $('.sub-search .popular-ranking').on('mouseleave blur', function(){
// 	$('.sub-search .popular-ranking__all').removeClass('on').attr('tabindex',-1)
// })


// 전체메뉴 열기, 닫기
// const navhtml = $('#gnb > .gnb-set > ul').clone();
// const allnavhtml = $('#gnb-all-nav > ul > li').appendTo(navhtml);
// $('#all-menu #gnb-all-nav').html(navhtml.clone()).parents('#all-menu')

// $('.all-menu-button').click(function (e) {
// 	e.preventDefault();
// 	$('#all-menu').addClass('active').attr({ title: '전체메뉴 열림' });
// 	$(this).attr('tabindex', -1);

// 	// 모바일 메뉴
// 	if(ismobile==true){
// 		$('#gnb-all-nav>ul').find('.depth1 a').on('click', function (e) {
// 			if($(this).parent().find('>div,>ul').length > 0){
// 				e.preventDefault();
// 				$(this).parent().toggleClass('active')
// 			}
// 		});
// 	}
// });
// $('.all-menu-close').click(function (e) {
// 	e.preventDefault();
// 	$('#all-menu').removeClass('active').attr({ tabindex: '-1', title: '전체메뉴 닫힘' });
// 	$('.all-menu-button').removeAttr('tabindex');
// });

// 첨부파일
$("#file").on('change', function () {
	/* var fileName = $("#file").val();
	$(".upload-name").val(fileName); */
	var path = this.value.replace(/^C:\\fakepath\\/i, '')
	var filename = path.replace(/^.*\\/, "");
	$(".upload-name").val(filename);
	//$objUploadName = $(this).parent().find(".upload-name");
	//$objUploadName.val(filename);
});

$('.depth2 li').has('.depth3').addClass('mobile')
// 모바일 카테고리 검색

$('.toggle-btn').on('click', function(){
	$(this).parent('.lnb-detail__form-mobile').toggleClass('active')
})

// 모바일 검색
$(window).bind('resize load', function () {
	if(ismobile==true){
		$('#subSearch .sub-search__sh-input').attr('readonly', true)
		$('.sub-search__content .sub-search__sh').on('click', function (e) {
			e.preventDefault();
			$('.sub-search-mobile').addClass('active')
		});
		$('.sub-search-close').on('click' , function() {
			$('.sub-search-mobile').removeClass('active')
		})
	}else if(ismobile==false){
		$('#subSearch .sub-search__sh-input').attr('readonly', false)
	}
})

//푸터
const telClone = $('.footer-left address .hunting-line').clone()
const telhtml = $('.footer-menu__link').before(telClone);

// 클래스 추가
if($('.badge.badge--end').length){
	$('.badge.badge--end').parents('.competition__item').addClass('end')
}

// 게시판 모바일
$(function () {
	$('.bd-list').each(function (i, element) {
		_ = $(element);
		$(this)
			.find('tr')
			.each(function () {
				$(this)
					.find('td')
					.each(function (index) {
						//if ($(this).hasClass('title') || $(this).hasClass('no') || $(this).text().trim() == '') {
						if ($(this).hasClass('title') || $(this).hasClass('no-head')|| $(this).hasClass('reple') || $(this).parent().hasClass('nodata') || $(this).hasClass('nodata') || $(this).parent().hasClass('q') || $(this).parent().hasClass('a') || this.childNodes.length == 0) {
						} else {
							var txt = '<span class="only-m">' + _.find('th').eq(index).text() + '</span>';
							$(this).prepend(txt);
						}
					});
			});
	});
	$('.board-list').each(function (i, element) {
		_ = $(element);
		$(this)
			.find('tr')
			.each(function () {
				$(this)
					.find('td')
					.each(function (index) {
						//if ($(this).hasClass('title') || $(this).hasClass('no') || $(this).text().trim() == '') {
						if ($(this).hasClass('subject') || $(this).hasClass('no-head') || $(this).parent().hasClass('nodata') || this.childNodes.length == 0) {
						} else {
							var txt = '<span class="only-m">' + _.find('th').eq(index).text() + '</span>';
							$(this).prepend(txt);
						}
					});
			});
	});
	// 설명 더보기
	$('.question-mark').each(function (i, element) {
		_this = $(element);
		_this.attr('tabindex', 0)
		$(_this).find('i').on('click',function () {
//			$(this).siblings('.question-mark__answer').toggleClass('on')
		})
	})
});

///* 접근성 탭 포커스 스타일 */
var $fileBox = null;
$(function () {
	init();
})
function init() {
	$fileBox = $('.filebox');
	fileLoad();
}
function fileLoad() {
	$.each($fileBox, function (idx) {
		var $this = $fileBox.eq(idx),
			$btnUpload = $this.find('[type="file"]'),
			$label = $this.find('[for="file"], label');
		$btnUpload.on('focusin focusout', function (e) {
			e.type == 'focusin' ?
				$label.addClass('file-focus') : $label.removeClass('file-focus');
		})
	})
}

//탭 버튼 클릭 시 탭 패널 열림 (공통)
document.addEventListener('DOMContentLoaded', function() {
	$('[aria-controls]').on('click', function () {
		$(this).attr('aria-label', "선택됨").parent('li').siblings().find('a').removeAttr('aria-label');
		$(this).parent('li').addClass('on').siblings().removeClass('on')
               
        var targetId = $(this).attr('aria-controls');
        $('#' + targetId).addClass('on').siblings().removeClass('on');

		// 연계저작물 검색 시 검색필드 변경
		if( $('.related').hasClass('on') ) {
			$(this).parents('.list-tablist').next('.sh-box').addClass('related');
			
			$(this).parents('.list-tablist').find('.list-total').each(function() {
				var $strong = $(this).find('strong');
				// strong 태그를 제외한 텍스트 노드만 추출
				var nodes = this.childNodes;
				for (var i = 0; i < nodes.length; i++) {
					if (nodes[i].nodeType === 3) { // 텍스트 노드
						var text = nodes[i].nodeValue.trim();
						if (text.startsWith('원문 공공저작물 총')) {
							// 8글자 삭제 후 "연계저작물"로 변경
							var rest = text.substring(11);
							nodes[i].nodeValue = '연계저작물 총' + rest;
						}
					}
				}
			});
		}
		else {
			$(this).parents('.list-tablist').next('.sh-box').removeClass('related');
			
			$(this).parents('.list-tablist').find('.list-total').each(function() {
				var nodes = this.childNodes;
				for (var i = 0; i < nodes.length; i++) {
					if (nodes[i].nodeType === 3) { // 텍스트 노드
						var text = nodes[i].nodeValue.trim();
						// 여기서는 '연계저작물 총'을 다시 '원문 공공저작물 총'으로 돌려놓는 예시
						if (text.startsWith('연계저작물 총')) {
							var rest = text.substring(7); // '연계저작물 총'은 6글자
							nodes[i].nodeValue = '원문 공공저작물 총' + rest;
						}
					}
				}
			});
		}

    });


	if ( $("dialog .dialog-backdrop.active .body ul>li").hasClass("on")  ) {
		$(this).attr('aria-label', "선택됨").siblings().removeAttr('aria-label')
	}

	$(".dialog .body ul>li").on("click", function(){
		$(this).addClass("on");
		if ( $(this).hasClass("on") ) {
			$(this).attr('aria-label', "선택됨").siblings().removeAttr('aria-label').removeClass('on')
		}
		else {
			$(".dialog .body ul>li").removeClass('on').removeAttr('aria-label')
		}
	})
});

// 푸터 swiper 설정
document.addEventListener('DOMContentLoaded', function() {
	var footerSwiper = new Swiper('.footer-banner .swiper', {
		slidesPerView: 5,
		loop: true,
		navigation: {
			prevEl: ".footer-banner__button-prev",
			nextEl: ".footer-banner__button-next"
		},
	});
	footerSwiper.on('focusin', function (swiper) {
		swiper.slideNext();
	});
	
	footerSwiper.on('focusout', function (swiper) {
		swiper.slidePrev();
	});
})

// 통합검색 및 상세검색 팝업 열기, 닫기
document.addEventListener('DOMContentLoaded', function() {
	$('.b-detail:not(.con-serch__open)').on('click', function(){
		
		$('body').addClass('ovh').attr('tabindex', -1)
		$(".tsh-detail-pop").addClass('on').attr('tabindex', 0).focus().removeAttr('tabindex');
		currentfocus = $(this);
	})
	
	$('.sh-detail-pop .i-close').on('click', function(){
		$(".sh-detail-pop").removeClass('on')
		$('body').removeClass('ovh').removeAttr('tabindex').find(currentfocus).focus();
	})
})

// 목록페이지 내 상세검색 팝업 열기, 닫기기
document.addEventListener('DOMContentLoaded', function() {
	$(".con-serch__open").on("click", function () {
		$('body').addClass('ovh').attr('tabindex', -1)
		$(".tab-sh-popwrap").addClass('on').attr('tabindex', 0).focus().removeAttr("tabindex");
		currentfocus = $(this);
	})
})

// 목록페이지 탭 없으면 .list-tablist height값 auto
document.addEventListener('DOMContentLoaded', function() {
	if ( !$('#content .list-tablist > ul').length ) {
		$('#content .list-tablist').css('height', 'auto');
	}
});

// 목록 리스트 저작권 유형 버튼 클릭 시 이벤트 버블링 막기
$('.photo-list__button').on('click', function(e) {
	e.stopPropagation();
    openDialog('dialogOpencode1', this);
})

// 즐겨찾기
$(document).on("click", ".fav-alram .ico-fav-off", function(){
	$(this).removeClass("ico-fav-off").addClass("ico-fav").attr("title", "즐겨찾기");
})

// 즐겨찾기 해제
$(document).on("click", ".fav-alram .ico-fav", function(){
	$(this).removeClass("ico-fav").addClass("ico-fav-off").attr("title", "즐겨찾기 해제");
})

//공유하기 버튼 클릭 이벤트
document.addEventListener('DOMContentLoaded', function() {
	$(".recommand__share").on("click", function(){
		$(this).toggleClass('recommand__close')

		if( $(this).hasClass('recommand__close') ) {
			$(this).find('i').attr('aria-label', '공유하기 팝업 닫기');
			$(".sns-pop").addClass("on");
		}
		else {
			$(this).find('i').attr('aria-label', '공유하기 팝업 열기');
			$(".sns-pop").removeClass("on");
		}
	})


	//공유하기 포커스 아웃되면 팝업 닫기
	$(".sns-pop button:last").on('blur', function(){
		$(".recommand__share").removeClass('recommand__close').find('i').attr('aria-label', '공유하기 팝업 열기');
		$(".sns-pop").removeClass("on");
	})
})

// 전체메뉴 열기, 닫기
document.addEventListener('DOMContentLoaded', function() {
	$('.all-menu-button').on('click', function(){
		$('.header').addClass('menuShow');
		
		$(this).css('display', 'none');
		$('.all-menu-button-close').css('display', 'flex');
	})

	$('.all-menu-button-close').on('click', function(){
		$('.header').removeClass('menuShow');
		
		$(this).css('display', 'none');
		$('.all-menu-button').css('display', 'flex');
	})
})


//퀵메뉴 열기, 닫기기
$(document).on('click', '.quick-menu__btn', function(){
	$(this).find('.sr-only').html('퀵메뉴 열기')
	$(this).parents('.quick-menu').toggleClass('on');

	if( $(this).parents('.quick-menu').hasClass('on') ) {
		$(this).find('.sr-only').html('퀵메뉴 닫기')
	}
	
})



//상세페이지 swiper 설정
document.addEventListener('DOMContentLoaded', function() {
	//공통
	var viewSwiper = new Swiper('.board-view__swiper .swiper', {
		slidesPerView: 1,
		spaceBetween: 0,
		watchOverflow: true,
		navigation: {
				prevEl: ".board-view__swiper-ctrl-button-prev",
				nextEl: ".board-view__swiper-ctrl-button-next",
		},
		pagination: {
			el: '.board-view__swiper-ctrl-pagination',
			type: "fraction",
			formatFractionCurrent: function (number, swiper) {
				var slideCount = (swiper && swiper.slides) ? swiper.slides.length : number;
				if (slideCount < 10) {
					return ('0' + number).slice(-2);
				} else {
					return number;
				}
			},
			formatFractionTotal: function (number, swiper) {
				var slideCount = (swiper && swiper.slides) ? swiper.slides.length : number;
				if (slideCount < 10) {
					return ('0' + number).slice(-2);
				} else {
					return number;
				}
			},
			renderFraction: function (currentClass, totalClass) {
				return '<strong class="' + currentClass + '"></strong>' + '/'  + '<span class="' + totalClass + '"></span>';
			}
		},
		on : {
			init: function(){
				if( this.slides.length == 1 ) {
					$(".board-view__swiper-ctrl").addClass("swiper-ctrl__null");
					$(".board-view__swiper-ctrl-button-prev, .board-view__swiper-ctrl-button-next").css({ display: "none"});
				} 
				else {
					$(".board-view__swiper-ctrl-button-prev, .board-view__swiper-ctrl-button-next").css({ display: "flex"});
					
				}
			}
		},
		a11y: { // 웹접근성 
			enabled: true,
			prevSlideMessage: '이전 슬라이드',
			nextSlideMessage: '다음 슬라이드',
			slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
		},
	});

	//글꼴 상세페이지 swiper 설정
	var fontViewSwiper = new Swiper('.font-view .swiper', {
		slidesPerView: 2,
		spaceBetween: 40,
		navigation: {
			prevEl: ".board-view__swiper-ctrl-button-prev",
			nextEl: ".board-view__swiper-ctrl-button-next",
		},
		on : {
			init: function(){
				if( this.slides.length == 2 ) {
					$(".board-view__swiper-ctrl").addClass("swiper-ctrl__null");
					$(".board-view__swiper-ctrl-button-prev, .board-view__swiper-ctrl-button-next").css({ display: "none"});
				} 
				else {
					$(".board-view__swiper-ctrl-button-prev, .board-view__swiper-ctrl-button-next").css({ display: "flex"});
					
				}
			}
		},
		a11y: {
			enabled: true,
			prevSlideMessage: '이전 슬라이드',
			nextSlideMessage: '다음 슬라이드',
			slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
		},
		breakpoints: {
			750: {
				slidesPerView: 2,
			},
		}
	});
})

//상세페이지 관련 저작물 swiper 설정
document.addEventListener('DOMContentLoaded', function() {
	//공통
	var relatedSwiper = new Swiper('.related-list .swiper, .related-list__audio .swiper', {
		slidesPerView: 5,
		spaceBetween: 20,
		loop: false,
		autoplay: {
			delay: 4000,
			// disableOnInteraction: false,
		}, 
		navigation: {
			prevEl: ".related-list__swiper-ctrl-button-prev",
			nextEl: ".related-list__swiper-ctrl-button-next",
		},
		a11y: {
			enabled: false,
			prevSlideMessage: '이전 슬라이드',
			nextSlideMessage: '다음 슬라이드',
			slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
		},
	});

	//관련 저작물 swiper 자동재생 play, stop
	$(".related-list__swiper-ctrl-button-play").on("click", function(){
		relatedSwiper.autoplay.start();
		//relatedSwiper2.autoplay.start();
		$(this).hide().removeClass("on");
		$(".related-list__swiper-ctrl-button-stop").show().addClass("on");
		$('.related-list__audio [id^=playerAudioSub]').trigger('pause');
	});

	$(".related-list__swiper-ctrl-button-stop").on("click", function(){
		relatedSwiper.autoplay.stop();
		//relatedSwiper2.autoplay.stop();
		$(this).hide().removeClass("on");
		$(".related-list__swiper-ctrl-button-play").show().addClass("on");
	});

	//audio 재생 중엔 swiper 자동재생 stop
	$(document).on("click",".related-list__audio .plyr__control", function(){
		relatedSwiper.autoplay.stop();
		//relatedSwiper2.autoplay.stop();
		$(".related-list__swiper-ctrl-button-play").show().addClass("on");
		$(".related-list__swiper-ctrl-button-stop").hide().removeClass("on");
	});
})

//상세페이지 관련 저작물 swiper 탭 포커스 이동 (접근성 이슈)
$('.view-btns a:last-child, .view-btns button:last-child').on('focusout', function () {
    relatedSwiper.autoplay.stop()
    //relatedSwiper2.autoplay.stop()

	$(".related-list__swiper-ctrl-button-stop").hide().removeClass("on");
	$(".related-list__swiper-ctrl-button-play").show().addClass("on");
});

//저작물 설명 더보기 클릭 시 팝업열기, 닫기
document.addEventListener('DOMContentLoaded', function() {
	$(".desc .b-more").on("click", function(){
		$(".desc-pop").addClass("on")

		$('body').addClass('ovh').attr('tabindex', -1)
		$(".desc-pop .desc-pop__body").attr('tabindex', 0);
		currentfocus = $(this);

	});

	$(".desc-pop .i-close").on("click", function(){
		$(".desc-pop .desc-pop__body").removeAttr('tabindex');
		$('body').removeClass('ovh').removeAttr('tabindex').find(currentfocus).focus();
	})
})

//팝업 닫기 (공통)
document.addEventListener('DOMContentLoaded', function() {
	$(".i-close, .i-close-wh:not(.use-info .i-close-wh)").on("click", function(){
		$(this).parents('[class*=-pop]').removeClass("on");
		$('body').removeClass('ovh').removeAttr('tabindex');
	});
})

// 첨부파일 리스트 열기, 닫기
document.addEventListener('DOMContentLoaded', function() {
	$('.i-fileList').on('click', function(){
		$(this).toggleClass('open');
		
		if( $(this).hasClass('open') ) {
			$(this).find('span').text('파일 목록 닫기')
			var $fileList = $(this).parent('.fav-alram').next('.file-list').addClass('on');
            $fileList.find('ul').attr('tabindex', 0);
			$fileList.find('ul li:first-child .b-fileDown').focus();
		}
		else {
			$(this).find('span').text('파일 목록 보기').removeClass('open');
            $(this).parent('.fav-alram').next('.file-list').removeClass('on').find('ul').attr('tabindex', -1)
		}
	})
	
	// 첨부파일 마지막 리스트 포커스 아웃 되면 닫기 버튼에 포커스 처리
	$('.file-list ul li:last-child .b-fileDown').on('focusout', function(e) {
		$(this).parents('.file-list').removeClass('on').find('ul').attr('tabindex', -1)
		$(this).parents('.linked__info').find('.bookmark-btn').focus();
		$(this).parents('.linked__info').find('.i-fileList').removeClass('open');
	});
});


//이용조건 팝업 열기, 닫기
document.addEventListener('DOMContentLoaded', function() {
	$(".shInfo").on("click", function(){
		$(".use-info").addClass('on').attr('tabindex', 0)
		$(".use-info.on").find('.use-info__body').attr('tabindex', 0)
		$(".sh-detail-pop").attr('tabindex', -1).addClass("dark");
	})

	$(".use-info .i-close-wh").on("click", function(){
		$(".use-info").removeClass("on").find(".use-info__body").removeAttr('tabindex')
		$(".sh-detail-pop").removeAttr('tabindex').removeClass("dark");
	})
})

//제공기관 검색 팝업 열기, 닫기
document.addEventListener('DOMContentLoaded', function() {
	$("#shSite, .jegongShOpen").on("click", function(){
		$(this).next(".site-list__search").addClass('on').attr('tabindex', 0).focus();
		$(this).parents(".sh-detail-pop").attr('tabindex', -1).addClass("dark");
		$(".deptKeyword").val("");
		getDept(0);
	})
	
	$(".site-list__search .b-cancel").on("click", function(){
		$(".site-list__search").removeClass("on");
		$(this).parents(".sh-detail-pop").attr('tabindex', 0).removeClass("dark");
		$(this).parents(".sh-detail-pop").find('.site-list').html('');
		$(this).parents(".sh-detail-pop").find('.site-list').hide()
		$('input[name="orgCode"]').val('');
		$('input[name="company"]').val('');
	})
});



// 통합검색 탭메뉴 모바일 초기값
var categoryTarget = $(".tsh__category__list a.on").text();
var categoryLength = $(".tsh__category__list a").length;

if( categoryLength < 3 ) {
	$(".tsh__category__mobile").addClass("type2");
}
$(".tsh__category__mobile span").text(categoryTarget);

//통합검색 탭메뉴 모바일
$(".tsh__category__mobile").on("click", function(){
	$(this).next(".tsh__category__list").toggleClass("on")

	if( $(".tsh__category__list").hasClass("on") ) {
		$(".tsh__category__mobile").attr("aria-label", "닫기").addClass("on");
	}
	else {
		$(".tsh__category__mobile").attr("aria-label", "열기").removeClass("on")
	}
})

//통합검색 탭메뉴 클릭 시 모바일 버튼 텍스트 변경하기
$(".tsh__category__list a").on("click", function(){
	categoryTarget = $(this).text();
	if ("disabled" !== $(this).attr("class")) {
		$(this).addClass("on").attr('aria-label', '선택됨').siblings().removeClass("on").removeAttr('aria-label');
	}
	$(".tsh__category__mobile span").text(categoryTarget);
});


//누리컬렉션 이달의테마 swiper 
document.addEventListener('DOMContentLoaded', function() {
	var slideCount = document.querySelectorAll('.theme-banner .swiper .swiper-slide').length;
	if (slideCount < 3) {
		var ctrl = document.querySelector('.theme-banner .swiper-ctrl');
		if (ctrl) ctrl.remove();
	}
	var footerSwiper = new Swiper('.theme-banner .swiper', {
		slidesPerView: 3,
		slidesPerGroup: 3,
		navigation: {
			prevEl: ".theme-banner .swiper-ctrl-button-prev",
			nextEl: ".theme-banner .swiper-ctrl-button-next",
		},
		a11y: {
			enabled: true,
			prevSlideMessage: '이전 슬라이드',
			nextSlideMessage: '다음 슬라이드',
			slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
			paginationBulletMessage: '{{index}}번째 슬라이드로 이동',
		},
	});
})


let themeSwiper = new Swiper('.theme-banner_slide .swiper-container', {
	slidesPerView: 1,
	navigation: {
		prevEl: ".theme-banner_slide .swiper-button-prev",
		nextEl: ".theme-banner_slide .swiper-button-next",
	},
	a11y: {
		enabled: true,
		prevSlideMessage: '이전 슬라이드',
		nextSlideMessage: '다음 슬라이드',
		slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
	},
});

//누리컬렉션 단일 리스트 swiper 
let themeContSwiper = new Swiper('[class^=theme-cont] .swiper-container', {
	slidesPerView: 1,
	loop: true,
	navigation: {
		prevEl: ".theme-cont_sec01 .swiper-button-prev02",
		nextEl: ".theme-cont_sec01 .swiper-button-next02",
	},
	a11y: {
		enabled: true,
		prevSlideMessage: '이전 슬라이드',
		nextSlideMessage: '다음 슬라이드',
		slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
	},
});


// 검색어 도움말 반응형 처리
$(function () {
	let tshinput = $('[placeholder="통합 검색어를 입력하세요."]')
	$(window).on('resize', function () {
		placeholder = $(this).width() < 400 ? '통합 검색어':'통합 검색어를 입력하세요.'
		tshinput.attr('placeholder',placeholder)
	});
});