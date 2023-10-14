$(document).ready(function () {

    $("body").on("click", ".go-to-top-btn", function () {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

});
