(function() {
    'use strict';

    const form = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const errorArea = document.getElementById('errorArea');
    const signupCount = document.getElementById('signupCount');
    const themeToggle = document.getElementById('themeToggle');

    // Helpers: save / load
    function save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (_) {

        }
    }

    function load(key) {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null) return null;
            return JSON.parse(raw);
        } catch (_) {
            return null;
        }
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.textContent = 'Switch to Light Theme';
        } else {
            document.body.classList.remove('dark-theme');
            themeToggle.textContent = 'Switch to Dark Theme';
        }
        save('themePreference', theme);
    }

    function loadTheme() {
        const saved = load('themePreference');
        if (saved === 'dark' || saved === 'light') {
            applyTheme(saved);
        } else {
            applyTheme('light');
        }
    }

    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.contains('dark-theme');
        applyTheme(isDark ? 'light' : 'dark');
    });

    const ETH_PHONE_REGEX = /^(09|07|9|7)\d{8}$/;

    function validate(name, phone) {
        const trimmedName = name.trim();
        const trimmedPhone = phone.trim();

        if (trimmedName.length < 2) {
            return 'Name must be at least 2 characters.';
        }

        if (!ETH_PHONE_REGEX.test(trimmedPhone)) {
            return 'Phone must be a valid Ethiopian number (e.g., 0912345678, 0712345678).';
        }

        return null; 
    }

    function renderCount() {
        const entries = load('signupEntries');
        if (Array.isArray(entries)) {
            signupCount.textContent = 'Total signed up: ' + entries.length + ' people';
        } else {
            signupCount.textContent = 'Total signed up: 0 people';
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        const error = validate(name, phone);
        if (error) {
            errorArea.textContent = error;
            return;
        }

        errorArea.textContent = '';

        let entries = load('signupEntries');
        if (!Array.isArray(entries)) {
            entries = [];
        }

        entries.push({ name, phone, timestamp: new Date().toISOString() });

        save('signupEntries', entries);

        nameInput.value = '';
        phoneInput.value = '';

        renderCount();
    });

    function init() {
        loadTheme();

        renderCount();
    }

    init();

})();