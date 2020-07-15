$(function(){

	var win = $(window);
	var vh = 0;

	$(window).load(function(){
		$('#header').addClass('load');
		$('#wrap.sub').find('#header').addClass('bgbg');
		$('#left_menuWrap').addClass('load');
	//	$('#container.hasLeftMenu').addClass('load');
	});

	$('.winH').height(win.height());
    $(window).on('load resize',function(){
        $('.winH').height($(this).height());
        vh = $(window).height();
		if( $(this).width() < 1200 ){
			$('#left_menuWrap').removeClass('load');
			$('.mobileTab').removeClass('active');
		}else{
			$('#left_menuWrap').addClass('load');
		}
    });

	$('.btn_all_menu').click(function(e){
		e.preventDefault();
		if( $(this).hasClass('active') ){
		//	$('.allMenuWrap ').hide();
			$('.allMenuWrap ').removeClass('show');
			$('.btn_all_menu').removeClass('active');
			$('.allMenu .hasDep2 .dep2').slideUp(250);
		}else{
		//	$('.allMenuWrap ').show();
			$('.allMenuWrap ').addClass('show');
			$('.btn_all_menu').addClass('active');
		}
	});

	$('.allMenu .hasDep2 > a').click(function(e){
		e.preventDefault();
		if( $(this).next('.dep2').css('display') == 'block' ){
			$(this).next('.dep2').slideUp();
		}else {
			$('.allMenu .hasDep2 .dep2').slideUp(250);
			$(this).next('.dep2').slideDown(250);
		}
	});

	$('.mobileTab').click(function(){
		if( $(this).hasClass('active') ){
			$(this).removeClass('active');
			$('#left_menuWrap').removeClass('load');
		}else{
			$(this).addClass('active');
			$('#left_menuWrap').addClass('load');
		}
	});

	/* gogo js */ 

	$.fn.isInViewport = function() {
	  var elementTop = $(this).offset().top;
	  var elementBottom = elementTop + $(this).outerHeight();

	  var viewportTop = $(window).scrollTop();
	  var viewportBottom = viewportTop + $(window).height();

	  return elementBottom > viewportTop + (vh/12)  && elementTop < viewportBottom - (vh/12) ;
	};

	$.fn.isInViewport2 = function() {
	  var elementTop = $(this).offset().top;
	  var elementBottom = elementTop + $(this).outerHeight();

	  var viewportTop = $(window).scrollTop();
	  var viewportBottom = viewportTop + $(window).height();

	  return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	$(window).on('load resize scroll',function(){
		$('.aniBox').each(function(){
			if($(this).isInViewport()){
				$(this).addClass('gogo');
			}
		});

		$('.aniBox2').each(function(){
			if($(this).isInViewport2()){
				$(this).addClass('gogo');
			}
		});
		
/*
		if($('.locationWrap').length > 0 ){
			if($(window).scrollTop() >=  ($('.locationWrap').outerHeight() - $('#header').outerHeight())){
				$('#header').addClass('bgbg');
			}else{
				$('#header').removeClass('bgbg');
			}
		}else{
			if($(window).scrollTop() >=  ($(window).height() - $('#header').outerHeight())){
			//	$('#header').addClass('bgbg');
			}else{
			//	$('#header').removeClass('bgbg');
			}
		}
	*/
	});
	


	
	$('.fileBox').each(function(){
		var uploadFile = $(this).find('.uploadBtn');

		$(this).find('input[type="text"]').click(function(){
			$(this).siblings('.uploadBtn').trigger('click');
			console.log($(this).next('.uploadBtn').attr('class'));
		});

		uploadFile.on('change', function(){
			if(window.FileReader){
				var filename = $(this)[0].files[0].name;
			} else {
				var filename = $(this).val().split('/').pop().split('\\').pop();
			}
			$(this).siblings('.fileName').val(filename);
		});
	});

	$('.select_box a').click(function(e){
		select_change(this);
		e.stopPropagation();
	});

	$('.placeholder input, .placeholder textarea').each(function(){
		$(this).focus(function(){
			$(this).siblings('.placeholder').hide();
		});
		$(this).blur(function(){
			placeholder(this);
		});
	});

});

function select_change(_target){
	var _target = $(_target);
	if(_target.parent()[0].nodeName == 'DT'){
		if(_target.closest('dl').hasClass('active')){
			_target.closest('dl').find('dd').slideUp(200);
			_target.closest('dl').removeClass('active');
		} else {
			_target.closest('dl').addClass('active');
			_target.closest('dl').find('dd').slideDown(200);
			_target.closest('dl').find('dt a').css({
				minWidth:_target.closest('dl').find('ul').outerWidth() + 2
			});
		}
	} else {
		if(_target.closest('dl').hasClass('active')){
			_target.closest('dd').siblings().find('a').text(_target.text());
			_target.closest('dl').find('dd').slideUp(200);
			_target.closest('dl').removeClass('active');
			/* select option 선택 */
			_target.closest('dl').siblings('select').find('option').removeAttr('selected');
			_target.closest('dl').siblings('select').find('option').eq(_target.parent().index()).attr('selected','selected');
		} else {
			_target.closest('dl').addClass('active');
			_target.closest('dl').find('dd').slideDown(200);
		}
	}
}

function placeholder(_target){
	var _target = $(_target);
	if(_target.val().length > 0){
		_target.siblings('.placeholder').hide();
	} else {
		_target.siblings('.placeholder').show();
	}
}

//var c = 0;
function Loop_ani (_init, duration, _target) { //  create a loop function
	var _target = $(_target);
	timer = setTimeout(function () {
		$(_target).children().eq(_init).addClass('active');
		_init++;
		if (_init < $(_target).children().length) {
			Loop_ani(_init, duration, _target);
		} else {
			clearTimeout(timer); // clear timeout
			_target.addClass('ani_finished');
		}
		//console.log(c);
	}, duration);
}