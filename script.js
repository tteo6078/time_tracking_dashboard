const buttons = document.querySelectorAll('.activity-options button');
const dashboard = document.querySelector('.activity-dashboard');
let data = [];

// Load JSON once
async function loadData() {
  const res = await fetch('./data.json');
  data = await res.json();
  renderCards('weekly'); // default view
}

// Render cards dynamically
function renderCards(timeframe) {
  dashboard.innerHTML = ''; // clear old cards

  data.forEach(activity => {
    const tf = activity.timeframes[timeframe];
    let label
    if (timeframe === 'daily') {
        label = 'Yesterday';
    } else if (timeframe === 'weekly') {
        label = 'Last Week';
    } else {
        label = 'Last Month';
    }

    // Create card element
    const card = document.createElement('div');
    const className = activity.title.toLowerCase().replace(/\s+/g, '-');
    card.className = `activity-card ${className}`;
    card.innerHTML = `
      <div class="activity-card__bg">
        <img src="./images/icon-${className}.svg" alt="icon-${className}">
      </div>
      <div class="activity-card__info">
        <h1>${activity.title}</h1>
        <div class="time-container">
            <p>${tf.current}hrs</p>
            <h2>${label} - ${tf.previous}hrs</h2>
        </div>
      </div>
    `;

    dashboard.appendChild(card);
  });
}

// Button click listeners
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const timeframe = button.dataset.option; // "daily", "weekly", "monthly"
    renderCards(timeframe);

    // highlight active button
    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
  });
});

// Start
loadData();
