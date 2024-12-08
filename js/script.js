// Handling the login functionality
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission behavior

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Basic validation
    if (!username || !password || !role) {
        alert("Please fill in all required fields.");
        return;
    }

    // Simulate login logic (replace with actual authentication logic)
    if (validateCredentials(username, password, role)) {
        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully!`);

        // Redirect user based on their role
        if (role === 'admin') {
            window.location.href = 'admin.html'; // Admin Dashboard
        } else if (role === 'dispatcher') {
            window.location.href = 'dispatch.html'; // Dispatcher Dashboard
        } else if (role === 'user') {
            window.location.href = 'user.html'; // User Homepage
        }
    } else {
        alert("Invalid credentials, please try again.");
    }
});

// Simulate user credentials validation (replace with actual logic)
function validateCredentials(username, password, role) {
    // Here you would usually check the credentials against a database
    // For demo purposes, we're using static validation (you can replace this logic)
    
    const validUsers = {
        admin: { username: 'admin', password: 'admin123' },
        dispatcher: { username: 'dispatcher', password: 'dispatcher123' },
        user: { username: 'user', password: 'user123' },
    };

    if (validUsers[role] && validUsers[role].username === username && validUsers[role].password === password) {
        return true;
    }
    return false;
}

// Handling the logout functionality
document.getElementById('logout-btn')?.addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the default link behavior
    alert('Logging out...');
    // You can add more logic to clear session data or redirect to login page
    window.location.href = 'index.html';
});

// Additional logic can be added for handling redirects for each role and form validation
