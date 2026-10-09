document.addEventListener('DOMContentLoaded', () => {
    // Password Visibility Toggle
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');

    if (togglePasswordBtn && passwordInput && eyeIcon) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Update icon
            if (type === 'text') {
                eyeIcon.setAttribute('data-lucide', 'eye-off');
            } else {
                eyeIcon.setAttribute('data-lucide', 'eye');
            }
            lucide.createIcons();
        });
    }

    // Auth Alert helper
    const authAlert = document.getElementById('auth-alert');
    function showAlert(message, type) {
        if (!authAlert) return;
        
        authAlert.classList.remove('hidden', 'bg-red-50', 'border-red-200', 'text-red-700', 'bg-blue-50', 'border-blue-200', 'text-blue-700');
        
        if (type === 'error') {
            authAlert.classList.add('bg-red-50', 'border-red-200', 'text-red-700');
            authAlert.innerHTML = `<i data-lucide="alert-circle" class="h-5 w-5 mr-2 shrink-0"></i> <span>${message}</span>`;
        } else if (type === 'info') {
            authAlert.classList.add('bg-blue-50', 'border-blue-200', 'text-blue-700');
            authAlert.innerHTML = `<i data-lucide="info" class="h-5 w-5 mr-2 shrink-0"></i> <span>${message}</span>`;
        }
        lucide.createIcons();
    }

    // Sign In Validation
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showAlert("Authentication backend is not configured yet. This is a frontend demonstration. Please connect a backend service (e.g. Firebase, Supabase) to enable real sign-in functionality.", "info");
        });
    }

    // Sign Up Validation & Password Strength
    const signupForm = document.getElementById('signup-form');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordMatchText = document.getElementById('password-match-text');
    
    // Password strength logic
    const strengthBar = document.getElementById('password-strength-bar');
    const strengthText = document.getElementById('password-strength-text');

    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', () => {
            const val = passwordInput.value;
            let strength = 0;
            
            if (val.length >= 8) strength += 25;
            if (val.match(/[a-z]+/)) strength += 25;
            if (val.match(/[A-Z]+/)) strength += 25;
            if (val.match(/[0-9]+/)) strength += 25;

            strengthBar.style.width = strength + '%';
            
            if (val.length === 0) {
                strengthBar.style.width = '0%';
                strengthBar.className = 'h-1.5 rounded-full bg-gray-200';
                strengthText.textContent = 'At least 8 characters';
                strengthText.className = 'text-xs mt-1 text-gray-500';
            } else if (strength <= 25) {
                strengthBar.className = 'h-1.5 rounded-full bg-red-500 transition-all duration-300';
                strengthText.textContent = 'Weak';
                strengthText.className = 'text-xs mt-1 text-red-500';
            } else if (strength <= 50) {
                strengthBar.className = 'h-1.5 rounded-full bg-yellow-500 transition-all duration-300';
                strengthText.textContent = 'Fair';
                strengthText.className = 'text-xs mt-1 text-yellow-600';
            } else if (strength <= 75) {
                strengthBar.className = 'h-1.5 rounded-full bg-blue-500 transition-all duration-300';
                strengthText.textContent = 'Good';
                strengthText.className = 'text-xs mt-1 text-blue-500';
            } else {
                strengthBar.className = 'h-1.5 rounded-full bg-green-500 transition-all duration-300';
                strengthText.textContent = 'Strong';
                strengthText.className = 'text-xs mt-1 text-green-500';
            }
            
            checkPasswordMatch();
        });
    }

    function checkPasswordMatch() {
        if (!confirmPasswordInput) return true;
        
        if (confirmPasswordInput.value.length > 0) {
            if (passwordInput.value !== confirmPasswordInput.value) {
                passwordMatchText.classList.remove('hidden');
                confirmPasswordInput.classList.add('border-red-500');
                confirmPasswordInput.classList.remove('border-gray-300');
                return false;
            } else {
                passwordMatchText.classList.add('hidden');
                confirmPasswordInput.classList.remove('border-red-500');
                confirmPasswordInput.classList.add('border-green-500');
                return true;
            }
        }
        return true;
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', checkPasswordMatch);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!checkPasswordMatch()) {
                showAlert("Passwords do not match. Please correct the errors before submitting.", "error");
                return;
            }
            
            if (passwordInput.value.length < 8) {
                showAlert("Password must be at least 8 characters long.", "error");
                return;
            }

            showAlert("Authentication backend is not configured yet. Account creation functionality requires connecting to a backend database or authentication provider.", "info");
        });
    }
});
