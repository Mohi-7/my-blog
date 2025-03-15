const postButton = document.getElementById('postButton');
const blogInput = document.getElementById('blogInput');
const categorySelect = document.getElementById('category');
const entriesContainer = document.getElementById('entriesContainer');
const moodButtons = document.querySelectorAll('.mood-btn');
const searchInput = document.getElementById('searchInput');

let mood = localStorage.getItem('selectedMood') || '';

// Highlight stored mood on load
if (mood) {
    document.querySelector(`[data-mood="${mood}"]`).classList.add('selected');
}

moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        mood = button.dataset.mood;
        localStorage.setItem('selectedMood', mood);
        alert(`Mood selected: ${mood}`);
        moodButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

function loadEntries(searchTerm = '') {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entriesContainer.innerHTML = '';
    entries.forEach(entry => {
        if (entry.text.toLowerCase().includes(searchTerm.toLowerCase())) {
            const entryElement = document.createElement('div');
            entryElement.classList.add('entry', 'new');
            entryElement.innerHTML = `
                <p><strong>Date:</strong> ${entry.date}</p>
                <p><strong>Mood:</strong> ${entry.mood}</p>
                <p><strong>Category:</strong> ${entry.category}</p>
                <p>${entry.text}</p>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;
            entriesContainer.appendChild(entryElement);
            setTimeout(() => entryElement.classList.remove('new'), 500);
        }
    });
}

function updateMoodChart() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const moodCounts = { happy: 0, neutral: 0, sad: 0 };
    entries.forEach(entry => {
        if (entry.mood in moodCounts) moodCounts[entry.mood]++;
    });

    // Destroy existing chart if it exists to prevent overlap
    if (window.moodChart) window.moodChart.destroy();

    const ctx = document.getElementById('moodChart').getContext('2d');
    window.moodChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Happy', 'Neutral', 'Sad'],
            datasets: [{
                data: [moodCounts.happy, moodCounts.neutral, moodCounts.sad],
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
            }]
        },
        options: { responsive: true }
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
    entries.push({ mood, category, text, date: new Date().toLocaleString() });
    localStorage.setItem('entries', JSON.stringify(entries));
    blogInput.value = '';
    loadEntries();
    updateMoodChart();
});

searchInput.addEventListener('input', () => {
    loadEntries(searchInput.value);
});

entriesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const entryElement = e.target.parentElement;
        const text = entryElement.querySelector('p:nth-child(4)').textContent;
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        const updatedEntries = entries.filter(entry => entry.text !== text);
        localStorage.setItem('entries', JSON.stringify(updatedEntries));
        loadEntries();
        updateMoodChart();
    } else if (e.target.classList.contains('edit-btn')) {
        alert('Edit functionality coming soon!');
    }
});

// Initial load
loadEntries();
updateMoodChart();
