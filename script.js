document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize UI elements
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const resetSection = document.getElementById('reset-section');
    const appContent = document.getElementById('app-content');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const forgotPassword = document.getElementById('forgot-password');
    const resetBack = document.getElementById('reset-back');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const resetForm = document.getElementById('reset-form');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Show register form
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
        resetSection.style.display = 'none';
        document.getElementById('register-error').style.display = 'none';
    });
    
    // Show login form
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
        resetSection.style.display = 'none';
        document.getElementById('login-error').style.display = 'none';
    });
    
    // Show password reset form
    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        loginSection.style.display = 'none';
        registerSection.style.display = 'none';
        resetSection.style.display = 'block';
        document.getElementById('reset-error').style.display = 'none';
    });
    
    // Back to login from reset
    resetBack.addEventListener('click', function(e) {
        e.preventDefault();
        resetSection.style.display = 'none';
        loginSection.style.display = 'block';
        document.getElementById('reset-success').style.display = 'none';
    });
    
    // Login handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginBtn = loginForm.querySelector('button[type="submit"]');
        const errorDisplay = document.getElementById('login-error');
        
        // Show loading state
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<i class="fas fa-spinner loading-spinner"></i> Logging in...';
        errorDisplay.style.display = 'none';
        
        firebaseAuth.signInWithEmailAndPassword(email, password)
            .then(() => {
                // Successfully logged in
                loginSection.style.display = 'none';
                appContent.style.display = 'block';
            })
            .catch(error => {
                // Reset button state
                loginBtn.disabled = false;
                loginBtn.innerHTML = 'Login';
                
                // Show error
                errorDisplay.textContent = getAuthErrorMessage(error.code);
                errorDisplay.style.display = 'block';
            });
    });
    
    // Register handler
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-password-confirm').value;
        const registerBtn = registerForm.querySelector('button[type="submit"]');
        const errorDisplay = document.getElementById('register-error');
        
        // Validate passwords match
        if (password !== confirmPassword) {
            errorDisplay.textContent = "Passwords don't match";
            errorDisplay.style.display = 'block';
            return;
        }
        
        // Show loading state
        registerBtn.disabled = true;
        registerBtn.innerHTML = '<i class="fas fa-spinner loading-spinner"></i> Registering...';
        errorDisplay.style.display = 'none';
        
        firebaseAuth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                // Registration successful
                registerSection.style.display = 'none';
                loginSection.style.display = 'block';
                document.getElementById('email').value = email;
                document.getElementById('login-error').style.display = 'none';
            })
            .catch(error => {
                // Reset button state
                registerBtn.disabled = false;
                registerBtn.innerHTML = 'Register';
                
                // Show error
                errorDisplay.textContent = getAuthErrorMessage(error.code);
                errorDisplay.style.display = 'block';
            });
    });
    
    // Password reset handler
    resetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('reset-email').value;
        const resetBtn = resetForm.querySelector('button[type="submit"]');
        const errorDisplay = document.getElementById('reset-error');
        const successDisplay = document.getElementById('reset-success');
        
        // Show loading state
        resetBtn.disabled = true;
        resetBtn.innerHTML = '<i class="fas fa-spinner loading-spinner"></i> Sending...';
        errorDisplay.style.display = 'none';
        
        firebaseAuth.sendPasswordResetEmail(email)
            .then(() => {
                // Show success message
                successDisplay.style.display = 'block';
                resetBtn.disabled = false;
                resetBtn.innerHTML = 'Send Reset Link';
                resetForm.reset();
            })
            .catch(error => {
                // Reset button state
                resetBtn.disabled = false;
                resetBtn.innerHTML = 'Send Reset Link';
                
                // Show error
                errorDisplay.textContent = getAuthErrorMessage(error.code);
                errorDisplay.style.display = 'block';
            });
    });
    
    // Logout handler
    logoutBtn.addEventListener('click', function() {
        firebaseAuth.signOut()
            .catch(error => {
                console.error('Logout failed:', error);
            });
    });
    
    // Check if user is already logged in
    firebaseAuth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            loginSection.style.display = 'none';
            registerSection.style.display = 'none';
            resetSection.style.display = 'none';
            appContent.style.display = 'block';
            initApp();
        } else {
            // No user is signed in
            loginSection.style.display = 'block';
            registerSection.style.display = 'none';
            resetSection.style.display = 'none';
            appContent.style.display = 'none';
        }
    });
    
    // Helper function to translate Firebase error codes
    function getAuthErrorMessage(errorCode) {
        const messages = {
            'auth/invalid-email': 'Invalid email address',
            'auth/user-disabled': 'Account disabled',
            'auth/user-not-found': 'Account not found',
            'auth/wrong-password': 'Incorrect password',
            'auth/email-already-in-use': 'Email already in use',
            'auth/operation-not-allowed': 'Operation not allowed',
            'auth/weak-password': 'Password should be at least 6 characters',
            'auth/too-many-requests': 'Too many attempts. Try again later',
            'auth/network-request-failed': 'Network error. Check your connection'
        };
        return messages[errorCode] || 'An error occurred. Please try again.';
    }
    
    function initApp() {
        // [Rest of your existing app initialization code remains the same]
        // This includes all the tab functionality, form handlers, etc.
        // from the previous implementation
    }
});

// [All your other existing functions remain the same]
// createItemRow(), loadDashboardData(), loadActiveJobs(), etc.