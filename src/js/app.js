'use strict';
import $ from 'jquery';
import slick from 'slick-carousel';
import Barba from 'barba.js';

$(document).ready(function () {
    //Barba.Pjax.start();

    $('.js-slider').slick({
        slidesToScroll: 1,
        slidesToShow: 1,
        dots: true,
        prevArrow: '.js-slider-prev',
        nextArrow: '.js-slider-next'
    })
});
