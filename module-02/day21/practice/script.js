// #1
async function fetchUsdToEtbRate() {
    const url = 'https://api.exchangerate-api.com/v4/latest/USD';
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const etbRate = data.rates.ETB;
    if (!etbRate) {
        throw new Error('ETB rate not found in response');
    }
    return etbRate;
}

// #2
async function fetchAndRenderRate() {
    try {
        const url = 'https://api.exchangerate-api.com/v4/latest/USD';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        renderData(data);
    } catch (error) {
        console.error('Fetch failed:', error);
        renderError(error);
    }
}

function renderData(data) {
    const display = document.getElementById('stateDisplay');
    if (display) {
        const rate = data.rates?.ETB || 'N/A';
        display.innerHTML = `
            <p class="success">Data loaded successfully!</p>
            <p><strong>USD → ETB:</strong> ${rate}</p>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
    }
    console.log('Data rendered:', data);
}

function renderError(error) {
    const display = document.getElementById('stateDisplay');
    if (display) {
        display.innerHTML = `
            <p class="error"> Error: ${error.message}</p>
        `;
    }
    console.error('Error rendered:', error);
}

// #3
async function demonstrateErrorHandling() {
    console.log('=== TASK 3: Error Handling Demo ===');

    try {
        console.log('Fetching wrong URL (invalid domain)...');
        const wrongUrl = 'https://api.invalid-domain-xyz123.com/data';
        const response = await fetch(wrongUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await response.json();
    } catch (error) {
        console.log('Catch block ran for wrong URL:', error.message);
    }

    try {
        console.log('\nFetching real URL that returns 404...');
        const notFoundUrl = 'https://api.exchangerate-api.com/v4/latest/NONEXISTENT';
        const response = await fetch(notFoundUrl);

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - The resource was not found`);
        }

        const data = await response.json();
        console.log('Data:', data);
    } catch (error) {
        console.log('Catch block ran for 404 (res.ok check caught it):', error.message);
    }
}

// #4
async function fetchFirstTwoDetails() {
    console.log('\n=== TASK 4: Promise.all for first two items ===');

    try {
        const listUrl = 'https://jsonplaceholder.typicode.com/posts';
        const listResponse = await fetch(listUrl);
        if (!listResponse.ok) {
            throw new Error(`Failed to fetch list: ${listResponse.status}`);
        }
        const list = await listResponse.json();

        const firstTwo = list.slice(0, 2);
        console.log('First two items:', firstTwo);

        const detailPromises = firstTwo.map(item =>
            fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`)
                .then(res => {
                    if (!res.ok) throw new Error(`Detail fetch failed: ${res.status}`);
                    return res.json();
                })
        );

        const details = await Promise.all(detailPromises);
        console.log('Details fetched in parallel:');
        details.forEach((detail, index) => {
            console.log(`  Item ${index + 1}:`, detail);
        });

        return details;
    } catch (error) {
        console.error('Error in fetchFirstTwoDetails:', error);
        throw error;
    }
}

// #5
let isNetworkOnline = true;

document.getElementById('toggleNetworkBtn')?.addEventListener('click', () => {
    isNetworkOnline = !isNetworkOnline;
    const btn = document.getElementById('toggleNetworkBtn');
    btn.textContent = isNetworkOnline ? 'Toggle Network (Offline/Online)' : 'Toggle Network (Online)';
    btn.style.backgroundColor = isNetworkOnline ? '' : '#ffcdd2';
    document.getElementById('stateDisplay').innerHTML = `
        <p>${isNetworkOnline ? 'Network is online' : 'Network is offline (simulated)'}</p>
        <p>Click "Fetch Data" to test</p>
    `;
});

document.getElementById('fetchDataBtn')?.addEventListener('click', async () => {
    const display = document.getElementById('stateDisplay');

    display.innerHTML = `
        <p class="loading">Loading...</p>
    `;

    if (!isNetworkOnline) {
        setTimeout(() => {
            display.innerHTML = `
                <p class="error"> Network Error: Failed to fetch (simulated offline)</p>
            `;
        }, 500);
        return;
    }

    try {
        const url = 'https://api.exchangerate-api.com/v4/latest/USD';
        const response = await fetch(url);

        await new Promise(resolve => setTimeout(resolve, 800));

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const rate = data.rates?.ETB || 'N/A';
        display.innerHTML = `
            <p class="success">Data loaded successfully!</p>
            <p><strong>USD → ETB:</strong> ${rate}</p>
            <p><small>Last updated: ${new Date().toLocaleTimeString()}</small></p>
            <pre style="max-height: 200px; overflow-y: auto;">${JSON.stringify(data, null, 2)}</pre>
        `;
    } catch (error) {
        display.innerHTML = `
            <p class="error">Error: ${error.message}</p>
            <p><small>Tip: Check network connection or try a different API</small></p>
        `;
    }
});


async function runAllTasks() {
    console.log('=== ASYNC EXERCISE SOLUTIONS ===\n');


    try {
        console.log('TASK 1: Fetching USD→ETB rate...');
        const rate = await fetchUsdToEtbRate();
        console.log('USD→ETB rate:', rate);
    } catch (error) {
        console.error(' Task 1 failed:', error.message);
    }

    console.log('\n---');

    console.log('TASK 2: fetchAndRenderRate() called (see UI for result)');
    await fetchAndRenderRate();

    console.log('\n---');


    await demonstrateErrorHandling();

    console.log('\n---');

    try {
        await fetchFirstTwoDetails();
    } catch (error) {
        console.error('Task 4 failed:', error.message);
    }

    console.log('\n---');
    console.log('All tasks completed!');
    console.log('\n TASK 5: Use the UI buttons above to see loading/data/error states');
    console.log('   - Click "Fetch Data" to load data (shows loading first)');
    console.log('   - Click "Toggle Network" to simulate offline, then fetch');
}

document.addEventListener('DOMContentLoaded', runAllTasks);