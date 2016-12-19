
function getRandomNumber(min, max) {
  // Returns an arbritrary random number
  return (Math.random() * (max - min) + min);
}


export default class ScrollFragment {
  constructor(selector) {
    this.active         = true;
    this.$trigger       = $(`.${selector}`);

    // Fragments
    this.fragmentSVG    = `<div class="fragment"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30"><defs><path d="M.68 0L15 30 29.32 0H.68z" id="a"/></defs><g visibility="inherit"><use xlink:href="#a" /><use xlink:href="#a" /></g></svg> </div>`
    this.numFragments   = 1;
    this.fragmentSize   = 20;
    this.fragments      = [this.numFragments];
    this.$fragmentContainer = $('#fragment-container');
    this.containerWidth = this.$fragmentContainer.width();
    this.fragmentOffset = this.$fragmentContainer.offset().left
    this.fragmentWidth  = 10;

    this.triggerOffset  = this.$trigger.position().top;
    this.triggered      = false;
    this.scrollTop      = 0;

    this.tweens         = [this.numFragments];

    this.setupFragmentsWithinContainer();
    this.setupTimelines();

    // Setup Scroll Event
    $(window).on('scroll', window, this.scrollCallback.bind(this));
    // Start Looping
    this.loop()
  }

  setupTimelines() {
    this.fragments = $('.fragment');
    this.fragments.each((i, el) => {

      let top = $(el).offset().top;

      this.tweens[i] = new TimelineMax().add([
        TweenMax.fromTo($(el), 1, {y: 0}, {y: 10})
      ]);

    });
  }


  setupFragmentsWithinContainer() {
    // Gaußsche Summenformel (Dreiecks-Zahlen zur berechnung aller Fragmente)
    let numFirstRow   = Math.floor(this.containerWidth/this.fragmentWidth);
    let numRows       = numFirstRow;
    let currentRow    = 0;
    let numCurrentRow = numFirstRow;
    let currentColumn = 0;
    let counter       = 0;
    let currentAmount = numFirstRow - currentRow;

    this.numFragments = (Math.pow(numFirstRow, 2) + numFirstRow) / 2;

    for (var i = 0; i < this.numFragments; i++) {
      let newElement = $(this.fragmentSVG);

      newElement.css('left', (counter * 10)+(currentRow*this.fragmentWidth/2));
      newElement.css('top', currentRow*this.fragmentWidth);
      newElement.css('opacity', Math.random())
      newElement.appendTo(this.$fragmentContainer);

      // Every Row contains one element less than the row before
      // -> Gauß-Triangle
      if (counter == numCurrentRow - 1) {
        numCurrentRow--;
        currentRow++;
        counter = 0;
      } else {
        counter++;
      }
    }
  }


  loop() {
    if (this.scrollTop > this.triggerOffset) {
      // console.log("Triggered")
      // this.$trigger.addClass('triggered')
      this.tweens.forEach((timeline, i) => {
        timeline.seek(1)
      });
    } else {
      // console.log("NOT Triggered")
      // this.$trigger.removeClass('triggered')
      this.tweens.forEach((timeline, i) => {
        timeline.seek(0)
      });
    }



    if (this.active) requestAnimationFrame(this.loop.bind(this));
  }



  scrollCallback() {
    this.scrollTop = $(window).scrollTop()

  }
}
