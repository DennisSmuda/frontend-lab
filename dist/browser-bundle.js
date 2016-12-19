/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ScrollFloat = __webpack_require__(2);
	
	var _ScrollFloat2 = _interopRequireDefault(_ScrollFloat);
	
	var _ScrollFragment = __webpack_require__(3);
	
	var _ScrollFragment2 = _interopRequireDefault(_ScrollFragment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	$(document).ready(function () {
	  // let floater = new ScrollFloat('story');
	  var fragger = new _ScrollFragment2.default('trigger');
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 *
	 */
	var ScrollFloat = function () {
	  function ScrollFloat(selector) {
	    _classCallCheck(this, ScrollFloat);
	
	    this.active = true;
	    this.lastScrollTop = 0;
	    this.scrollPercentage = 0;
	    this.windowHeight = $(window).height();
	    this.documentHeight = $(document).height();
	
	    this.$floatItems = $('.' + selector);
	    this.tweens = [this.$floatItems.length];
	    this.indicatorPosition = 0;
	    this.lastIndicatorPosition = 0;
	
	    this.setupTweens();
	    this.setupEvents();
	
	    this.loop();
	  }
	
	  _createClass(ScrollFloat, [{
	    key: 'setupTweens',
	    value: function setupTweens() {
	      var _this = this;
	
	      this.$floatItems.each(function (i, el) {
	        _this.tweens[i] = new TimelineMax().add([
	        // TweenMax.fromTo($(el), 1, { y: (i+1)*200}, {y: 0}),
	        TweenMax.fromTo($(el), 1, { y: _this.windowHeight / 2 }, { y: 0 })]);
	      });
	    }
	  }, {
	    key: 'loop',
	    value: function loop() {
	      var _this2 = this;
	
	      // Lerp indicator towards current Scroll percentage
	      // - Use lerped indicator as 'timeline-seeker'
	      this.scrollPercent = (this.lastScrollTop + this.windowHeight) / this.documentHeight || 0;
	      this.indicatorPosition += (this.scrollPercent - this.indicatorPosition) * 0.05;
	
	      this.tweens.forEach(function (timeline, i) {
	        timeline.seek(_this2.indicatorPosition);
	      });
	
	      if (this.active) requestAnimationFrame(this.loop.bind(this));
	    }
	  }, {
	    key: 'setupEvents',
	    value: function setupEvents() {
	      var _this3 = this;
	
	      $(window).on('scroll', window, this.scrollCallback.bind(this));
	
	      $(window).on('focusout', function () {
	        _this3.active = false;
	      });
	
	      $(window).on('focusin', function () {
	        _this3.active = true;
	        _this3.loop();
	      });
	    }
	  }, {
	    key: 'scrollCallback',
	    value: function scrollCallback() {
	      if (!this.active) return;
	
	      this.lastScrollTop = $(window).scrollTop();
	    }
	  }]);
	
	  return ScrollFloat;
	}();
	
	exports.default = ScrollFloat;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function getRandomNumber(min, max) {
	  // Returns an arbritrary random number
	  return Math.random() * (max - min) + min;
	}
	
	var ScrollFragment = function () {
	  function ScrollFragment(selector) {
	    _classCallCheck(this, ScrollFragment);
	
	    this.active = true;
	    this.$trigger = $('.' + selector);
	
	    // Fragments
	    this.fragmentSVG = '<div class="fragment"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30"><defs><path d="M.68 0L15 30 29.32 0H.68z" id="a"/></defs><g visibility="inherit"><use xlink:href="#a" /><use xlink:href="#a" /></g></svg> </div>';
	    this.numFragments = 1;
	    this.fragmentSize = 20;
	    this.fragments = [this.numFragments];
	    this.$fragmentContainer = $('#fragment-container');
	    this.containerWidth = this.$fragmentContainer.width();
	    this.fragmentOffset = this.$fragmentContainer.offset().left;
	    this.fragmentWidth = 10;
	
	    this.triggerOffset = this.$trigger.position().top;
	    this.triggered = false;
	    this.scrollTop = 0;
	
	    this.tweens = [this.numFragments];
	
	    this.setupFragmentsWithinContainer();
	    this.setupTimelines();
	
	    // Setup Scroll Event
	    $(window).on('scroll', window, this.scrollCallback.bind(this));
	    // Start Looping
	    this.loop();
	  }
	
	  _createClass(ScrollFragment, [{
	    key: 'setupTimelines',
	    value: function setupTimelines() {
	      var _this = this;
	
	      this.fragments = $('.fragment');
	      this.fragments.each(function (i, el) {
	
	        var top = $(el).offset().top;
	
	        _this.tweens[i] = new TimelineMax().add([TweenMax.fromTo($(el), 1, { y: 0 }, { y: 10 })]);
	      });
	    }
	  }, {
	    key: 'setupFragmentsWithinContainer',
	    value: function setupFragmentsWithinContainer() {
	      // Gaußsche Summenformel (Dreiecks-Zahlen zur berechnung aller Fragmente)
	      var numFirstRow = Math.floor(this.containerWidth / this.fragmentWidth);
	      var numRows = numFirstRow;
	      var currentRow = 0;
	      var numCurrentRow = numFirstRow;
	      var currentColumn = 0;
	      var counter = 0;
	      var currentAmount = numFirstRow - currentRow;
	
	      this.numFragments = (Math.pow(numFirstRow, 2) + numFirstRow) / 2;
	
	      for (var i = 0; i < this.numFragments; i++) {
	        var newElement = $(this.fragmentSVG);
	
	        newElement.css('left', counter * 10 + currentRow * this.fragmentWidth / 2);
	        newElement.css('top', currentRow * this.fragmentWidth);
	        newElement.css('opacity', Math.random());
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
	  }, {
	    key: 'loop',
	    value: function loop() {
	      if (this.scrollTop > this.triggerOffset) {
	        // console.log("Triggered")
	        // this.$trigger.addClass('triggered')
	        this.tweens.forEach(function (timeline, i) {
	          timeline.seek(1);
	        });
	      } else {
	        // console.log("NOT Triggered")
	        // this.$trigger.removeClass('triggered')
	        this.tweens.forEach(function (timeline, i) {
	          timeline.seek(0);
	        });
	      }
	
	      if (this.active) requestAnimationFrame(this.loop.bind(this));
	    }
	  }, {
	    key: 'scrollCallback',
	    value: function scrollCallback() {
	      this.scrollTop = $(window).scrollTop();
	    }
	  }]);
	
	  return ScrollFragment;
	}();
	
	exports.default = ScrollFragment;

/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=browser-bundle.js.map