"use strict";

const state = {
    base: "ETB",
    rates: {},
    watchlist: [],
    currency: "USD",
    amount: 100
};

const statusEl = document.querySelector("#status");
const selectEl = document.querySelector("#currency");
const amountInput = document.querySelector("#amount");
const resultEl = document.querySelector("#result");
const formEl = document.querySelector("#convert-form");
const watchlistUl = document.querySelector("#watchlist");
const AddToWatchlist = document.querySelector("#watchbtn");

const API_URL = "https://open.er-api.com/v6/latest/ETB";
const STORAGE_KEY = "birrwatch";

function save() {
    try {
        const data = {
            watchlist: state.watchlist,
            currency: state.currency,
            amount: state.amount
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
        console.warn("Could not save state:", err);
    }
}

function load() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.watchlist) state.watchlist = parsed.watchlist;
            if (parsed.currency) state.currency = parsed.currency;
            if (parsed.amount) state.amount = parsed.amount;
        }
    } catch (err) {
        console.warn("Could not load saved state:", err);
    }
}

function renderCurrencyDropdown() {
    const codes = Object.keys(state.rates);
    
    if (codes.length === 0) {
        selectEl.innerHTML = '<option value="">No currencies loaded</option>';
        return;
    }
    
    codes.sort();
    
    selectEl.innerHTML = codes
        .map(code => `<option value="${code}">${code}</option>`)
        .join("");
    
    if (state.currency && codes.includes(state.currency)) {
        selectEl.value = state.currency;
    } else {
        selectEl.value = codes[0];
        state.currency = codes[0];
    }
}

function renderWatchlist() {
    if (state.watchlist.length === 0) {
        watchlistUl.innerHTML = '<li class="empty">No currencies yet</li>';
        return;
    }
    
    watchlistUl.innerHTML = state.watchlist
        .map(currency => {
            const rate = state.rates[currency];
            const rateDisplay = rate ? rate.toFixed(4) : '?';
            return `
                <li data-currency="${currency}">
                    <span class="currency-name">${currency}</span>
                    <span class="currency-rate">1 ETB = ${rateDisplay} ${currency}</span>
                    <button class="remove-btn" data-currency="${currency}">Delete</button>
                </li>
            `;
        })
        .join("");
}

function render() {
    renderCurrencyDropdown();
    renderWatchlist();
    if (amountInput.value !== String(state.amount)) {
        amountInput.value = state.amount;
    }
}

async function loadRates() {
    statusEl.textContent = "Loading rates…";
    statusEl.className = "loading";
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        state.rates = data.rates || {};
        state.rates.ETB = 1;
        
        statusEl.textContent = "Rates loaded successfully";
        statusEl.className = "success";
        
        render();
        renderWatchlist();
        
        if (state.amount && state.currency) {
            performConversion();
        }
        
    } catch (err) {
        console.error("Fetch error:", err);
        statusEl.textContent = "Could not load rates. Please refresh.";
        statusEl.className = "error";
        
        state.rates = {
            USD: 0.0177,
            EUR: 0.0164,
            GBP: 0.0139,
            KES: 2.29,
            ETB: 1,
            JPY: 2.45,
            CAD: 0.0234,
            AUD: 0.0256,
            CHF: 0.0157,
            CNY: 0.127,
            INR: 1.47
        };
        
        render();
        renderWatchlist();
        
        if (state.amount && state.currency) {
            performConversion();
        }
    }
}

function performConversion() {
    const amount = Number(amountInput.value);
    const currency = selectEl.value;
    
    if (!amount || amount <= 0 || isNaN(amount)) {
        resultEl.textContent = "Please enter a valid positive amount.";
        return;
    }
    
    if (!state.rates || Object.keys(state.rates).length === 0) {
        resultEl.textContent = "Rates not loaded yet...";
        return;
    }
    
    const rate = state.rates[currency];
    if (!rate) {
        resultEl.textContent = `Rate for ${currency} not available.`;
        return;
    }
    
    const converted = amount * rate;
    const formatted = converted.toFixed(4);
    const cleanDisplay = parseFloat(formatted).toString();
    
    resultEl.textContent = `${amount} ETB = ${cleanDisplay} ${currency}`;
    
    state.amount = amount;
    state.currency = currency;
    
    save();
}

function addToWatchlist(currency) {
    if (!currency) {
        resultEl.textContent = "No currency selected.";
        return false;
    }
    
    if (state.watchlist.includes(currency)) {
        resultEl.textContent = `${currency} is already in your watchlist.`;
        return false;
    }
    
    state.watchlist.push(currency);
    save();
    renderWatchlist();
    resultEl.textContent = `${currency} added to watchlist.`;
    return true;
}

function removeFromWatchlist(currency) {
    const index = state.watchlist.indexOf(currency);
    if (index === -1) return false;
    
    state.watchlist.splice(index, 1);
    save();
    renderWatchlist();
    resultEl.textContent = `${currency} removed from watchlist.`;
    return true;
}

formEl.addEventListener("submit", function(e) {
    e.preventDefault();
    performConversion();
});

watchlistUl.addEventListener("click", function(e) {
    const removeBtn = e.target.closest(".remove-btn");
    if (!removeBtn) return;
    
    const currency = removeBtn.dataset.currency;
    if (currency) {
        removeFromWatchlist(currency);
    }
});

AddToWatchlist.addEventListener("click", function() {
    const currency = selectEl.value;
    addToWatchlist(currency);
});

amountInput.addEventListener("change", function() {
    const val = Number(this.value);
    if (!isNaN(val) && val > 0) {
        state.amount = val;
        save();
    }
});

selectEl.addEventListener("change", function() {
    state.currency = this.value;
    save();
    if (amountInput.value && Number(amountInput.value) > 0) {
        performConversion();
    }
});

async function init() {
    load();
    
    if (state.amount) {
        amountInput.value = state.amount;
    }
    
    await loadRates();
    
    render();
    
    if (state.amount && state.currency && state.rates[state.currency]) {
        performConversion();
    }
    
    console.log("Birr Watch initialized!");
    console.log("Rates loaded:", Object.keys(state.rates).length);
    console.log("Watchlist:", state.watchlist);
}

init();