document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const errorArea = document.getElementById('errorArea');
    const signupCount = document.getElementById('signupCount');

    const ETHIOPIAN_PHONE_REGEX = /^(09|07)\d{8}$/;

    function updateSignupCount() {
        try {
            const entries = JSON.parse(localStorage.getItem('signupEntries')) || [];
            signupCount.textContent = entries.length;
        } catch (e) {
            signupCount.textContent = 0;
        }
    }

    function saveEntry(name, phone) {
        let entries = [];
        try {
            entries = JSON.parse(localStorage.getItem('signupEntries')) || [];
        } catch (e) {
            entries = [];
        }
        
        entries.push({
            name: name,
            phone: phone,
            timestamp: new Date().toISOString()
        });
        
        localStorage.setItem('signupEntries', JSON.stringify(entries));
        updateSignupCount();
    }

    function clearErrors() {
        errorArea.textContent = '';
        errorArea.style.color = '';
    }

    function showError(message) {
        errorArea.textContent = message;
        errorArea.style.color = 'red';
    }

    function showSuccess() {
        errorArea.textContent = 'Signup successful!';
        errorArea.style.color = 'green';
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        clearErrors();

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (name.length < 2) {
            showError('Name must be at least 2 characters long.');
            return;
        }

        if (!ETHIOPIAN_PHONE_REGEX.test(phone)) {
            showError('Please enter a valid Ethiopian phone number (e.g., 0912345678 or 0712345678).');
            return;
        }

        saveEntry(name, phone);
        showSuccess();
        form.reset();
    });

    updateSignupCount();
});