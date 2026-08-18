// #1
const heading = document.getElementById('mainHeading');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', function() {
    heading.textContent = 'New Heading Text';
    heading.classList.toggle('highlight');
});


// #2
const cities = ['Addis Ababa', 'Lalibela', 'Gondar'];
const cityList = document.getElementById('cityList');

cities.forEach(function(city) {
    const li = document.createElement('li');
    li.textContent = city;
    cityList.appendChild(li);
});


// #3
const wrapperDiv = document.getElementById('wrapperDiv');
const bubbleBtn = document.getElementById('bubbleBtn');

bubbleBtn.addEventListener('click', function(event) {
    console.log('event.target:', event.target);
});

wrapperDiv.addEventListener('click', function(event) {
    console.log('event.target:', event.target);
});


// #4
const itemList = document.getElementById('itemList');

itemList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const li = event.target.parentElement;
        li.remove();
    }
});

// #5
const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const dynamicList = document.getElementById('dynamicList');

itemForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newItem = itemInput.value.trim();
    if (newItem !== '') {
        const li = document.createElement('li');
        li.textContent = newItem;
        dynamicList.appendChild(li);
    }
    
    itemInput.value = '';
});