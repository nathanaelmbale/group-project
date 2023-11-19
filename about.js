// Add your JavaScript for the About Us page here
$(document).ready(function () {
    // Load XML description
    $.ajax({
        type: "GET",
        url: "about-description.xml", // Change to the correct path
        dataType: "xml",
        success: function (xml) {
            var description = $(xml).find("description").text();
            $("#about-description").html(description);
        },
        error: function () {
            console.error("Failed to load XML description");
        }
    });
});

function navigateToExplore() {
    window.location.href = 'explore.html';
}
