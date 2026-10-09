const out = document.querySelector("#facts");
const searchInput = document.querySelector("#countryInput");
const searchBtn = document.querySelector("#searchBtn");


function render(container, label, value) {
    const div = document.createElement("div");
    div.className = "fact-item";
    
    const labelSpan = document.createElement("span");
    labelSpan.className = "fact-label";
    labelSpan.textContent = label;
    
    const valueSpan = document.createElement("span");
    valueSpan.className = "fact-value";
    
    if (label === "Currencies" && typeof value === "object") {
        const currenciesList = document.createElement("div");
        currenciesList.className = "currencies-list";
        
        const currencyNames = Object.values(value).map(c => c.name);
        currencyNames.forEach(name => {
            const tag = document.createElement("span");
            tag.className = "currency-tag";
            tag.textContent = name;
            currenciesList.appendChild(tag);
        });
        
        valueSpan.appendChild(currenciesList);
    } else {
        valueSpan.textContent = value;
    }
    
    div.appendChild(labelSpan);
    div.appendChild(valueSpan);
    container.appendChild(div);
}

function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function showLoading() {
    clearContainer(out);
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading";
    loadingDiv.textContent = "Loading country data...";
    out.appendChild(loadingDiv);
}

function showError(message) {
    clearContainer(out);
    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.textContent = `❌ ${message}`;
    out.appendChild(errorDiv);
}

function displayCountryFacts(country) {
    clearContainer(out);
    
    const capital = country.capital?.[0] || "N/A";
    const population = country.population?.toLocaleString() || "N/A";
    const region = country.region || "N/A";
    const currencies = country.currencies || {};
    
    render(out, "Capital", capital);
    render(out, "Population", population);
    render(out, "Region", region);
    render(out, "Currencies", currencies);
}

async function showCountry(name) {
    if (!name || !name.trim()) {
        clearContainer(out);
        const welcome = document.createElement("p");
        welcome.className = "welcome";
        welcome.textContent = "Please enter a country name";
        out.appendChild(welcome);
        return;
    }
    
    showLoading();
    
    try {
        const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(name.trim())}`;
        const res = await fetch(url);
        
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error("Country not found");
            }
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (!data || data.length === 0) {
            throw new Error("Country not found");
        }
        
        const country = data[0];
        
        displayCountryFacts(country);
        
    } catch (error) {
        console.error("Error fetching country:", error);
        
        if (error.message === "Country not found") {
            showError("Country not found. Please check the spelling and try again.");
        } else if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
            showError("Network error. Please check your internet connection.");
        } else {
            showError(error.message || "Something went wrong. Please try again.");
        }
    }
}

searchBtn.addEventListener("click", () => {
    const countryName = searchInput.value.trim();
    showCountry(countryName);
});

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const countryName = searchInput.value.trim();
        showCountry(countryName);
    }
});

searchInput.value = "ethiopia";

document.addEventListener("DOMContentLoaded", () => {
    showCountry("ethiopia");
});