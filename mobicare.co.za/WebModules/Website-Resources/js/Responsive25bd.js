var CacheOption = 2;
var windowW = $(window).innerWidth();
var windowH = $(window).innerHeight();
var frontviewpdf;
var url = window.location.href;
var arr = url.split("/");
var protocol = location.protocol+"//";
var w = $(window).width();
var ww = $(".kenesis-body").width();

kenesisBodyResizeCalc(w, ww);
kenesisMenuStruct();

///////////////////////////////// DONT CHANGE THIS EVER /////////////////////
function fileExists(turl) { // USED TO SEE IF CACHE IMAGES EXISTS BEFORE CREATING THE CACHE IMAGE
	answer = false;
    if (turl != ""){
		$.ajax({
			url:"/WebModules/Website-Resources/ASP/checkCache.asp?f="+turl.split("/")[turl.split("/").length - 1],
			type:'GET',
			cache:false,
			success: function(response, status, xhr){return (xhr.responseText != "0");},
			error:function(){return false;}
		});
    }else{
        return false;
    }
}

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function checkratios(wd,ht){
	var ratio;
	var CacheResolutions = [260,350,600,1280,1600,1920,2560,3840];
	for (var i = 0; i <= CacheResolutions.length-1;i++){
		if (wd <= CacheResolutions[i]*1.05 || i == (CacheResolutions.length-1)){
			wd = CacheResolutions[i];
			ratio = ht / wd;
			break;
		}
	}
	return [wd,ht,ratio]
}

