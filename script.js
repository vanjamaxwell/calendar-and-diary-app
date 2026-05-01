const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const noteText = document.getElementById("noteText");
const saveNote = document.getElementById("saveNote");
const clearNote = document.getElementById("clearNote");

const selectedDateDisplay = document.getElementById("selectedDateDisplay");

let currentDate = new Date();
let selectedDate = null;

// format date key
function formatDate(y, m, d) {
  return `${y}-${m + 1}-${d}`;
}

// render calendar
function renderCalendar() {
  calendar.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const today = new Date();

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  monthYear.textContent = `${months[month]} ${year}`;

  // empty cells
  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  // days
  for (let day = 1; day <= lastDate; day++) {
    const dayEl = document.createElement("div");
    dayEl.textContent = day;

    const dateKey = formatDate(year, month, day);

    // TODAY highlight
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayEl.classList.add("today");
    }

    // SELECTED highlight
    if (dateKey === selectedDate) {
      dayEl.classList.add("active");
    }

    // CLICK DAY
    dayEl.addEventListener("click", () => {
      selectedDate = dateKey;
      selectedDateDisplay.textContent = selectedDate;

      loadNote();
      renderCalendar();
    });

    calendar.appendChild(dayEl);
  }
}

// save note
saveNote.addEventListener("click", () => {
  if (!selectedDate) {
    alert("Select a date first!");
    return;
  }

  localStorage.setItem(selectedDate, noteText.value);
  alert("Note saved!");
});

// load note
function loadNote() {
  noteText.value = localStorage.getItem(selectedDate) || "";
}

// clear note (FIXED)
clearNote.addEventListener("click", () => {
  if (!selectedDate) {
    alert("Select a date first!");
    return;
  }

  localStorage.removeItem(selectedDate);
  noteText.value = "";
});

// navigation
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// start app
renderCalendar();