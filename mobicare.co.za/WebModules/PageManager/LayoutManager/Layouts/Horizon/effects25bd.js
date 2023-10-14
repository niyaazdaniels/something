$(document).ready(function () {

    var bodyBackground = $("body").css("background-color");
    
    if (PageType == "home") {

        var style = "<style>";
        style += ".kenesis-body section[data-n='2'] .inner-ctn .half-ctn .rv-image:last-child, ";
        style += ".kenesis-body section[data-n='4'] .inner-ctn .half-ctn .rv-image:last-child {";
        style += "border-color: " + bodyBackground + " !important;";
        style += "}";
        style += "</style>";

        $("body").append(style);

    }

    $("body").on("click", ".rv-image.clickable", function () {

        var src = $(this).attr("data-link");

        if (src != "") {

            window.location.href = src;

        }

    });

    $("body").on("click", ".go-to-top-btn", function () {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

    if (!!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g) || /Edge/.test(navigator.userAgent)) {

        $("body").append("<style> .kenesis-body .rv-image {overflow: hidden; position: relative;} .kenesis-body .rv-image video {position: absolute; height: auto !important; width: auto; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);} </style>");

        $(".kenesis-body .rv-image video").bind("loadedmetadata", function () {

            var width = this.videoWidth;
            var height = this.videoHeight;
            var style = $(this).attr("style");

            if (height > width) {

                $(this).attr("style", style + "height: auto !important; width: 100% !important;");

            } else {

                $(this).attr("style", style + "height: 100% !important; width: auto !important;");

            }

        });

    }

	//setTimeout(function(){
		var ww = $(window).width();
		var contentbc = $(".rv-content.content:is(.has-background)").css("background-color");
		if (ww < 1100 && TL == "Horizon") {
			if (PT == "home"){
				$("body").append("<style>section[data-n='4'] .rv-content.content.has-background {background-color: "+contentbc+" !important;}</style>");
			}else if(PT == "standard"){
				$("body").append("<style>section:is([data-n='1'],[data-n='3']) .rv-content.content.has-background {background-color: "+contentbc+" !important;}</style>");
			}else if(PT == "module"){
				$("body").append("<style>section:is([data-n='2'],[data-n='3']) .rv-content.content.has-background {background-color: "+contentbc+" !important;}</style>");
			}
		}
	//},100)

	 /*setTimeout(function(){
		console.log( $('section[data-n="4"] .inner-ctn').children() )
		var inner_ctn = document.body.querySelector('.kenesis-body section[data-n="4"] .rv-module > .inner-ctn'); 
		//var inner_ctn = document.body.querySelector('.kenesis-body section[data-n="4"] .rv-module > .inner-ctn'); 
		var deleteParent = true; 
		//console.log(inner_ctn)
		for(var i = 0; i < inner_ctn.children().length; i++){
			if(inner_ctn.children[i].nodeName!=='SCRIPT'&&inner_ctn.children[i].nodeName!=='LINK'&&inner_ctn.children[i].nodeName!=='STYLE'){ 
				deleteParent = false; 
				i = inner_ctn.children.length; 
			}
		}
		if (deleteParent) inner_ctn.parentNode.parentNode.parentNode.removeChild(inner_ctn.parentNode.parentNode);

	}, 500);*/

	$(".rv-image.image13 > .inner-ctn").css("height", $(".rv-image.image13 > .inner-ctn").attr("data-height") + "px");

});
