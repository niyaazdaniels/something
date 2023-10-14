(function($){
	$.fn.MiniCatLazy = (function(options){
		var Elm = this;
		var sets = $.extend({ 
			ElmParent: undefined,
			ElmOp: "_self",
			AppendType: "elm"
		}, options );
		var condition = false;
		$(Elm).each(function () {
            var cache = 1920;
			var that = $(this), src = $(this).attr("data-src");
			var img = new Image();
			var ww = (sets.ElmOp == "_self") ? parseInt( $(this).width() ) : (sets.ElmOp == "_parent") ? parseInt( $(this).parents(sets.ElmParent).width() ) : 0;
			
			switch(true){
				case (ww >= 1600): cache = 1920; break;
				case (ww >= 1280): cache = 1600; break;
				case (ww >= 800): cache = 1280; break;
				case (ww >= 600): cache = 800; break;
				case (ww >= 350): cache = 600; break;			
			}

            
			
			img.onload = function() {
				if ( sets.AppendType == "background-image"){
					that.css("background-image", "url('" + "/cache/cached_" + cache + "x0_" + src + "')");
				}else if( sets.AppendType == "elm" ){
					that.attr("src", "/cache/cached_" + cache + "x0_" + src);
				}
			};
			
			img.onerror = function() {
				if ( sets.AppendType == "background-image"){
					that.css("background-image", "url('" + "/WebModules/Common/SSTools/CacheImage.aspx?IptFl=/_WebModuleData/Images/raw/" + src + "&OptSc=Y&ImgWd=" + cache + "&ImgHt=0&type=general" + "')");
				}else if( sets.AppendType == "elm" ){
					that.attr("src", "/WebModules/Common/SSTools/CacheImage.aspx?IptFl=/_WebModuleData/Images/raw/" + src + "&OptSc=Y&ImgWd=" + cache + "&ImgHt=0&type=general");
				}
			};
			
			img.src = "/cache/cached_" + cache + "x0_" + src				
				
        }).promise().done(function(){
			condition = true
		});
		
		
		return new Promise(function(resolve, reject) {
			if (condition) {
				resolve('Success!');
			} else {
				reject('Error!');
			}
		});
	})
})(jQuery);

(function($){
		var c = 0;
	$.fn.MiniEvent = (function(options){
		var sets = $.extend({ 
			wmn: 0,
			slider: "normal",
			descriptHead: "off",
			head: "DESCRIPTION",
			popstyle: "narrow",
			descriptOver: "off",
			descriptSize: ""
		}, options );
		
		var MainElm = this;		

        $(MainElm).off('click tap').on('click tap', function () {
            c++;

            var id = $(this).attr('data-id');
            var linked = $(this).attr("data-linked");
            var link = $(this).attr("data-link");

            if (linked == "No" || linked == "map") {

                $.ajax({

                    url: "/webmodules/productminicatalog/onsite/handlers/getproduct.asp",
                    data: { 
                        "WMN": sets.wmn, 
                        "id": id, 
                        "slider": sets.slider,
                        "c": c,
                        "descriptionHeadEn": sets.descriptHead,
                        "head": sets.head,
                        "popupStyle": sets.popstyle,
                        "descriptOver": sets.descriptOver,
                        "discriptSize": sets.descriptSize
                    },
                    type: "post",
                    success: function (data) {

                        $(".mini-catalog-ctn[data-n='"+sets.wmn+"'] .mini-modal-box .modal-content").html(data);
                        $(".mini-catalog-ctn[data-n='"+sets.wmn+"'] .mini-modal-box").iziModal("open");

                        RunKenesisLoaders(".mini-catalog-ctn[data-n='"+sets.wmn+"'] .mini-modal-box .modal-content");

                    }

                });

            } else {

                if (link != "") {

                    window.location.href = link;

                }

            }

        });
	})
	
	
})(jQuery)