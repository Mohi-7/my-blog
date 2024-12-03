let entries = [];
let selectedMood = '';

document.querySelectorAll('.mood-btn').forEach(button => {
    button.addEventListener('click', function() {
        selectedMood = this.getAttribute('data-mood');
        document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
    });
});

document.getElementById('postButton').addEventListener('click', () => {
    const blogInput = document.getElementById('blogInput').value.trim();
    const category = document.getElementById('category').value;

    if (blogInput !== '') {
        const newEntry = {
            mood: selectedMood,
            content: blogInput,
            category: category,
            date: new Date().toLocaleDateString(),
            id: new Date().getTime() // Unique ID for each entry
        };
        entries.push(newEntry);
        displayEntries();
        document.getElementById('blogInput').value = '';
    }
});

document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredEntries = entries.filter(entry => 
        entry.content.toLowerCase().includes(query) || 
        entry.category.toLowerCase().includes(query) ||
        (entry.mood && entry.mood.toLowerCase().includes(query))
    );
    displayEntries(filteredEntries);
});

function displayEntries(entriesToDisplay = entries) {
    const container = document.getElementById('entriesContainer');
    container.innerHTML = '';
    entriesToDisplay.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('entry');
        entryElement.innerHTML = `
            <p><strong>Category:</strong> ${entry.category}</p>
            <p><strong>Mood:</strong> ${entry.mood}</p>
            <p>${entry.content}</p>
            <small><i>${entry.date}</i></small>
            <button class="edit-btn" onclick="editEntry(${entry.id})">Edit</button>
            <button class="delete-btn" onclick="deleteEntry(${entry.id})">Delete</button>
        `;
        container.appendChild(entryElement);
    });
}

function editEntry(id) {
    const entry = entries.find(e => e.id === id);
    document.getElementById('blogInput').value = entry.content;
    selectedMood = entry.mood;
    document.querySelectorAll('.mood-btn').forEach(button => button.classList.remove('selected'));
    document.querySelector(`[data-mood="${selectedMood}"]`).classList.add('selected');

    // Remove the entry and re-post it after editing
    deleteEntry(id);
}

function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);
    displayEntries();
}
