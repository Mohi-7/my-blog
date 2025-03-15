body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    background: linear-gradient(to bottom, #f0f4f8, #ffffff);
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
}

.container {
    width: 100%;
    max-width: 800px;
    margin: 20px;
    padding: 20px;
    background: #ffffff;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: auto;
}

header {
    text-align: center;
    margin-bottom: 20px;
}

header i {
    font-size: 2.5em;
    color: #5C6BC0;
    margin-bottom: 10px;
}

header h1 {
    color: #5C6BC0;
    font-size: 2.5em;
    margin-bottom: 10px;
}

header p {
    font-size: 1.1em;
    color: #555;
}

.mood-selector {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
    align-items: center;
    flex-wrap: wrap;
}

.mood-selector p {
    width: 100%;
    text-align: center;
    font-size: 1.3em;
    color: #333;
    margin-bottom: 15px;
    font-weight: 700;
}

.mood-btn {
    font-size: 3em;
    padding: 10px;
    background: none;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
    border-radius: 50%;
}

.mood-btn:hover {
    transform: scale(1.2);
    background-color: #5C6BC0;
}

.mood-btn.selected {
    background-color: #5C6BC0;
}

.mood-btn:active {
    animation: bounce 0.3s ease;
}

@keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.entry-section {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
}

.input-group {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.entry-section label {
    font-size: 1.1em;
    color: #333;
    margin-bottom: 5px;
}

textarea {
    width: 100%;
    height: 100px;
    border: 2px solid #5C6BC0;
    border-radius: 8px;
    padding: 10px;
    font-size: 1.1em;
    resize: none;
}

select {
    padding: 10px;
    border-radius: 8px;
    border: 2px solid #5C6BC0;
    font-size: 1em;
}

button {
    background-color: #5C6BC0;
    color: white;
    border: none;
    padding: 12px 20px;
    font-size: 1.1em;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
}

button:hover {
    background-color: #3f4d99;
}

.search-section {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
}

.search-wrapper {
    position: relative;
    width: 80%;
}

.search-wrapper i {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #5C6BC0;
}

#searchInput {
    width: 100%;
    padding: 10px 10px 10px 30px;
    font-size: 1.2em;
    border-radius: 8px;
    border: 2px solid #5C6BC0;
}

.entries {
    margin-top: 30px;
}

.entries h2 {
    color: #333;
}

.entry {
    background: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.entry:hover {
    transform: scale(1.02);
}

.entry.new {
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

button.edit-btn,
button.delete-btn {
    background-color: #5C6BC0;
    padding: 5px 12px;
    font-size: 0.9em;
    margin-right: 10px;
}

button.edit-btn:hover,
button.delete-btn:hover {
    background-color: #3f4d99;
}

.mood-stats {
    margin-top: 30px;
}

.mood-stats h2 {
    color: #333;
}

footer {
    text-align: center;
    margin-top: 30px;
    font-size: 1em;
    color: #777;
}

@media (max-width: 600px) {
    header h1 { font-size: 2em; }
    .mood-btn { font-size: 2em; }
    .entry-section { flex-direction: column; }
    .search-wrapper { width: 90%; }
}
