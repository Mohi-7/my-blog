// Initialize or retrieve stored mood data
const moodData = JSON.parse(localStorage.getItem("moodData")) || [];
const today = new Date().toISOString().split("T")[0]; // Get today's date

// Emoji elements
const emojiElements = document.querySelectorAll('.emoji');

// Save Mood Function
function saveMood(mood) {
  // Check if mood for today already exists
  const existingEntryIndex = moodData.findIndex(entry => entry.date === today);

  if (existingEntryIndex !== -1) {
    // Update the existing entry
    moodData[existingEntryIndex].mood = mood;
  } else {
    // Add new entry
    moodData.push({ date: today, mood: mood });
  }

  // Save to localStorage
  localStorage.setItem("moodData", JSON.stringify(moodData));

  // Refresh the chart
  renderChart();

  // Notify user
  alert("Your mood has been saved!");
}

// Render Mood Chart
function renderChart() {
  const ctx = document.getElementById('moodChart').getContext('2d');

  // Get the past 7 days' data
  const past7Days = getPast7Days();
  const moodCounts = { happy: 0, neutral: 0, sad: 0 };

  // Count moods in the last 7 days
  past7Days.forEach(day => {
    const entry = moodData.find(entry => entry.date === day);
    if (entry) moodCounts[entry.mood]++;
  });

  // Destroy existing chart if it exists (to prevent overlap)
  if (window.moodChart) window.moodChart.destroy();

  // Create the chart
  window.moodChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Happy', 'Neutral', 'Sad'],
      datasets: [{
        label: '# of Days',
        data: [moodCounts.happy, moodCounts.neutral, moodCounts.sad],
        backgroundColor: ['#4caf50', '#ffc107', '#f44336'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

// Get Dates for the Past 7 Days
function getPast7Days() {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

// Event listener for emoji selection
emojiElements.forEach((emoji, index) => {
  emoji.addEventListener('click', () => {
    // Remove the 'selected' class from all emojis
    emojiElements.forEach(el => el.classList.remove('selected'));

    // Add 'selected' class to the clicked emoji
    emoji.classList.add('selected');

    // Determine mood based on the clicked emoji
    let mood = "";
    if (index === 0) mood = "happy";   // First emoji = happy
    if (index === 1) mood = "neutral"; // Second emoji = neutral
    if (index === 2) mood = "sad";     // Third emoji = sad

    // Save the selected mood
    saveMood(mood);
  });
});

// Initial Chart Render
renderChart();
