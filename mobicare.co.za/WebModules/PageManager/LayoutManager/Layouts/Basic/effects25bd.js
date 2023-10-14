$(document).ready(function () {

    var w = $(window).width();
    var sh = screen.height;
    var ratio = 0;
    var newh = 0;

    if (ForcedImageContain == 'yes') {

        $('.rv-image > [data-width]').each(function () {

            var imgw = $(this).attr('data-width');
            var imgh = $(this).attr('data-height');

            ratio = w / imgw;
            newh = imgh * ratio;

            if (PageType == "home") {

                if (!($(this).parent().hasClass("image1"))) {

                    if (w > 1101) {

                        newh = newh * 0.1666;

                    } else if (w < 1100) {

                        if (w < 460) {

                            newh = newh;

                        } else {

                            newh = newh * 0.5;

                        }


                    }

                }

            }

            if ((imgh == undefined) || (imgh == '')) {

                newh = 1000;

            }

            var s = $(this).attr("style");

            $(this).attr("style", s + ";height: " + newh + "px !important;background-size: contain; background-position: center; background-repeat: no-repeat;");

        });

        $(window).trigger('resize');

    } else {

        $('.rv-image.image1 > [data-width]').each(function () {

            var imgw = $(this).attr('data-width');
            var imgh = $(this).attr('data-height');

            ratio = w / imgw;
            newh = imgh * ratio;

            if ((imgh == undefined) || (imgh == '')) {

                newh = 1000;

            }

            $(this).css('height', newh);
            $(this).css('background-size', 'cover');
            $(this).css('background-position', '50% 50%');
            $(this).css('background-repeat', 'no-repeat');

        });

        if (PageType == "standard") {

            $('.rv-image.image2 > [data-width]').each(function () {

                var imgw = $(this).attr('data-width');
                var imgh = $(this).attr('data-height');

                ratio = w / imgw;
                newh = imgh * ratio;

                if ((imgh == undefined) || (imgh == '')) {

                    newh = 1000;

                }

                $(this).css('height', newh);
                $(this).css('background-size', 'cover');
                $(this).css('background-position', '50% 50%');
                $(this).css('background-repeat', 'no-repeat');

            });

        }

    }

    var mainBackGroundImg = false;

});

$(window).on("resize", function () {

    var w = $(window).width();

    if (ForcedImageContain == 'yes') {

        $('.rv-image > [data-width]').each(function () {

            var imgw = $(this).attr('data-width');
            var imgh = $(this).attr('data-height');

            ratio = w / imgw;
            newh = imgh * ratio;
            
            if (PageType == "home") {

                if (!($(this).parent().hasClass("image1"))) {

                    if (w > 1101) {

                        newh = newh * 0.1666;

                    } else if (w < 1100) {

                        if (w < 460) {

                            newh = newh;

                        } else {

                            newh = newh * 0.5;

                        }


                    }

                }

            }

            if ((imgh == undefined) || (imgh == '')) {

                newh = 1000;

            }

            var s = $(this).attr("style");

            $(this).attr("style", s + ";height: " + newh + "px !important;background-size: contain; background-position: center; background-repeat: no-repeat;");

        });

    }

});