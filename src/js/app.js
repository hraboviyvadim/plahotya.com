'use strict';
import $ from 'jquery';
import Barba from 'barba.js';
import carousel from './carousel';
import {Modal} from './Modal';

$(document).ready(function () {

  const isTouchDevice = () => 'ontouchstart' in window || !!(navigator.msMaxTouchPoints);
  if(isTouchDevice && $(window).width() <= 1024) {
    $('html').addClass('is-touch');
  }

  let wrapper = $('.js-wrapper');
  const Homepage = Barba.BaseView.extend({
    namespace: 'homepage',
    onEnter: function() {
      wrapper.addClass('is-homepage');
      $('[data-title]').removeClass('active');
    },
    onLeave: function() {

      setTimeout(function () {
        wrapper.removeClass('is-homepage');
      }, 350);

    },
    onLeaveCompleted: function () {
      hideNav();
    }
  });
  const About = Barba.BaseView.extend({
    namespace: 'about',
    onEnterCompleted: function() {
      $('[data-title]').removeClass('active');
      $('[data-title="about"]').addClass('active');
      carousel.init();
      },
    onLeave: function() {
        carousel.destroy();
      hideNav();
      }
  });
  const Opinions = Barba.BaseView.extend({
    namespace: 'opinions',
    onEnterCompleted: function() {
      carousel.init();
      $('[data-title]').removeClass('active');
      $('[data-title="opinions"]').addClass('active');
    },
    onLeave: function() {
      carousel.destroy();
      hideNav();
    }
  });
  const Portfolio = Barba.BaseView.extend({
    namespace: 'portfolio',
    onEnterCompleted: function() {
      carousel.init();
      const modal = new Modal();
      $('[data-title]').removeClass('active');
      $('[data-title="portfolio"]').addClass('active');
    },
    onLeave: function() {
      carousel.destroy();
      hideNav();
    }
  });
  const Contacts = Barba.BaseView.extend({
    namespace: 'contacts',
    onEnterCompleted: function() {
      $('[data-title]').removeClass('active');
      $('[data-title="contacts"]').addClass('active');
    },
    onLeave: function() {
      hideNav();
    }
  });

  Homepage.init();
  About.init();
  Opinions.init();
  Contacts.init();
  Portfolio.init();


  Barba.Pjax.start();

  const FadeTransition = Barba.BaseTransition.extend({
  start: function() {

      Promise
          .all([this.newContainerLoading, this.fadeOut()])
          .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {

      return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function() {
      let _this = this;
      let $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
          visibility : 'visible',
          opacity : 0
      });

      $el.animate({ opacity: 1 }, 400, function() {
          _this.done();
      });
  }
  });

  Barba.Pjax.getTransition = function() {
      return FadeTransition;
  };

  // mobile av
  function hideNav() {
    $('.header').removeClass('is-menu');
    $('.js-mob-nav').removeClass('is-open');
    $('.js-humb').removeClass('is-active');
  }
  function showNav() {
    $('.header').addClass('is-menu');
    $('.js-mob-nav').addClass('is-open');
    $('.js-humb').addClass('is-active');
  }
  $('.js-humb').on('click', function () {
    if($(this).hasClass('is-active')) {
      hideNav();
    } else {
      showNav();
    }
  });

  // contacs form submit
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    const url = $(this).attr('action');
    const clientEmail = $(this).find('.input').val();
    const clientMessage = $(this).find('.textarea').val();
    const data = {
      f: 'new_message',
      email: clientEmail,
      message: clientMessage
    };
    $.post({
      url: url,
      data: data,
      success: function (result) {
        console.log(JSON.parse(result));
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr);
      }
    });
  });

});
