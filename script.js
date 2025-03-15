// Only needed change - remove the mood chart functionality since it's not in your HTML
// Remove these parts from the previous JavaScript code:
// 1. The updateMoodChart function
// 2. All calls to updateMoodChart()
// 3. The mood chart destruction logic

// Here's the adjusted JavaScript that perfectly matches your HTML/CSS:
const postButton = document.getElementById('postButton');
const blogInput = document.getElementById('blogInput');
const categorySelect = document.getElementById('category');
const entriesContainer = document.getElementById('entriesContainer');
const moodButtons = document.querySelectorAll('.mood-btn');
const searchInput = document.getElementById('searchInput');

let mood = localStorage.getItem('selectedMood') || '';
let editingId = null;

// Mood selection remains identical to your existing CSS structure
if (mood) {
    document.querySelector(`[data-mood="${mood}"]`).classList.add('selected');
}

moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        mood = button.dataset.mood;
        localStorage.setItem('selectedMood', mood);
        moodButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

function generateId() {
    return Date.now().toString();
}

function loadEntries(searchTerm = '') {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entriesContainer.innerHTML = '';
    
    entries.forEach(entry => {
        if (entry.text.toLowerCase().includes(searchTerm.toLowerCase())) {
            const entryElement = document.createElement('div');
            entryElement.classList.add('entry', 'new');
            entryElement.innerHTML = `
                <div class="entry-content">
                    <p><strong>Date:</strong> ${entry.date}</p>
                    <p><strong>Mood:</strong> ${entry.mood}</p>
                    <p><strong>Category:</strong> ${entry.category}</p>
                    <p>${entry.text}</p>
                </div>
                <div class="entry-buttons">
                    <button class="edit-btn" data-id="${entry.id}">Edit</button>
                    <button class="delete-btn" data-id="${entry.id}">Delete</button>
                </div>
            `;
            entriesContainer.appendChild(entryElement);
            setTimeout(() => entryElement.classList.remove('new'), 500);
        }
    });
}

function handlePost() {
    const text = blogInput.value.trim();
    const category = categorySelect.value;
    
    if (!text || !mood) {
        alert('Please write something and select your mood!');
        return;
    }

    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    
    if (editingId) {
        const index = entries.findIndex(entry => entry.id === editingId);
        if (index > -1) {
            entries[index] = {
                ...entries[index],
                text,
                mood,
                category,
                date: new Date().toLocaleString()
            };
        }
        editingId = null;
        postButton.textContent = 'Post Entry';
    } else {
        entries.push({
            id: generateId(),
            mood,
            category,
            text,
            date: new Date().toLocaleString()
        });
    }

    localStorage.setItem('entries', JSON.stringify(entries));
    blogInput.value = '';
    loadEntries();
}

function handleEdit(id) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entry = entries.find(entry => entry.id === id);
    
    if (entry) {
        blogInput.value = entry.text;
        categorySelect.value = entry.category;
        mood = entry.mood;
        moodButtons.forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.mood === entry.mood);
        });
        editingId = id;
        postButton.textContent = 'Update Entry';
    }
}

function handleDelete(id) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const updatedEntries = entries.filter(entry => entry.id !== id);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
    loadEntries();
}

postButton.addEventListener('click', handlePost);

searchInput.addEventListener('input', () => {
    loadEntries(searchInput.value);
});

entriesContainer.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    
    if (e.target.classList.contains('delete-btn')) {
        handleDelete(id);
    } else if (e.target.classList.contains('edit-btn')) {
        handleEdit(id);
    }
});

// Initial load
loadEntries();
