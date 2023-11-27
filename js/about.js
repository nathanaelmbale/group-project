// Add your JavaScript for the About Us page here
$(document).ready(function () {
    // Load XML description
    $.ajax({
        type: "GET",
        url: "xml/about-description.xml", // Change to the correct path
        dataType: "xml",
        success: function (xml) {
            var description = $(xml).find("description").text();
            $("#about-description").html(description);
        },
        error: function () {
            console.error("Failed to load XML description");
        }
    });

    $.ajax({
        type: "GET",
        url: "xml/team-members.xml", // Change to the correct path
        dataType: "xml",
        success: function (xml) {
            displayTeamMembers(xml);
        },
        error: function () {
            console.error("Failed to load XML team members");
        }
    });

});



function displayTeamMembers(xml) {
    var wrapper = $(".wrapper");

    $(xml).find("member").each(function () {
        var card = $('<div class="card"></div>');
        var imgSrc = $(this).find("image").text();
        var name = $(this).find("name").text();
        var role = $(this).find("role").text();

        var img = $('<img src="' + imgSrc + '" alt="' + name + '">');
        var body = $('<div class="body"><h3>' + name + '</h3><p>' + role + '</p></div>');

        card.append(img);
        card.append(body);

        wrapper.append(card);
    });
}

function navigateToExplore() {
    window.location.href = 'explore.html';
}
