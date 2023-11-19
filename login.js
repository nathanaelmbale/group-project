// Function to load JSON data using Ajax (jQuery)
function loadJSON(callback) {
    $.ajax({
        url: 'users.json',
        dataType: 'json',
        success: function (data) {
            callback(data);
        },
        error: function (xhr, status, error) {
            console.error('Error loading JSON file:', status, error);
        }
    });
}



function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Load user data from JSON file
    loadJSON(function (users) {
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Remove existing loggedInUser
            localStorage.removeItem('loggedInUser');
            // Save the logged-in user to local storage
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            // Redirect to home.html
            window.location.href = 'home.html';
        } else {
            alert('Invalid username or password.');
        }
    });
}

