function paralaxBg(element) {
    var p = {
        scrollTop: $(window).scrollTop(),
        windowHeight: $(window).height(),
        contentTop: $(element).position().top,
        contentHeight: $(element).height()
    };
    // determine scrollTop's bounds where content enters & exits the window
    p.lowerBound = p.contentTop - p.windowHeight;
    p.upperBound = p.contentTop + p.contentHeight;

    // determine scrollTop's position percentage in relation to bounds
    p.percent = 25+((p.scrollTop - p.lowerBound) / (p.upperBound - p.lowerBound) * 100) * 0.50;

    $(element).css({
          "background-position": "50% " + p.percent +"%"
    });
}
function Move() {
	paralaxBg('#bg1');
	paralaxBg('#bg2');
	paralaxBg('#bg3');
}
function scrolling(){
	var scrollTop = $(window).scrollTop();
	if( scrollTop > 300 ){
		$('body').addClass('scrolling');
	} else {
		$('body').removeClass('scrolling');
	}
}
   
$(document).ready(function(){
	$('.scroll').click(function(){
		var target = ($(this).attr('href') =='') ? $(this).data('href') : $(this).attr('href'),				
			offset = $(this).data('offset'),
			speed = $(this).data('speed'),	
			offsetTop = $(target).offset().top,			
			totalScroll = offsetTop - offset;
			 
		$('body,html').animate({
			scrollTop: totalScroll
		}, speed);
		
		return false;
	});
	
	$('[data-mixpanel-action]').click(function(){
		var action = $(this).data('mixpanel-action');
		mixpanel.track(action);
	});
	$(window).resize(function () {
	    Move();
	});
	$(window).bind('scroll', function () {
	    Move();	
		scrolling();
	});	
	
	$('.destination').each(function(i) {
		var position = $(this).position();
		$(this).scrollspy({
			min: position.top - 250,
			max: position.top + $(this).height(),
			onEnter: function(element, position) {
				$(".top-bar a").removeClass('active')
				$(".top-bar a[href='#"+element.id+"']").addClass('active');
			},
			onLeave: function(element, position) {
				$(".top-bar a[href='#"+element.id+"']").removeClass('active');
			}
		});
	});
	
	
	$(document).foundation();
});  // end docready

$(window).load(function () {
    $('#loading').fadeOut('slow');
});
