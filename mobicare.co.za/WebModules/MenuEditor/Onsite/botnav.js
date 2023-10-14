function fileExists(turl) { // USED TO SEE IF CACHE IMAGES EXISTS BEFORE CREATING THE CACHE IMAGE
	answer = false;
    if (turl != "") {
		$.ajax({
			url:"/WebModules/Website-Resources/ASP/checkCache.asp?f="+turl.split("/")[turl.split("/").length - 1],
			type:'GET',
			async:false,
			cache:false,
			success: function(response, status, xhr){answer = (xhr.responseText != "0");},
			error:function(){answer = false;}
		});
    }
	return answer;
}

var protocol = location.protocol+"//";

if (typeof isMobile != "function"){
	window.isMobile = function() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	};
}

if ($(".thenewbottomnav").length == 0){
	$.ajax({
		url:"/_WebmoduleData/BottomMenu.json",
		method:"GET",
		data : {
			'uniq_param' : (new Date()).getTime(),
		},
		dataType :"json",
		cache: false,
		success:function(JSONObject,status,info){
			if (JSONObject.length > 0 && $(".thenewbottomnav").length == 0){
				if ($("body .botnav").length > 0){
					$("body .botnav").empty();
					$("body .botnav").addClass("thenewbottomnav");
				}else{
					if ($("footer").length > 0){
						$("footer:first").before("<div class='botnav thenewbottomnav'></div>");
					}else{
						$("body").append("<div class='botnav thenewbottomnav'></div>");
					}
				}
				theBotnav = $("body .thenewbottomnav");
				theBotnav.addClass("realdeal");
				hasContactFields = false;
				$.each(JSONObject,function(index,thevalue){
					if (thevalue.type){
						thetheBotnavtext = "<div style='"+((isMobile() && thevalue.hideonmobile == true) || typeof thevalue.hideonmobile == "undefined"?"display:none":"")+"' class='thebotnav_section "+((thevalue.pos == "H")?"horizontal_section":"")+"'>";
						thetheBotnavtext += "<h4 class='thebotnav_title'>"+thevalue.title+"</h4>";
						switch (thevalue.type.toLowerCase()){
							case "links":
								thetheBotnavtext += "<ul>";
								$.each(thevalue.items,function(index2,value2){
									value2.target = (typeof value2.target == "undefined"?"_blank":value2.target)
									thetheBotnavtext += "<li><a class='thebotnav_link' target='"+value2.target+"' href='"+value2.url+"'>"+value2.title+"</a></li>";
								});
								thetheBotnavtext += "</ul>";
								break;
							case "text":
								thetheBotnavtext += "<div class='thebotnav_text'>"+thevalue.svalue.replace(/\n/g,"</br>")+"</div>";
								break;
							case "image":
								if(thevalue.svalue != "" && typeof thevalue.svalue != "undefined")thetheBotnavtext += "<div title='View Image' "+((typeof thevalue.url != "undefined")?"data-url='"+thevalue.url+"'":"")+" data-t='image' class='thebotmenuimg' data-f='"+thevalue.svalue+"' style='background-image:url(\"/_webmoduledata/images/thumb/"+thevalue.svalue+"\")'></div>";
								break;
							case "video":
								if (typeof thevalue.url != "undefined"){
									thetheBotnavtext += "<iframe src='"+thevalue.url+"' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
								}else{
									if(thevalue.svalue != "" && typeof thevalue.svalue != "undefined"){
										thetheBotnavtext += "<video playsinline controls poster='/_Webmoduledata/Videos/Screenshots/"+thevalue.svalue.replace(".mp4",".jpg")+"' preload='auto' src='/_Webmoduledata/Videos/Converted/"+thevalue.svalue+"' data-t='video' class='thebotmenuimg' data-f='"+thevalue.svalue+"'></video>";
									}
								}
								break;
							case "social":
								$.each(thevalue.items,function(index2,value2){
									thecolor = "#3b5998"
									var social_url = value2.url
									var social = value2.title.toLowerCase()
									switch (social){
										case "whatsapp":
											var link = social_url.replace(/^(\+)?(27)(\s)?([0-9\s]+)/,"$2$4")
											link = link.replace(/\s/g,"")
											social_url = "wa.me/" + link;
										break;
										case "telegram": social_url = "telegram.me/" + social_url.replace(/@/g,"");break;
									}

									//thetheBotnavtext += "<a class='thebotnav_social' title='Follow us on "+value2.title.capitalize()+"' target='_blank' href='https://"+social_url+"'><i class='fa fa-"+((value2.title.toLowerCase() != "instagram" && value2.title.toLowerCase() != "whatsapp" &&value2.title.toLowerCase() != "telegram")?value2.title+"-square":value2.title)+" fa-3x' style='color:"+thecolor+"!important' aria-hidden='hidden'></i></a>";
									thetheBotnavtext += "<a data-social='"+social+"' class='thebotnav_social' title='Follow us on "+value2.title.capitalize()+"' target='_blank' href='https://"+social_url+"'>"+getSocialIcon(social)+"</a>";

								});
								break;
							case "contact":
								hasContactFields = true;
								$.each(thevalue.items,function(index2,value2){
									title="";
									href="";
									onclick=""
									switch (value2.type){
										case "fa-user":
											title = "Company Contact Person";
											break;
										case "fa-phone":
											title = "Company Contact Number";
											href = "tel:"+value2.val;
											break;
										case "fa-envelope":
											title = "Company Email Address";
											href = "mailto:"+value2.val;
											break;
										case "fa-map-marker":
											title = "Company Physical Address";
											href = "https://www.google.com/maps/place/"+value2.val.replace(/\n/g,",");
											break;
									}
									thetheBotnavtext += "<div class='contactline'>";
									thetheBotnavtext += "<div class='aicon' title='Company Contact Person'><i class='fa "+value2.type+"' aria-hidden='true'></i></div>";
									thetheBotnavtext += ((href != "")?"<a":"<div ") + " class='thecontactitem' data-t='"+value2.type+"' title='"+title+"'" + ((href != "")?" target='_blank' href='"+href+"' ":"") + ">"+value2.val.replace(/\n/g,"</br>")+((href != "")?"</a>":"</div>");
									thetheBotnavtext += "</div>";
								});
								break;
						};
						thetheBotnavtext += "</div>";
						theBotnav.append(thetheBotnavtext);
					}
				});
				if (theBotnav.find(".thecontactitem[data-t='fa-map-marker']").length >0)theBotnav.find(".thecontactitem[data-t='fa-map-marker']").html(theBotnav.find(".thecontactitem[data-t='fa-map-marker']").html().replace(/<br>/g,", "))
				theBotnav.fadeIn();

				if (parent === window){

					if (hasContactFields){
						$.ajax({url:"/_webmoduledata/ContactFormLite/ContactFormLite1.asp",method:"get",success:function(data){
							HideNumbers = data.split(String.fromCharCode(10))[12];
							if (HideNumbers.indexOf("true") != -1){
								$(theBotnav).find(".thecontactitem[data-t='fa-envelope'],.thecontactitem[data-t='fa-phone']").each(function(){
									theText = ($(this).attr("data-t") == "fa-envelope")?"Email":"Number";
									$(this).before("<button class='thecontactsectionbut' value='"+$(this).html()+"'>Show "+theText+"</button>");
									$(this).html("").hide();
								});
							}
							$(".thecontactsectionbut").on("click",function(){
								nextEl = $(this)[0].nextSibling;
								theText = ($(nextEl).attr("data-t") == "fa-envelope")?"Email":"Number";
								$(this).toggle(function(){
									$(nextEl).html($(this).attr("value")).slideToggle();
									if (typeof ga  == 'function')ga(GlobalGoogleTag+'.send', 'event', 'Show '+theText+' Button', 'Click', $(this).attr("value"));
								})
							});
						}});

						$(theBotnav).find(".thecontactitem[data-t='fa-envelope'],.thecontactitem[data-t='fa-phone']").on("click",function(){
							theText = ($(this).attr("data-t") == "fa-envelope")?"Email":"Number";
							if (typeof ga  == 'function')ga(GlobalGoogleTag+'.send', 'event', 'Bottom '+theText+' Link', 'Click', $(this).html());
						});

						$(theBotnav).find(".thecontactitem[data-t='fa-map-marker']").on("click",function(){
							if (typeof ga  == 'function')ga(GlobalGoogleTag+'.send', 'event', 'Bottom Map Link', 'Click', $(this).html());
						});
					};

					$(".thebotnav_link").on("click",function(){
						if (typeof ga  == 'function')ga(GlobalGoogleTag+'.send', 'event', 'Bottom Menu Link', 'Click', $(this).html());
					});
					$(".thebotnav_social").on("click",function(){
						if (typeof ga  == 'function')ga(GlobalGoogleTag+'.send', 'event', 'Bottom Social Link', 'Click', $(this).attr("title"));
					});

					$(".thebotmenuimg").each(function(){
						ImagePath = "";
						ImageFilename = $(this).attr("data-f");
						ImageType = $(this).attr("data-t");
						if (typeof $(this).attr("data-url") == "undefined" && ImageType == "image"){

							if (ImageFilename != ""){
								FileExistss = fileExists(protocol + window.location.hostname + "/Cache/cached_" + $(window).width() + "x0" + "_" + ImageFilename);
								if (FileExistss) {
									ImagePath = "/Cache/cached_" + $(window).width() + "x0" + "_" + ImageFilename;
								} else {
									ImagePath = "/WebModules/Common/SSTools/CacheImage.aspx?IptFl=/_webmoduledata/images/raw/" +ImageFilename + "&OptSc=Y&ImgWd=" + $(window).width() + "&ImgHt=0&type=general&imgq="+WebsiteImgQual;
								};
							}

							$(this).magnificPopup({items: {src: ImagePath},type: ImageType});
						}
					});

					$(".thebotmenuimg").on("click",function(){
						if (typeof $(this).attr("data-url") != "undefined"){
							if ($(this).attr("data-url") != ""){
								if (typeof ga  == 'function')ga(GlobalGoogleTag+'.send', 'event', 'Bottom '+$(this).attr("data-t").capitalize()+' Link', 'Click', $(this).attr("data-url"));
								var win = window.open($(this).attr("data-url"), '_blank');
								if (win)win.focus();
							}else{
								if (typeof ga  == 'function')ga(GlobalGoogleTag+'.send', 'event', 'Bottom '+$(this).attr("data-t").capitalize(), 'Click', $(this).attr("data-f"));
							}
						}else{
							if (typeof ga  == 'function')ga(GlobalGoogleTag+'.send', 'event', 'Bottom '+$(this).attr("data-t").capitalize(), 'Click', $(this).attr("data-f"));
						}
					});
				}
			}
		},error:function(data){
			console.log(data)
			console.log("an error has occured")
		}
	});
}
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

