'use strict';
import $ from 'jquery';
import slick from 'slick-carousel';

export default function (elem) {
    let carousel = $('.js-slider'),
        counterTotal = $('.js-slider-total'),
        counterCurrent = $('.js-slider-current');

    carousel.on('init', function () {
        let slidesTotal = carousel.find('.slick-slide').not('.slick-cloned').length;
        let slideCurrent = +carousel.find('.slick-current').attr('data-slick-index') + 1;
        counterTotal.text(slidesTotal);
        counterCurrent.text(slideCurrent);
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
}
