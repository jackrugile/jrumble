/*
jRumble v1.1 - http://jackrugile.com/jrumble
by Jack Rugile - http://jackrugile.com
Copyright 2011, Jack Rugile
MIT license - http://www.opensource.org/licenses/mit-license.php
*/

(function($){
	$.fn.jrumble = function(options){
		
		// JRUMBLE OPTIONS
		//---------------------------------
		var defaults = {
			rangeX: 2,
			rangeY: 2,
			rangeRot: 1,
			rumbleSpeed: 10,
			rumbleEvent: 'hover',
			posX: 'left',
			posY: 'top'
		};

		var opt = $.extend(defaults, options);

		return this.each(function(){
			
			// VARIABLE DECLARATION
			//---------------------------------
			$obj = $(this);			
			var rumbleInterval;	
			var rangeX = opt.rangeX;
			var rangeY = opt.rangeY;
			var rangeRot = opt.rangeRot;
			rangeX = rangeX*2;
			rangeY = rangeY*2;
			rangeRot = rangeRot*2;
			var rumbleSpeed = opt.rumbleSpeed;			
			var objPosition = $obj.css('position');
			var objXrel = opt.posX;
			var objYrel = opt.posY;
			var objXmove;
			var objYmove;
			var inlineChange;
			
			// SET POSITION RELATION IF CHANGED
			//---------------------------------
			if(objXrel === 'left'){
				objXmove = parseInt($obj.css('left'),10);
			}
			if(objXrel === 'right'){
				objXmove = parseInt($obj.css('right'),10);
			}
			if(objYrel === 'top'){
				objYmove = parseInt($obj.css('top'),10);
			}
			if(objYrel === 'bottom'){
				objYmove = parseInt($obj.css('bottom'),10);
			}
			
			// RUMBLER FUNCTION
			//---------------------------------			
			function rumbler(elem) {				
				var randBool = Math.random();
				var randX = Math.floor(Math.random() * (rangeX+1)) -rangeX/2;
				var randY = Math.floor(Math.random() * (rangeY+1)) -rangeY/2;
				var randRot = Math.floor(Math.random() * (rangeRot+1)) -rangeRot/2;	
				
				// IF INLINE, MAKE INLINE-BLOCK FOR ROTATION
				//---------------------------------
				if(elem.css('display') === 'inline'){
					inlineChange = true;
					elem.css('display', 'inline-block')
				}
			
				// ENSURE MOVEMENT
				//---------------------------------			
				if(randX === 0 && rangeX !== 0){
					if(randBool < .5){
						randX = 1;
					}
					else {
						randX = -1;
					}
				}
				
				if(randY === 0 && rangeY !== 0){
					if(randBool < .5){
						randY = 1;
					}
					else {
						randY = -1;
					}
				}
				
				// RUMBLE BASED ON POSITION
				//---------------------------------
				if(objPosition === 'absolute'){
					elem.css({'position':'absolute','-webkit-transform': 'rotate('+randRot+'deg)', '-moz-transform': 'rotate('+randRot+'deg)', '-o-transform': 'rotate('+randRot+'deg)', 'transform': 'rotate('+randRot+'deg)'});
					elem.css(objXrel, objXmove+randX+'px');
					elem.css(objYrel, objYmove+randY+'px');
				}
				if(objPosition === 'fixed'){
					elem.css({'position':'fixed','-webkit-transform': 'rotate('+randRot+'deg)', '-moz-transform': 'rotate('+randRot+'deg)', '-o-transform': 'rotate('+randRot+'deg)', 'transform': 'rotate('+randRot+'deg)'});
					elem.css(objXrel, objXmove+randX+'px');
					elem.css(objYrel, objYmove+randY+'px');
				}
				if(objPosition === 'static' || objPosition === 'relative'){
					elem.css({'position':'relative','-webkit-transform': 'rotate('+randRot+'deg)', '-moz-transform': 'rotate('+randRot+'deg)', '-o-transform': 'rotate('+randRot+'deg)', 'transform': 'rotate('+randRot+'deg)'});
					elem.css(objXrel, randX+'px');
					elem.css(objYrel, randY+'px');
				}
			} // End rumbler function
			
			// EVENT TYPES (rumbleEvent)
			//---------------------------------	
			var resetRumblerCSS = {'position':objPosition,'-webkit-transform': 'rotate(0deg)', '-moz-transform': 'rotate(0deg)', '-o-transform': 'rotate(0deg)', 'transform': 'rotate(0deg)'};
			
			if(opt.rumbleEvent === 'hover'){
				$obj.hover(
					function() {
						var rumblee = $(this);
						rumbleInterval = setInterval(function() { rumbler(rumblee); }, rumbleSpeed);
					},
					function() {
						var rumblee = $(this);
						clearInterval(rumbleInterval);
						rumblee.css(resetRumblerCSS);
						rumblee.css(objXrel, objXmove+'px');
						rumblee.css(objYrel, objYmove+'px');
						if(inlineChange === true){
							rumblee.css('display','inline');
						}
					}
				);
			}
			
			if(opt.rumbleEvent === 'click'){
				$obj.toggle(function(){
					var rumblee = $(this);
					rumbleInterval = setInterval(function() { rumbler(rumblee); }, rumbleSpeed);
				}, function(){
					var rumblee = $(this);
					clearInterval(rumbleInterval);
					rumblee.css(resetRumblerCSS);
					rumblee.css(objXrel, objXmove+'px');
					rumblee.css(objYrel, objYmove+'px');
					if(inlineChange === true){
						rumblee.css('display','inline');
					}
				});
			}
			
			if(opt.rumbleEvent === 'mousedown'){
				$obj.bind({
					mousedown: function(){
						var rumblee = $(this);
						rumbleInterval = setInterval(function() { rumbler(rumblee); }, rumbleSpeed);
					}, 
					mouseup: function(){
						var rumblee = $(this);
						clearInterval(rumbleInterval);
						rumblee.css(resetRumblerCSS);
						rumblee.css(objXrel, objXmove+'px');
						rumblee.css(objYrel, objYmove+'px');
						if(inlineChange === true){
							rumblee.css('display','inline');
						}
					},
					mouseout: function(){
						var rumblee = $(this);
						clearInterval(rumbleInterval);
						rumblee.css(resetRumblerCSS);
						rumblee.css(objXrel, objXmove+'px');
						rumblee.css(objYrel, objYmove+'px');
						if(inlineChange === true){
							rumblee.css('display','inline');
						}
					}
				});
			}
			
			if(opt.rumbleEvent === 'constant'){
				var rumblee = $(this);
				rumbleInterval = setInterval(function() { rumbler(rumblee); }, rumbleSpeed);
			}
			
		});
	}; 
})(jQuery);