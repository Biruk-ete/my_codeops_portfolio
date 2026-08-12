let items = [];

const form = document.getElementById('add-form');
const input = document.getElementById('name');
const list = document.getElementById('list');
const count = document.getElementById('count');

function render() {
  list.innerHTML = '';
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    const li = document.createElement('li');
    li.setAttribute('data-id', item.id);
    
    if (item.done) {
      li.classList.add('done');
    }
    
    li.textContent = item.name;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'del';
    li.appendChild(deleteBtn);
    
    list.appendChild(li);
  }
  
  count.textContent = items.length + ' items';
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = input.value.trim();
  if (name === '') return;
  
  items.push({
    id: Date.now().toString(),
    name: name,
    done: false
  });
  
  input.value = '';
  
  render();
});

list.addEventListener('click', function(e) {
  const li = e.target.closest('li');
  if (!li) return;
  
  const id = li.getAttribute('data-id');
  
  if (e.target.className === 'del') {
    items = items.filter(function(item) {
      return item.id !== id;
    });
  } else {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items[i].done = !items[i].done;
        break;
      }
    }
  }
  
  render();
});

render();