document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formAlert = document.getElementById('form-alert');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Check if action URL is configured (Formspree)
            const actionUrl = contactForm.getAttribute('action');
            
            // UI Loading state
            btnText.textContent = 'Sending...';
            btnSpinner.classList.remove('hidden');
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
            
            // Hide previous alerts
            formAlert.className = 'hidden mb-6 p-4 rounded-lg border';
            
            try {
                if (actionUrl && actionUrl.trim() !== '' && actionUrl.includes('formspree.io')) {
                    // Actual form submission logic
                    const formData = new FormData(contactForm);
                    const response = await fetch(actionUrl, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        showSuccess("Thank you for your inquiry! Our team will contact you shortly.");
                        contactForm.reset();
                    } else {
                        const data = await response.json();
                        if (Object.hasOwn(data, 'errors')) {
                            showError(data.errors.map(error => error.message).join(", "));
                        } else {
                            showError("Oops! There was a problem submitting your form");
                        }
                    }
                } else {
                    // Demo mode (Endpoint not configured)
                    // Simulate network delay
                    setTimeout(() => {
                        showSuccess("Thank you for your inquiry! (Demo Mode) Our team will contact you shortly.");
                        contactForm.reset();
                    }, 1000);
                }
            } catch (error) {
                showError("Oops! There was a problem submitting your form");
            } finally {
                // Restore button state
                setTimeout(() => {
                    btnText.textContent = 'Submit Request';
                    btnSpinner.classList.add('hidden');
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                }, 1000);
            }
        });
    }

    function showSuccess(message) {
        formAlert.textContent = message;
        formAlert.className = 'mb-6 p-4 rounded-lg border bg-green-50 border-green-200 text-green-700 font-medium flex items-center';
        // Add icon dynamically
        formAlert.innerHTML = `<i data-lucide="check-circle" class="h-5 w-5 mr-2"></i> ${message}`;
        lucide.createIcons();
    }

    function showError(message) {
        formAlert.textContent = message;
        formAlert.className = 'mb-6 p-4 rounded-lg border bg-red-50 border-red-200 text-red-700 font-medium flex items-center';
        formAlert.innerHTML = `<i data-lucide="alert-circle" class="h-5 w-5 mr-2 text-red-600"></i> ${message}`;
        lucide.createIcons();
    }
});
