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
    var LoginCtn = window.LoginCtn || {};
    var timeOut = false;
    
    LoginCtn = (function(){
        class LoginCtn {
            constructor(element, settings) {
                var _ = this, dataSettings;
                _.defaults = {
                    reload: true,
                    primaryColor: undefined,
                    topnavpos: undefined
                };

                _.$login = $(element)

                dataSettings = $(element).data('login') || {};
                _.options = $.extend({}, _.defaults, settings, dataSettings);

                _.init(true);
            }
        }

        return LoginCtn;
    }());

    LoginCtn.prototype.init = function(creation) {
        var _ = this;
        
        if (!$(_.$login).hasClass('login-initialized')) {

            $(_.$login).addClass('login-initialized');
            _.initializeEvents(_.$login);
        }
    }

    LoginCtn.prototype.initializeEvents = function(elm) {
        var _ = this;

        $(window).on("resize", function () {
            _.calcLoginBar();
        });
        
        $(window).load(function () {
            _.calcLoginBar();
            _.ExtraLoginBar();
        })

        $(_.$login).off("click tap", ".login-pre-btn").on("click tap", ".login-pre-btn", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var offsetLeft = $(this).offset().left;
            var offsetTop = $(this).offset().top;
            var windowWidth = $(window).innerWidth();
            var windowHeight = $(window).innerHeight();
            
            var posCalc = (offsetLeft * 100) / windowWidth;
            var posCalcBot = (offsetTop * 100) / windowHeight;
            
            if ( $("#mb_menu_ctn").attr("data-posstyle") != "vertical" ){
            
                if(posCalc <= 40){
                    $(_.$login).find(".login-outer-ctn").css("left","0%");
                }
                

                if (typeof menu_movement != "undefined"){
                    if( (posCalcBot > 10 || posCalcBot > 70) && menu_movement != "shrink" && menu_movement != "sticky"){
                        $(_.$login).find(".login-outer-ctn").css("top","calc(-1000% + 20px)");
                    }
                }
            
                if(posCalc > 35 && posCalc <= 60){
                    $(_.$login).find(".login-outer-ctn").css({"left": "50%", "transform":"translate(-50%,0%)"});
                }
            }else{
                $(_.$login).find(".login-outer-ctn").css({"top":"100%", "left": "0%"});
                $(_.$login).find(".logged-in-ctn").css({"left": "0%"});
            }
            
            if ($(_.$login).attr("data-show") == "no") {            
                $(_.$login).attr("data-show", "yes");
                $(".GlobalSiteLang").css("display", "none");
    
            } else {
                $(_.$login).attr("data-show", "no");
                $(".GlobalSiteLang").css("display", "block");
            }
            
            
            $(".mb_ul_2:visible").hide()
            
    
        });

        $(_.$login).off("click tap", ".login-create-account-btn").on("click tap", ".login-create-account-btn", function (e) {
            console.log("Clicked!")
            console.log($(_.$login))
            e.preventDefault();
            e.stopPropagation();

            if ($(_.$login).find(".login-btn").hasClass("signup")) {
                $(_.$login).find(".login-btn").removeClass("signup").text("Login");
                $(_.$login).find(".login-create-account-btn").html("<i class='fa fa-pencil-square-o'></i><div class='login-outer-bot-bar-title'>Create an Account</div>");
                $(_.$login).find(".login-outer-title").text("LOGIN");
            } else {
                $(_.$login).find(".login-btn").addClass("signup").text("Create");
                $(_.$login).find(".login-create-account-btn").html("<i class='fa fa-sign-in'></i><div class='login-outer-bot-bar-title'>Login</div>");
                $(_.$login).find(".login-outer-title").text("SIGN UP");
            }   
        });

        $(_.$login).off("click tap", ".login-btn.signup").on("click tap", ".login-btn.signup", function (e) {
            e.preventDefault();
            e.stopPropagation();

            var that = $(this);
            var usern = $(_.$login).find(".login-username").val();
            var passw = $(_.$login).find(".login-password").val();
            $(this).append("<i class='fas fa-spinner fa-spin'></i>")
            $(this).css("pointer-event", "none")

            $.ajax({
                url: "/WebModules/loginmanager/onsite/handlers/signup.asp",
                method: "post",
                data: { "usern": usern, "passw": passw },
                success: function (data) {
                    $(that).find("i").remove()
                    if (data == "added") {
                        $("<div class='login-form-ctn'><div class='login-message-ctn'></div><input class='login-activation'/></div>").insertAfter( $(_.$login).find(".login-form-ctn") );
                        $( $(_.$login).find(".login-message-ctn")[1] ).text("Please check emails for activation code");
                        $( $(_.$login).find(".login-form-ctn")[0] ).hide();
                  } else if (data == "exists") {
                    $(_.$login).find(".login-message-ctn").text("User already exists");
                        $(that).css("pointer-event", "")
                  }
                }
            });
        });

        $(_.$login).off("input", ".login-activation").on("input", ".login-activation", function () {
            var key = $(this).val();
            if (key.length > 10) {
                $.ajax({
                    url: "/webmodules/loginmanager/onsite/handlers/check.asp",
                    type: "post",
                    data: { "key": key },
                    success: function (data) {
                        if (data != "incorrect") {
                            location.reload();
                        }
                    }
                });
            }
        });
                
        $(_.$login).off("click tap", ".login-btn:not(.signup)").on("click tap", ".login-btn:not(.signup)", function (e) {
            e.preventDefault();
            e.stopPropagation();

            _.LoginAccount()
        });

        $(_.$login).off("keypress", ".login-password").on("keypress", ".login-password", function(evt){
            if (evt.keyCode == 13 || evt.which == 13){
                _.LoginAccount()
            }
        })

        $(_.$login).off("click tap", ".login-forgot-password-btn").on("click tap", ".login-forgot-password-btn", function (e) {

            e.preventDefault();
            e.stopPropagation();
    
            if (timeOut == false) {
    
                var usern =  $(_.$login).find(".login-username").val();
                
                if (usern != "") {
                    timeOut = true;
                    $(_.$login).find(".login-username").removeClass("invalid");    
                    $(_.$login).find(".login-forgot-password-btn .login-outer-bot-bar-title").text("Wait 5 minutes");
    
                    $.ajax({
                        url: "/WebModules/loginmanager/onsite/handlers/forgotpassword.asp",
                        method: "post",
                        data: { "usern": usern },
                        success: function (data) {
                            $(_.$login).find(".login-message").text("Please check emails");
    
                            setTimeout(function () {
                                timeOut = false;
                                $(_.$login).find(".login-forgot-password-btn .login-outer-bot-bar-title").text("Forgot Password?");
                            }, 50000);
                        }
                    });
                } else {
                    $(_.$login).find(".login-username").addClass("invalid");
                }
            }
        });

        $(_.$login).off("click tap", ".logged-in-item").on("click tap", ".logged-in-item", function () {

            var t = $(this).attr("data-t");
            var reload  = false;

            if( $(".kenesis-dashboard-inner").length > 0 ){ reload = true; }
            
            if (t != "logout") {
                window.location.href = "/webmodules/loginmanager/onsite/logindashboard.asp?page=" + t;
            } else {
                $.ajax({
                    url: "/WebModules/loginmanager/onsite/handlers/logout.asp",
                    method: "post",
                    success: function (data) {
                        $(_.$login).attr("data-show", "no").attr("data-logged-in", "no");
                        $(_.$login).find(".login-btn-title label").hide();
                        $(_.$login).find(".login-btn-title .login-icon-ctn").show();
                        if (reload) {
                            window.location.reload();
                            location.reload();
                        }else{
                            if (typeof createReview == "function"){
                                createReview()
                            }
                        }
                    }    
                });
            }
        });

        $("body").off("click tap").on("click tap", function (e) {
            if ((!($(e.target).hasClass("login-outer-ctn"))) && ($(e.target).parents(".login-outer-ctn").length == 0)) {
                $(".mb-login-bar, .login-bar").attr("data-show", "no");
            }
        });
    }

    LoginCtn.prototype.LoginAccount = function(){
        var _ = this;
        var reload = false;
        var usern = $(_.$login).find(".login-username").val();
        var passw = $(_.$login).find(".login-password").val();

        if ($("body > center > h1").text() == "Please login to view this page" || $("#page_login").length > 0 ) { reload = true; }

        $.ajax({
            url: "/WebModules/loginmanager/onsite/custloginhandler.asp",
            method: "post",
            data: { "usern": usern, "passw": passw },
            success: function (data) {

                if ((data == "Incorrect Details") || (data == "")) {
                    $(_.$login).find(".login-username").addClass("invalid");
                    $(_.$login).find(".login-password").val("");

                } else {
                    var tArr = data.split("+warra+"), lr = tArr[5];

                    if (typeof lr == "undefined") {lr = "none";}
                   
                    if (reload) {
                        if (lr != "none") {
                            window.location.href = "/webmodules/loginmanager/onsite/logindashboard.asp?page=" + lr;
                        } else {
                            window.location.reload();
                            location.reload();
                        }

                    } else {    
                        var nick = tArr[0];
                        if (typeof nick == "undefined") {nick = "";}

                        if (lr != "none") {
                            window.location.href = "/webmodules/loginmanager/onsite/logindashboard.asp?page=" + lr;
                        } else {
                            $.ajax({
                                url: "/WebModules/loginmanager/onsite/loaders/loadlogin.asp",
                                method: "post",
                                success: function (data) {
                                    $(".mb-login-bar, .login-bar").append(data);
                                    $(".mb-login-bar, .login-bar").attr("data-show", "no").attr("data-logged-in", "yes");
                                    $(".login-bar .login-btn-title").text("Welcome " + nick);
                                    if(_.options.reload){
                                        window.location.reload();
                                    }else{
                                        if (typeof createReview == "function"){
                                            createReview()
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            }
        });
    }

    LoginCtn.prototype.ExtraLoginBar = function(){
        var _ = this;
        var TopNavPosition = (typeof _.options.topnavpos == "undefined")? "top" :  _.options.topnavpos;
		
        if (TopNavPosition == "top") {

			if ( $("#mb_menu_ctn").length == 0){
				$(".topnav .internal").css("margin-top", "35px");

				var topnavHeight = $(".topnav").height() + 35;
				var bodyPadding = $(".kenesis-inner-body").css("padding-top");

				//$(".topnav").css("height", topnavHeight + "px");

				if (typeof bodyPadding != "undefined") {
					bodyPadding = parseInt(bodyPadding) + 35;
					$(".kenesis-inner-body").css("padding-top", bodyPadding);
				}
			}

		} else {
			$(".topnav .navbar").css("display", "inline-block");
		}

		$(".mb-login-bar").attr("data-position", TopNavPosition);

		if ($(".login-extra-style").length == 0) {
			$("body").append("<style class='login-extra-style'></style>");

			if (_.options.primaryColor != undefined && _.options.primaryColor != ""){
				var item = ".kenesis-body .topnav .mb-login-bar";
				var bgc = _.primaryColor.replace("rgb(", "").replace("rgba(", "").replace(")", "").replace(/\ /g, "");
				var bgcArr = bgc.split(",");
				var r = bgcArr[0], g = bgcArr[1], b = bgcArr[2];
				var hslArr = _.rgbToHsl(r, g, b);
				var l = hslArr[2];
				var tStyle = $(this).attr("style");
				var newColor = "white";  
				
				if (l > 0.5) { newColor = "black"; }

				$(".login-extra-style").append(item + ", " + item + " *:not[data-style-over='no'] {color: " + newColor + " !important;}");
            }
    	}
    }

    LoginCtn.prototype.calcLoginBar = function() {
        var _ = this;

        $(".kenesis-body").attr("data-mb-login-bar", "yes");
    
        var windowWidth = $(window).width();
        
        if (typeof SpecialLoginPosition != "undefined") {
            if (SpecialLoginPosition == true) {
                $(".topnav").attr("data-special-pos", "yes");
            }
        }
    
        if (typeof LoginSpecial != "undefined") {
            if (LoginSpecial) {
                if ($(".topnav .mb-login-bar").length == 1) {
                    var t = $(_.$login).clone();
                    var pos = $(_.$login).attr("data-position");
    
                    $(_.$login).remove();
                    $(".add_item[title='login']").append(t);
                    $(_.$login).attr({"data-desktop-position": pos, "data-position": "top"});
                }
            }
    
        } else { 
            if ($(".topnav .mb-login-bar").length == 1) {
                if (windowWidth <= 1100) {
                    //var t = $(_.$login).clone();
                    //var pos = $(_.$login).attr("data-position");
    
                    //$(_.$login).remove();
                    //$(".add_item[title='login']").append(t);
                    //$(_.$login).attr({"data-desktop-position": pos, "data-position": "top"});
                }
    
            } else {
                if (windowWidth > 1100) {
                    //var t = $(_.$login).clone();
                    //var pos = $(_.$login).attr("data-desktop-position");
    
                    //$(_.$login).remove();
                    //$(".add_item[title='login']").prepend(t);
                    //$(_.$login).attr({"data-position": pos});
                }
            }
        }
    };
    
    LoginCtn.prototype.rgbToHsl = function(r, g, b) {
    
        r /= 255, g /= 255, b /= 255;
    
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
    
        if (max == min) {
    
            h = s = 0;
    
        } else {
    
            var d = max - min;
    
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
            switch (max) {
    
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
    
            }
    
            h /= 6;
    
        }
    
        return [h, s, l];
    
    }
    
    $.fn.frontlogin = (function(){
        var _ = this, 
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i, 
            ret;
        for(i = 0; i < l; i++ ){
            if (typeof opt == 'object' || typeof opt == 'undefined'){
                _[i].frontlogin = new LoginCtn(_[i], opt);
            }else{
                ret = _[i].frontlogin[opt].apply(_[i].frontlogin, args);    
            }                

            if (typeof ret != 'undefined') {return ret;}
        }
    });

}));