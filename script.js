// Element References
const postButton = document.getElementById('postButton');
const blogInput = document.getElementById('blogInput');
const categorySelect = document.getElementById('category');
const entriesContainer = document.getElementById('entriesContainer');
const moodButtons = document.querySelectorAll('.mood-btn');
const searchInput = document.getElementById('searchInput'); // Assuming a search input is added

let mood = '';

// Highlight selected mood button
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        moodButtons.forEach(btn => btn.classList.remove('selected')); // Remove highlight from all buttons
        button.classList.add('selected'); // Highlight selected button
        mood = button.dataset.mood;
    });
});

// Load entries from localStorage
function loadEntries(filter = '') {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entriesContainer.innerHTML = '';

    entries
        .filter(entry =>
            filter
                ? entry.text.toLowerCase().includes(filter.toLowerCase()) || 
                  entry.category.toLowerCase().includes(filter.toLowerCase()) ||
                  entry.mood.toLowerCase().includes(filter.toLowerCase())
                : true
        )
        .forEach((entry, index) => {
            const entryElement = document.createElement('div');
            entryElement.classList.add('entry');
            entryElement.innerHTML = `
                <p><strong>Mood:</strong> ${entry.mood}</p>
                <p><strong>Category:</strong> ${entry.category}</p>
                <p>${entry.text}</p>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            entriesContainer.appendChild(entryElement);
        });

    // Attach event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEdit);
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });
}

// Handle adding a new entry
postButton.addEventListener('click', () => {
    const text = blogInput.value.trim();
    const category = categorySelect.value;

    if (!text || !mood) {
        alert('Please write something and select your mood!');
        return;
    }

    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push({ mood, category, text });
    localStorage.setItem('entries', JSON.stringify(entries));
    blogInput.value = '';
    categorySelect.value = '';
    moodButtons.forEach(btn => btn.classList.remove('selected')); // Reset mood selection
    mood = '';
    loadEntries();
});

// Handle editing an entry
function handleEdit(event) {
    const index = event.target.dataset.index;
    const entries = JSON.parse(localStorage.getItem('entries'));
    const entry = entries[index];

    blogInput.value = entry.text;
    categorySelect.value = entry.category;
    mood = entry.mood;
    moodButtons.forEach(btn => {
        if (btn.dataset.mood === mood) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });

    entries.splice(index, 1); // Remove the entry being edited
    localStorage.setItem('entries', JSON.stringify(entries));
    loadEntries();
}

// Handle deleting an entry
function handleDelete(event) {
    const index = event.target.dataset.index;
    const entries = JSON.parse(localStorage.getItem('entries'));
    entries.splice(index, 1); // Remove entry
    localStorage.setItem('entries', JSON.stringify(entries));
    loadEntries();
}

// Search functionality
searchInput.addEventListener('input', event => {
    const filter = event.target.value;
    loadEntries(filter);
});

// Load entries initially
loadEntries();
