// Pre-defined users (including Admin)
let users = [
    { username: 'admin', password: 'admin', role: 'admin', profile: {} },
    { username: 'user1', password: 'user1pass', role: 'user', profile: {} },
    { username: 'dispatcher1', password: 'dispatcher1pass', role: 'dispatcher', profile: {} }
];

let currentUser = null;

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        currentUser = user;
        loadDashboard(user.role);
    } else {
        alert('Invalid credentials!');
    }
});

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;

    // Prevent signing up as Admin via the public form
    if (role === 'admin') {
        alert('You cannot sign up as Admin.');
        return;
    }

    // Check if username is already taken
    if (users.find(user => user.username === username)) {
        alert('Username already taken!');
        return;
    }

    // Add the new user to the users array
    users.push({ username, password, role, profile: {} });
    alert('User registered successfully! You can now log in.');
    switchToLoginForm();
});

// Show My Profile form
document.getElementById('myProfileButton').addEventListener('click', function() {
    document.querySelector('.content').classList.add('hidden');  // Hide the dashboard content
    document.getElementById('myProfile').classList.remove('hidden');

    // Check if the user is Admin; enable or disable fields accordingly
    if (currentUser.role === 'admin') {
        enableProfileEdit(true);  // Admin can edit
    } else {
        enableProfileEdit(false);  // Disable profile edits for non-admins
        alert('You can only view your profile. Editing is restricted to Admin users.');
    }

    // Load current user's profile data into the form (if any)
    loadProfileData();
});

// Handle "Back to Dashboard" button click
document.getElementById('backToDashboardButton').addEventListener('click', function() {
    // Hide the profile form and show the dashboard content again
    document.getElementById('myProfile').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
});

// Function to enable or disable profile editing
function enableProfileEdit(canEdit) {
    const profileFields = document.querySelectorAll('#profileForm input');
    profileFields.forEach(field => field.disabled = !canEdit);  // Disable all fields if not allowed
}

// Handle profile form submission (only Admins can submit)
document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    if (currentUser.role !== 'admin') {
        alert('Only Admins can edit profile information.');
        return;
    }

    // Capture profile information if Admin
    const profileData = {
        firstName: document.getElementById('firstName').value,
        middleName: document.getElementById('middleName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        address: document.getElementById('address').value,
        contactNumber: document.getElementById('contactNumber').value,
        validID: document.getElementById('validID').files[0],  // Store the file (not displayed)
        selfie: document.getElementById('selfie').files[0]     // Store the file (not displayed)
    };

    // Update current user's profile
    currentUser.profile = profileData;
    alert('Profile saved successfully!');
    
    // Hide profile form and show dashboard content again
    document.getElementById('myProfile').classList.add('hidden');
    document.querySelector('.content').classList.remove('hidden');
});

// Load profile data into the form (for viewing)
function loadProfileData() {
    if (!currentUser.profile) return;  // If there's no profile data, skip

    document.getElementById('firstName').value = currentUser.profile.firstName || '';
    document.getElementById('middleName').value = currentUser.profile.middleName || '';
    document.getElementById('lastName').value = currentUser.profile.lastName || '';
    document.getElementById('age').value = currentUser.profile.age || '';
    document.getElementById('address').value = currentUser.profile.address || '';
    document.getElementById('contactNumber').value = currentUser.profile.contactNumber || '';
    // Files (validID and selfie) won't be displayed because of security restrictions.
}

// Switch between dashboard and login/signup forms
function loadDashboard(role) {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');

    if (role === 'admin') {
        document.getElementById('addIncidentButton').classList.remove('hidden');
        alert('Welcome, Admin! You have full access to edit data.');
    } else if (role === 'dispatcher') {
        document.getElementById('addIncidentButton').classList.add('hidden');
        alert('Welcome, Dispatcher! You can receive alerts.');
    } else {
        document.getElementById('addIncidentButton').classList.add('hidden');
        alert('Welcome, User! You can view notifications.');
    }

    loadIncidentData();
}

// Switch to login form
function switchToLoginForm() {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

// Switch to signup form
function switchToSignupForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
}

// Add event listeners for switching between login and signup forms
document.getElementById('show-signup-form').addEventListener('click', switchToSignupForm);
document.getElementById('show-login-form').addEventListener('click', switchToLoginForm);

// Placeholder function for loading incidents
function loadIncidentData() {
    // Example: Populating the incident table dynamically with data
    const incidentData = [
        { type: 'Accident', status: 'Active', eta: '10 mins', location: 'Location A' },
        { type: 'Fire', status: 'Resolved', eta: 'N/A', location: 'Location B' },
    ];

    const tbody = document.getElementById('incidentTable').getElementsByTagName('tbody')[0];
    incidentData.forEach(incident => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${incident.type}</td>
            <td>${incident.status}</td>
            <td>${incident.eta}</td>
            <td>${incident.location}</td>
            <td><button>View</button></td>
        `;
    });
}

// Handle logout button click
document.getElementById('logout').addEventListener('click', function() {
    // Clear the current user
    currentUser = null;

    // Hide the dashboard and profile forms
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('myProfile').classList.add('hidden');
    
    // Show the login form again
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden'); // Hide signup form
    
    alert('You have logged out successfully!');
});
