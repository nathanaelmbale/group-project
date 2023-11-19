$(document).ready(function () {
    // Initial load to display all articles
    filterArticles('All');

    // Click event handler for filter buttons
    $('#filter-buttons button').click(function () {
        var category = $(this).text(); // Get the category from the button text
        filterArticles(category);
        
        // Remove 'active' class from all buttons
        $('#filter-buttons button').removeClass('active');
        
        // Add 'active' class to the clicked button
        $(this).addClass('active');
    });
});

function filterArticles(category) {
    $.ajax({
        url: 'articles.json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            displayArticles(filterByCategory(data, category));
        },
        error: function (error) {
            console.error('Error fetching articles:', error);
        }
    });
}

function filterByCategory(articles, category) {
    if (category === 'All') {
        return articles;
    } else {
        return articles.filter(function (article) {
            return article.category.toLowerCase() === category.toLowerCase();
        });
    }
}

function displayArticles(articles) {
    // Update this function to display the filtered articles as needed
    console.log(articles);
}


function displayArticles(articles) {
    var articleContainer = $('#article-container');
    articleContainer.empty();

    articles.forEach(function (article) {
        var card = $('<div class="card"></div>');
        var image = $('<img src="' + article.image + '">');
        var body = $('<div class="body"><h3>' + article.title + '</h3><p>' + article.summary + '</p></div>');

        // Add click event to navigate to the article page
        card.on('click', function () {
            window.location.href = article.page;
        });

        card.append(image);
        card.append(body);

        // Add hover effect to show cursor pointer
        card.css('cursor', 'pointer');
        card.hover(
            function () {
                $(this).css('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.1)');
            },
            function () {
                $(this).css('box-shadow', 'none');
            }
        );

        articleContainer.append(card);
    });
}



var asyncRequest;

function getImages(url) {
    try {
        asyncRequest = new XMLHttpRequest();
        asyncRequest.addEventListener("readystatechange", processResponse, false);
        asyncRequest.open("GET", url, true);
        asyncRequest.send(null);
    } catch (exception) {
        alert('Request Failed');
    }
}

function processResponse() {
    if (asyncRequest.readyState == 4 && asyncRequest.status == 200 && asyncRequest.responseXML) {
        clearImages();

        var covers = asyncRequest.responseXML.getElementsByTagName("article");
        var output = document.getElementById("covers");
        var imagesUL = document.createElement("ul");

        for (var i = 0; i < covers.length; ++i) {
            var cover = covers.item(i);

            var image = cover.getElementsByTagName("image").item(0).firstChild.nodeValue;
            var title = cover.getElementsByTagName("title").item(0).firstChild.nodeValue;
            var subheading = cover.getElementsByTagName("subheading").item(0).firstChild.nodeValue;
            var paragraph1 = cover.getElementsByTagName("paragraph1").item(0).firstChild.nodeValue;
            var paragraph2 = cover.getElementsByTagName("paragraph2").item(0).firstChild.nodeValue;
            var paragraph3 = cover.getElementsByTagName("paragraph3").item(0).firstChild.nodeValue;
            
            var heading = cover.getElementsByTagName("heading").item(0).firstChild.nodeValue;
            
            var imageLI = document.createElement("div");
            var imageTag = document.createElement("img");
            var titleTag = document.createElement("h2");

            var headingTag = document.createElement("h3");            
            var subheadingTag = document.createElement("h3");
            var paragraph1Tag = document.createElement("p");
            var paragraph2Tag = document.createElement("p");
            var paragraph3Tag = document.createElement("p");

            imageTag.setAttribute("src", image);
            titleTag.innerHTML = title;
            headingTag.innerHTML = heading;
            subheadingTag.innerHTML = subheading;
            paragraph1Tag.innerHTML = paragraph1;
            paragraph2Tag.innerHTML = paragraph2;
            paragraph3Tag.innerHTML = paragraph3;

            console.log("Title tag:" + titleTag)
            imageLI.appendChild(titleTag);
            imageLI.appendChild(imageTag);

            imageLI.appendChild(headingTag);
            imageLI.appendChild(subheadingTag);
            imageLI.appendChild(paragraph1Tag);
            imageLI.appendChild(paragraph2Tag);
            imageLI.appendChild(paragraph3Tag);

            imagesUL.appendChild(imageLI);
        }

        output.appendChild(imagesUL);
    }
}

function clearImages() {
    document.getElementById("covers").innerHTML = "";
}

function registerListeners() {
    document.getElementById("all").addEventListener("click", function () { getImages("all.xml"); }, false);
    document.getElementById("business").addEventListener("click", function () { getImages("business.xml"); }, false);
    document.getElementById("romance").addEventListener("click", function () { getImages("romance.xml"); }, false);
    document.getElementById("sports").addEventListener("click", function () { getImages("sports.xml"); }, false);
}

window.addEventListener("load", registerListeners, false);
