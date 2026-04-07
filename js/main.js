
$(document).ready(function(){
	"use strict";

	var window_width 	 = $(window).width(),
	window_height 		 = window.innerHeight,
	header_height 		 = $(".default-header").height(),
	header_height_static = $(".site-header.static").outerHeight(),
	fitscreen 			 = window_height - header_height;


	$(".fullscreen").css("height", window_height)
	$(".fitscreen").css("height", fitscreen);

     
     // -------   Active Mobile Menu-----//

    $(".menu-bar").on('click', function(e){
        e.preventDefault();
        $("nav").toggleClass('hide');
        $("span", this).toggleClass("lnr-menu lnr-cross");
        $(".main-menu").addClass('mobile-menu');
    });
     
    $('select').niceSelect();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

 });

// === Scroll reveal ===
(function () {
  // Tag elements for reveal
  var revealTargets = [
    '.exprience-thumb',
    '.exprience-content',
    '.service-area-2 .col-md-4',
    '.service-area .col-lg-3',
    '.contact-area .col-lg-4',
    '.video-area .col-lg-6',
    '.section-gap-3 .col-lg-6',
  ];

  revealTargets.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el, i) {
      el.classList.add('reveal');
      el.dataset.delay = String(i % 4 + 1);
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  // === Stats count-up ===
  function countUp(el, target, suffix, duration) {
    var start = performance.now();
    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 4); // ease-out-quart
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var statsSection = document.querySelector('#archivement');
  if (statsSection) {
    var statsTriggered = false;
    var statsObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !statsTriggered) {
        statsTriggered = true;
        statsSection.querySelectorAll('.number').forEach(function (el, i) {
          var text = el.textContent.trim();
          var match = text.match(/^(\d+)(.*)/);
          if (match) {
            var num = parseInt(match[1], 10);
            var suffix = match[2];
            setTimeout(function () { countUp(el, num, suffix, 1400); }, i * 180);
          }
        });
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }
})();
