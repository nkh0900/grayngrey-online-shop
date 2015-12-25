/**
 * 움직이는 배너 Jquery Plug-in
 * @author  cafe24
 */

;(function($){

    $.fn.floatBanner = function(options) {
        options = $.extend({}, $.fn.floatBanner.defaults , options);

        return this.each(function() {
            var aPosition = $(this).position();
            var node = this;

            $(window).scroll(function() {
                var _top = $(document).scrollTop();
                _top = (aPosition.top < _top) ? _top : aPosition.top;

                setTimeout(function () {
                    $(node).stop().animate({top: _top}, options.animate);
                }, options.delay);
            });
        });
    };

    $.fn.floatBanner.defaults = {
        'animate'  : 500,
        'delay'    : 500
    };

})(jQuery);



/**
 * 문서 구동후 시작
 */
$(document).ready(function(){
    $('#quickR, #quickL').floatBanner();
});

$(document).ready(function() {
    // $('#nav').localScroll();
    // $('#intro').parallax("50%", 0.1);
    // $('#second').parallax("50%", 0.1);
    // $('.bg').parallax("50%", 0.4);
    // $('#third').parallax("50%", 0.3);
    $('#menu ul').hide();
    $('#menu ul').children('.current').parent().show();
    // $('#menu ul:first').show();
    $('#menu li a').click(
        function() {
            var checkElement = $(this).next();
            if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
                return false;
            }
            if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
                $('#menu ul:visible').slideUp('normal');
                checkElement.slideDown('normal');
                return false;
            }
        }
    );
});
