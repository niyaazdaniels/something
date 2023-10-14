$(document).ready(function(){
	var zz = Math.floor(Math.random() * 20) + 1;

	$("body").on("change",".thedepartselector",function(){
		$(".thedepartitem").css("display","none");
		$(".thedepartitem[data-c='"+$(this).val()+"']").fadeIn();
	})
	
	$('.cap-img').css('background-image', 'url("/webmodules/contactformlite/Captchaimages/'+zz+'.jpg")');

	var codez = ['', 'rt78', '4e8g', 'f1xx', 'r2d8', 'j9kz', 'p6g8', 'z2h3', 'l8l7', 'p4u5', '2m78', '3z7x', '4ta8', 'g2r3', '4b7v', '9tt8', 'tntz', 'g3k8', 'kd7f', 'ur7l', '5kk3'];
	var zztop = zz--;

	$('#captcha').on('input', function (e) {
		var test = $(this).val();
		if (codez[zztop].toLowerCase() == test.toLowerCase()) {
			$('.cap-img,#captcha,#formsubmitbtn,#CodeHeading').slideToggle();
			$(this).removeClass("Validate");
		}else{
			 $(this).addClass("Validate");
		}
	});

	//$("#PreviewForm textarea").css("background",$("#PreviewForm input").css("background"));
	$("#PreviewForm textarea").attr("style","background-color:"+$("#PreviewForm input").css("background-color")+"!important");
	$("#PreviewForm textarea").attr("style",$("#PreviewForm textarea").attr("style")+";color:"+$("#PreviewForm input").css("color")+"!important");

	Submitting = false;
    $("form").submit(function(e){
        e.preventDefault();
    });

	$("#formsubmitbtn").on("click",function(e){
		if (!Submitting){
			if ($("#formsubmitbtn").data("n") != undefined){
				e.preventDefault();
			}
			if ($("#formsubmitbtn").data("n") == undefined && $("#cflname").val() != "" && $("#cflemail").val() != "" && $("#cflmsg").val() != "" && isValidEmailAddress($("#cflemail").val())){
				Submitting = true;
				$("#formsubmitbtn").after("&nbsp;<i id='fload' class='fa fa-spinner fa-spin fa-fw'></i>");
				$("#formsubmitbtn").attr("disabled","disabled");
				$.post("/webmodules/contactformlite/handlers/submitform.asp",{
					CFLName:$("#cflname").val(),
					CFLEmail:$("#cflemail").val(),
					CFLNumber:$("#cflnum").val(),
					CFLComp:$("#cflcomp").val(),
					CFLSubject:$("#cflsubject").val(),
					CFLMsg:$("#cflmsg").val(),
					CFLD:$("#cfld").val(),
					ImageID:$("#ImageID").val(),
					ImageCode:$("#ImageCode").val(),
					ImageHash:$("#ImageHash").val(),
					refmsg:(($("#refmsg").length > 0)?$("#refmsg").val():""),
					coupcode:(($("#coupcode").length > 0)?$("#coupcode").val():"")
				},function(data,status){
					if (status == "success"){
						if (data != "Invalid Message Text" && data != "Invalid Request"){
							$("#fload").remove();
							$("#PreviewForm").html("<div style='white-space: normal;'><h1>"+data+"</h1></div>");
							DialogTitle = "Error"
							DialogIcon = "icon-alert"
							if (data.indexOf("Thank") != -1){
								$("#formsubmitbtn").remove();							
								DialogIcon = "ui-icon-check"
								DialogTitle = "Thank You"
							}else{
								$("#formsubmitbtn").removeAttr("disabled");
							}
							
							ChangeUrl(location.pathname.substring(location.pathname.lastIndexOf("/") + 1), '?ContactForm=Submitted');							
							if (typeof ga  == 'function'){
								ga(GlobalGoogleTag+'.send', 'pageview');
								ga(GlobalGoogleTag+'.send', 'event', { eventCategory: 'Kenesis', eventAction: 'Contact Form Lite', eventLabel: 'Contact Form Submission'});
							}
							KaTf(0,'Contact Form Lite - Form Submission '+$(this).data("num"),'Click','Onsite');
							$("#dialog-submit").attr("title",DialogTitle);
							$("#dialog-submit > p").html("<span class='ui-icon "+DialogIcon+"' style='float: left; margin: 0 7px 20px 0;'></span>"+data);
							$("#dialog-submit").dialog({
								resizable: false,
								height: 205,
								closeText: "",
								position:{
								 my: "center",
								 at: "center",
								 of: "#PreviewBlock",
								},
								 zIndex: 10000,
								width: 300,
								modal: true,
								buttons: {
									"Ok": function () {
										$(this).dialog("close");
										$("#cflname,#cflemail,#cflmsg").removeClass("Validate");
										$("#cflname,#cflemail,#cflmsg,#cflnum,#cflsubject,#cflcomp").val("");
									}
								}
							});	
							ScrollToClass($("#PreviewBlock").parents(".rv-module").attr("class"))
						}else
						{
							DialogIcon = "icon-alert"
							$("#dialog-submit").attr("title",data);
							$("#dialog-submit > p").html("<span class='ui-icon "+DialogIcon+"' style='float: left; margin: 0 7px 20px 0;'></span>"+data);
							$("#dialog-submit").dialog({
								resizable: false,
								height: 205,
								closeText: "",
								position:{
								 my: "center",
								 at: "center",
								 of: "#PreviewBlock",
								},
								 zIndex: 10000,
								width: 300,
								modal: true,
								buttons: {
									"Ok": function () {
										$(this).dialog("close");
										$("#fload").remove();
										$("#formsubmitbtn").removeAttr("disabled");
									}
								}
							});	
							ScrollToClass($("#PreviewBlock").parents(".rv-module").attr("class"))				
						}							
					}
				})				
			}else{		
				if($("#dialog-submit").css("display") == "none"){
					$("#dialog-submit").attr("title","Required Info");
					$("#dialog-submit > p").html("<span class='ui-icon icon-alert' style='float: left; margin: 0 7px 20px 0;'></span>Please complete all required fields and make sure they are correct.");
					$("#cflname,#cflemail,#cflmsg").removeClass("Validate");
					$("#dialog-submit").dialog({
						resizable: false,
						height: 205,
						closeText: "hide",
						position:{
						 my: "center",
						 at: "center",
						 of: "#PreviewBlock",
						},
						width: 300,
						modal: true,
						buttons: {
							"Ok": function () {
								$(this).dialog("close");
								if ($("#cflname").val() == ""){
									$("#cflname").addClass("Validate");
									$("#cflname")[0].focus;
								}
								if ($("#cflemail").val() == "" || !isValidEmailAddress($("#cflemail").val())){
									$("#cflemail").addClass("Validate")
									$("#cflemail")[0].focus;
								}
								if ($("#cflmsg").val() == ""){
									$("#cflmsg").addClass("Validate")
									$("#cflmsg")[0].focus;
								}
							}
						}
					});
				}
			}
		}
	})
})

function isValidEmailAddress(emailAddress) {
    var emailReg = new RegExp(/^\w[\w\-\.]+@\w[\w\-\.]+\.[a-z]+$/i);
    if( !emailReg.test( emailAddress ) ) {
        return false;
    } else {
        return true;
    }
}

function ChangeUrl(title, url) {
	if (typeof (history.pushState) != "undefined") {
		var obj = { Title: title, Url: url };
		history.pushState(obj, obj.Title, obj.Url);
	} else {
		alert("Browser does not support HTML5.");
	}
}	

function ScrollToClass(clas){
	$("html,body").animate({scrollTop:$("."+clas).offset().top-80},'slow');
}