function getSocialIcon(icon){
	var svgicon = ""
	switch(icon){
		case "facebook":
			svgicon = 	'<svg width="128.53036mm" height="128.09839mm" viewBox="0 0 128.53036 128.09839" version="1.1" id="svg5" inkscape:version="1.1 (c68e22c387, 2021-05-23)" sodipodi:docname="facebook.svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">' +
						'<sodipodi:namedview id="namedview7" pagecolor="#ffffff" bordercolor="#999999" borderopacity="1" inkscape:pageshadow="0" inkscape:pageopacity="0" inkscape:pagecheckerboard="0" inkscape:document-units="mm" showgrid="false" fit-margin-top="0" fit-margin-left="0" fit-margin-right="0" fit-margin-bottom="0" inkscape:zoom="0.81386721" inkscape:cx="207.65058" inkscape:cy="266.01391" inkscape:window-width="1600" inkscape:window-height="847" inkscape:window-x="-8" inkscape:window-y="67" inkscape:window-maximized="1" inkscape:current-layer="layer1"></sodipodi:namedview>'+
						'<defs id="defs2"></defs><g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-46.998922,-3.8732895)">'+
						'<path style="stroke-width:0.264583" d="m 66.11862,131.41108 c -6.731167,-1.76487 -14.636394,-8.53045 -17.678691,-15.13008 -0.492401,-1.06816 -1.03121,-2.65649 -1.197353,-3.52961 -0.220659,-1.15963 -0.280769,-13.068738 -0.223022,-44.185416 l 0.07905,-42.597915 0.619659,-1.852083 c 1.475511,-4.410121 4.015309,-8.522327 7.555494,-12.233161 2.74259,-2.8747932 5.048917,-4.6789916 7.859669,-6.1484789 3.821064,-1.9976884 0.239083,-1.8589844 48.007614,-1.8589844 41.42753,0 42.96488,0.017391 44.88214,0.5077447 6.9672,1.7819091 13.96128,7.7643956 17.68484,15.1269696 2.00009,3.954778 1.86295,0.139233 1.78416,49.640698 l -0.0707,44.394376 -0.82038,2.02164 c -2.25826,5.565 -7.78514,11.26054 -13.68942,14.1072 -4.20076,2.02534 -4.48355,2.06835 -14.39593,2.18986 l -8.79739,0.10784 5.2e-4,-16.22473 c 2.7e-4,-8.9236 0.0789,-19.350118 0.17476,-23.17004 l 0.17421,-6.945312 h 7.10129 c 5.50425,0 7.10145,-0.07438 7.10202,-0.330729 5.3e-4,-0.181902 0.41712,-3.644379 0.92604,-7.694393 0.50893,-4.050017 0.92532,-7.651657 0.92532,-8.003645 v -0.639983 h -8.08872 -8.08872 l 0.0851,-7.209895 c 0.0841,-7.1243 0.0929,-7.223908 0.74654,-8.390281 0.71653,-1.278665 1.89818,-2.210874 3.40846,-2.688942 0.52644,-0.16664 3.63607,-0.376245 6.91029,-0.465785 l 5.95312,-0.162804 v -7.408333 -7.408333 l -1.5875,-0.189158 c -0.87312,-0.10404 -4.62359,-0.216945 -8.33437,-0.250905 -7.45999,-0.06827 -8.79265,0.102241 -12.54624,1.605248 -4.64036,1.858092 -8.28994,5.473581 -10.17464,10.079606 -1.50663,3.682061 -1.68743,5.084617 -1.81565,14.084855 l -0.11961,8.396314 -7.18495,0.07035 -7.18495,0.07035 v 8.202083 8.202083 l 7.16672,0.07032 7.16671,0.07032 0.17519,13.29114 c 0.0964,7.310129 0.17531,17.726219 0.17546,23.146869 l 2.9e-4,9.85573 -26.392188,-0.0146 c -24.87966,-0.0137 -26.500047,-0.0428 -28.274256,-0.50803 z" id="path854"></path>'+
						'</g></svg>';
		break;
		case "twitter":
			svgicon = 	'<svg width="128.79424mm" height="128.00203mm" viewBox="0 0 128.79425 128.00203" version="1.1" id="svg5" inkscape:version="1.1 (c68e22c387, 2021-05-23)" sodipodi:docname="twitter.svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">'+
						'<sodipodi:namedview id="namedview7" pagecolor="#ffffff" bordercolor="#999999" borderopacity="1" inkscape:pageshadow="0" inkscape:pageopacity="0" inkscape:pagecheckerboard="0" inkscape:document-units="mm" showgrid="false" fit-margin-top="0" fit-margin-left="0" fit-margin-right="0" fit-margin-bottom="0" inkscape:zoom="0.81386721" inkscape:cx="283.83009" inkscape:cy="270.92872" inkscape:window-width="1600" inkscape:window-height="847" inkscape:window-x="-8" inkscape:window-y="67" inkscape:window-maximized="1" inkscape:current-layer="layer1"></sodipodi:namedview>'+
						'<defs id="defs2"></defs><g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-62.43056,6.5109995)">'+
						'<path style="stroke-width:0.264583" d="m 81.54794,121.02873 c -8.178399,-2.15443 -17.535212,-11.40204 -18.881998,-18.66162 -0.210647,-1.13545 -0.272,-13.717476 -0.215457,-44.185417 l 0.07905,-42.597915 0.619658,-1.852083 c 1.46322,-4.3733814 4.172067,-8.7354727 7.692557,-12.3874223 2.676267,-2.7762032 4.964281,-4.5521388 7.722606,-5.9942174 3.821463,-1.9978971 0.224208,-1.8589844 48.139904,-1.8589844 41.39665,0 43.10354,0.019055 44.98971,0.502285 2.65275,0.6796232 4.66775,1.606928 7.30538,3.3619488 4.13119,2.74879558 8.1288,7.2713765 10.40417,11.7704806 2.00009,3.9547777 1.86296,0.1392333 1.78417,49.6406977 l -0.0707,44.394377 -0.82037,2.02164 c -1.16166,2.86265 -3.02106,5.53749 -5.78602,8.32347 -3.51839,3.54516 -6.86673,5.67344 -11.25298,7.15269 l -2.24896,0.75845 -43.78854,0.0539 c -42.068812,0.0518 -43.862512,0.0344 -45.672215,-0.4423 z m 36.27951,-34.010374 c 4.6577,-0.580289 6.0486,-0.869389 9.10986,-1.893496 13.27286,-4.440274 23.17442,-16.114539 26.46843,-31.207131 0.54962,-2.518283 1.18176,-9.37587 0.93573,-10.151038 -0.10135,-0.319318 0.46325,-0.997667 1.94072,-2.331752 1.73376,-1.565497 5.06922,-5.452126 5.06922,-5.906889 0,-0.07015 -1.16086,0.254916 -2.57969,0.722358 -1.41883,0.467442 -3.08347,0.930092 -3.69921,1.028112 l -1.11953,0.178221 1.80651,-1.808356 c 1.31157,-1.312915 2.07869,-2.374891 2.79996,-3.876188 0.5464,-1.137308 0.95163,-2.109295 0.90052,-2.159973 -0.0511,-0.05068 -1.14188,0.42164 -2.42391,1.049597 -1.28204,0.627956 -3.23345,1.387057 -4.33646,1.68689 l -2.00548,0.545148 -1.21979,-1.077706 c -6.0353,-5.33228 -14.54839,-4.931889 -19.77298,0.929976 -1.36743,1.53422 -2.30942,3.202278 -3.15783,5.591815 -0.34593,0.974307 -0.47554,2.178669 -0.49185,4.570354 l -0.0221,3.24744 -1.19063,-0.15689 C 117.7877,45.0697 111.8809,42.807105 106.46463,38.960593 c -2.34259,-1.66365 -6.692117,-5.721604 -8.32444,-7.766399 -0.819359,-1.026406 -0.856676,-1.042482 -1.236906,-0.532932 -0.621239,0.832528 -1.434701,3.777695 -1.605248,5.811867 -0.361585,4.312697 1.347446,9.198501 4.261728,12.183487 1.198786,1.227873 1.331366,1.454838 0.848416,1.452423 -0.802577,-0.004 -2.814207,-0.641506 -4.10948,-1.302306 l -1.09312,-0.55767 0.0039,1.26215 c 0.0059,1.912948 0.692468,4.436146 1.775815,6.526532 1.666483,3.215584 4.684975,5.795047 8.406725,7.184006 0.87957,0.328253 -1.60638,0.698831 -3.50573,0.522597 -1.38275,-0.128299 -1.65364,-0.0863 -1.65364,0.256376 0,0.929079 1.82119,4.062145 3.25249,5.595382 2.38544,2.555329 4.43021,3.692183 7.9789,4.436117 l 1.5741,0.329989 -1.66505,1.130715 c -3.22962,2.193189 -7.33278,3.912436 -10.74357,4.501607 -0.873117,0.150823 -3.046008,0.285896 -4.828638,0.300165 -1.78263,0.01426 -3.23864,0.104833 -3.235576,0.201258 0.0083,0.26104 4.632933,2.802662 6.609014,3.6322 3.73089,1.56619 7.06087,2.357318 13.09687,3.111526 1.60008,0.199932 2.44524,0.166267 5.55625,-0.221327 z" id="path2491"></path>'+
						'</g></svg>';
		break;
		case "youtube":
			svgicon = 	'<svg width="129.25337mm" height="128.87083mm" viewBox="0 0 129.25339 128.87083" version="1.1" id="svg5" inkscape:version="1.1 (c68e22c387, 2021-05-23)" sodipodi:docname="youtube.svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">'+
						'<sodipodi:namedview id="namedview7" pagecolor="#ffffff" bordercolor="#999999" borderopacity="1" inkscape:pageshadow="0" inkscape:pageopacity="0" inkscape:pagecheckerboard="0" inkscape:document-units="mm" showgrid="false" fit-margin-top="0" fit-margin-left="0" fit-margin-right="0" fit-margin-bottom="0" inkscape:zoom="0.81386718" inkscape:cx="251.88385" inkscape:cy="227.92417" inkscape:window-width="1600" inkscape:window-height="847" inkscape:window-x="-8" inkscape:window-y="67" inkscape:window-maximized="1" inkscape:current-layer="layer1"></sodipodi:namedview>'+
						'<defs id="defs2"></defs><g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-69.117142,-3.7236928)">'+
						'<path style="stroke-width:0.264583" d="M 88.494714,132.15667 C 81.314303,130.41708 72.773281,122.7832 69.861405,115.5024 l -0.739423,-1.84884 V 69.997314 c 0,-49.461175 -0.217361,-44.674433 2.261063,-49.79332 C 75.099191,12.528742 83.062738,5.3373911 89.309483,4.0158196 90.312709,3.8035754 102.92003,3.7204991 133.62719,3.7237863 c 47.76409,0.00511 44.75017,-0.1084849 48.8132,1.8398246 3.13426,1.5029404 4.89035,2.7331724 7.56051,5.2965251 2.83904,2.725467 5.14382,5.759132 6.53508,8.601764 1.97214,4.029519 1.83539,0.354918 1.83104,49.20194 -0.004,48.92028 0.12285,45.53586 -1.85436,49.33631 -3.59045,6.9013 -11.28049,12.82373 -18.42641,14.19097 -2.9234,0.55934 -87.27447,0.5269 -89.591536,-0.0345 z M 165.5626,90.797251 c 0.50933,-0.201702 1.24084,-0.658368 1.6256,-1.014817 1.40725,-1.303711 1.41711,-1.464442 1.41711,-23.092412 0,-19.944171 -7.9e-4,-19.977728 -0.56956,-21.034374 -0.74477,-1.383892 -1.52585,-2.08848 -3.1379,-2.830628 -1.31227,-0.604131 -1.40369,-0.608455 -16.40087,-0.775925 -8.29469,-0.09263 -22.05456,-0.182245 -30.5775,-0.199158 -17.67802,-0.03507 -17.42898,-0.06007 -19.43996,1.950914 -2.064821,2.064821 -2.006338,1.345591 -1.918248,23.59082 0.07168,18.101317 0.112186,19.616133 0.550487,20.587625 0.82378,1.825908 1.859243,2.618163 3.978871,3.044319 0.60735,0.122108 15.15364,0.203645 32.3251,0.18119 25.91794,-0.03389 31.37812,-0.103114 32.14687,-0.407554 z M 125.8751,67.483772 c 0,-5.675312 0.0926,-10.318749 0.20571,-10.318749 0.11315,0 0.44057,0.160139 0.72761,0.355862 0.28704,0.195725 2.60549,1.437449 5.1521,2.759392 2.54661,1.32194 5.88036,3.072297 7.40833,3.889682 1.52797,0.817382 3.46175,1.808078 4.29729,2.201545 0.83555,0.393467 1.52015,0.799118 1.52136,0.901451 0.001,0.10233 -0.50383,0.422976 -1.12229,0.712549 -0.61847,0.289571 -1.89839,0.958266 -2.84427,1.48599 -1.95298,1.089597 -4.4563,2.453973 -7.54063,4.10985 -1.16416,0.625001 -3.34597,1.830451 -4.84846,2.678773 -1.5025,0.848323 -2.78242,1.542405 -2.84427,1.542405 -0.0619,0 -0.11248,-4.643437 -0.11248,-10.31875 z" id="path1177"></path>'+
						'</g></svg>';
		break;
		case "linkedin":
			svgicon = 	'<svg width="129.51677mm" height="128.74644mm" viewBox="0 0 129.51677 128.74644" version="1.1" id="svg5" inkscape:version="1.1 (c68e22c387, 2021-05-23)" sodipodi:docname="linkedin.svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">'+
						'<sodipodi:namedview id="namedview7" pagecolor="#ffffff" bordercolor="#999999" borderopacity="1" inkscape:pageshadow="0" inkscape:pageopacity="0" inkscape:pagecheckerboard="0" inkscape:document-units="mm" showgrid="false" fit-margin-top="0" fit-margin-left="0" fit-margin-right="0" fit-margin-bottom="0" inkscape:zoom="1.150982" inkscape:cx="199.82936" inkscape:cy="266.29434" inkscape:window-width="1600" inkscape:window-height="847" inkscape:window-x="-8" inkscape:window-y="67" inkscape:window-maximized="1" inkscape:current-layer="layer1"></sodipodi:namedview>'+
						'<defs id="defs2"></defs><g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-88.017954,0.773593)">'+
						'<path style="stroke-width:0.264583" d="m 107.50724,127.62733 c -7.48857,-2.02679 -15.762692,-9.32932 -18.65843,-16.46746 l -0.826117,-2.03643 V 65.467197 c 0,-49.437634 -0.214602,-44.67986 2.244413,-49.759232 3.670985,-7.5828321 11.263324,-14.5290785 17.623644,-16.12389574 1.41913,-0.35584022 6.85915,-0.3956978 45.50833,-0.33342737 l 43.89652,0.070725 1.7198,0.62008356 c 2.4403,0.87986865 5.40413,2.47359335 7.41671,3.98814085 3.67872,2.768395 7.76655,7.6966047 9.53353,11.4934387 1.66951,3.587406 1.57097,0.52352 1.56668,48.710693 -0.004,48.920277 0.12285,45.535857 -1.85436,49.336317 -3.24451,6.23636 -9.86138,11.71476 -16.71151,13.8362 l -1.93543,0.59939 -44.05312,0.0527 c -37.77259,0.0452 -44.25522,-0.002 -45.47066,-0.33098 z M 134.45707,75.389071 V 51.576573 h -7.54063 -7.54062 V 75.389071 99.20157 h 7.54062 7.54063 z m 24.13569,9.723437 c 0.0883,-13.525187 -0.24256,-13.097844 0.65294,-15.750811 0.8955,-2.652967 3.67394,-5.62284 7.22595,-5.706216 3.57694,-0.08396 6.30517,2.148819 7.56464,4.64263 1.25947,2.493811 0.74841,11.001491 0.84643,16.285231 l 0.0767,14.618228 h 7.67517 7.67516 l -0.0867,-16.734895 -0.0867,-15.147395 c -0.34055,-10.437049 -6.56206,-14.344747 -11.75844,-16.051854 -1.71279,-0.532464 -2.50945,-0.61409 -5.82084,-0.596406 -3.51943,0.01879 -4.00043,0.08146 -5.82083,0.758278 -2.61593,0.972597 -5.12413,2.66061 -7.11379,4.787563 l -1.61746,1.729071 v -3.184678 -3.184681 h -7.27604 -7.27604 V 75.389071 99.20157 h 7.52392 7.52391 z M 130.83207,44.602696 c 4.04884,-1.980914 5.92913,-7.058419 4.09635,-11.061734 -0.91157,-1.991122 -2.33038,-3.494693 -4.13304,-4.379946 -1.30088,-0.638837 -1.8106,-0.735484 -3.87894,-0.735484 -2.06834,0 -2.57805,0.09665 -3.87893,0.735484 -3.82023,1.876041 -5.86493,6.57866 -4.47106,10.283041 1.5401,4.093003 4.58664,6.162802 8.78356,5.967489 1.52459,-0.07095 2.37995,-0.269642 3.48206,-0.80885 z" id="path1383" sodipodi:nodetypes="sscsssscssscsscssscccccccccczszcccccccssscccccccccccssssssc"></path>'+
						'</g></svg>';
		break;
		case "instagram":
			svgicon = 	'<svg width="129.25218mm" height="128.87767mm" viewBox="0 0 129.25218 128.87767" version="1.1" id="svg5" inkscape:version="1.1 (c68e22c387, 2021-05-23)" sodipodi:docname="instagram.svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">'+
						'<sodipodi:namedview id="namedview7" pagecolor="#ffffff" bordercolor="#999999" borderopacity="1" inkscape:pageshadow="0" inkscape:pageopacity="0" inkscape:pagecheckerboard="0" inkscape:document-units="mm" showgrid="false" fit-margin-top="0" fit-margin-left="0" fit-margin-right="0" fit-margin-bottom="0" inkscape:zoom="0.81386721" inkscape:cx="119.18406" inkscape:cy="257.413" inkscape:window-width="1600" inkscape:window-height="847" inkscape:window-x="-8" inkscape:window-y="67" inkscape:window-maximized="1" inkscape:current-layer="layer1"></sodipodi:namedview>'+
						'<defs id="defs2"></defs><g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-70.404027,-6.0847485)">'+
						'<path style="stroke-width:0.264583" d="m 89.887365,134.51465 c -4.200497,-1.12973 -7.964592,-3.39994 -11.978497,-7.22449 -3.243725,-3.09071 -5.378771,-6.04635 -6.673985,-9.23912 l -0.826117,-2.03642 V 72.35837 c 0,-49.437634 -0.214601,-44.67986 2.244414,-49.759232 C 76.37461,14.912104 84.354686,7.6973543 90.596267,6.3768753 91.599494,6.1646311 104.20681,6.0815548 134.91397,6.084842 c 36.55262,0.00391 43.19023,0.061765 44.76771,0.3901837 2.27785,0.4742317 6.55323,2.5529428 8.86354,4.3094993 3.69189,2.806991 7.78319,7.750587 9.54191,11.529677 1.66951,3.587407 1.57097,0.523521 1.56668,48.710694 -0.004,49.083924 0.13181,45.578424 -1.92022,49.429664 -3.71093,6.96466 -11.22193,12.73177 -18.36056,14.09761 -2.98098,0.57036 -87.357037,0.53498 -89.485665,-0.0375 z m 66.907855,-23.41288 c 4.86294,-0.78791 8.57957,-2.74068 12.30312,-6.46424 3.72356,-3.72355 5.67633,-7.440184 6.46424,-12.30312 0.37995,-2.345055 0.37995,-41.311193 0,-43.656248 -0.78791,-4.862935 -2.74068,-8.579572 -6.46424,-12.303124 -3.72355,-3.723553 -7.44018,-5.676326 -12.30312,-6.464231 -2.34505,-0.379953 -41.31119,-0.379953 -43.65625,0 -4.86293,0.787905 -8.57957,2.740678 -12.30312,6.464231 -3.723554,3.723552 -5.676328,7.440189 -6.464233,12.303124 -0.379952,2.345055 -0.379952,41.311193 0,43.656248 0.787905,4.862936 2.740679,8.57957 6.464233,12.30312 3.63634,3.63635 7.47099,5.68358 12.08191,6.45026 2.07319,0.34473 41.75809,0.35736 43.87746,0.014 z m -41.80416,-7.10842 c -6.15591,-0.67584 -11.22581,-5.021391 -13.13929,-11.262065 -0.45489,-1.483569 -0.48676,-2.938605 -0.48676,-22.224999 0,-19.286393 0.0319,-20.74143 0.48676,-22.224999 1.64851,-5.376494 5.51383,-9.241816 10.89033,-10.890331 1.48357,-0.454885 2.9386,-0.486751 22.225,-0.486751 19.28639,0 20.74143,0.03187 22.225,0.486751 5.37649,1.648515 9.24181,5.513837 10.89033,10.890331 0.45488,1.483569 0.48675,2.938606 0.48675,22.224999 0,19.286394 -0.0319,20.74143 -0.48675,22.224999 -1.62951,5.314484 -5.3986,9.124705 -10.75804,10.875415 -1.34099,0.43804 -2.99203,0.47928 -21.03438,0.52541 -10.76854,0.0275 -20.35307,-0.0349 -21.29895,-0.13876 z m 25.79687,-13.247345 c 7.20542,-2.29149 12.18618,-7.30687 14.46,-14.560501 0.52558,-1.676633 0.61912,-2.534727 0.61912,-5.679218 0,-3.14449 -0.0935,-4.002584 -0.61912,-5.679217 -2.29104,-7.308577 -7.28833,-12.306228 -14.60162,-14.602679 -1.67811,-0.526944 -2.53195,-0.620186 -5.67921,-0.620186 -3.14726,0 -4.00111,0.09324 -5.67922,0.620186 -7.31329,2.296451 -12.31057,7.294102 -14.60162,14.602679 -0.52558,1.676633 -0.61912,2.534727 -0.61912,5.679217 0,3.144491 0.0935,4.002585 0.61912,5.679218 2.47964,7.9102 8.47578,13.40368 16.46427,15.084054 2.08026,0.437583 7.54943,0.14047 9.6374,-0.523553 z m -7.70276,-6.608238 c -4.1369,-0.621964 -7.64467,-2.926291 -9.87594,-6.487731 -2.58685,-4.128974 -2.58685,-10.158526 0,-14.287499 2.63625,-4.207844 6.81902,-6.531298 11.75787,-6.531298 7.75544,0 13.67504,5.919607 13.67504,13.675047 0,4.938406 -2.32057,9.116526 -6.53129,11.759374 -2.39228,1.501505 -6.21574,2.29457 -9.02568,1.872107 z m 25.35548,-30.444166 c 3.21685,-0.893405 4.74647,-4.949531 2.95643,-7.839622 -2.51651,-4.063021 -8.6011,-2.93986 -9.66239,1.783596 -0.53326,2.373378 1.01629,5.10324 3.37375,5.943552 1.24651,0.444317 2.04082,0.471127 3.33221,0.112474 z" id="path1168"></path>'+
						'</g></svg>';
		break;
		case "pinterest":
			svgicon = 	'<svg width="128.79424mm" height="128.0011mm" viewBox="0 0 128.79425 128.0011" version="1.1" id="svg5" inkscape:version="1.1 (c68e22c387, 2021-05-23)" sodipodi:docname="pinterest.svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">'+
						'<sodipodi:namedview id="namedview7" pagecolor="#ffffff" bordercolor="#999999" borderopacity="1" inkscape:pageshadow="0" inkscape:pageopacity="0" inkscape:pagecheckerboard="0" inkscape:document-units="mm" showgrid="false" fit-margin-top="0" fit-margin-left="0" fit-margin-right="0" fit-margin-bottom="0" inkscape:zoom="0.81386721" inkscape:cx="305.94672" inkscape:cy="296.73145" inkscape:window-width="1600" inkscape:window-height="847" inkscape:window-x="-8" inkscape:window-y="67" inkscape:window-maximized="1" inkscape:current-layer="layer1"></sodipodi:namedview>'+
						'<defs id="defs2"></defs><g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-56.735279,13.267203)">'+
						'<path style="stroke-width:0.264583" d="M 75.852658,114.27161 C 67.674259,112.11717 58.317447,102.86957 56.97066,95.609986 56.760013,94.474534 56.698661,81.892512 56.755204,51.424571 l 0.07905,-42.5979146 0.723258,-2.1166665 c 2.551413,-7.46689215 8.954426,-14.9312938 15.745227,-18.3552169 3.417533,-1.72312 0.406609,-1.620824 47.706241,-1.620824 41.39666,0 43.10355,0.01905 44.98972,0.502285 2.65275,0.679623 4.66775,1.606928 7.30538,3.361949 4.13118,2.7487956 8.12879,7.2713765 10.40417,11.7704806 2.00009,3.954778 1.86296,0.1392333 1.78416,49.6406974 l -0.0707,44.394374 -0.82038,2.021642 c -1.16165,2.862653 -3.02105,5.537493 -5.78601,8.323473 -3.51839,3.54516 -6.86673,5.67344 -11.25298,7.15269 l -2.24896,0.75844 -43.78854,0.0539 c -42.068823,0.0518 -43.862522,0.0344 -45.672226,-0.4423 z M 106.75792,91.839673 c 2.34721,-3.301841 2.98544,-4.302082 4.26284,-6.680729 1.88726,-3.514251 2.65899,-5.748088 4.43734,-12.844221 0.91007,-3.631459 1.68179,-6.639152 1.71493,-6.683763 0.0331,-0.04461 0.67528,0.56919 1.42698,1.364003 2.75355,2.91147 6.64398,4.29668 11.39154,4.056026 6.0311,-0.305721 10.1847,-2.187631 14.70348,-6.661835 5.85286,-5.795129 8.84246,-13.337394 9.28149,-23.415624 0.31789,-7.297332 -1.66768,-13.296836 -6.17336,-18.653124 -3.32816,-3.956463 -8.89996,-7.4936 -14.13707,-8.974608 -7.55954,-2.13777 -16.99006,-1.497767 -24.59776,1.669325 -8.22111,3.422454 -14.919125,10.943113 -17.345748,19.476116 -0.820539,2.885349 -1.140857,8.525067 -0.645697,11.368494 1.047218,6.013561 3.94144,10.678509 7.951052,12.815609 1.840693,0.98108 2.760493,1.043622 3.290133,0.223708 0.42407,-0.656479 1.47973,-4.578742 1.47973,-5.497875 0,-0.319587 -0.52754,-1.282845 -1.17231,-2.140577 -2.23654,-2.975258 -3.062822,-6.624087 -2.53268,-11.184212 1.32563,-11.402697 9.77595,-19.200568 21.58404,-19.917555 6.4278,-0.390297 12.15298,1.500045 15.93375,5.261007 3.86863,3.848359 5.21457,8.293057 4.76866,15.747571 -0.58701,9.813533 -4.61114,18.00671 -10.19402,20.755151 -3.34552,1.646994 -7.40631,1.276935 -9.75616,-0.889077 -1.56177,-1.439592 -2.22712,-2.969908 -2.22712,-5.122441 0,-1.759247 0.29913,-3.007495 2.36609,-9.873578 1.91044,-6.346129 2.22436,-8.792426 1.45901,-11.36964 -0.82195,-2.767806 -2.89564,-4.279315 -5.86508,-4.275042 -4.1562,0.006 -7.32303,3.003783 -8.68415,8.220654 -0.6105,2.339885 -0.4163,7.051794 0.39746,9.643737 l 0.58386,1.859684 -3.20493,13.550535 c -3.49894,14.793615 -3.87477,17.131894 -3.60315,22.417594 0.16497,3.210396 0.61064,7.220984 0.84445,7.599299 0.32688,0.528907 0.91734,0.04748 2.2624,-1.844612 z" id="path2294"></path>'+
						'</g></svg>';
		break;
		case "whatsapp":
			svgicon = 	'<svg width="141.03128mm" height="140.67488mm" viewBox="0 0 141.03128 140.67488" version="1.1" id="svg5" inkscape:version="1.1 (c68e22c387, 2021-05-23)" sodipodi:docname="Whatsapp.svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">'+
						'<sodipodi:namedview id="namedview7" pagecolor="#ffffff" bordercolor="#999999" borderopacity="1" inkscape:pageshadow="0" inkscape:pageopacity="0" inkscape:pagecheckerboard="0" inkscape:document-units="mm" showgrid="false" fit-margin-top="0" fit-margin-left="0" fit-margin-right="0" fit-margin-bottom="0" inkscape:zoom="0.81386721" inkscape:cx="152.35901" inkscape:cy="339.73601" inkscape:window-width="1600" inkscape:window-height="847" inkscape:window-x="-8" inkscape:window-y="67" inkscape:window-maximized="1" inkscape:current-layer="layer1"></sodipodi:namedview>'+
						'<defs id="defs2"></defs><g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(197.97155,-6.5817762)">'+
						'<path style="stroke-width:0.264583" d="m -176.99039,146.78936 c -7.0903,-1.86759 -15.65763,-9.01396 -19.19392,-16.01045 -0.36776,-0.72761 -0.92033,-2.13913 -1.22795,-3.13673 l -0.55929,-1.81381 0.002,-46.869523 c 0.002,-45.405445 0.0178,-46.936134 0.51307,-49.001712 0.66147,-2.758858 1.31686,-4.394777 2.83236,-7.069863 3.45484,-6.098329 8.82375,-11.440509 14.41554,-14.3437858 4.14795,-2.1536294 -0.0247,-2.0034444 53.46949,-1.9245324 l 47.697879,0.07036 1.85209,0.6260214 c 8.66748,2.9296868 16.77533,10.9741028 19.75337,19.5988348 0.49397,1.430608 0.50747,2.822758 0.49185,50.724877 -0.0154,47.173603 -0.0367,49.313863 -0.50454,50.673663 -1.20709,3.50846 -3.16625,6.52177 -6.44512,9.91298 -3.84698,3.97879 -8.42289,6.86921 -13.23702,8.36129 l -1.91063,0.59218 -48.021869,0.056 c -46.40246,0.0541 -48.08613,0.0391 -49.92716,-0.44583 z m 21.04404,-41.30231 c 3.15264,-0.88641 6.87641,-1.93982 8.27503,-2.3409 2.50771,-0.71914 2.55538,-0.7226 3.43958,-0.24938 1.95779,1.0478 6.58019,2.7086 8.83413,3.17406 2.93596,0.6063 7.89858,0.65578 11.0117,0.1098 9.91712,-1.73929 18.53441,-8.19567 23.10655,-17.312249 2.581589,-5.147554 3.436539,-9.157414 3.247899,-15.233144 -0.17022,-5.48267 -0.88421,-8.48636 -3.083229,-12.97092 -3.93464,-8.024069 -10.56754,-13.862042 -18.76617,-16.517107 -3.6556,-1.183838 -5.64546,-1.47456 -10.09279,-1.47456 -5.79397,0 -9.25886,0.792023 -14.13992,3.232179 -8.7427,4.370687 -14.70899,11.920858 -17.1299,21.677398 -0.83628,3.37032 -0.84978,10.32186 -0.0264,13.5873 0.77746,3.083274 1.96725,6.100634 3.39002,8.597274 1.0029,1.75987 1.15569,2.2068 0.94693,2.76987 -0.13692,0.36927 -1.02131,2.81453 -1.96533,5.433899 -0.94402,2.61938 -2.08199,5.74477 -2.52883,6.94531 -0.44795,1.20355 -0.68657,2.18282 -0.53189,2.18282 0.15429,0 2.85997,-0.72525 6.01261,-1.61165 z m 20.68104,-4.34257 c -2.35119,-0.47609 -5.29797,-1.56492 -7.67292,-2.83514 l -1.98438,-1.06132 -4.47242,1.22462 c -2.45983,0.67354 -4.52589,1.17114 -4.59125,1.10578 -0.1366,-0.1366 0.59986,-2.40578 1.89575,-5.841139 l 0.89824,-2.38121 -0.88748,-1.20898 c -1.30415,-1.77662 -3.47297,-6.417134 -4.13397,-8.845274 -0.48931,-1.79743 -0.57621,-2.815 -0.57621,-6.74687 0,-5.2261 0.33704,-6.975 2.10729,-10.93453 1.46316,-3.27267 3.10756,-5.60643 5.90469,-8.380058 3.90342,-3.870635 8.4753,-6.265318 13.90953,-7.285617 3.52961,-0.662699 8.96186,-0.431927 12.17083,0.517038 6.56125,1.940306 11.79359,5.752558 15.39119,11.213917 1.7969,2.72779 2.80001,5.01622 3.71886,8.48398 0.92773,3.50127 0.98497,8.8318 0.13165,12.26097 -1.31701,5.292554 -3.59909,9.496194 -7.09047,13.060854 -3.87808,3.959459 -9.26164,6.842399 -14.51492,7.772869 -2.13137,0.37751 -8.09354,0.30746 -10.20401,-0.11989 z m 17.91582,-10.064839 c 2.27105,-1.13171 3.71507,-2.59382 4.19616,-4.24872 0.23015,-0.79167 0.43902,-1.98784 0.46417,-2.65815 0.0381,-1.015864 -0.0592,-1.290204 -0.5847,-1.647974 -1.49522,-1.01803 -7.10207,-3.72262 -7.73107,-3.72926 -0.56,-0.006 -0.99702,0.40921 -2.34034,2.22307 -0.90847,1.22669 -1.84587,2.30482 -2.08312,2.39586 -0.55281,0.21214 -3.92651,-1.49078 -5.91962,-2.98799 -0.83462,-0.62696 -2.21568,-1.90188 -3.06902,-2.83316 -1.50863,-1.6464 -4.02328,-5.39507 -4.02328,-5.99763 0,-0.16453 0.46562,-0.90547 1.03472,-1.64651 0.5691,-0.74105 1.24279,-1.78713 1.49709,-2.32462 l 0.46237,-0.97726 -1.562,-4.13575 c -0.8591,-2.27467 -1.77556,-4.36498 -2.03657,-4.64514 -0.37379,-0.40121 -0.8374,-0.50938 -2.18328,-0.50938 -1.59208,0 -1.78112,0.0654 -2.7692,0.95807 -0.60965,0.55078 -1.47236,1.79148 -2.02936,2.91848 -1.7283,3.49698 -1.5123,7.0986 0.68955,11.49777 2.2484,4.49215 7.4753,10.80892 11.36766,13.737944 2.56224,1.92809 5.87486,3.56264 10.34568,5.10489 0.21828,0.0753 1.4153,0.14631 2.66003,0.15779 1.92002,0.0177 2.46799,-0.0812 3.61413,-0.65233 z" id="path854" sodipodi:nodetypes="csscccssscsssssscsccsssssssssssssssssssssscssscssssssssssssscssccssssssscsssscssssc"></path>'+
						'</g></svg>';
		break;
		case "telegram":
			svgicon = 	'<svg width="128.2645mm" height="127.4358mm" viewBox="0 0 128.26451 127.43579" version="1.1" id="svg5" inkscape:version="1.1 (c68e22c387, 2021-05-23)" sodipodi:docname="telegram - black.svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">'+
						'<sodipodi:namedview id="namedview7" pagecolor="#ffffff" bordercolor="#999999" borderopacity="1" inkscape:pageshadow="0" inkscape:pageopacity="0" inkscape:pagecheckerboard="0" inkscape:document-units="mm" showgrid="false" fit-margin-top="0" fit-margin-left="0" fit-margin-right="0" fit-margin-bottom="0" inkscape:zoom="1.150982" inkscape:cx="236.75435" inkscape:cy="233.27905" inkscape:window-width="1680" inkscape:window-height="997" inkscape:window-x="1592" inkscape:window-y="-8" inkscape:window-maximized="1" inkscape:current-layer="layer1"></sodipodi:namedview>'+
						'<defs id="defs2"></defs><g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-66.296231,17.334205)">'+
						'<path id="path5242" style="fill-opacity:1;stroke-width:0.999999" d="M 241.95703,0.00390625 C 64.350549,0.00390625 75.786811,-0.38208672 62.279297,6.0644531 48.646356,12.570857 30.538455,28.602927 19.605469,43.84375 12.061415,54.360322 7.6088579,62.808329 3.7128906,74.003906 l -3.30468748,9.5 -0.26953124,161.287114 c -0.2990589,180.16233 -0.81462133,166.51706 6.85546872,181.21289 9.2323914,17.68915 25.2801594,33.99397 44.4628904,45.17578 7.172493,4.18095 17.981698,8.63006 23.789063,9.79101 2.288666,0.45736 78.185186,0.75345 168.660156,0.65821 184.43289,-0.19446 167.28453,0.51005 184.61914,-7.58203 10.85235,-5.06605 19.10487,-10.80287 28.62305,-19.89649 14.29689,-13.65915 24.31335,-29.63471 26.73633,-42.64648 0.80129,-4.30826 1.03347,-52.80515 0.82031,-172 L 484.40625,73.503906 481.14453,65.412109 C 476.37488,53.579132 466.96638,39.97324 455.95117,28.980469 441.46311,14.521914 427.68444,6.1668411 411.49805,2.0273438 403.71846,0.03771351 400.92313,0.00390625 241.95703,0.00390625 Z M 364.49023,130.92969 c 4.27256,-0.0872 7.67455,1.11443 9.86915,4.61719 2.37648,5.00805 1.99919,7.88313 -5.84571,44.45898 -7.38338,34.4242 -8.5502,39.89565 -17.49805,82 -3.33118,15.67499 -8.54414,40.20001 -11.58398,54.5 -5.99826,28.21689 -6.58572,30.19581 -10.08594,33.97266 -1.88009,2.02862 -3.29262,2.52734 -7.15625,2.52734 -7.02259,0 -2.86999,2.73555 -58.13281,-38.29492 l -13.35156,-9.91406 -4.14063,3.85351 c -2.27675,2.11975 -10.21841,9.7452 -17.64843,16.94531 -5.79854,5.61912 -9.31831,8.91289 -11.81641,10.8711 -0.624,0.48909 -1.18488,0.89678 -1.70117,1.23437 -1.0326,0.6752 -1.88911,1.07821 -2.72656,1.33203 -0.41901,0.1269 -0.83445,0.21746 -1.26368,0.28516 -0.69183,0.10908 -1.31654,0.18429 -1.91015,0.24219 -0.39888,0.0389 -0.79383,0.0758 -1.15235,0.0898 -0.004,1.4e-4 -0.008,-1.4e-4 -0.0117,0 -0.001,5e-5 -0.003,-5e-5 -0.004,0 -0.43546,0.0166 -0.8337,0.007 -1.21485,-0.0156 -0.0689,-0.004 -0.13973,-0.008 -0.20703,-0.0137 -0.36342,-0.0297 -0.7053,-0.0778 -1.02343,-0.14843 -0.05,-0.0111 -0.0975,-0.025 -0.14649,-0.0371 -0.3081,-0.0764 -0.59917,-0.17176 -0.86914,-0.29102 -0.0155,-0.007 -0.0334,-0.0106 -0.0488,-0.0176 -0.27544,-0.12523 -0.52837,-0.28175 -0.76953,-0.45507 -0.0459,-0.033 -0.0919,-0.0668 -0.13672,-0.10157 -0.23593,-0.18336 -0.46155,-0.38609 -0.66992,-0.62109 -0.0123,-0.0138 -0.023,-0.0309 -0.0352,-0.0449 -0.1975,-0.22732 -0.38266,-0.48282 -0.56054,-0.75977 -0.0333,-0.0518 -0.0689,-0.1007 -0.10156,-0.1543 -0.16579,-0.27183 -0.32315,-0.57555 -0.47657,-0.89453 -0.21127,-0.43943 -0.41571,-0.91184 -0.61328,-1.44531 -0.36912,-0.99671 -0.77212,-2.15507 -1.36523,-3.98047 -0.59311,-1.8254 -1.37629,-4.31941 -2.50586,-7.98828 -2.25915,-7.33773 -5.90374,-19.37557 -12.1836,-40.17578 -1.5775,-5.22499 -3.10999,-10.1655 -4.30859,-13.91406 -0.59967,-1.87542 -1.11548,-3.45114 -1.51172,-4.61719 -0.007,-0.0201 -0.007,-0.0172 -0.0137,-0.0371 -0.38524,-1.13177 -0.66069,-1.88608 -0.7793,-2.11328 -0.10622,-0.20349 -0.44801,-0.46196 -0.90625,-0.74805 v -0.002 c -1.89218,-1.18086 -6.60666,-3.00196 -13.22461,-5.06641 -46.50841,-14.50802 -53.75132,-17.07231 -55.42773,-19.63086 -2.27934,-3.47867 -0.86072,-7.05565 4.1875,-10.56445 3.48144,-2.4198 24.10386,-10.57342 123.99023,-49.03125 11.55001,-4.44695 24.15003,-9.3029 28,-10.79102 3.85002,-1.48807 13.75001,-5.31136 22,-8.49414 8.24999,-3.18274 18.37503,-7.09957 22.5,-8.70507 4.12502,-1.60555 9.75002,-3.75555 12.5,-4.77735 2.75003,-1.02179 12.64998,-4.85136 22,-8.51172 7.65631,-2.21794 14.58875,-4.46018 20.08203,-4.57226 z" transform="matrix(0.26458333,0,0,0.26458333,66.296231,-17.334205)"></path>'+
						'</g></svg>';
		break;
		case "tiktok":
			svgicon = 	'<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">'+
						'<path class="st0" d="M445.02,11.26H72.09c-32.13,0-58.27,26.14-58.27,58.27v372.93c0,32.13,26.14,58.27,58.27,58.27h372.93 c32.13,0,58.27-26.14,58.27-58.27V69.53C503.29,37.4,477.15,11.26,445.02,11.26 M398.47,224.8c-2.67,0.26-5.36,0.4-8.04,0.41 c-29.45,0-56.93-14.84-73.06-39.48v134.45c0,54.88-44.49,99.37-99.37,99.37s-99.37-44.49-99.37-99.37S163.11,220.8,218,220.8l0,0 c2.07,0,4.1,0.19,6.14,0.31v48.97c-2.04-0.24-4.04-0.62-6.14-0.62c-28.01,0-50.72,22.71-50.72,50.72 c0,28.01,22.71,50.72,50.72,50.72c28.02,0,52.76-22.07,52.76-50.09l0.49-228.35h46.85c4.42,42.01,38.29,74.83,80.42,77.91v54.42"/>' +
						'</svg>';
		break;
		case "facebookmessenger":
			svgicon =	'<svg width="127.21577mm" height="126.66241mm" viewBox="0 0 127.21578 126.66241" version="1.1" id="svg5" inkscape:version="1.1 (c68e22c387, 2021-05-23)" sodipodi:docname="messenger.svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">'+
						'<sodipodi:namedview id="namedview7" pagecolor="#ffffff" bordercolor="#999999" borderopacity="1" inkscape:pageshadow="0" inkscape:pageopacity="0" inkscape:pagecheckerboard="0" inkscape:document-units="mm" showgrid="false" fit-margin-top="0" fit-margin-left="0" fit-margin-right="0" fit-margin-bottom="0" inkscape:zoom="0.81386721" inkscape:cx="309.63282" inkscape:cy="288.13054" inkscape:window-width="1600" inkscape:window-height="847" inkscape:window-x="-8" inkscape:window-y="67" inkscape:window-maximized="1" inkscape:current-layer="layer1"></sodipodi:namedview>'+
						'<defs id="defs2"></defs><g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-55.651822,10.921694)">'+
						'<path style="stroke-width:0.264583" d="M 74.846401,115.40296 C 71.052112,114.47788 66.871573,111.938 62.953844,108.17767 59.057594,104.43796 56.665382,100.60186 55.8528,96.790606 55.687901,96.017176 55.619873,80.166558 55.665894,53.241249 l 0.07236,-42.333331 0.626143,-1.8520831 c 2.514787,-7.4385579 8.860452,-14.9724791 15.373697,-18.2524965 3.654791,-1.8405234 0.435661,-1.7235444 47.429876,-1.7235444 41.5274,0 42.4961,0.01147 44.51186,0.527014 6.84729,1.751242 14.25472,8.241723 17.62452,15.4428216 1.6582,3.543494 1.55961,0.5354246 1.56305,47.6924864 0.002,27.352076 -0.0928,43.679044 -0.25874,44.582289 -0.14404,0.783847 -0.79186,2.496738 -1.43962,3.806425 -2.98129,6.02782 -9.13163,11.38786 -15.659,13.64689 l -2.61554,0.90519 -43.25938,0.0465 c -36.430746,0.0391 -43.500779,-0.0124 -44.788716,-0.32641 z M 102.31492,86.435346 c 3.42226,-1.89788 6.30928,-3.396924 6.41561,-3.331207 0.46579,0.287872 4.40537,0.962067 7.11468,1.217565 6.96947,0.657241 14.97435,-0.9671 21.46157,-4.354962 14.09384,-7.360317 21.24881,-21.513876 18.41845,-36.434343 C 153.48191,31.706612 143.957,21.271618 131.67366,17.182779 114.22531,11.374623 94.914032,18.451615 86.080082,33.89143 c -5.200189,9.088794 -5.503759,20.964013 -0.778722,30.462319 1.950278,3.920461 6.399337,9.413316 9.429424,11.641666 l 1.079331,0.79375 0.0062,6.548437 c 0.0034,3.601641 0.06701,6.548437 0.141266,6.548437 0.07426,0 2.935039,-1.552813 6.357289,-3.450693 z M 118.0705,56.789939 c -2.53403,-2.752143 -4.68755,-5.003898 -4.78561,-5.003898 -0.14619,0 -8.19674,4.383606 -16.403932,8.932105 l -1.719792,0.953125 0.906595,-1.040011 C 96.566387,60.059255 101.07279,55.218989 106.082,49.875115 l 9.10765,-9.716135 3.35694,3.498427 c 1.84631,1.924134 3.99491,4.183035 4.77465,5.01978 0.77975,0.836745 1.50349,1.521354 1.60832,1.521354 0.10483,0 4.13573,-2.202656 8.95756,-4.894791 4.82183,-2.692136 8.83209,-4.894792 8.91168,-4.894792 0.0796,0 -2.57676,2.887266 -5.903,6.416146 -3.32625,3.52888 -7.8265,8.338851 -10.00055,10.688827 -2.17406,2.349976 -4.01237,4.274307 -4.08513,4.276294 -0.0728,0.0019 -2.20559,-2.248143 -4.73962,-5.000286 z" id="path2097"></path>'+
						'</g></svg>';
		break;
	}

	return svgicon;
}