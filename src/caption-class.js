// PhotoSwipe - http://www.photoswipe.com/
// Copyright (c) 2011 by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license

(function(Util){
	
	/*
	 * Class: Code.PhotoSwipe.CaptionClass
	 */
	Code.PhotoSwipe.CaptionClass = Code.PhotoSwipe.ElementClass.extend({
		
		contentEl: null,
		
		fadeOutTimeout: null,
		
		touchStartHandler: null,
		
		/*
		 * Function: init
		 */
		init: function(options){
			
			this.settings = {
				captionDelay: 4000,
				position: 'bottom'
			};
			
			Util.extend(this.settings, options);
			
			this._super(options);
			
			this.touchStartHandler = this.onTouchStart.bind(this);
			
			// Create element and append to body
			var cssClass = Code.PhotoSwipe.CaptionClass.CssClasses.caption;
			if (this.settings.position === 'bottom'){
				cssClass = cssClass + ' ' + Code.PhotoSwipe.CaptionClass.CssClasses.bottom;
			}
			
			this.el = Util.DOM.createElement('div', { 'class': cssClass }, '');
			Util.DOM.setStyle(this.el, {
				left: 0,
				position: 'absolute',
				overflow: 'hidden',
				zIndex: 1000
			});
			Util.DOM.hide(this.el);
			Util.DOM.appendToBody(this.el);
			
			this.contentEl = Util.DOM.createElement('div', { 'class': Code.PhotoSwipe.CaptionClass.CssClasses.content }, '');
			Util.DOM.appendChild(this.contentEl, this.el);
			
		},
		
		
		
		/*
		 * Function: addEventListeners
		 */
		addEventListeners: function(){
			
			try{
				Util.DOM.addEventListener(this.el, 'touchstart', this.touchStartHandler);
			}
			catch (err){ }
			
		},
		
		
		
		/*
		 * Function: removeEventListeners
		 */
		removeEventListeners: function(){
			
			try{
				Util.DOM.removeEventListener(this.el, 'touchstart', this.touchStartHandler);
			}
			catch (err){ }
			
		},
		
		
		
		/*
		 * Function: onTouch
		 */
		onTouchStart: function(e){
			
			e.preventDefault();
			
		},
		
		
		
		/*
		 * Function: resetPosition
		 */
		resetPosition: function(){
			
			var top;
			
			if (this.settings.position === 'bottom') {
				top = Util.DOM.windowHeight() - Util.DOM.height(this.el) + Util.DOM.windowScrollTop();
			}
			else {
				top = Util.DOM.windowScrollTop();
			}
			
			Util.DOM.setStyle(this.el, 'top', top + 'px');
			Util.DOM.width(this.el, Util.DOM.bodyWidth());
			
		},
		
		
		
		/*
		 * Function: setCaptionValue
		 */
		setCaptionValue: function(captionValue){
		
			Util.DOM.removeChildren(this.contentEl);
			
			captionValue = Util.coalesce(captionValue, '\u00A0');
			
			if (Util.isObject(captionValue)){
				Util.DOM.appendChild(captionValue, this.contentEl);
			}
			else{
				if (captionValue === ''){
					captionValue = '\u00A0';
				}
				Util.DOM.appendText(captionValue, this.contentEl);	
			}
			
		},

		
		
		/*
		 * Function: stopFade
		 */
		stopFade: function(){
		
			window.clearTimeout(this.fadeOutTimeout);
			this._super();
			
		},
		
		
		/*
		 * Function: postShow
		 */
		postShow: function(){
			
			this.setFadeOutTimeout();
			this._super();
			
		},
		
		
		/*
		 * Function: postFadeIn
		 */
		postFadeIn: function(){
			
			this.setFadeOutTimeout();
			this._super();
			
		},
		
		
		/*
		 * Function: setFadeOutTimeout
		 */
		setFadeOutTimeout: function(){
			
			window.clearTimeout(this.fadeOutTimeout);
			
			if (this.settings.captionDelay > 0){
				
				this.fadeOutTimeout = window.setTimeout(
					this.fadeOut.bind(this),
					this.settings.captionDelay
				);
				
			}
			
		}
	
	});
	
	
	Code.PhotoSwipe.CaptionClass.CssClasses = {
		caption: 'ps-caption',
		bottom: 'ps-caption-bottom',
		content: 'ps-caption-content'
	};

})(Code.PhotoSwipe.Util);