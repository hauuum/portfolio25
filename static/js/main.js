document.addEventListener("DOMContentLoaded", () => {
	// gnb scroll 값에 따라 형태 변화
	const current = $(window).scrollTop();
	const about = $('.about').offset().top;

	if (current > about) {
		$('body').addClass('scroll');
	} 
	else {
		$('body').removeClass('scroll');
	}

	const headerH = $('.header').outerHeight() || 0;
	$("#wrap > section").each(function (i) {
		const sectionTop = $(this).offset().top;
		const sectionHeight = $(this).outerHeight();
		const adjusted = current + headerH + 1; // 헤더 보정 및 경계 오프셋

		if (adjusted >= sectionTop && adjusted < sectionTop + sectionHeight) {
			$('.gnb ul li').eq(i).addClass('on').siblings().removeClass('on')
		}
	});

	$(window).on('scroll', function () {
		const current = $(window).scrollTop();
	
		if (current > about) {
			$('body').addClass('scroll');
		} 
		else {
			$('body').removeClass('scroll');
		}
	
		const headerH = $('.header').outerHeight() || 0;

		$("#wrap > section").each(function (i) {
			const sectionTop = $(this).offset().top;
			const sectionHeight = $(this).outerHeight();
			const adjusted = current + headerH + 1; // 헤더 보정 및 경계 오프셋
		
			if (adjusted >= sectionTop && adjusted < sectionTop + sectionHeight) {
				$('.gnb ul li').eq(i).addClass('on').siblings().removeClass('on')
			}
		});
	});


	// Section 1
	// 텍스트 호버시 하트 뿌리는 효과
	const hoverLove = document.querySelector('.js-hover-love');
	hoverLove.querySelectorAll('span[class^="js-love"]').forEach(e => e.remove());

	for (let i = 0; i < 20; i++) {
		hoverLove.insertAdjacentHTML('beforeend', `<span class="js-love${i}">❤️</span>`);
	}

	const playLove = () => {
		for (let i = 0; i < 20; i++) {
			const love = hoverLove.querySelector(`.js-love${i}`);
			gsap.set(love, { x: 0, y: 0, opacity: 1, scale: 1 });

			const angle1 = Math.random() * 2 * Math.PI;
			const distance1 = 80 + Math.random() * 80;
			const x = Math.cos(angle1) * distance1;
			const y = Math.sin(angle1) * distance1;

			gsap.to(love, {
				x,
				y,
				scale: 0.6 + Math.random() * 0.7,
				opacity: 0,
				duration: 1.2 + Math.random() * 0.6,
				ease: "power2.out",
				delay: Math.random() * 0.2
			});
		}
	}

	hoverLove.addEventListener('mouseover', playLove);
	hoverLove.addEventListener('mouseleave', () => {
		hoverLove.querySelectorAll('span[class^="js-love"]').forEach(e => e.remove());
		for (let i = 0; i < 20; i++) {
			hoverLove.insertAdjacentHTML('beforeend', `<span class="js-love${i}">❤️</span>`);
		}
	});


	// 텍스트 호버시 좋아요 효과
	const hoverLike = document.querySelector('.js-hover-like');
	const hoverLikeWrap = document.querySelector('.js-hover-like-wrap');

	if (hoverLike && hoverLikeWrap) {
		hoverLikeWrap.querySelectorAll('span[class^="js-like"]').forEach(e => e.remove());

		for (let i = 0; i < 12; i++) {
			hoverLikeWrap.insertAdjacentHTML('beforeend', `<span class="js-like${i}">👍</span>`);
		}

		const playLikes = () => {
			for (let i = 0; i < 12; i++) {
				const like = hoverLikeWrap.querySelector(`.js-like${i}`);
				gsap.set(like, { x: 0, y: 0, opacity: 1, scale: 1 });

				const angle2 = Math.random() * 2 * Math.PI;
				const distance2 = 60 + Math.random() * 60;
				const x = Math.cos(angle2) * distance2;
				const y = Math.sin(angle2) * distance2;

				gsap.to(like, {
					x,
					y,
					scale: 1.8 + Math.random() * 0.6,
					opacity: 0,
					duration: 0.8 + Math.random() * 0.8,
					ease: "power2.out",
					delay: Math.random() * 0.2
				});
			}
		}

		hoverLike.addEventListener('mouseover', playLikes);
		hoverLike.addEventListener('mouseleave', () => {
			hoverLikeWrap.querySelectorAll('span[class^="js-like"]').forEach(e => e.remove());
			for (let i = 0; i < 12; i++) {
				hoverLikeWrap.insertAdjacentHTML('beforeend', `<span class="js-like${i}">👍</span>`);
			}
		});
	}


	// 스위치 클릭 시 다크모드
	const switchCheckboxes = document.querySelectorAll('.switch input[type=checkbox]');
	switchCheckboxes.forEach((cb) => {
		cb.addEventListener('click', (e) => {
			if (e.currentTarget.checked){
				document.body.classList.add('light');
				const logoLine = document.querySelector('.logo .line');
				if (logoLine) logoLine.style.animation = 'line 1s linear forwards';
			}
			else {
				document.body.classList.remove('light');
			}
		});
	});


	// Section 2
	// gsap 가로 스크롤
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

	const horizontal = document.querySelector(".horizontal");
	const sections = gsap.utils.toArray(".horizontal > .section");
	const aboutSections = document.querySelectorAll('.about .section');
	const mm = gsap.matchMedia();

	function initAnimation() {
		mm.add("(min-width: 1200px)", () => {
			// 기본값
			gsap.set(horizontal, { display: "flex" });
			sections.forEach((s) => gsap.set(s, { width: `${100 / sections.length}%`, flexShrink: 0 }));

			// 타임라인
			const horizontalScroll = gsap.to(sections, {
				xPercent: -100 * (sections.length - 1),
				ease: "none",
				scrollTrigger: {
					trigger: horizontal,
					start: "top top",
					end: () => "+=" + (horizontal.offsetWidth - innerWidth),
					pin: true,
					scrub: 1,
					invalidateOnRefresh: true,
					anticipatePin: 1,
					snap: {
						snapTo: 1 / (sections.length - 1),
						inertia: { x: 500, y: -300 },
						delay: 1,
						duration: { min: 0.6, max: 2 },
						ease: 'power1.inOut'
					}
				}
			});

			// 각 .section  속 텍스트 애니메이션들 생성
			const created = [];
			aboutSections.forEach((section) => {
				const transforms = section.querySelectorAll('.transform');
				const desc = section.querySelectorAll('.desc > p');
				// 화면 크기에 따라 y 값 변경
				const yValue = window.innerWidth >= 1200 ? -87 : -74;

				const t1 = gsap.to(transforms, {
					y: yValue,
					duration: 0.6,
					ease: "power3.inOut",
					stagger: { each: 0.5, from: "random" },
					repeat: -1,
					yoyo: true,
					repeatDelay: 0,
					scrollTrigger: {
						trigger: section,
						containerAnimation: horizontalScroll,
						start: "left center",
						end: "right center",
						toggleActions: "play reverse play reverse",
					},
				});

				const t2 = gsap.from(desc, {
					y: -100,
					opacity: 0,
					duration: 1,
					stagger: { each: 0.5, from: "top" },
					scrollTrigger: {
						trigger: section,
						containerAnimation: horizontalScroll,
						start: "left center",
						end: "right center",
						toggleActions: "play reverse play reverse",
					},
				});

				created.push(t1, t2);
			});

			// 961px 미만일 때 실행
			return () => {
				created.forEach(t => t.kill());
				horizontalScroll && horizontalScroll.kill();

				// inline 스타일 제거 (원상복구)
				gsap.set(horizontal, { clearProps: "all" });
				sections.forEach(s => gsap.set(s, { clearProps: "all" }));
				
				// ScrollTrigger 상태 갱신
				ScrollTrigger.refresh();
			};
		});
	}

	initAnimation();


	// Section 3 
	// 아코미언 메뉴
	const experience = $('.experience__item');
	experience.find('.body').hide();

	$('.experience__item.on').find('.body').slideDown();
	$('.experience__item.on').find('.date > i').addClass('opened').attr('aria-label', '상세 설명 닫기');

	experience.find('button').on('click', function () {
		const $parent = $(this).parent();
		const isOpen = $parent.hasClass('on');

		if (isOpen) {
			$parent.removeClass('on').find('.body').slideUp();
			$parent.find('.date > i').removeClass('opened').attr('aria-label', '상세 설명 열기');
		} 
		else {
			experience.removeClass('on').find('.body').slideUp();
			experience.find('.date > i').removeClass('opened').attr('aria-label', '상세 설명 열기');

			$parent.addClass('on').find('.body').slideDown();
			$parent.find('.date > i').addClass('opened').attr('aria-label', '상세 설명 닫기');
		}
	});


	gsap.from(".marker", {
		width: 0,
		transformOrigin: "left center", 
		ease: 'power1.inOut',
		scrollTrigger: {
			trigger: ".experience",
			scrub: true,
			start: "top +=20%",
			end: "bottom +=100%",
		},

	});


	// Section 4 
	// swiper
	document.querySelectorAll(".screen").forEach((screenEl) => {
		const thumbs = screenEl.querySelector(".swiper-thumbs");
		const main = screenEl.querySelector(".swiper-main");
	  
		const swiperThumbs = new Swiper(thumbs, {
			spaceBetween: 12,
			slidesPerView: "auto",
			watchSlidesProgress: true,
			allowTouchMove: false,
			observer: true,
			observeParents: true,
			// breakpoints: {
			// 	768: {
			// 		slidesPerView: 4,
			// 	}
		 	//  }
		});
	  
		const swiperMain = new Swiper(main, {
		  spaceBetween: 10,
		  navigation: {
				nextEl: screenEl.querySelector(".swiper-button-next"),
				prevEl: screenEl.querySelector(".swiper-button-prev"),
			},
			thumbs: {
				swiper: swiperThumbs,
			},
		});
	});
	
	// 프로젝트 상세 열기
	$('.work__list ul li').on('click', function(){
		let workInx = $(this).index();
		
		$('.work__list').css('display','none');
		$('.work__view').css('display','flex');
		$('.work__view > div').eq(workInx).css({'display':'block'});

		$('body').addClass('fixed');
	});

	// 프로젝트 상세 닫기
	$('.b-close').on('click', function(){
		
		$('.work__list').css('display','block');
		$('.work__view').css('display','none');
		$('.work__view > div').css('display','none');

		$('body').removeClass('fixed');

	});


	// resize
	window.addEventListener('resize', () => {
		mm.revert(); //기존 애니메이션 & ScrollTrigger 정리
		initAnimation();
	});
});//doc end