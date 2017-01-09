
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

  console.log(document);
  console.log(document.documentElement);


  function updateScreenSize() {
    let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth  || g.clientWidth,
        y = w.innerWidth || e.clientHeight || g.clientHeight;
        screenSize.x = x;
        screenSize.y = y;
  }

  // Set screen variables initially and on resize
  updateScreenSize();
  window.addEventListener("resize", updateScreenSize);


  function zoom() {
    if (!this.isZoomed) {

      zoomedImage = this;
      console.log(zoomedImage);
    } else {

    }
  }


  // Apply effects on passed-in elements
  const elements = document.querySelectorAll(element);
  Array.prototype.forEach.call(elements, function(el, i) {
    el.addEventListener("click", zoom);
  });

  // Zoom out on scroll
  function zoomOut() {
    if (zoomedImage) {
      zoomedImage.click();
    }
  }

  window.addEventListener("scroll", zoomOut);


}
