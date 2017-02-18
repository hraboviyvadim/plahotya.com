'use strict';
import $ from 'jquery';

export class Modal {
  constructor(){
    this.link = $('.js-modal-link');
    this.overlay = $('.js-overlay');
    this.modal = $('.js-modal');
    this.closeBtn = $('.js-modal-close');
    this.img = $('.js-modal-img');
    this.init();
  }
  init(){
    let _this = this;
    this.link.on('click', function(e) {
      let imgLink = $(this).attr('href');
      let imgText = $(this).data('alt');
      _this.open(imgLink, imgText);
      return false;
    });
    this.closeBtn.on('click', () => {
      this.close();
    });
  }
  open(href, text){
    this.overlay.show();
    this.img.html(`
      <picture>
        <source srcset="${href}.jpg" media="(min-width: 1025px)">
        <source srcset="${href}-ipad.jpg" media="(min-width: 769px)">
        <source srcset="${href}-tablet.jpg" media="(min-width: 361px)">
        <source srcset="${href}-mobile.jpg" media="(max-width: 360px)">
        <img src="${href}.jpg" alt="${text}">
      </picture>
    `);

    this.img.find('img').on('load', () => {
      this.modal.addClass('open');
    });
  }
  close(){
    this.modal.removeClass('open');
    this.overlay.hide();
  }
}