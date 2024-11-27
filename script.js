const postButton = document.getElementById('postButton');
const blogInput = document.getElementById('blogInput');
const categorySelect = document.getElementById('category');
const entriesContainer = document.getElementById('entriesContainer');
const moodButtons = document.querySelectorAll('.mood-btn');

let mood = '';

moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        mood = button.dataset.mood;
        alert(`Mood selected: ${mood}`);
    });
});

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entriesContainer.innerHTML = '';
    entries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('entry');
        entryElement.innerHTML = `
            <p><strong>Mood:</strong> ${entry.mood}</p>
            <p><strong>Category:</strong> ${entry.category}</p>
            <p>${entry.text}</p>
        `;
        entriesContainer.appendChild(entryElement);
    });
}

postButton.addEventListener('click', () => {
    const text = blogInput.value;
    const category = categorySelect.value;
    if (!text || !mood) {
        alert('Please write something and select your mood!');
        return;
    }

    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push({ mood, category, text });
    localStorage.setItem('entries', JSON.stringify(entries));
    blogInput.value = '';
    loadEntries();
});

loadEntries();
