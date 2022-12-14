let events = [];
let arr = []; // for load information
const eventName = document.querySelector('#event-name');
const eventDate = document.querySelector('#event-date');
const buttonAdd = document.querySelector('#button-add');
const eventsContainer = document.querySelector('#events-container');
const json = load();
try {
  arr = JSON.parse(json); // convert to an object
} catch (err) {
  arr = [];
}
events = arr ? [...arr] : [];
renderEvents();

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
});
buttonAdd.addEventListener('click', (e) => {
  addEvent();
});

function addEvent() {
  if (eventName.value === '' || eventDate.value === '') {
    return;
  }
  if (dateDiff(eventDate.value) < 0) {
    return;
  }

  //creating new event
  const newEvent = {
    id: (Math.random() * 100).toString(36).slice(3),
    name: eventName.value,
    date: eventDate.value,
  };
  events.unshift(newEvent);

  save(JSON.stringify(events)); // convert arr to  string  json
  eventName.value = '';
  renderEvents();
}

function dateDiff(date) {
  const targetDate = new Date(date);
  const today = new Date();
  const difference = targetDate.getTime() - today.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24)); //  ms * s *  h
  return days;
}

function renderEvents() {
  const eventsHTML = events.map((event) => {
    return `
      <div class="event">
      <div class="days">
      <span class="days-number">${dateDiff(event.date)}</span>
      <span class="days-text">days</span>
      </div>
      <div class="event-name">${event.name}</div>
      <div class="event-date">${event.date}</div>
      <div class="actions">
      <button  class="button-delete" data-id="${event.id}">Delete</button>
      </div>
      </div>
    `;
  });
  eventsContainer.innerHTML = eventsHTML.join('');
  document.querySelectorAll('.button-delete').forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = button.getAttribute('data-id');
      events = events.filter((event) => event.id !== id);
      save(JSON.stringify(events));
      renderEvents();
    });
  });
}

function save(data) {
  localStorage.setItem('items', data);
}
function load() {
  return localStorage.getItem('items');
}
