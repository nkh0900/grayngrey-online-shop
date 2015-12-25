$(document).ready(function() {
	var openCheck = null;

	function rightScrollOpen(selectNode) {
		$('#rightscroll').append('<div><iframe src="' + $(selectNode).attr('href') + '" frameborder="0"></iframe><p><a href="javascript:void(0);">Close</a></p></div>');
		$('#rightscroll div p').css('margin-top', $(selectNode).position().top);
		$('#rightscroll div p a').css({'height':$(selectNode).css('height'), 'background-image':$(selectNode).css('background-image')}).click(function() { rightScrollClose(selectNode); });
		$(selectNode).css('visibility', 'hidden');

		$('#rightscroll div').animate({right:'30px'}, 500, function() {
			openCheck = selectNode;
			addClickEvent();
		});
	}

	function rightScrollClose(selectNode, opt) {
		$('#rightscroll div').animate({right:'-372px'}, 500, function() {
			$(selectNode).css('visibility', 'visible');
			$('#rightscroll div').remove();
			openCheck = null;

			if(opt == undefined) addClickEvent();
		});
	}

	function addClickEvent(opt) {
		$('#rightscroll ul a').unbind('click');

		if(opt == undefined) {
			$('#rightscroll ul a').click(function() {
				addClickEvent(true);

				var iTimeout = 0;

				if(openCheck != null) {
					rightScrollClose(openCheck, false);
					iTimeout = 600;
				}

				var _this = this;

				setTimeout(function() { rightScrollOpen(_this); }, iTimeout);

				return false;
			});
		}
		else $('#rightscroll ul a').click(function() { return false; });
	}

	addClickEvent();
});