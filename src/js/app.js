'use strict';
import $ from 'jquery';
import Barba from 'barba.js';
import carousel from './carousel';
import {Modal} from './Modal';

$(document).ready(function () {

  const isTouchDevice = () => 'ontouchstart' in window || !!(navigator.msMaxTouchPoints);
  if(isTouchDevice) {
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
      /**
       * This function is automatically called as soon the Transition starts
       * this.newContainerLoading is a Promise for the loading of the new container
       * (Barba.js also comes with an handy Promise polyfill!)
       */

      // As soon the loading is finished and the old page is faded out, let's fade the new page
      Promise
          .all([this.newContainerLoading, this.fadeOut()])
          .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
      /**
       * this.oldContainer is the HTMLElement of the old Container
       */

      return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function() {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */

      let _this = this;
      let $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
          visibility : 'visible',
          opacity : 0
      });

      $el.animate({ opacity: 1 }, 400, function() {
          /**
           * Do not forget to call .done() as soon your transition is finished!
           * .done() will automatically remove from the DOM the old Container
           */

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
      f: 'Message from your site!',
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
