'use strict';
import $ from 'jquery';
import Barba from 'barba.js';
import carousel from './carousel';
import {Modal} from './Modal';

$(document).ready(function () {
  let wrapper = $('.js-wrapper');
  const Homepage = Barba.BaseView.extend({
    namespace: 'homepage',
    onEnter: function() {
        wrapper.addClass('is-homepage');
    },
    onLeave: function() {
        wrapper.removeClass('is-homepage');
    }
  });
  const About = Barba.BaseView.extend({
    namespace: 'about',
    onEnterCompleted: function() {
        carousel.init();
      },
    onLeave: function() {
        carousel.destroy();
      }
  });
  const Opinions = Barba.BaseView.extend({
    namespace: 'opinions',
    onEnterCompleted: function() {
      carousel.init();
    },
    onLeave: function() {
      carousel.destroy();
    }
  });
  const Portfolio = Barba.BaseView.extend({
    namespace: 'portfolio',
    onEnterCompleted: function() {
      carousel.init();
      const modal = new Modal();
    },
    onLeave: function() {
      carousel.destroy();
    }
  });
  const Contacts = Barba.BaseView.extend({
    namespace: 'contacts',
    onEnter: function() {
        // some code here
    },
    onLeave: function() {
      // some code here
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

});
