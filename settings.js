var currentFontSize = 16; // Initial font size
var currentFontFamily = 'Arial'; // Initial font family

function changeFontSize(action) {
    if (action === 'increase') {
        currentFontSize += 1;
    } else if (action === 'decrease') {
        currentFontSize -= 1;
    }

    document.body.style.fontSize = currentFontSize + 'px';
    $('#currentFontSize').text('Current Font Size: ' + currentFontSize + 'px');
}

function changeFontFamily(fontFamily) {
    currentFontFamily = fontFamily;
    document.body.style.fontFamily = fontFamily;
    $('#currentFontFamily').text('Current Font Family: ' + currentFontFamily);
}
