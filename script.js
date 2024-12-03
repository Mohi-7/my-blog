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
            date: new Date().toLocaleDateString()
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
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        container.appendChild(entryElement);
    });
}
