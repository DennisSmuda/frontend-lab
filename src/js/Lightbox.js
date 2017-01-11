function getRandomInt(min, max) { return Math.random() * (max-min) + min }
const cutoutClasses = ["top left", "bottom left", "top right", "bottom right"];
/**
 * Lightbox imitating Medium zoom effect
 * @param {selector} element  [Selector for image elements]
 * @param {type} _options [options - margins etc]
 */
function Lightbox(element, _options) {
  "use strict";

  if (!element) return;

  let zoomedImage = null;
  let screenSize  = {};
  let options     = _options || {};
  let margin      = options.margin || 50;

  let scrollDiv       = document.createElement("div");
  scrollDiv.className = "scrollbar-measure";
  document.body.appendChild(scrollDiv);
  // OffsetWidth includes scrollbar and border
  const scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  wrapImages();


  // Update Dimensions and refresh cached variables
  function updateScreenSize() {
    let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];
    let x = w.innerWidth  || e.clientWidth  || g.clientWidth;
    let y = w.innerHeight || e.clientHeight || g.clientHeight;
        screenSize.x = x;
        screenSize.y = y;
  }

  // Set screen variables initially and on resize
  updateScreenSize();
  window.addEventListener("resize", updateScreenSize);

  // Zoom function
  function zoom() {
    if (!this.isZoomed) {

      this.isZoomed = !this.isZoomed;

      zoomedImage = this;
      if (!this.img) {
        this.img = this.getElementsByTagName('img')[0];
      }

      // Image Dimensions
      let imgH = this.img.getBoundingClientRect().height;
      let imgW = this.img.getBoundingClientRect().width;
      let imgL = this.img.getBoundingClientRect().left;
      let imgT = this.img.getBoundingClientRect().top;
      // Get real Dimensions
      let realW = this.img.naturalWidth;
      let realH = this.img.naturalHeight;

      // Add class to image
      if (this.img.classList) this.img.classList.add('zoomImg');
      else this.img.className += ' ' + 'zoomImg';

      // Create overlay
      this.overlay = document.createElement('div');
      this.overlay.id = 'overlay';
      this.overlay.className = 'zoomOverlay';
      this.overlay.style.cssText = `height: ${screenSize.y}px;
                                    width: ${screenSize.x}px;`
      this.overlay.style.cssText += 'top: -' + ((screenSize.y-imgH)/2) + 'px;';
      this.overlay.style.cssText += 'left: -' + ((screenSize.x-imgW)/2) + 'px;';

      // Create Image wrapper
      this.wrapper = document.createElement('div');
      this.wrapper.id = 'wrapper';
      this.wrapper.className = 'zoomImg-wrap zoomImg-wrap--absolute';
      this.wrapper.appendChild(this.img);

      this.wrapper.appendChild(this.overlay);
      this.appendChild(this.wrapper);

      // Wrapper coords
      let wrapX = ((screenSize.x-scrollBarWidth)/2)-imgL - (imgW/2);
      let wrapY = imgT*(-1) + (screenSize.y-imgH)/2;


      // Calculate scale
      var scale = 1;
      if (realH > imgH) {
        if (imgH == imgW && screenSize.y > screenSize.x) {
          // Square img and portrait aspect
          scale = (screenSize.x-margin)/imgW;
        } else if (imgH == imgW && screenSize.y < screenSize.x) {
          // Square img and landscape aspect
          scale = (screenSize.y-margin)/imgH;
        } else if (imgH > imgW) {
          // Portrait Image
          scale = (screenSize.y-margin)/imgH;
          if (scale*imgW > screenSize.x) {
            // Zoomed image gets too big?
            scale = (screenSize.x-margin)/imgW;
          }
        } else if (imgH < imgW) {
          // Landscape Image
          scale = (screenSize.x-margin)/imgW;
          if (scale*imgH > screenSize.y) {
            // Zoomed image gets too big
            scale = (screenSize.y-margin)/imgH;
          }
        }
      }

      // Recalculate scale if zoomed image is bigger than the original
      if (scale*imgW > realW) {
        scale = realW/imgW;
        console.log('Zoomed version is bigger than the original');
      }

      let that = this;
      // Popout animation css
      setTimeout(function() {
        that.wrapper.style.cssText = `transform: translate(${wrapX}px, ${wrapY}px) translateZ(0px);`
        that.wrapper.style.cssText+= `-webkit-transform: translate(${wrapX}px, ${wrapY}px) translateZ(0px);`

        that.img.style.cssText= `transform: scale(${scale}); -webkit-transform: scale(${scale});`;
        that.overlay.className = 'zoomOverlay show';
      }, 0);

      setTimeout(function() {
        that.img.classList.add("active");
      }, 100);


    } else {
      // Put image back in place
      this.isZoomed = !this.isZoomed;
      // remove from zoomedImage
      zoomedImage = null;

      // Remove lightbox styles
      this.img.style.cssText = "";
      this.wrapper.style.cssText = "";
      this.overlay.className = "zoomOverlay";

      // Remove Element
      let that = this; setTimeout(function() {
        that.children[0].appendChild(that.img);
        that.removeChild(that.wrapper);

        let className = 'zoomImg';
        if (that.img.classList) {
          that.img.classList.remove(className);
        }
      }, 300);

      setTimeout(function() {
        that.img.classList.remove("active");
      }, 0);

    }
  }

  // Apply effects on passed-in elements
  const ImageElements = document.querySelectorAll('figure');
  Array.prototype.forEach.call(ImageElements, function(el, i) {
    el.addEventListener("click", zoom);
  });

  // Zoom out on scroll
  function zoomOut() {
    if (zoomedImage) {
      zoomedImage.click();
    }
  }

  window.addEventListener("scroll", zoomOut);

  /**
   * Wrap raw <img> within figure
   */
  function wrapImages() {
    const ImageElements = document.querySelectorAll(element);
    Array.prototype.forEach.call(ImageElements, function(el, i) {
      // Wrapping figure
      let figure = document.createElement("figure");
      // figure.classList = "left top zoom-effect";
      // figure.classList = "zoom-effect";
      figure.classList = "zoom-effect " + cutoutClasses[Math.floor(getRandomInt(0, cutoutClasses.length))];


      let figureInner = document.createElement("div");
      figureInner.className = "aspectRatioPlaceholder";

      el.parentNode.insertBefore(figureInner, el);
      figureInner.parentNode.insertBefore(figure, el);
      figureInner.appendChild(el);
      figure.appendChild(figureInner);
    });
  }

}
