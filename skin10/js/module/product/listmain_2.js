/**
* @class
*  마우스 오버시 상품명 및 가격이 떨어지면서 나타남.
*
* @example
*   $(".xans-product-2 ul>li").outlinebox({ 'box' : '.price_box', 'borderSize' : '3px', 'startPos' : false });
*
* @name jquery.boxdown.js
* @author JsYang <yakuyaku@gmail.com>
* @since 2011년 10월 11일 화요일
* @version 1.0
*/
;(function($){

    $.fn.boxdown = function ( options ) {

        var opts = $.extend( {}, $.fn.boxdown.defaults, options );

        return this.each(function() {
            var $this = $(this), $box = $this.find(opts.box).eq(0);

            if ( !$box ) {
                return;
            };

            var topOff = parseInt($this.height() / 2,10) - parseInt($box.height()/2,10) + opts.offTop;

            $this.css({
                'position' : 'relative',
                'overflow' : 'hidden'
            });

            $box.css({
                'position':'absolute',
                'display' : 'block',
                'opacity' : 0,
                'top' : '0px'
            });

            $this.hover(function(){
                $box.stop().animate({  'center' : topOff, "opacity": 0.8 }, { 'duration' : opts.speed, 'easing' : 'swing' },function(){} );
            }, function(){
                $box.stop().animate({  'center' : 0, "opacity": 0 }, { 'duration' : opts.speed, 'easing' : 'swing' },function(){} );
            });
        });
    }

    $.fn.boxdown.defaults = {
        'box' : '.contents',
        'offTop': 30,
        'speed' : 300
    };

})(jQuery);


$(document).ready(function(){
	$(".xans-product-2 ul>li").boxdown({'box' : '.price_box', 'offTop' : 100});
});