var articleNumber = parseInt(localStorage.getItem('selectedArticlePage'))- 1 || 1;
console.log(articleNumber)

// Function to load JSON data using Ajax (jQuery)
function loadJSON(callback) {
    $.ajax({
        url: 'json/article.json',
        dataType: 'json',
        success: function (data) {
            callback(data);
        },
        error: function (xhr, status, error) {
            console.error('Error loading JSON file:', status, error);
        }
    });
}

// Function to display article content and comments
function displayArticleAndComments(jsonData) {
    var articleContent = $('#article-content');
    var commentsDiv = $('#comments');

    // Clear existing content
    articleContent.html('');
    commentsDiv.html('');

    // Extract content from JSON and append it to the page
    var title = jsonData[articleNumber].title;
    var summary = jsonData[articleNumber].summary;
    var image = jsonData[articleNumber].image;
    var page = jsonData[articleNumber].page;
    var category = jsonData[articleNumber].category;
    var subheading = jsonData[articleNumber].subheading;
    var paragraphs = jsonData[articleNumber].paragraphs;
    var heading = jsonData[articleNumber].heading;

    articleContent.append('<h2>' + title + '</h2>');
    articleContent.append('<img src="' + image + '">');
    articleContent.append('<h6>Category: ' + category + '</h6>');
    articleContent.append('<h3>' + subheading + '</h3>');

    for (var i = 0; i < paragraphs.length; i++) {
        articleContent.append('<p>' + paragraphs[i] + '</p>');
    }

    articleContent.append('<h4>' + heading + '</h4>');

    // Find and display comments related to the article title
    var comments = jsonData[articleNumber].comments || [];

    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        commentsDiv.append('<div class="comment"><h4>@' + comment.name + '</h4><p>' + comment.description + '</p></div>');
    }

    // Update the article number in the span
    $('#number').text(articleNumber);
}

// Function to change the article number based on the button clicked
function changeArticle(inc) {
    articleNumber += inc;

    // Ensure the articleNumber stays within the bounds of 0 to 9
    articleNumber = Math.min(9, Math.max(0, articleNumber));

    // Reload the JSON article and comments for the new articleNumber
    loadJSON(displayArticleAndComments);
}

// Load the JSON article and comments for the initial articleNumber
loadJSON(displayArticleAndComments);
