// ============================================
// LOGIN PAGE SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Password toggle
    initPasswordToggle();
    
    // Login form submission
    initLoginForm();
});

// Update Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking overlay
        if (overlay) {
            overlay.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        }
        
        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Immediately hide overlay to prevent flash
                if (overlay) {
                    overlay.style.display = 'none';
                }
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// Password Toggle
function initPasswordToggle() {
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    if (passwordToggle && passwordInput) {
        const eyeOpen = passwordToggle.querySelector('.eye-open');
        const eyeClosed = passwordToggle.querySelector('.eye-closed');
        
        passwordToggle.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeOpen.style.display = 'none';
                eyeClosed.style.display = 'block';
            } else {
                passwordInput.type = 'password';
                eyeOpen.style.display = 'block';
                eyeClosed.style.display = 'none';
            }
        });
    }
}

// Login Form
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = loginForm.querySelector('input[name="remember"]').checked;
            
            // Basic validation
            if (!email || !password) {
                showToast('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address');
                return;
            }
            
            // Password validation (minimum 6 characters)
            if (password.length < 6) {
                showToast('Password must be at least 6 characters');
                return;
            }
            
            // Simulate login (replace with actual authentication)
            simulateLogin(email, password, remember);
        });
    }
}

// Simulate Login
function simulateLogin(email, password, remember) {
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.textContent;
    
    // Show loading state
    loginBtn.textContent = 'Signing in...';
    loginBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Store user info in localStorage (for demo purposes)
        const user = {
            email: email,
            name: email.split('@')[0],
            loggedIn: true,
            loginTime: new Date().toISOString()
        };
        
        if (remember) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.setItem('user', JSON.stringify(user));
        }
        
        showToast('Login successful! Redirecting...');
        
        // Redirect to home page after successful login
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        
    }, 1500);
}

// Show Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Social Login Handlers (placeholder)
document.querySelectorAll('.google-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        showToast('Google login coming soon!');
    });
});

document.querySelectorAll('.facebook-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        showToast('Facebook login coming soon!');
    });
});

// Sign up link handler
const showSignupLink = document.getElementById('showSignup');
if (showSignupLink) {
    showSignupLink.addEventListener('click', function(e) {
        e.preventDefault();
        showToast('Sign up page coming soon!');
    });
}
