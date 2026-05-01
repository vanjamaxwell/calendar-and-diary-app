const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const noteText = document.getElementById("noteText");
const saveNote = document.getElementById("saveNote");
const clearNote = document.getElementById("clearNote");

const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const selectedDateDisplay = document.getElementById("selectedDateDisplay");

const tabDiary = document.getElementById("tabDiary");
const tabTasks = document.getElementById("tabTasks");

const diaryBox = document.getElementById("diaryBox");
const taskBox = document.getElementById("taskBox");

let currentDate = new Date();
let selectedDate = null;

/* =========================
   STORAGE SYSTEM
========================= */
function getData(date) {
  return JSON.parse(localStorage.getItem(date)) || {
    note: "",
    tasks: []
  };
}

function saveData(date, data) {
  localStorage.setItem(date, JSON.stringify(data));
}

/* =========================
   FORMAT DATE
========================= */
function formatDate(y, m, d) {
  return `${y}-${m + 1}-${d}`;
}

/* =========================
   RENDER CALENDAR
========================= */
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

      loadAllData();
      renderCalendar();
    });

    calendar.appendChild(dayEl);
  }
}

/* =========================
   LOAD DATA (DIARY + TASKS)
========================= */
function loadAllData() {
  if (!selectedDate) return;

  const data = getData(selectedDate);

  // diary
  noteText.value = data.note;

  // tasks
  renderTasks(data.tasks);
}

/* =========================
   SAVE DIARY NOTE
========================= */
saveNote.addEventListener("click", () => {
  if (!selectedDate) {
    alert("Select a date first!");
    return;
  }

  const data = getData(selectedDate);
  data.note = noteText.value;

  saveData(selectedDate, data);

  alert("Note saved!");
});

/* =========================
   CLEAR NOTE
========================= */
clearNote.addEventListener("click", () => {
  if (!selectedDate) {
    alert("Select a date first!");
    return;
  }

  const data = getData(selectedDate);
  data.note = "";

  saveData(selectedDate, data);
  noteText.value = "";
});

/* =========================
   TASKS
========================= */
addTask.addEventListener("click", () => {
  if (!selectedDate) {
    alert("Select a date first!");
    return;
  }

  if (taskInput.value.trim() === "") return;

  const data = getData(selectedDate);
  data.tasks.push(taskInput.value);

  saveData(selectedDate, data);

  taskInput.value = "";
  renderTasks(data.tasks);
});

function renderTasks(tasks) {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${task}</span>
      <button onclick="deleteTask(${index})">X</button>
    `;

    taskList.appendChild(li);
  });
}

window.deleteTask = function(index) {
  const data = getData(selectedDate);

  data.tasks.splice(index, 1);

  saveData(selectedDate, data);

  renderTasks(data.tasks);
};

/* =========================
   TABS
========================= */
tabDiary.addEventListener("click", () => {
  diaryBox.classList.remove("hidden");
  taskBox.classList.add("hidden");

  tabDiary.classList.add("active-tab");
  tabTasks.classList.remove("active-tab");
});

tabTasks.addEventListener("click", () => {
  diaryBox.classList.add("hidden");
  taskBox.classList.remove("hidden");

  tabTasks.classList.add("active-tab");
  tabDiary.classList.remove("active-tab");
});

/* =========================
   NAVIGATION
========================= */
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

/* =========================
   START APP
========================= */
renderCalendar();