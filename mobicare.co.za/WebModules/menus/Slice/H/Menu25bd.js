var TopNavPosition = "top";

$(document).ready(function () {

    var logo = $('.logo').html();

    $('.topnav .internal').prepend('<div class="dummy-div logo" style="position:relative;float:left;">' + logo + '</div>');

});