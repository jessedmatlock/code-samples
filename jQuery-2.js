$.fn.jmParallax = function(options) {          
	
	var $window = $(window);
	var windowHeight = $(window).height();
	var pos = $window.scrollTop(); 				//position of the scrollbar
	var offset = $window.pageYOffset;
	var $this = $(this);
    var dir = '';
	var firstTop;


	var defaults = {  
		scrollType: 'pos', 					// bg or pos to have background position be parallaxed
		direction: 'top', 			   	 	// top, right, bottom or left  = direction of animation
        inertia: 1,							// 0.0 - 100, percentage of speed of scroll
	  	animType: '%',						// px or %
        heightOffset: true,					// true or false, matches elements height with windowheight
        xPos: '0',                          // 0 to ~ xPos of BG
        xPosType: 'px',                     // px or % of xPos for BG
        adjuster: '0',						// y position to start from 
 	};  
		
//    var options = $.extend(defaults, options); 

	if(scrollType == 'pos'){		
		return this.each(function() {
			$(this).css({
	    		"direction" : (windowHeight - (offset*inertia)) + animType;	  
	          if(heightOffset == true){
		         "height": windowHeight
				}
			   	
			});
        });
	} 
	if(scrollType == 'bg'){
		if(direction == 'top'){ var dir = '-'; }
		if(direction == 'bottom'){ var dir = '+'; }
		
		
		return this.each(function() {
			$(this).css({
	        "background-position": xPos + xPosType+ " "+ Math.round((dir((windowHeight + pos) - adjuster) * inertia)) + animType  	
	
			});
        });
	}     

	
	$this.each(function(){
	    firstTop = $this.offset().top;
	}); 	
	
	
	function update(){
		var pos = $window.scrollTop();				

		$this.each(function(){
			var $this = $(this);
			var top = $this.offset().top;
			var height = getHeight($this);

			// Check if totally above or totally below viewport
			if (top + height < pos || top > pos + windowHeight) {
				return;
			}

			$this.css('backgroundPosition', xPos + xPosType + " " + Math.round((firstTop - pos) * inertia) + animType);
		});
	}		

	$window.bind('scroll', update).resize(update);
	update();      		
};    
(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});
