// Fetch the username from local storage and update the greeting
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (loggedInUser) {
    $('#greeting').text('Welcome, ' + loggedInUser.username + ' 👋🏿');
}

function navigateToExplore() {
    window.location.href = 'explore.html';
}