var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var is_IEEdge = navigator.appVersion.indexOf('Edge') > -1;
//////////////////////////////// DONT CHANGE THIS EVER //////////////////////
ImgXCount = 0;
function CacheImages(TheImg, Option) {
	//this = TheImg;
    UseCache = true;

	if (typeof $(TheImg).attr("data-cache-option") != "undefined")Option = parseInt($(TheImg).attr("data-cache-option"));

    switch (Option) {
        case 1: //WINDOW WIDTH & HEIGHT
			CacheHeight = windowH;
			CacheWidth = windowW;
			break;
        case 2: //PER DIV
			CacheHeight = $(TheImg).parent().height();
			CacheWidth = $(TheImg).parent().width();
			if ((CacheHeight == 0) || (CacheWidth == 0)){
				CacheHeight = windowH;
				CacheWidth = windowW;
			};
			break;
        default:
            UseCache = false;
            break;
	}

	if (typeof $(TheImg).attr("data-cache") != "undefined"){
		CacheHeight = 0;
		CacheWidth = $(TheImg).attr("data-cache");
	}

	if (typeof SkipToNextRes != 'undefined')if (SkipToNextRes && CacheWidth <= 800)CacheWidth += CacheWidth*0.5;

	var Finalcalc = checkratios(CacheWidth,CacheHeight);
	CacheWidth = Finalcalc[0];
	CacheHeight = Finalcalc[1];

    create = false;

    if (UseCache) {
		ImgXCount++;
		/*if (typeof ResizeToMaxOn1 != "undefined"){
			if (ResizeToMaxOn1 && $(TheImg).attr("class").search("image1internal") > -1){
				CacheHeight = windowH;
				CacheWidth = windowW;
				checkratios();
			}
		}*/
		ImageHeight = parseInt($(TheImg).data("height"));
		ImageWidth = parseInt($(TheImg).data("width"));
		ImagePath = $(TheImg).data("original");
		ImageUpdated = ((typeof $(TheImg).attr("data-time") != "undefined")?"?time="+$(TheImg).attr("data-time"):"");

		if (ImagePath != undefined) {
			ReplaceHN = protocol+window.location.hostname;
			if ($("#ResJSscriptT").attr("data-RU") != undefined)
				if ($("#ResJSscriptT").attr("data-RU") != "")ReplaceHN = ((window.location.hostname.toLowerCase().search($("#ResJSscriptT").data("ru").toLowerCase()) == -1)?protocol+window.location.hostname:"");

			ImagePath = ImagePath.toLowerCase().replace(ReplaceHN, "").replace("raw", "Raw").replace("url(", "").replace("\")", "\"").replace(/"/g,"").replace(/'/g,"");
			imagename = ImagePath.split("/")[ImagePath.split("/").length - 1];

			if (ImagePath.toLowerCase().search("customerinterface/") == -1) {

				var newsrc = ""
				if (CacheWidth <= 300){
					newsrc = ImagePath.toLowerCase().replace("/x.","/").replace("/raw/","/thumb/");
				}else{
					FileExistss = fileExists(protocol + window.location.hostname + "/Cache/cached_" + CacheWidth + "x0" + "_" + imagename);

					if (FileExistss) {
						newsrc = "/Cache/cached_" + CacheWidth + "x0" + "_" + imagename;//+ImageUpdated;
					} else {
						Create = true
						newsrc = "/WebModules/Common/SSTools/CacheImage.aspx?IptFl=" + ImagePath.replace("/x.","/").replace("/thumb/","/raw/").replace("/Thumb/","/raw/") + "&OptSc=Y&ImgWd=" + CacheWidth + "&ImgHt=0&type=general&imgq="+WebsiteImgQual;
					};
				}

				IsIMGsrc = false;
				if ($(TheImg).is("img"))IsIMGsrc = ($(TheImg).attr("style").indexOf("url(") == -1);

				$(TheImg).addClass("imagenum"+ImgXCount);

				if ($(".lazyloadershiz[data-c='imagenum"+ImgXCount+"']").length != 0)$(".lazyloadershiz[data-c='imagenum"+ImgXCount+"']").remove();

				$(TheImg).after("<div class='lazyloadershiz' data-issrc='"+IsIMGsrc+"' data-c='imagenum"+ImgXCount+"' data-original='"+newsrc.replace("/Thumb/","/Raw/")+"'></div>");
				if ($(TheImg).is("body"))ReApplyCacheImg($(".lazyloadershiz[data-c='imagenum"+ImgXCount+"']")[0])
			}
		}
    }
}


function ReApplyCacheImg(obj){

	cl = $(obj).attr("data-c");
	issrc = ($(obj).attr("data-issrc") == "false")?false:true;
	theobjsrc = $(obj).data("original").replace("url(\"","").trim().replace(/"/g,(is_safari)?"":"\"").replace("/thumb/","/raw/").replace("/Thumb/","/raw/");

	if (theobjsrc.indexOf("CacheImage.aspx") == -1 ){
		//if (theobjsrc.toLowerCase().indexOf("cache") > -1)theobjsrc = "/Cache" + theobjsrc.split("Cache")[1]; this cause problem with image that has 'cache' in its name.
        if (theobjsrc.toLowerCase().indexOf("cache/") > -1)theobjsrc = "/Cache" + theobjsrc.split("Cache")[1];
	}else{
		theobjsrc = "/WebModules" + theobjsrc.split("WebModules")[1];
	}

	theobjsrc.replace(/"/g,"");

	if (issrc){
		$("."+cl).src = theobjsrc;
	}else{
		if ($("."+cl).attr("style") != undefined){
			if ($("."+cl).attr("style").indexOf("url(") != -1){
				NewBack = $("."+cl).attr("style");
				NewBack = NewBack.replace(/url\([^)]*.+\)/g,"url('"+theobjsrc.replace(/"/g,"")+"')");
				$("."+cl).attr("style",NewBack);
			}
		}else{
			NewBack = "background-image:url('"+theobjsrc.replace(/"/g,"")+"')";
			$("."+cl).attr("style",NewBack);
		}
	}

	if (typeof InitLayoutImages == "function")InitLayoutImages("."+cl);
	$(obj).remove();

	//$("."+cl).attr("style",$("."+cl).attr("style")+"filter:blur(0px)");
}

jQuery.fn.selectText = function () {

    var range, selection;

    return this.each(function () {

        if (document.body.createTextRange) {

            range = document.body.createTextRange();
            range.moveToElementText(this);
            range.select();

        } else if (window.getSelection) {

            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(this);
            selection.removeAllRanges();
            selection.addRange(range);

        }

    });
};

$(window).on("load",function(){
	SetCacheImages();

	if ($(".lazyloadershiz[data-c='imagenum1']").length > 0)ReApplyCacheImg($(".lazyloadershiz[data-c='imagenum1']")[0])

	lazyloader = $(".lazyloadershiz").lazyload({
		effect : "fadeIn",
		load : function(evt,evt2,evt3){ReApplyCacheImg(evt3)},
		event:"scroll lazyloaderevent",
		threshold :$(window).height()/2//$(".rv-image:first").offset()/2
	});

	$(".WebsiteVideos").on("click",function(){
		if ($(this)[0].muted){
			$(this)[0].muted = false;
			$(this).removeAttr("title");
			$(this)[0].play();
		}
    });

	lazyloadervids = $(".WebsiteVideos").lazyload({
		threshold :$(window).height()/2,//$(".rv-image:first").offset()/2,
		event:"scroll lazyloaderevent"
	});

    if ( mobilecheck() )$(".mobile-menu .logo img").lazyload();

	$(window).trigger("lazyloaderevent");
	$(window).trigger("scroll");

	//FIX IFRAME ON IFRAME PAGE
	if($(".JouMaSeIframe").length > 0){
		$(".rv-inner-content .inner-ctn,.rv-module,.rv-image,.bot-ctn").remove();
		if ($(".kenesis-inner-body").length > 0){
			if ($(".kenesis-inner-body .topnav").length > 0){
				if ($(".kenesis-inner-body .topnav").css("float") == "left"){
					$(".kenesis-inner-body .topnav").after($(".JouMaSeIframe").css("float","left").css("display","inline-block"));
					$(".JouMaSeIframe").attr("style",$(".JouMaSeIframe").attr("style")+"width:calc(100% - "+$(".kenesis-inner-body .topnav").width()+"px)!important")
				};
			}else if ($("body.imagenum1").length > 0){
				$(".JouMaSeIframe").appendTo(".kenesis-inner-body");
				$(".kenesis-inner-body").css("padding-top","0px");
				if ($(".topnav").css("position") == "absolute" && TL != "Hemi"){
					$(".JouMaSeIframe").attr("style",$(".JouMaSeIframe").attr("style")+";margin-top:"+$("body.kenesis-body .topnav").height()+"px!important;")
				};
			};
		}
		if ($("body > div#layer0").length > 0){
			$(".JouMaSeIframe").css("margin-top",$(".topnav").height()+"px");
			$(".topnav .internal .navbar").css("margin-left",$(".topnav").css("left"));
			$(".topnav").css("left","0px").css("width","100%");
		}
		if ($("body.kenesis-body:not(.imagenum1) .topnav").length > 0){
            $(".JouMaSeIframe").attr("style",$(".JouMaSeIframe").attr("style")+";margin-top:"+$("body.kenesis-body .topnav").height()+"px!important")
            if (window.mobilecheck()){
                $(".JouMaSeIframe").attr("style",$(".JouMaSeIframe").attr("style")+";margin-top:"+$(".mobile-menu").height()+"px!important;height:calc(100% - "+$("body.kenesis-body .mobile-menu").height()+"px)!important");
                $(".kenesis-body").attr("style",$(".kenesis-body").attr("style")+";padding-top:0px!important;");
            }
		}
		switch (TL.toLowerCase()){
            case "product retail 1":
                $(".JouMaSeIframe").attr("style",$(".JouMaSeIframe").attr("style")+";margin-top:"+$("body.kenesis-body .topnav").height()+"px!important");
                break;
            case "clean":
            case "company":
            case "engineering":
            case "minify":
                $(".JouMaSeIframe").attr("style",$(".JouMaSeIframe").attr("style")+";margin-top:0px!important")
                break;
            case "lefty righty":
                if (mobilecheck())$(".JouMaSeIframe").attr("style",$(".JouMaSeIframe").attr("style")+";width:100%!important;margin-top:54px!important")
                break;
            case "vertico":
                if (mobilecheck())$(".JouMaSeIframe").attr("style",$(".JouMaSeIframe").attr("style")+";width:100%!important;margin-top:0px!important")
                break;
            case "moose":
                $(".JouMaSeIframe").attr("style",$(".JouMaSeIframe").attr("style")+";margin-top:50px!important")
                break;
        }
	};

    $.ajax({
        url:"/_WebModuleData/Onsite_Settings.json",
        method:"get",
        success:function(data){
            if (data)
                if (typeof data.HideIMG != "undefined"){
                    if (data.HideIMG == "Yes"){
                        $(".rv-image *, img").removeAttr("title");
                    };
                };
        }
    });

	if (window.location.href.indexOf("#") > -1){
		$('html, body').animate({
			scrollTop: $("#"+window.location.href.split("#")[1].charAt(0).toUpperCase() + window.location.href.split("#")[1].slice(1)).offset().top
		},500,'linear');
	}
});

function SetCacheImages(){
    $(".rv-image > div[data-width],.rv-image > img[data-width], body[data-original], .rv-image > .fp-tablecell > div[data-width] ").each(function () {
		if ($(this).is("body") )
			$(this).attr("data-original",$(this).attr("data-original").replace("/Thumb/","/Raw/"))
		CacheImages(this, CacheOption);
    });

    $("section.backimg[data-width], svg image.backimg[data-width]").each(function () {
        if ($(this).is("body") )
			$(this).attr("data-original",$(this).attr("data-original").replace("/Thumb/","/Raw/"))
		CacheImages(this, CacheOption);
    });
}

// Function to init CKEditor buttons
function initCKButtons() {
	$('.rv-content .down-doc-wrapper, .rv-widget .down-doc-wrapper').each(function () {

		var name = $(this).children('.down-doc-btn').text();
		var doc = $(this).children('.down-doc-inner').attr('data-src');

        if (typeof doc != "undefined"){
            $(this).children('.down-doc-btn').remove();
            $(this).children('.down-doc-inner').remove();
            $(this).append('<a class="download-doc-link" href="' + doc + '" download><button>' + name + '</button></a>');
        }

	});
}

$(document).ready(function () {

    kenesisMenuFinal();

	$(".deleteblockplaceholders").each(function () {
		$(this).parent().remove();
	});
	//FIX PRIVATE Page
	if ($("body > center > button.client-login-btn[data-btn='TBI']").length > 0 ){
		TheButton = $("body > center > button.client-login-btn[data-btn='TBI']");
		if (!window.mobilecheck() && (TL == "3 Image Animated" || TL == "Basic")){
			TheButton.parent().attr("style",TheButton.parent().attr("style")+";margin-top:"+($("body.kenesis-body .topnav").height()+50)+"px!important");
		}
		if (TL.toLowerCase().indexOf("side scroll") > -1){
			TheButton.parent().attr("style",TheButton.parent().attr("style")+";position:absolute!important;width:100%;");
		}

		while ($("body center button.client-login-btn[data-btn='TBI']").length > 1){
			$($("body center button.client-login-btn[data-btn='TBI']")[0]).parent().remove();
		}
	}

	$(".rv-image empty.inner-ctn").remove();

	$("body").on("click tap",".WebsiteVideos",function(){
		//this.play();
	});
	$("body[data-original]").css("background-image","url('"+ $("body[data-original]").data("original")+"')")
	if ($(window).width() <= 800)
		$(".WebsiteVideos").each(function(){
			$(this).attr("poster",$(this).attr("data-thumb"));
		});

	$("body div.rv-image").find("img").each(function(){
		if (typeof $(this)[0].src == undefined)
			if (typeof $(this).attr("data-orig") == undefined)
				$(this)[0].src = $(this).attr("data-orig").replace("Raw","Thumb");
	});

    if ($(".logo a img").attr("src") == undefined) {
        if ($(window).width() >= 800) {
            $(".logo a img").attr("src", "/_WebmoduleData/Images/used/_CompanyLogo.png");
        } else {
            $(".logo a img").attr("src", "/_WebmoduleData/Images/used/_CompanyLogo_Mobile.png");
        }
    };

	$(".navbar").find("a[href='" + location.pathname + "']").each(function () {
	    $(this).addClass("navbara-active");
	})

	var topcol = $(".topnav").css("background-color");
	var navcol = $(".navbar li ul li a").css("background-color");

	$('.navbar li ul li a').each(function () {
	    if (!($(this).hasClass('navbara-active')))
	        navcol = $(this).css("background-color").trim();
	});

	if (navcol != undefined) {
	    if ((navcol.indexOf('transparent') !== -1) || (navcol == '') || (navcol == 'rgba(0, 0, 0, 0)') || (navcol == 'rgba(0,0,0,0)'))
	        $(".navbar li ul li a").css("background-color", topcol);
	}

	var bot = $('.botnav .navbar li').height();

	$('.botnav ul li ul').css('bottom', "100%");

    var menu = $('.topnav .navbar').clone();
    var url = '';
	var loginclone = $('.topnav .login-bar').clone();

    $('body').append('<div class="mobile-menu"><a href="#menu" class="mobile-menu-link"><i class="fa fa-bars" aria-hidden="true"></i></a><div class="inner-mobile-menu"></div></div>');
    $(".mobile-menu").prepend(loginclone.removeClass("login-initialized"))
	$('.inner-mobile-menu').append(menu);
    $('.mobile-menu').append("<div class='logo'><a href='/'><img alt='' data-original='/_WebmoduleData/Images/used/_CompanyLogo_Mobile.png' src='' class='logo-ctn'></a></div>");
    $('.mobile-menu .logo').addClass('mobile-logo');
    $(".mobile-menu .navbar > .inner-wrap > a").remove();

    var color = "rgba(0, 0, 0, 1)";
    var textColor = "rgba(255, 255, 255, 1)";
    var test = color.substring(5);

    if ($('.topnav').length != 0) {
        color = $('.topnav').css('background-color');
        textColor = $('.topnav a').css('color');
        test = color.substring(5);
    }

    test = test.slice(0, -1)
    test2 = test.split(",")
    a = $.trim(test2[0]);
    b = $.trim(test2[0]);
    c = $.trim(test2[0]);

    newC = 'box-shadow-menu';

    $('.mobile-menu').css('background-color', color);
    $('.mobile-menu-link').attr('style', 'color:' + textColor + ' !important');
    $('.mobile-menu-link').addClass(newC);

    var test = $('body > div').attr('class');

    $('.mobile-menu .inner-mobile-menu ul li ul li a').prepend('<span>&#8250;</span>  ');

    var p = $('body').css('position');
    var temp = $('body').attr('style');

    setTimeout(function () {
        p = $('body').css('position');
        temp = $('body').attr('style');

        if (temp == undefined)temp = '';
    }, 300);

	if ($(".mobile-menu .login-bar").length > 0)
		$(".login-bar").frontlogin({reload: false, topnavpos: TopNavPosition})

    $(document).on('click tap', '.mobile-menu-link', function (e) {
		e.preventDefault();

		var elm = $('.inner-mobile-menu');
        var isVisible = elm.is(':visible');
        var doch = document.body.clientHeight - 50 - 55;

        if (!isVisible) {

            var s = $("body").attr("style");
			$('body').attr('style', s + 'position: fixed !important; bottom: 0 !important; top: 0 !important;');

			setTimeout(function () {
				if ( typeof MenuRetailOpen == "function" ){
					MenuRetailOpen()
				}else{
					$('.mobile-menu').css('box-shadow', '-15px 7px 35px rgb(68,68,68)');
				}
            }, 800);
            $('.inner-mobile-menu').css({'max-height': doch, 'overflow': 'auto'}).show(1000);
        } else {
            $('body').attr('style', 'position: ' + p + ';' + temp);
            setTimeout(function () {
                $('.mobile-menu').delay(1000).css('box-shadow', 'none');
            }, 800);

            $('.inner-mobile-menu').hide(1000);
        }
    })

    if ($('.logo img').attr('src') == '/Webmodules/images/defaultlogo.png') {
        var s = $('.logo img').attr('style');
        $('.logo img').attr('style', s + 'background-image: none !important;');
    }

    $('.rv-content').each(function () {
        var test = $(this).text();
        test = test.trim();
        if (test == "") $(this).remove();
    });

    $('.rv-head').each(function () {
        var test = $(this).text();
        test = test.trim();
        if (test == "")$(this).remove();
    });

    $('.rv-shead').each(function () {
        var test = $(this).text();
        test = test.trim();
        if (test == "") $(this).remove();
    });

    var save = $('.mobile-logo a').html();

    $('.mobile-logo a').remove();

    $('.mobile-logo').append(save);

    $('.classFlag').each(function () {
        $(this).attr('style', '');
    });

    $('.classTee').each(function () {
        var t = $(this).attr('style');
        $(this).attr('style', t + 'cursor: pointer !important;');
		$(this).css("color",$("a").css("color"));
		$(this).css("background-color",$("a").css("background-color"));
    });

    $('body').on('click', '.read-more-btn', function () {
        ContentText = $(this).parents('.read-more-wrapper').children(".read-more-inner-text").html();
		if (typeof $.fn.fancyboxfront == "function" ){
			$("#readmorelinkFB,#hidden-contentreadmore").remove();
			$("html").append("<style>.readmoreFB .fancybox-slide::before{margin-top: -25vh;}.readmoreFB .fancybox-slide{text-align: initial;}</style><a style='display:hidden;' id='readmorelinkFB' data-fancyboxfront data-src='#hidden-contentreadmore' href='javascript:;'></a><div style='display: none;padding: 30px;height:50vh!important' class='content' id='hidden-contentreadmore'>"+ContentText+"</div>");
            $("#readmorelinkFB").fancyboxfront({wrapCSS:"readmoreFB",baseClass:"readmoreFB",afterShow:function(){
                $(".fancybox-close-small").html("<i class='fa fa-times fa-lg' aria-hidden='true'></i>")
            }});
            $("#readmorelinkFB")[0].click();
			//$.fancybox.close();
			//$.fancybox.open({openEffect:'fade',closeEffect:'fade',fitToView:true,scrollOutside:false,autoSize:true,autoCenter:true, minWidth:"70%",maxWidth:"100%",height:'auto',content: ContentText });
            //$('.fancybox-inner').addClass('content');
		}else{
			$.fancybox.close();
			$.fancybox({wrapCSS:"readmoreFB",baseClass:"readmoreFB",openEffect:'fade',closeEffect:'fade',fitToView:true,scrollOutside:false,autoSize:true,autoCenter:true, minWidth:"70%",maxWidth:"100%",height:'auto',content: ContentText });
			$('.readmoreFB .fancybox-inner').addClass('content');
            $(".readmoreFB .fancybox-wrap").append("<style>.readmoreFB .fancybox-inner{max-height: calc(100% - 30px);} .readmoreFB.fancybox-wrap,.readmoreFB .fancybox-skin,.readmoreFB .fancybox-outer,.readmoreFB .fancybox-inner{height:50vh!important}</style>");
        };
    });

    $('body').on('click', '.view-image-btn', function () {
        ImageFilename = $(this).parents('.view-image-wrapper').children(".view-image-inner-pic").data("src");
		if (typeof $.fn.fancyboxfront != "function" ){
			$.fancybox.close();
			$.fancybox({width:"100%",height:"100%",baseClass:"theviewimageimage",wrapCSS:"theviewimageimage",openEffect:'fade',closeEffect:'fade',fitToView:true,scrollOutside:false,autoSize:true,autoCenter:true, content:"<img src='"+ImageFilename+"'/>" });
            $("body").append("<style>.theviewimageimage .fancybox-inner{width:100%!important;text-align:center!important;}.fancybox-overlay{overflow: hidden!important;}.fancybox-margin {margin-right:0px!important}.theviewimageimage{width:98.5%!important;top:10px!important;left:10px!important;height:93%!important}</style>");
        }else{
			$("#viewimagelinkFB").remove();
			$("html").append("<a style='display:hidden' id='viewimagelinkFB' data-fancyboxfront='images' href='"+ImageFilename+"'></a>");
			$("#viewimagelinkFB")[0].click();
			//$.fancybox.close();
			//$.fancybox.open({openEffect:'fade',closeEffect:'fade',fitToView:true,scrollOutside:false,autoSize:true,autoCenter:true, content:"<img src='"+ImageFilename+"'/>" });
			//$(".fancybox-wrap").append("<style>.fancybox-wrap,.fancybox-skin,.fancybox-outer,.fancybox-inner{height:100%!important;width:100%!important}</style>");
		}
    });

	function iOS() {

	  var iDevices = [
		'iPad Simulator',
		'iPhone Simulator',
		'iPod Simulator',
		'iPad',
		'iPhone',
		'iPod'
	  ];

	  if (!!navigator.platform) {
		while (iDevices.length) {
		  if (navigator.platform === iDevices.pop()){ return true; }
		}
	  }

	  return false;
	}

    $('body').on('click', '.view-pdf-btn', function () {
        DocFilename = $(this).parents('.view-pdf-wrapper').children(".view-pdf-inner-pdf").data("src");
		if (!iOS()){
			if (typeof $.fn.fancyboxfront == "function" ){
				$("#fbiframepdf").remove();
				$("html").append("<a style='display:hidden' id='fbiframepdf' data-fancyboxfront data-type='iframe' data-src='/_webmoduledata/Documents/"+DocFilename+"'></a>");
				$("#fbiframepdf")[0].click();
				//frontviewpdf = $.fancyboxfront.open({type:'Iframe',src:'/_webmoduledata/Documents/'+DocFilename,openEffect:'fade',closeEffect:'fade',fitToView:true,scrollOutside:false,autoSize:true,autoCenter:true,minWidth:'100%',minHeight:'100%',width:'100%',height:'100%' });
				//$('.fancybox-inner').addClass('content');
			}else{
				$.fancybox.close();
				frontviewpdf = $.fancybox({openEffect:'fade',closeEffect:'fade',fitToView:true,scrollOutside:false,autoSize:true,autoCenter:true,minWidth:'100%',minHeight:'100%',width:'100%',height:'100%', content:"<iframe style='display:none;' width='100%' height='100%' src='/_webmoduledata/Documents/"+DocFilename+"' style='display: block !important;' Onload='this.style.display=\"block\"'/>" });
				$('.fancybox-skin iframe').show();
				$(".fancybox-wrap").append("<style>.fancybox-wrap,.fancybox-skin,.fancybox-outer{height:95vh!important}</style>");
			}

		}else{
		  var win = window.open("/_webmoduledata/Documents/"+DocFilename, '_blank');
		  win.focus();
		}

    });

	initCKButtons()

    $(window).on("orientationchange", function (event) {

        setTimeout(function () {

        windowW = $(window).innerWidth();
        windowH = $(window).innerHeight();

        // $("div > div").each(function () {

            // if ($(this).attr("class") != undefined) {

                // if ($(this).attr("class").toLowerCase().search("image") > -1) {

                    // CacheImages(this, CacheOption);

                // }

            // }

        // });

        }, 500);

    });
    /*
    var wh = screen.height;
    var hh = $(window).height();

    if (wh > hh) {

        var extra = $('body .rv-inner-content:last').height() + wh - hh;

        $('body .rv-inner-content:last').css('height', extra);

    }
    */

    $(".blockplaceholders").each(function () {

        Placetype = $(this).data("placetype");
        ParentHeight = $(this).width();
        ParentWidth = $(this).height();
        Shape = "square";
        Biggest = ParentWidth;

        if (ParentHeight < ParentWidth)Shape = "portrait"; Biggest = ParentHeight;
        if (ParentHeight > ParentWidth)Shape = "landscape"

        UseSize = "1080";

        if (Biggest < 750)UseSize = "600";
        if (Biggest > 1080 * 1.2)UseSize = "1920";

        $(this).attr("src", "/Webmodules/images/place-holders/" + Placetype + "-placeholder-" + Shape + "-" + UseSize + ".jpg");

    });

    $("body").addClass("animsition");

    $('hyperlink').attr('style', 'cursor:pointer;text-decoration: underline !important;');

    $('.banner-body').parents('.rv-widget').addClass('banner-parent');

	$(".ahyperlink").each(function(){
		$(this).css("cursor","pointer");
		if ($(this).data("href") != undefined){
			if ($(this).data("href").indexOf("/") != 0) {
				$(this).data("href",protocol+$(this).data("href"))
			};
			if ($(this).data("href") == "")$(this).data("href","/");
		}
	})

	$('body').on('click', '.ahyperlink', function () {
        if ($(this).attr("data-href") != undefined) {
            if (typeof ga  == 'function')
                ga(GlobalGoogleTag+'.send', 'event', { eventCategory: "Kenesis", eventAction: "Click", eventLabel: "Hyperlink - "+$(this).attr("data-href")});
		    KaTf(0,"Hyperlink - "+$(this).attr("data-href"),"Click","Onsite");
            var newtab = window.open($(this).attr("data-href"), '_blank');
			newtab.focus();
		}
    });

    $("body").on('click','.classTee',function () {
		var thispath = window.location.pathname;
		var thispage = thispath.split("/").pop().toLowerCase();;
        Page = $(this).attr("id").replace("Home.asp", "default.asp").toLowerCase();
        if (Page.indexOf("default.asp") > -1) {
            window.location = "/" + Page;
        } else {
            window.location = "/Pages/" + Page;
        }
    });

    var ww = $(window).width();
    var topnavbc = $(".topnav").css("background-color");
    var contentbc = "rgba(0,0,0,0)"

    $("body .content").each(function(){
        if( $(this).css("background-color") != "rgba(0, 0, 0, 0)" && $(this).css("background-color") != "rgba(0,0,0,0)"){
            contentbc = $(this).css("background-color")
            return true;
        }
    })
    var ContentC = $(".content").css("Color")

    if (ww < 1100) {

        if ((topnavbc == "rgba(0,0,0,0)") || (topnavbc == "rgba(0, 0, 0, 0)"))
            $("body").append("<style>body .topnav {background-color: black !important;}</style>");

		ContentC = (ContentC == undefined)? "rgba(0,0,0,0)" : ContentC;
        ContentCT = (ContentC.match(/\d+/g)[0] * 0.299) + (ContentC.match(/\d+/g)[1] * 0.587) + (ContentC.match(/\d+/g)[2] * 0.114);
	    if ( ContentC.indexOf('rgba') !== -1)
    	    ContentCT = (ContentC.match(/\d+/g)[3] == 0) ? 255 : ContentCT;

        ContentBackCT = (contentbc.match(/\d+/g)[0] * 0.299) + (contentbc.match(/\d+/g)[1] * 0.587) + (contentbc.match(/\d+/g)[2] * 0.114);
        if (contentbc.indexOf('rgba') !== -1)
            ContentBackCT = (contentbc.match(/\d+/g)[3] == 0) ? 255: ContentBackCT;

        if ( (ContentBackCT == 255) && (ContentCT > 140)  )
            $("body").append("<style class='rv_content_back'>body .content {background-color: black !important;}</style>");
    }

    if (!!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g) || /Edge/.test(navigator.userAgent))
        $("body").append("<style> .kenesis-body .rv-image video {height: auto;} </style>");

    var iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;

    if (iOS)
        $("body").append("<style> .kenesis-body .rv-image > .inner-ctn {background-attachment: scroll !important;} </style>");
});

$(window).on("load", function () {

    $(".img-shape-line").each(function () {

        var imgWidth = parseFloat($(this).parents("[data-width]").attr("data-width"));
        var imgHeight = parseFloat($(this).parents("[data-height]").attr("data-height"));
        var mapWidth = $(this).attr("data-width");
        var mapHeight = $(this).attr("data-height");
        var mapX = $(this).attr("data-leftposition");
        var mapY = $(this).attr("data-topposition");
        var link = $(this).attr("data-url");
        var zindex = $(this).attr("data-zindex");

        $(this).parent().append("<a title='click me' target='_blank' href='" + link + "' style='position: absolute !important;z-index: " + zindex + ";' data-imgw='" + imgWidth + "' data-imgh='" + imgHeight + "' data-mapw='" + mapWidth + "' data-maph='" + mapHeight + "' data-mapx='" + mapX + "' data-mapy='" + mapY + "' class='map-a-tag'></a>");

        if ($(this).parents(".rv-image").css("position") == "static")
            $(this).parents(".rv-image").css("position", "relative");

        $(this).remove();

    });

    recalcMapPointers();

    $(".cookie-request-ctn").show();

    if (/Edge/.test(navigator.userAgent)) {
        $(".WebsiteVideos").each(function(){
            $(this).attr("src",$(this).attr("data-original"));
        });
    };

});

$(window).on("resize", function () {

    var w = $(window).width();
    var ww = $(".kenesis-body").width();

    recalcMapArea();
    recalcMapPointers();
    kenesisBodyResizeCalc(w, ww);
    kenesisMenuStruct();
    kenesisMenuFinal();

});

function recalcMapPointers() {

    $(".rv-image .map-a-tag").each(function () {

        var bgs = $(this).parent().css("background-size");

        if (bgs == "cover") {

            $(this).parents(".rv-image").css("overflow", "hidden");

            var imgWidth = parseFloat($(this).attr("data-imgw"));
            var imgHeight = parseFloat($(this).attr("data-imgh"));
            var mapX = imgWidth * (parseFloat($(this).attr("data-mapx")) / 100);
            var mapY = imgHeight * (parseFloat($(this).attr("data-mapy")) / 100);
            var mapWidth = imgWidth * (parseFloat($(this).attr("data-mapw")) / 100);
            var mapHeight = imgHeight * (parseFloat($(this).attr("data-maph")) / 100);
            var divWidth = $(this).parents(".rv-image").width();
            var divHeight = $(this).parents(".rv-image").height();
            var xScale = divWidth / imgWidth;
            var yScale = divHeight / imgHeight;
            var scale;
            var yOffset = 0;
            var xOffset = 0;

            if (xScale > yScale) {

                scale = xScale;
                yOffset = (divHeight - (imgHeight * scale)) / 2;

            } else {

                scale = yScale;
                xOffset = (divWidth - (imgWidth * scale)) / 2;

            }

            var newTop = (mapY) * scale + yOffset;
            var newLeft = (mapX) * scale + xOffset;
            var newWidth = (mapWidth) * scale;
            var newHeight = (mapHeight) * scale;

            $(this).css('top', newTop);
            $(this).css('left', newLeft);
            $(this).css('width', newWidth);
            $(this).css('height', newHeight);

        } else if (bgs == "contain") {

            var imgWidth = parseFloat($(this).attr("data-imgw"));
            var imgHeight = parseFloat($(this).attr("data-imgh"));
            var imgRatio = imgWidth / imgHeight;
            var conRatio = $(this).parent().width() / $(this).parent().height();

            if (conRatio > imgRatio) {

                var scalePer = $(this).parent().height() / imgHeight;
                var scaleWidth = imgWidth * scalePer;
                var scaleHeight = imgHeight * scalePer;
                var x = ($(this).parent().width() - scaleWidth) / 2;
                var y = 0;

            } else {

                var scalePer = $(this).parent().width() / imgWidth;
                var scaleHeight = imgHeight * scalePer;
                var scaleWidth = imgWidth * scalePer;
                var y = ($(this).parent().height() - scaleHeight) / 2;
                var x = 0;

            }

            var mapX = scaleWidth * (parseFloat($(this).attr("data-mapx")) / 100) + x;
            var mapY = scaleHeight * (parseFloat($(this).attr("data-mapy")) / 100) + y;
            var mapWidth = scaleWidth * (parseFloat($(this).attr("data-mapw")) / 100);
            var mapHeight = scaleHeight * (parseFloat($(this).attr("data-maph")) / 100);

            $(this).css('top', mapY);
            $(this).css('left', mapX);
            $(this).css('width', mapWidth);
            $(this).css('height', mapHeight);

        } else if (bgs == "100% 100%") {

            var mapX = parseFloat($(this).attr("data-mapx"));
            var mapY = parseFloat($(this).attr("data-mapy"));
            var mapWidth = parseFloat($(this).attr("data-mapw"));
            var mapHeight = parseFloat($(this).attr("data-maph"));

            $(this).css('top', mapY + "%");
            $(this).css('left', mapX + "%");
            $(this).css('width', mapWidth + "%");
            $(this).css('height', mapHeight + "%");

        } else {

            var mapX = parseFloat($(this).attr("data-mapx"));
            var mapY = parseFloat($(this).attr("data-mapy"));
            var mapWidth = parseFloat($(this).attr("data-mapw"));
            var mapHeight = parseFloat($(this).attr("data-maph"));

            $(this).css('top', mapY + "%");
            $(this).css('left', mapX + "%");
            $(this).css('width', mapWidth + "%");
            $(this).css('height', mapHeight + "%");

        }

    });

}

function recalcMapArea() {

    $(".rv-image > div map").each(function () {

        var imgWidth = $(this).parent().width();
        var imgHeight = $(this).parent().height();
        var mapWidth = imgWidth * 0.1;
        var mapHeight = imgHeight * 0.1;
        var mapX = (imgWidth / 2) - (mapWidth / 2);
        var mapY = (imgHeight / 2) - (mapHeight / 2);
        var mapEndX = mapX + mapWidth;
        var mapEndY = mapY + mapHeight;

        $(this).children("area").attr("coords", mapX + ", " + mapY + ", " + mapEndX + ", " + mapEndY);

    });

}

/*--- INCLUDE LOADERS ---*/

function loadCSS(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (!$("link[href='" + arr[i] + "']").length)
            $("<link href='" + arr[i] + "' rel='stylesheet'>").appendTo("head");
    }
}

function loadJS(arr) {
    for (var i = 0; i < arr.length; i++)
        if (!$("script[src='" + arr[i] + "']").length) {

            var head = document.getElementsByTagName("head")[0];
            var s = document.createElement("script");

            s.type = "text/javascript";
            s.src = arr[i];
            head.appendChild(s);

    }
}

function kenesisBodyResizeCalc(w, ww) {

    if (w > 1100) {

        $(".kenesis-body").attr("data-laptop-width", "n");
        $(".kenesis-body").attr("data-mobile-width", "n");

    } else if ((w <= 1100) && (w > 460)) {

        $(".kenesis-body").attr("data-laptop-width", "y");
        $(".kenesis-body").attr("data-mobile-width", "n");

    } else {

        $(".kenesis-body").attr("data-laptop-width", "y");
        $(".kenesis-body").attr("data-mobile-width", "y");

    }

    if (ww > 1100) {

        $(".kenesis-body").attr("data-true-laptop-width", "n");
        $(".kenesis-body").attr("data-true-mobile-width", "n");

    } else if ((ww <= 1100) && (ww > 460)) {

        $(".kenesis-body").attr("data-true-laptop-width", "y");
        $(".kenesis-body").attr("data-true-mobile-width", "n");

    } else {

        $(".kenesis-body").attr("data-true-laptop-width", "y");
        $(".kenesis-body").attr("data-true-mobile-width", "y");

    }

}

function kenesisMenuStruct() {

    var m = $(".kenesis-body .topnav .navbar > li").length;
    var mYN = "no";

    if (m > 6) mYN = "yes";

    $(".kenesis-body").attr("data-menu-items", m).attr("data-menu-items-over", mYN);

}
/*
	Wickus : Added a check if the menu builder has been implemented.

	date : 2019/11/12
*/
function kenesisMenuFinal() {

    setTimeout(function () {

		if(!$(".topnav").hasClass("mb")){

			var m = $(".kenesis-body .topnav .navbar > li").length;

			if (m > 6) {

				if ($(".topnav .navbar").width() > 200) {

					var total = 0;
					var t = $(".kenesis-body .topnav .navbar").width();

					$(".kenesis-body .topnav .navbar > li").each(function () {

						total += $(this).width();

					});

					if (t < total) {

						$(".kenesis-body").attr("data-mobile-menu-active", "yes");

					} else {

						$(".kenesis-body").attr("data-mobile-menu-active", "no");

					}

				}

			}

		}

    }, 1000);

}

//Check Old Browser
var parser = new UAParser();
parser = parser.getResult();
if (parser.browser.name != "Opera" && parser.browser.name != "Chrome" && parser.browser.name != "Edge" && parser.browser.name != "Firefox" && !mobilecheck() && parser.device.model != "iPad" && (parser.browser.name != "Safari" && parser.os.name != "Mac")){
    html = "<div class='unbrowser'>";
    html += "<h3>You seem to be using an unsupported browser</h3>";
    html += "<h6 style='font-size: 12px;'>To get the most out of our website please reload it with a supported browser. You may continue with this browser but you may not have the best user experience.</h6>";
    html += "<a class='browsericon gray'><img src='/WebModules/Images/Icons/BrowserIcons/internet-explorer.png'/></br>IE</a>";
    html += "<a class='browsericon gray'><img src='/WebModules/Images/Icons/BrowserIcons/safari.png'/></br>Safari For Windows</a>";
    html += "<a class='browsericon'><img src='/WebModules/Images/Icons/BrowserIcons/safari-mobile.png'/></br>Safari IOS</a>";
    html += "<a class='browsericon' title='Click to download' href='https://www.microsoft.com/en-us/edge'><img src='/WebModules/Images/Icons/BrowserIcons/edge.png'/></br>Edge</a>";
    html += "<a class='browsericon' title='Click to download' href='https://www.google.com/chrome/'><img src='/WebModules/Images/Icons/BrowserIcons/chrome.png'/></br>Chrome</a>";
    html += "<a class='browsericon' title='Click to download' href='https://www.mozilla.org/en-US/firefox/new/'><img src='/WebModules/Images/Icons/BrowserIcons/firefox.png'/></br>Firefox</a>";
    html += "<a class='browsericon' title='Click to download' href='https://www.opera.com/download'><img src='/WebModules/Images/Icons/BrowserIcons/opera.png'/></br>Opera</a>";
    html += "</br></br></br><button onclick='$(this).parent().remove()'>Continue</button>";
    html += "<style>";
    html += "body{filter:blur(6px);pointer-events:none;user-select:none;}";
    html += ".browsericon{width:calc(100%/7);padding:5px;display:inline-block;cursor:pointer;vertical-align:top;font-size:12px}";
    html += ".browsericon img{width:70px;height:70px;margin-bottom:10px}";
    html += ".gray{filter:grayscale(100%);opacity:0.4;cursor:default}";
    html += ".unbrowser h3,.unbrowser h6{color:rgb(30,115,150)!important}";
    html += ".unbrowser button{padding:10px 20px 10px 20px;color:white;background-color:rgb(40,160,210)!important}";
    html += ".unbrowser{background-color:white;font-family: 'Open Sans';padding:30px;text-align:center;position:fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);width:100%;height:100%;max-height:400px;max-width:600px;z-index:11;border-radius:4px;box-shadow: 0px 4px 5px 2px rgba(0,0,0,0.64);}";
    html += "</style>";
    html += "</div>";
    $("html").append(html);
}

$(window).on("load",function(){
    /*setInterval(function(){
      $("img").each(function(){
        this.src = "https://source.unsplash.com/random/200x200/?halloween";
      });
      $("div[style]").each(function(){
        if ($(this).css("background-image").trim().substr(0,3).toLowerCase() == "url"){
          $(this).css("background-image","url('https://source.unsplash.com/random/200x200/?halloween')");
        }
      });
      $("div[data-original]").each(function(){
        $(this).attr("data-original","https://source.unsplash.com/random/200x200/?halloween");
        $(this).css("background-image","url('https://source.unsplash.com/random/200x200/?halloween')");
      })
      $("img[data-original]").each(function(){
        $(this).attr("data-original","https://source.unsplash.com/random/200x200/?halloween");
      })
    },1000);*/
  });