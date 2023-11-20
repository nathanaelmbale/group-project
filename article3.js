$(document).ready(function () {
    // Load the XML article 
    loadArticleAndComments('article3.xml');
});

//Loads JSON document
function loadJSON(callback) {
    $.ajax({
        url: 'articles.json', 
        dataType: 'json',
        success: function (data) {
            callback(data);
        },
        error: function (xhr, status, error) {
            console.error('Error loading JSON file:', status, error);
        }
    });
}

// Function to load XML data using Ajax (jQuery)
function loadXML(xmlFileName, callback) {
    $.ajax({
        url: xmlFileName,
        type: 'GET',
        dataType: 'xml',
        success: function (data) {
            callback(data);
        },
        error: function (error) {
            console.error('Error loading XML file:', error);
        }
    });
}

// Function to display article content and comments
function displayArticleAndComments(xmlData, jsonData) {
    var articleContent = $('#article-content');

    // Extract content from XML and append it to the page
    var title = $(xmlData).find('title').text();
    var image = $(xmlData).find('image').text();
    var subheading = $(xmlData).find('subheading').text();
    var paragraph1 = $(xmlData).find('paragraph1').text();
    var heading = $(xmlData).find('heading').text();
    var paragraph2 = $(xmlData).find('paragraph2').text();
    var paragraph3 = $(xmlData).find('paragraph3').text();

    articleContent.append('<h2>' + title + '</h2>');
    articleContent.append('<img src="' + image + '">');
    articleContent.append('<h3>' + subheading + '</h3>');
    articleContent.append('<p>' + paragraph1 + '</p>');
    articleContent.append('<h4>' + heading + '</h4>');
    articleContent.append('<p>' + paragraph2 + '</p>');
    articleContent.append('<p>' + paragraph3 + '</p>');

    // Find and display comments related to the article title
    var comments = findCommentsByTitle(jsonData, title);
    var commentsDiv = $('#comments');

    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        commentsDiv.append('<div class="comment"><h4>@' + comment.name + '</h4><p>' + comment.description + '</p></div>');
    }
}

// Function to find comments by matching article title
function findCommentsByTitle(jsonData, title) {
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].title === title) {
            return jsonData[i].comments || [];
        }
    }
    return [];
}

// Function to load article and associated comments
function loadArticleAndComments(xmlFileName) {
    // Load JSON data first
    loadJSON(function (jsonData) {
        // Load XML data and display article content and comments
        loadXML(xmlFileName, function (xmlData) {
            displayArticleAndComments(xmlData, jsonData);
        });
    });
}
