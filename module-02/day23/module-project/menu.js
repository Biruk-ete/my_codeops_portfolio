const state = {
    dishes: [],
    cart: [],
    search: ""
};

const menuEl = document.getElementById('menu');
const cartEl = document.getElementById('cart-items');
const totalEl = document.getElementById('total-amount');
const searchEl = document.getElementById('search');
const checkoutBtn = document.getElementById('checkout-btn');

const modal = document.getElementById('checkout-modal');
const closeModalBtn = document.getElementById('close-modal');
const checkoutForm = document.getElementById('checkout-form');
const orderSummaryItems = document.getElementById('order-summary-items');
const orderTotal = document.getElementById('order-total');

// fallback date
const fallbackMenuData = [
    { "id": 1, "name": "Doro Wat", "category": "Main", "price": 240, "spicy": true },
    { "id": 2, "name": "Shiro", "category": "Vegetarian", "price": 120, "spicy": false },
    { "id": 3, "name": "Kitfo", "category": "Main", "price": 320, "spicy": true },
    { "id": 4, "name": "Tibs", "category": "Main", "price": 280, "spicy": true },
    { "id": 5, "name": "Injera Firfir", "category": "Breakfast", "price": 100, "spicy": true },
    { "id": 6, "name": "Beyaynetu", "category": "Vegetarian", "price": 150, "spicy": false },
    { "id": 7, "name": "Misir Wat", "category": "Vegetarian", "price": 110, "spicy": true },
    { "id": 8, "name": "Gomen", "category": "Vegetarian", "price": 90, "spicy": false },
    { "id": 9, "name": "Atkilt Wot", "category": "Vegetarian", "price": 100, "spicy": false },
    { "id": 10, "name": "Derek Tibs", "category": "Main", "price": 310, "spicy": true },
    { "id": 11, "name": "Key Wat", "category": "Main", "price": 220, "spicy": true },
    { "id": 12, "name": "Alicha Wat", "category": "Main", "price": 210, "spicy": false },
    { "id": 13, "name": "Bozena Shiro", "category": "Main", "price": 180, "spicy": true },
    { "id": 14, "name": "Ayibe", "category": "Side", "price": 70, "spicy": false },
    { "id": 15, "name": "Kocho", "category": "Side", "price": 60, "spicy": false },
    { "id": 16, "name": "Enkulal Firfir", "category": "Breakfast", "price": 110, "spicy": true },
    { "id": 17, "name": "Fuul", "category": "Breakfast", "price": 90, "spicy": true },
    { "id": 18, "name": "Genfo", "category": "Breakfast", "price": 130, "spicy": true },
    { "id": 19, "name": "Chechebsa", "category": "Breakfast", "price": 120, "spicy": true },
    { "id": 20, "name": "Kik Alicha", "category": "Vegetarian", "price": 100, "spicy": false }
];

// load menu
async function loadMenu() {
    menuEl.innerHTML = '<p class="loading"><i class="fa-solid fa-hourglass"></i> Loading menu…</p>';
    try {
        const res = await fetch("menu.json");
        if (!res.ok) throw new Error("HTTP " + res.status);
        state.dishes = await res.json();
        render();
    } catch (err) {
        console.warn("Using fallback menu data:", err.message);
        state.dishes = fallbackMenuData;
        menuEl.innerHTML = '<p class="loading">Using offline menu</p>';
        setTimeout(render, 500);
    }
}

// render
function render() {
    const term = state.search.toLowerCase().trim();
    const shown = state.dishes.filter(e =>
        e.name.toLowerCase().includes(term) ||
        e.category.toLowerCase().includes(term)
    );

    if (shown.length === 0) {
        menuEl.innerHTML = '<p class="no-results"><i class="fa-solid fa-clipboard-list"></i>No dishes found</p>';
    } else {
        menuEl.innerHTML = shown.map(d => {
            const inCart = state.cart.find(c => c.id === d.id);
            const qty = inCart ? inCart.qty : 0;
            const btnText = qty > 0 ? `<i class="fa-solid fa-cart-shopping"></i> In Cart (${qty})` : 'Add to Cart';
            const btnClass = qty > 0 ? 'add-btn in-cart' : 'add-btn';

            return `
                <div class="dish" data-id="${d.id}">
                    <h3>${d.name}</h3>
                    <div class="meta">
                        <span class="category">${d.category}</span>
                        ${d.spicy ? '<span class="spicy"><i class="fa-solid fa-pepper-hot" style="color: rgb(205, 4, 4);"></i> Spicy</span>' : ''}
                    </div>
                    <div class="price">${d.price} ETB</div>
                    <button class="${btnClass}">${btnText}</button>
                </div>
            `;
        }).join('');
    }

    renderCart();
}

