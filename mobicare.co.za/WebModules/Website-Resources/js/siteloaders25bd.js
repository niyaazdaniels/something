var allCodes = [];
$("document").ready(function(){
	RunKenesisLoaders();
});
var allCodes = [];
function RunKenesisLoaders(TheDiv){
	TheDiv = (typeof TheDiv == "undefined")?"body":TheDiv;
	breakThis = false;
	//KENESIS TABLES
	KNTableCounter = 0;

	while($(TheDiv).html().indexOf("[KNTB-") != -1){
		if (breakThis)break;

		themainIndex = $(TheDiv).html().indexOf("[KNTB-");
		WholeCode = $(TheDiv).html().substr(themainIndex,30);
		WholeCode = WholeCode.substr(0,WholeCode.indexOf("]")+1);

		TheElementAmount = $(TheDiv).find("*:contains('"+WholeCode+"')").length;
		TheElement =  $(TheDiv).find("*:contains('"+WholeCode+"')")[TheElementAmount-1];

		$.ajax({
			url:"/webmodules/TableBuilder/Handlers/GetTable.asp",
			method:"POST",
			async:false,
			data:{c:WholeCode,count:KNTableCounter},
			success:function(data){
				if (typeof $(TheElement).html() != "undefined"){
					$(TheElement).html($(TheElement).html().replace(WholeCode,data));
				}else{
					WholeCode = WholeCode.replace("[","").replace("]","");
					breakThis = true;
				};
				WholeCode = WholeCode.replace("[","").replace("]","");

				allCodes.push(WholeCode);
				if (data != "" && $.isFunction($.fn.resTables)){
					$(TheDiv + " #"+WholeCode).each(function(){
						if ($(this).css("display") == "none")$(this).slideToggle(function(){});
					});
				};
			}
		});

		KNTableCounter++;
	}

	if (KNTableCounter > 0){

		if ($.isFunction($.fn.resTables)){$(".ContentKenesisTable:last").resTables();}

		if (typeof ignoretables != "undefined"){
			if(!ignoretables){
				DelteExTabs();
			}else{
				$(".restables-clone").css("display","none");
			}
		}else{
			DelteExTabs();
		}

		function DelteExTabs(){
			setTimeout(function(){
				$(".restables-clone").css("display","none");
				$.each(allCodes,function(){
					while ($("table[id='"+WholeCode+"'].restables-origin").length > 1){

						$("table.restables-origin[id='"+WholeCode+"']:first").parent().remove();
					}
				})
			},100);
		}

		$(window).resize(function(){
			ResizeKTables();
		});

		function ResizeKTables(){
			$(".ContentKenesisTable.restables-origin").each(function(){
				TheID = this.id;
				if ($(this).width() > $(this).parent().width()){
					$("#"+TheID+".restables-clone").css("display","table");
					$("#"+TheID+".restables-origin").css("display","none");
				}else{
					$("#"+TheID+".restables-clone").css("display","none");
					$("#"+TheID+".restables-origin").css("display","table");
				}
			});
		}

	}

	//KENESIS PDF
	KNPDFCounter = 0;
	while($(TheDiv).html().indexOf("[KNPDF-") != -1){

		themainIndex = $(TheDiv).html().indexOf("[KNPDF-");
		WholeCode = $(TheDiv).html().substr(themainIndex,30);
		WholeCode = WholeCode.substr(0,WholeCode.indexOf("]")+1)

		var t = (WholeCode.indexOf("]") - 2);
		var id = WholeCode.substring(9, t);

		TheElementAmount = $("*:contains('"+WholeCode+"')").length;
		TheElement =  $("*:contains('"+WholeCode+"')")[TheElementAmount-1];

		$(TheElement).html($(TheElement).html().replace(WholeCode, "<div id='" + id + "' class='pdf-view-ctn-auto'><i class='fa fa-file-pdf-o'></i></div>"));

		KNPDFCounter++;
	};
	if (KNPDFCounter>0){
		$("body").off("click", ".pdf-view-ctn-auto").on("click", ".pdf-view-ctn-auto", function () {
			var id = $(this).attr("id");
			$.ajax({
				url: "/webmodules/website-resources/asp/loaders/loadpdf.asp",
				type: "post",
				data: { "id": id },
				success: function (data) {
					window.open(data);
				}
			});
		});
	};

	//KENESIS MINI CALCULATOR
	MNCLTableCounter = 0;

	while($(TheDiv).html().indexOf("[MNCL-") != -1){
		if (breakThis)break;

		themainIndex = $(TheDiv).html().indexOf("[MNCL-");
		WholeCode = $(TheDiv).html().substr(themainIndex,30);
		WholeCode = WholeCode.substr(0,WholeCode.indexOf("]")+1);

		TheElementAmount = $(TheDiv).find("*:contains('"+WholeCode+"')").length;
		TheElement =  $(TheDiv).find("*:contains('"+WholeCode+"')")[TheElementAmount-1];

		$.ajax({
			url:"/webmodules/functionbuilder/onsite/GetCalculator.asp",
			method:"POST",
			async:false,
			data:{c:WholeCode,count:MNCLTableCounter},
			success:function(data){
				if (typeof $(TheElement).html() != "undefined"){
					$(TheElement).html($(TheElement).html().replace(WholeCode,data));
				}else{
					WholeCode = WholeCode.replace("[","").replace("]","");
					breakThis = true;
				};
				WholeCode = WholeCode.replace("[","").replace("]","");

				allCodes.push(WholeCode);
				if (data != "" && $.isFunction($.fn.resTables)){
					$(TheDiv + " #"+WholeCode).each(function(){
						if ($(this).css("display") == "none")$(this).slideToggle(function(){});
					});
				};
			}
		});

		MNCLTableCounter++;
	}

	//KENESIS SOCIAL MEDIA ICONS
	SocialMediaCounter = 0;

	while($(TheDiv).html().indexOf("[SM]") != -1){
		if (breakThis)break;

		themainIndex = $(TheDiv).html().indexOf("[SM]");
		WholeCode = $(TheDiv).html().substr(themainIndex,30);
		WholeCode = WholeCode.substr(0,WholeCode.indexOf("]")+1);

		TheElementAmount = $(TheDiv).find("*:contains('"+WholeCode+"')").length;
		TheElement =  $(TheDiv).find("*:contains('"+WholeCode+"')")[TheElementAmount-1];

		$.ajax({
			url:"/WebModules/Components/SocialMedia/SCAJAX.asp",
			method:"GET",
			async:false,
			success:function(data){
				$(TheElement).addClass("sc-inline").html(data+"<style>.sc-inline .sc-ctn {width:100%;position:relative;margin-left: 0px;}.sc-inline .sc-ctn.left a:hover {margin-left:0px}.sc-inline .sc-ctn .basic-link {margin-top: 0px;float:none}</style>");
			}
		});

		SocialMediaCounter++;
	}
}