$(function(){
    //연관 검색어
    let swiper = new Swiper('.swiper-keyword', {
        slidesPerView: 'auto',//보여질 개수,
        spaceBetween: 15,//아이템 사이 간격,
        threshold: 10, //마우스 스와이프 민감도
        // clickable: true,
        navigation: {
            prevEl: ".keyword-swiper-prev",
            nextEl: ".keyword-swiper-next",
        },
        // a11y: { // 웹접근성 
        //     enabled: true,
        //     prevSlideMessage: '이전 슬라이드',
        //     nextSlideMessage: '다음 슬라이드',
        //     slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
        // },
        breakpoint: {
            750: {
                spaceBetween: 27,//아이템 사이 간격,
                navigation: {
                    enabled: true,
                }
            }
        }
    })
    $('.keyword-swiper-prev, .keyword-swiper-next').attr('tabindex', 0)


    //급상승 공통
    var $tags = $('.tag-list__db .tag-list');
    var $wrapper = $('.popular-sh__body .swiper-wrapper');
    var $swiperSlide;

    function createNewSlide() {
        $swiperSlide = $('<div class="swiper-slide"></div>');
        $wrapper.append($swiperSlide);
    }
    createNewSlide();

    if ( $swiperSlide.children().length == 0) {
        $swiperSlide.remove();
    }

    $tags.each(function() {
        var $clone = $(this).clone();
        createNewSlide();
        $swiperSlide.append($clone);
        
    });



    //급상승 검색어 Swiper 초기설정
    let swipe2 = new Swiper('.swiper-popular', {
        slidesPerView: "auto",//보여질 개수, 
        spaceBetween: 14,
        // loop: true, 
        // navigation: {
        //     prevEl: ".popular-swiper-prev",
        //     nextEl: ".popular-swiper-next",
        // },
    })
    
    
    //검색창 포커스 시 자동완성 뜨기, placeholder 사라지기
    $(".tsh-box .sh-field .sh-input > input").on("input", function(){
        var txtLength = $(this).val().length;

        if( txtLength > 0) {
            $(".auto-complete").addClass("on");
            $(".js-placeholder").hide()
        }
        else {
            $(".auto-complete").removeClass("on");
            $(".js-placeholder").show()
        }
    });

    //검색창 자동완성 기능 사용안함 처리
    $(".auto-complete .toggle").on("click", function(){
        //console.log( $(this).is(":checked") )

        if( $(this).is(":checked") ) {
            $(".auto-complete").addClass("disuse")
        }
        else {
            $(".auto-complete").removeClass("disuse")
        }
    })


    //제공기관 리스트 삭제
    $(".site-list").on("click", ".i-del", function(){
        var liElement = $(this).closest("li");
        var name = liElement.data("name");
        var code = liElement.data("code");

        var companyValue = $('input[name="company"]').val().split(',');
        var orgCodeValue = $('input[name="orgCode"]').val().split(',');

        var updateCompany = companyValue.filter(function (value) {
            return value !== name;
        }).join(',');

        var updateOrgCode = orgCodeValue.filter(function (value) {
            return value !== code;
        }).join(',');

        $('input[name="company"]').val(updateCompany);
        $('input[name="orgCode"]').val(updateOrgCode);
        $('input[type="checkbox"][value="' + code + '"]').prop('checked', false);
        var clickedLiHtml = liElement.html().trim();
        $(".site-list li").each(function() {
            if ($(this).html().trim() === clickedLiHtml) {
                $(this).remove();
            }
        });
        if ($("#orgCode").val() == '') {
            $(".site-list").hide()
        }
    })

    //체크박스 클릭 시 전체 선택하기
    $(".sh-chkbox .allDivision").on('click', function(){
        if ( $(".sh-chkbox .allDivision").is(":checked") ){
            $(this).parents(".sh-chkbox").find("input[type=checkbox]").prop("checked", true);
        }
        else {
            $(this).parents(".sh-chkbox").find("input[type=checkbox]").prop("checked", false);
        }
    })
    $(".sh-chkbox .allGubun").on('click', function(){
        if ( $(".sh-chkbox .allGubun").is(":checked") ){
            $(this).parents(".sh-chkbox").find("input[type=checkbox]").prop("checked", true);
        }
        else {
            $(this).parents(".sh-chkbox").find("input[type=checkbox]").prop("checked", false);
        }
    });
    $(".sh-chkbox .allAtcTypeCode").on('click', function(){
        if ( $(".sh-chkbox .allAtcTypeCode").is(":checked") ){
            $(this).parents(".sh-chkbox").find("input[type=checkbox]").prop("checked", true);
        }
        else {
            $(this).parents(".sh-chkbox").find("input[type=checkbox]").prop("checked", false);
        }
    });

    $(".sh-chkbox input[type=checkbox]").on("click", function() {
        var total = $(this).parents(".sh-chkbox").find("input[type=checkbox]").length;
        var checked = $(this).parents(".sh-chkbox").find("input[type=checkbox]:checked").length;

        if(total != checked) {
            $(this).parents(".sh-chkbox").find(".all").prop("checked", false);
            $(this).parents(".sh-chkbox").prev(".sh-chkbox__all").find(".all").prop("checked", false);
        } 
        else {
            $(this).parents(".sh-chkbox").find(".all").prop("checked", true);
            $(this).parents(".sh-chkbox").prev(".sh-chkbox__all").find(".all").prop("checked", true);
        }
    });
    //체크박스 type2 클릭 시 전체 선택하기
    $(".sh-chkbox__all .all").on('click', function(){
        if ( $(".sh-chkbox__all .all").is(":checked") ){
            $(this).parents(".sh-chkbox__all").next(".sh-chkbox").find("input[type=checkbox]").prop("checked", true);
        }
        else {
            $(this).parents(".sh-chkbox__all").next(".sh-chkbox").find("input[type=checkbox]").prop("checked", false);
        }
    });


    //플로팅 버튼 클릭 시 활성화
    $(".floating__button").on("click", function(){
        $(".floating").toggleClass("on");
        
        if ( $(".floating").hasClass("on") ) {
            $(".move").addClass("on");
        }
        else {
            $(".move").removeClass("on");
        }
    });

    //플로팅 내가 찾은 검색어 삭제
    $(".floatingTagDel").on("click", function(){
        var targetLength = $(".floatingTagDel").length;
        if ( targetLength > 1) {
            $(this).parents("li").remove();
        }
        else {
            $(".floating__body__open ul").remove();
        }
    });

    $('.egov-search:not(.main-search').find(' .tsh-box__sh').addClass('container');

    
});//end