'use strict';
import $ from 'jquery';
import slick from 'slick-carousel';

export default {
  init: function () {
    let carousel = $('.js-slider'),
      counter = $('.js-slider-counter'),
      counterTotal = $('.js-slider-total'),
      counterCurrent = $('.js-slider-current');

    carousel.on('init', function () {
      let slidesTotal = $('.slick-slide').not('.slick-cloned').length;
      let slideCurrent = +carousel.find('.slick-current').attr('data-slick-index') + 1;
      counterTotal.text(slidesTotal);
      counterCurrent.text(slideCurrent);
      carousel.parent().addClass('loaded');
      counter.addClass('loaded');

      setTimeout(function () {
        let useElement = $('.js-slider').find('use');
        useElement.each(function () {
          let href = $(this).attr('xlink:href');
          $(this).attr('xlink:href', href); // trigger fixing of href
        });
      }, 0);

    });

    carousel.slick({
      slidesToScroll: 1,
      slidesToShow: 1,
      dots: true,
      prevArrow: '.js-slider-prev',
      nextArrow: '.js-slider-next'
    });

    carousel.on('afterChange', function (slick, currentSlide) {
      let index = currentSlide.currentSlide + 1;
      counterCurrent.text(index);
    });
  },
  destroy: function () {
    let carousel = $('.js-slider');
    carousel.parent().removeClass('loaded');
    setTimeout(function () {
      carousel.slick('unslick');
    }, 0);
  }
}