// render cart
function renderCart() {
    if (state.cart.length === 0) {
        cartEl.innerHTML = '<p class="empty-cart"><i class="fa-solid fa-cart-shopping"></i> Your cart is empty</p>';
        totalEl.textContent = '0';
        checkoutBtn.disabled = true;
        return;
    }

    cartEl.innerHTML = state.cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div>
                <span class="item-name">${item.name}</span>
                <span class="item-qty">x ${item.qty}</span>
            </div>
            <div>
                <span class="item-price">${item.price * item.qty} ETB</span>
                <span class="remove-btn"><i class="fa-solid fa-trash-can"></i></span>
            </div>
        </div>
    `).join('');

    const total = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    totalEl.textContent = total;
    checkoutBtn.disabled = false;
}

// storage
function save() {
    localStorage.setItem("addisEatsCart", JSON.stringify(state.cart));
}

function loadCart() {
    const saved = localStorage.getItem("addisEatsCart");
    if (saved) {
        try {
            state.cart = JSON.parse(saved);
        } catch {
            state.cart = [];
        }
    }
}

// Modal Functions
function openModal() {
    if (state.cart.length === 0) return;
    
    const total = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    
    orderSummaryItems.innerHTML = state.cart.map(item => `
        <div class="summary-item">
            <span>${item.name} x ${item.qty}</span>
            <span>${item.price * item.qty} ETB</span>
        </div>
    `).join('');
    
    orderTotal.textContent = `${total} ETB`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    checkoutForm.reset();
}

// Handle checkout form submission
function handleCheckout(e) {
    e.preventDefault();
    
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const instructions = document.getElementById('special-instructions').value.trim();
    
    if (!name || !phone || !address) {
        alert('Please fill in all required fields (Name, Phone, and Address)');
        return;
    }
    
    const total = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    
    const order = {
        customer: { name, phone, address, instructions },
        items: state.cart.map(item => ({ ...item })),
        total: total,
        timestamp: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem('addisEatsOrders') || '[]');
    orders.push(order);
    localStorage.setItem('addisEatsOrders', JSON.stringify(orders));
    
    alert(`Order placed successfully!\n\nCustomer: ${name}\nTotal: ${total} ETB\n\nThank you for choosing Addis Eats!`);
    
    state.cart = [];
    save();
    render();
    closeModal();
}

// Click outside modal to close
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Search
searchEl.addEventListener("input", (e) => {
    state.search = e.target.value;
    render();
});

// Add to cart
menuEl.addEventListener("click", (e) => {
    if (!e.target.classList.contains("add-btn")) return;
    
    const dishEl = e.target.closest(".dish");
    if (!dishEl) return;
    
    const id = Number(dishEl.dataset.id);
    const dish = state.dishes.find(d => d.id === id);
    if (!dish) return;
    
    const line = state.cart.find(i => i.id === id);
    if (line) {
        line.qty++;
    } else {
        state.cart.push({ ...dish, qty: 1 });
    }
    
    save();
    render();
});

// Remove from cart
cartEl.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-btn");
    if (!removeBtn) return;

    const itemEl = removeBtn.closest(".cart-item");
    if (!itemEl) return;

    const id = Number(itemEl.dataset.id);
    state.cart = state.cart.filter(i => i.id !== id);

    save();
    render();
});

// Checkout - Open modal
checkoutBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
checkoutForm.addEventListener('submit', handleCheckout);

async function init() {
    loadCart();    
    await loadMenu(); 
}

init();