$(document).ready(function () {
    // Replace 'article1.xml' with the respective XML file for each article
    loadArticle('article3.xml');
});

function loadArticle(xmlFileName) {
    $.ajax({
        url: xmlFileName,
        type: 'GET',
        dataType: 'xml',
        success: function (data) {
            displayArticle(data);
        },
        error: function (error) {
            console.error('Error loading article:', error);
        }
    });
}

function displayArticle(xmlData) {
    var articleContent = $('#article-content');
    
    // Extract content from XML and append it to the page
    var title = $(xmlData).find('title').text();
    var image = $(xmlData).find('image').text();
    var subheading = $(xmlData).find('subheading').text();
    var paragraph1 = $(xmlData).find('paragraph1').text();
    var heading = $(xmlData).find('heading').text();
    var paragraph2 = $(xmlData).find('paragraph2').text();
    var paragraph3 = $(xmlData).find('paragraph3').text();

    // Append the content to the articleContent section
    articleContent.append('<h2>' + title + '</h2>');
    articleContent.append('<img src="' + image + '">');
    articleContent.append('<h3>' + subheading + '</h3>');
    articleContent.append('<p>' + paragraph1 + '</p>');
    articleContent.append('<h4>' + heading + '</h4>');
    articleContent.append('<p>' + paragraph2 + '</p>');
    articleContent.append('<p>' + paragraph3 + '</p>');
}
