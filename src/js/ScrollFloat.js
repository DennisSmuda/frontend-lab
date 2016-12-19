/**
 *
 */
export default class ScrollFloat {

  constructor(selector) {
    this.active                 = true;
    this.lastScrollTop          = 0;
    this.scrollPercentage       = 0;
    this.windowHeight           = $(window).height();
    this.documentHeight         = $(document).height();

    this.$floatItems            = $(`.${selector}`);
    this.tweens                 = [this.$floatItems.length];
    this.indicatorPosition      = 0;
    this.lastIndicatorPosition  = 0;

    this.setupTweens();
    this.setupEvents();


    this.loop();
  }

  setupTweens() {
    this.$floatItems.each((i, el) => {
      this.tweens[i] = new TimelineMax().add([
        // TweenMax.fromTo($(el), 1, { y: (i+1)*200}, {y: 0}),
        TweenMax.fromTo($(el), 1, { y: this.windowHeight/2}, {y: 0}),
        // TweenMax.fromTo($(el).find('[data-layer="-1"]'), 1, { y: 100}, {y: -100}),
        // TweenMax.fromTo($(el).find('[data-layer="+1"]'), 1, { y: 300}, {y: -300}),
      ]);
    });
  }

  loop() {
    // Lerp indicator towards current Scroll percentage
    // - Use lerped indicator as 'timeline-seeker'
    this.scrollPercent = (this.lastScrollTop + this.windowHeight)/this.documentHeight || 0;
    this.indicatorPosition += ((this.scrollPercent - this.indicatorPosition) * 0.05);



    this.tweens.forEach((timeline, i) => {
      timeline.seek(this.indicatorPosition)
    });



    if (this.active) requestAnimationFrame(this.loop.bind(this));
  }


  setupEvents() {
    $(window).on('scroll', window, this.scrollCallback.bind(this));

    $(window).on('focusout', () => {
      this.active = false;
    });

    $(window).on('focusin', () => {
      this.active = true;
      this.loop()
    });
  }

  scrollCallback() {
    if (!this.active) return;

    this.lastScrollTop = $(window).scrollTop()
  }

}
