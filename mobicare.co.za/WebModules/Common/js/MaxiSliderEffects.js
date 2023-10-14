;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($){
    'use strict';
    var EffectSlider = window.EffectSlider || {};
    
    EffectSlider = (function(){
        var _ = this;

        class EffectSlider {
            constructor(element, settings) {
                var _ = this, dataSettings;

                _.defaults = {
                    effect: "slide",
                    imgpos: "center",
                    imgsize: "full",
                    imgheight: "thick",
                    imgthumbs: "empty",
                    arrows: false,
                    arrowstype: undefined,
                    arrowspos: "top",
                    arrowssize: "",
                    arrowbh: "",
                    arrowdisplay: "show",
                    autoplay: false,
                    speed: 2000,
                    extra: false,
                    rtl: false,
                    pauseOnHover: true,
                    pauseOnFocus: true,
                    pauseOnDotsHover: false,
                    pauseOnArrowHover: false
                };

                _.paused = true;
                _.focussed = false;
                _.interrupted = false;
                _.$slider = $(element);
                _.$sliderElmP = $(element).closest("div[data-slider='effects']");
                _.autoPlayTimer = undefined;
				_.sliderStartNum = Math.floor(Math.random() * 10000) + 1

                dataSettings = $(element).data('effects') || {};

                _.options = $.extend({}, _.defaults, settings, dataSettings);

                _.autoPlay = $.proxy(_.autoPlay, _);
                _.autoPlayClear = $.proxy(_.autoPlayClear, _);
                _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
                _.changeSlide = $.proxy(_.changeSlide, _);
                _.ChangeDot = $.proxy(_.ChangeDot, _);

                _.init(true);
            }
        }
            
        return EffectSlider;
       
    }());

    EffectSlider.prototype.buildArrows = function() {
        var _ = this;
        
        if (_.options.arrows){
            switch(_.options.arrowstype){
                case "full":
                    _.options.prevArrow = "<button type='button' class='prev' data-pos='"+_.options.arrowspos+"' data-size='"+_.options.arrowssize+"' data-bh='"+_.options.arrowbh+"' ><i class='fa fa-caret-left'></i></button>",
                    _.options.nextArrow = "<button type='button' class='next' data-pos='"+_.options.arrowspos+"' data-size='"+_.options.arrowssize+"' data-bh='"+_.options.arrowbh+"' ><i class='fa fa-caret-right'></i></button>";
                break;
                case "medium":
                    _.options.prevArrow = "<button type='button' class='prev' data-pos='"+_.options.arrowspos+"' data-size='"+_.options.arrowssize+"' data-bh='"+_.options.arrowbh+"' ><i class='fa fa-angle-left'></i></button>",
                    _.options.nextArrow = "<button type='button' class='next' data-pos='"+_.options.arrowspos+"' data-size='"+_.options.arrowssize+"' data-bh='"+_.options.arrowbh+"' ><i class='fa fa-angle-right'></i></button>";
                break;
                case "thin":
                    _.options.prevArrow = "<button type='button' class='prev' data-pos='"+_.options.arrowspos+"' data-size='"+_.options.arrowssize+"' data-bh='"+_.options.arrowbh+"' ><svg x='0px' y='0px' viewBox='0 0 357.5 271' style='enable-background:new 0 0 357.5 271;' xml:space='preserve'><path d='M1.3,137.4C44.1,93,87.7,47.8,133.2,0.7c5.8,6.7,10.3,11.8,16.6,19c-34,33.7-67.7,67.1-104,103  c105.8,0,208,0,311.4,0c0,9.9,0,18.1,0,28.5c-102.5,0-205.1,0-311.1,0c36.4,36,70.1,69.3,104.6,103.5c-7.6,7.1-12.6,11.7-16.5,15.4  C89,224.9,44.6,180.7,1.3,137.4z'/></svg></button>",
                    _.options.nextArrow = "<button type='button' class='next' data-pos='"+_.options.arrowspos+"' data-size='"+_.options.arrowssize+"' data-bh='"+_.options.arrowbh+"' ><svg x='0px' y='0px' viewBox='0 0 357.5 271' style='enable-background:new 0 0 357.5 271;' xml:space='preserve'><path d='M1.3,137.4C44.1,93,87.7,47.8,133.2,0.7c5.8,6.7,10.3,11.8,16.6,19c-34,33.7-67.7,67.1-104,103  c105.8,0,208,0,311.4,0c0,9.9,0,18.1,0,28.5c-102.5,0-205.1,0-311.1,0c36.4,36,70.1,69.3,104.6,103.5c-7.6,7.1-12.6,11.7-16.5,15.4  C89,224.9,44.6,180.7,1.3,137.4z'/></svg></button>";
                break;
            }

            _.$prevArrow = $(_.options.prevArrow).addClass('effect-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('effect-arrow');
            
            $(_.$slider).append(_.options.prevArrow + _.options.nextArrow);
        }
    }

    EffectSlider.prototype.buildDots = function(){
        var _ = this;

        if( _.options.extra ){
            var ChildernElm = [];
            var childern = $(_.$sliderElmP).find(".slide-thumb-ctn .slide-thumb")
                
            $.each(childern, function(){
                ChildernElm.push(this)
            })

            if( _.options.imgthumbs == "images" ){
                _.options.totalwidth = ChildernElm.length * 110;    
                var half = Math.round(ChildernElm.length/2)
                var chElm = $.map(childern, function(item){ return item.outerHTML; }).join("")
                _.options.startX = 110 * (half / 2)
                    
                $(_.$sliderElmP).find(".slide-thumb-ctn").html("<div class='slide-thumb-scroll'>"+chElm+"</div>") 
                if ( _.options.totalwidth > $(_.$sliderElmP).width()  ){
                    $(_.$sliderElmP).find(".slide-thumb-scroll").prepend( $.map(childern, function(item, index){ if(index >= half)return item.outerHTML.replace(/class="slide-thumb"/g, 'class="slide-thumb slide-clone"' ); }).join("") )
                    $(_.$sliderElmP).find(".slide-thumb-scroll").append( $.map(childern, function(item, index){ if(index < half)return item.outerHTML.replace(/class="slide-thumb"/g, 'class="slide-thumb slide-clone"' ); }).join("") )
                    $(_.$sliderElmP).find(".slide-thumb-scroll").css({"width":_.options.totalwidth*2+"px", "transform": "translate3d(-"+_.options.startX+"px, 0px,0px)"})
                    $(_.$sliderElmP).find(".slide-thumb-ctn .slide-thumb:not(.slide-cloned)[data-n='1']").addClass("active");
                }
            }
        }else{
			$(_.$sliderElmP).find(".slide-thumb-ctn").remove()
		}
    }
    
    EffectSlider.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('effect-initialized')) {

            $(_.$slider).addClass('effect-initialized');
			
			_.buildSlider();
            _.buildArrows();
            _.buildDots();
            _.initializeEvents();

            $(_.$sliderElmP).attr({"data-image-position": _.options.imgpos, "data-image-size": _.options.imgsize, "data-image-height": _.options.imgheight});
            $(_.$sliderElmP).attr({"data-thumbs": _.options.imgthumbs, "data-arrow": _.options.arrowdisplay});

        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();
        }
    };
	
	EffectSlider.prototype.buildSlider = function() {
		var _ = this;
		
		$(_.$slider).find(".slide").each(function(index){
			var num = _.sliderStartNum + index;
			$(this).attr("data-n", num)
			
			if(_.options.extra){
				_.$sliderElmP.find(".slide-thumb-ctn .slide-thumb:nth-child("+(index+1)+")").attr({"data-n": num, "data-num": (index+1)})
			}
			
		})

		//if( _.options.rtl && _.options.extra && _.options.imgthumbs != "images"){
		//	_.$sliderElmP.find(".slide-thumb-ctn .slide-thumb:not(:first-child)").sort(function(a, b) {
		//		var contentA = parseInt( $(a).attr("data-n") );
		//		var contentB = parseInt( $(b).attr("data-n") );

		//		return (contentA < contentB) ? 1 : (contentA > contentB) ? -1 : 0;
		//	}).appendTo( _.$sliderElmP.find(".slide-thumb-ctn") );
		//}
	}

    EffectSlider.prototype.initializeEvents = function() {
        var _ = this;

        _.initArrowEvents();
        _.initDotEvents();
        _.initSlideEvents();
    };

    EffectSlider.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    EffectSlider.prototype.autoPlay = function() {
        var _ = this;
        _.autoPlayClear();

        //if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.speed * 2 );
        //}

    };

    EffectSlider.prototype.autoPlayClear = function() {
        var _ = this;
        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }
    };

    EffectSlider.prototype.autoPlayIterator = function(){
        var _ = this;
        var n = parseInt($(_.$slider).find(".slide.current").attr("data-n"));

        if ( !_.paused && !_.interrupted && !_.focussed ) {
            //if(_.options.rtl ){
            //    n--;
            //    if (n < _.sliderStartNum) { n = $(_.$slider).find(".slide:last").attr("data-n"); }
            //}else{
                n++;
                if ($(_.$slider).find(".slide[data-n='" + n + "']").length == 0) { n = _.sliderStartNum; }
            //}
            
            _.effectHandler(n, (_.options.rtl)? "sliding-right" : "sliding-left");
        }
    };

    EffectSlider.prototype.changeSlide = function(event, dontAnimate){
        var _ = this;
        var $target = $(event.currentTarget);

        if( ! $(_.$sliderElmP).hasClass("no-click") ){
            switch (event.data.message) {
                case 'previous':
                    var n = parseInt($(_.$slider).find(".slide.current").attr("data-n"));
                    n--;
                    if (n < _.sliderStartNum) { n = $(_.$slider).find(".slide:last").attr("data-n"); }
                    _.effectHandler(n, (!_.options.rtl)? "sliding-right" : "sliding-left")
                break;
    
                case 'next':
                    var n = parseInt($(_.$slider).find(".slide.current").attr("data-n"));
                    n++;
                    if ($(_.$slider).find(".slide[data-n='" + n + "']").length == 0) { n = _.sliderStartNum; }
                    _.effectHandler(n, (_.options.rtl)? "sliding-right" : "sliding-left");
                break;
    
                case 'index':
                    var n = $($target).attr("data-n");
                    _.effectHandler(n, (_.options.rtl)? "sliding-right" : "sliding-left");
                break;
            }
        }
    }

    EffectSlider.prototype.removeSlideClass = function(){
        var _ = this;
        $(_.$slider).find(".slide.sliding").removeClass("sliding");
        $(_.$slider).find(".slide.sliding-left").removeClass("sliding-left");
        $(_.$slider).find(".slide.sliding-right").removeClass("sliding-right");
    }

    EffectSlider.prototype.effectHandler = function(n, dir){
        var _ = this;

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        _.removeSlideClass()

        $(_.$sliderElmP).addClass("no-click");
        $(_.$slider).find(".slide.current").addClass(dir).removeClass("current");
        $(_.$slider).find(".slide[data-n='" + n + "']").addClass("current");
    
        _.ChangeDot(n);

        setTimeout(function () {
            _.removeSlideClass()
            $(_.$sliderElmP).removeClass("no-click");

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

        }, _.options.speed);
    }

    EffectSlider.prototype.ChangeDot = function(n){
        var _ = this;
        if( _.options.extra ){
            if( _.options.imgthumbs == "images" && ( _.options.totalwidth > $(_.$sliderElmP).width() ) ) {
                var num = parseInt($(_.$sliderElmP).find(".slide-thumb[data-n='" + n + "']").attr("data-num"));
                var newX = _.options.startX + (110 * (num - 1));
                $(_.$sliderElmP).find(".slide-thumb-scroll").css({"transform": "translate3d(-"+newX+"px, 0px,0px)"})
            }

            $(_.$sliderElmP).find(".slide-thumb.active").removeClass("active");
            $(_.$sliderElmP).find(".slide-thumb[data-n='" + n + "']:not(.slide-cloned)").addClass("active");
        }
    }

    EffectSlider.prototype.effectPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    EffectSlider.prototype.effectPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    EffectSlider.prototype.initSlideEvents = function() {
        var _ = this;

        if ( _.options.pauseOnHover ) {

            $(_.$slider).find(".slide")
            .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
            .on('mouseleave.slick', $.proxy(_.interrupt, _, false));
        }
    };

    EffectSlider.prototype.initArrowEvents = function() {
        var _ = this;

        if (_.options.arrows === true) {
            $(_.$sliderElmP).off("click", ":not(.no-click) .next").on("click", ":not(.no-click) .next", {
                message: 'next'
            }, _.changeSlide);            
            
            $(_.$sliderElmP).off("click", ":not(.no-click) .prev").on("click", ":not(.no-click) .prev", {
                message: 'previous'
            }, _.changeSlide); 
            
            if ( _.options.pauseOnArrowHover === true) {

                $(_.$sliderElmP).find(".prev, .next")
                    .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                    .on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    
            }
        }
    };

    EffectSlider.prototype.initDotEvents = function() {
        var _ = this;
        if( _.options.imgthumbs != "empty" ){
            $(_.$sliderElmP).find(".slide-thumb[data-n='1']").addClass("active");

            $(_.$sliderElmP).off("click", ":not(.no-click) .slide-thumb").on("click", ":not(.no-click) .slide-thumb", {
                message: 'index'
            }, _.changeSlide);

            if ( _.options.pauseOnDotsHover === true) {

                $(_.$sliderElmP).find(".slide-thumb")
                    .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                    .on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    
            }
        }
    };

    EffectSlider.prototype.destroy = function() {
        var _ = this;
        _.autoPlayClear();
    };

    EffectSlider.prototype.uneffect = function(fromBreakpoint) {
        var _ = this;
        //_.$slider.trigger('uneffect', [_, fromBreakpoint]);
        _.destroy();
    };
    
    $.fn.maxislidereffects = (function() {
		var _ = this, 
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i, 
            ret;
        for(i = 0; i < l; i++ ){
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].maxislidereffects = new EffectSlider(_[i], opt);
            else
                ret = _[i].maxislidereffects[opt].apply(_[i].maxislidereffects, args);    
                
            if (typeof ret != 'undefined') return ret;
        }
    })    
}));