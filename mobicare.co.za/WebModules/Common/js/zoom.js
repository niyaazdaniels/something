/*
 Author: Jafar Akhondali
 Release year: 2016
 Title:	Light-Zoom JQuery plugin that use pure css to zoom on images, this enables you to zoom without loading bigger image and zoom even on gif images !
 https://github.com/JafarAkhondali/lightzoom
 */
$.fn.lightzoom = function (a) {
    a = $.extend({
        zoomPower: 3,
        glassSize: 175
    }, a);
    var l = a.glassSize / 2,
        m = a.glassSize / 4,
        n = a.zoomPower;
    $("body").append('<div id="glass"></div>');
    $("html > head").append($("<style> #glass{width: " + a.glassSize + "px; height: " + a.glassSize + "px;}</style>"));
    var k;
    $("#glass").mousemove(function (a) {
        var c = this.targ;
        a.target = c;
        k(a, c)
    });
    this.mousemove(function (a) {
        k(a, this)
    });
    k = function (a, c) {

        if ($("#glass").length > 0) {

            document.getElementById("glass").targ = c;
            var d = a.pageX,
                e = a.pageY,
                g = c.offsetWidth,
                h = c.offsetHeight,
                b = $(c).offset(),
                f = b.left,
                b = b.top;
            d > f && d < f + g && b < e && b + h > e ? (offsetXfixer = (d - f - g / 2) / (g / 2) * m, offsetYfixer = (e - b - h / 2) / (h / 2) * m, f = (d - f + offsetXfixer) / g * 100, b = (e - b + offsetYfixer) / h * 100, e -= l, d -= l, $("#glass").css({
                top: e,
                left: d,
                "background-image": " url('" + $(c).attr('src') + "')",
                "background-size": g * n + "px " + h * n + "px",
                "background-position": f + "% " + b + "%",
                display: "inline-block"
            }), $("body").css("cursor", "default")) : ($("#glass").css("display", "default"), $("body").css("cursor", "default"))

        }
        
    };
    return this
};