(function($){
	var subGlobalObject;
	var Popupz;
	$.fn.LoadPopup = (function(options){
		Popupz = $(this);
		
		
		$(Popupz).each(function(){
			var Popups = $(this);
			var Num =  $(Popups).attr('data-pop')
			
			if ( Num != undefined){
		
				$(window).load(function(){ createPopup(Num, Popups); });

				$(document).ready(function () {
					$(document).on("click", ".popups .close-pop", function(){
						var popmod = $(this).closest(".popups").attr("data-pop");
						$(Popups).hide();
						display( popmod );
					});
	
					$(document).on('click', '.popups .content-button, .popups .product-special', function(){ 
						openInNewTab( $(this).attr("data-url") );
					});
				});
			}
		})	

	
		function openInNewTab(url) {
			var win = window.open(url, '_blank'); 
			win.focus();
		}

		function display(popmod) { 
			var now = new Date();
			var date = now.getDate();
			var expireTime = date + 2;
			now.setDate(expireTime);
			document.cookie = 'popup-'+popmod+'=false;expires='+now.toGMTString()+';path=/';
		}
		
		function createPopup(Numz, Popups) {
			$.ajax({
				url:  "/_webmoduledata/Popup/html/popup"+Numz+".asp?"+$.now()+"",
				async:false,
				type: "GET",
				success: function (data) { 
					$(Popups).html(data) 
					
				},
				complete:function(){	

					if ($(Popups).find(".content-button").attr("data-p") == "fixed"){
						var btnH = Math.abs( $(Popups).find(".content-button[data-p='fixed']").height() )+ 30 ;
						$(Popups).find(".content-button[data-p='fixed']").siblings(".pop-context").css("cssText", "height: calc(100% - "+btnH+"px); overflow: auto;");
					}
					
					var op =  $(Popups).find(".pops_ctn").attr('data-op')
					var info =  $(Popups).find(".pops_ctn").attr('data-info')
					
					if (op == "time") {					
						var showpopup = function(){
							setTimeout(function (){
								if ( !($(".popups").is(":visible")) ){
									$(Popups).show()
								}else{
									setTimeout(showpopup,parseInt(info)*1000);
								}
							},parseInt(info)*1000);
						}
				
						showpopup();
					}else{		
						var myScrollFunc = function () {
							var yheigth = $(document).height() - window.innerHeight;
							var persent = Math.floor( ( window.scrollY / yheigth ) * 100 )
							if ( persent >= (parseInt(info)-5) && persent <= (parseInt(info)+5) ) {
								if ( !($(".popups").is(":visible")) ){ 
									$(Popups).show()
								}
							}
						};
			
						window.addEventListener("scroll", myScrollFunc);
						var x = document.querySelector("#Pop-"+Numz+" .close-pop");
						x.addEventListener("click", function(){ window.removeEventListener("scroll", myScrollFunc); });
			
					}
					if(typeof RunKenesisLoaders == "function"){
						RunKenesisLoaders(".popups[data-pop='"+Numz+"']")
					}
					checkDOC(".popups[data-pop='"+Numz+"']")
				}
			});	
		}
		
		
		function checkDOC(elm){

			$(elm+" .down-doc-wrapper").each(function () {
	       
				var doc = $(this).children('.down-doc-inner').attr('data-src');
				var name = $(this).find('.down-doc-btn').text();

				$(this).find('.down-doc-btn').remove();
				$(this).children('.down-doc-inner').remove();
				$(this).append('<a class="download-doc-link" href="/_webmoduledata/documents/' + doc + '" download><button>' + name + '</button></a>');

			});
		}

	})
})(jQuery)