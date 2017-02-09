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
      e.preventDefault();
      let imgLink = e.target.getAttribute('href');
      _this.open(imgLink);
      return false;
    });
    this.closeBtn.on('click', () => {
      this.close();
    });
  }
  open(href){
    this.overlay.show();
    this.img.attr('src', href);
    this.img.on('load', () => {
      this.modal.addClass('open');
    });
  }
  close(){
    this.modal.removeClass('open');
    this.overlay.hide();
  }
}