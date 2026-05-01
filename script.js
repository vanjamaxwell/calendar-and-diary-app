const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const noteText = document.getElementById("noteText");
const saveNote = document.getElementById("saveNote");

let currentDate = new Date();
let selectedDate = null;

// Load calendar
function renderCalendar() {
  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  monthYear.textContent = `${monthNames[month]} ${year}`;

  // Empty boxes before first day
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  // Days
  for (let day = 1; day <= lastDate; day++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("day");
    dayBox.textContent = day;

    dayBox.addEventListener("click", () => {
      selectedDate = `${year}-${month + 1}-${day}`;
      loadNote();
    });

    calendar.appendChild(dayBox);
  }
}

// Save note
saveNote.addEventListener("click", () => {
  if (!selectedDate) {
    alert("Please select a date first!");
    return;
  }

  localStorage.setItem(selectedDate, noteText.value);
  alert("Note saved!");
});

// Load note
function loadNote() {
  const saved = localStorage.getItem(selectedDate);
  noteText.value = saved || "";
}

// Month navigation
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initial load
renderCalendar();
