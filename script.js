const postButton = document.getElementById('postButton');
const blogInput = document.getElementById('blogInput');
const categorySelect = document.getElementById('category');
const entriesContainer = document.getElementById('entriesContainer');
const moodButtons = document.querySelectorAll('.mood-btn');

let mood = localStorage.getItem('selectedMood') || ''; // Get the selected mood from localStorage

// Update the mood button selection based on stored mood
if (mood) {
    document.querySelector(`[data-mood="${mood}"]`).classList.add('selected');
}

moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        mood = button.dataset.mood;
        localStorage.setItem('selectedMood', mood); // Save the selected mood to localStorage
        alert(`Mood selected: ${mood}`);

        // Highlight the selected mood button
        moodButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
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
