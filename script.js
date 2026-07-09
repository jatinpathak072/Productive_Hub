const body = document.querySelector('body')
const toggle = document.querySelector('.toggle')
const timezone = document.querySelector('#time')
const cardTime = document.querySelector('#card-time')
const greet = document.querySelector('#greet')
const dateElement = document.querySelector("#date");
const cardPeriod = document.querySelector("#period");
const cardDate = document.querySelector('#card-date');
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const qutBtn = document.querySelector('#qut-btn');
const weatherContent = document.querySelector(".weather-content");
const btmContent = document.querySelector(".btm-content")
const start = document.querySelector("#strt");
const stop = document.querySelector("#stp");
const reset = document.querySelector("#reset")
const timeelm = document.querySelector('#time-elem')
const pomodoro = document.querySelector('#pomodoro')
const pomodoroSec = document.querySelector('#pomodoro-sec');
const cancelPomodoro = document.querySelector('.cancel-pomodoro')
const todoSec = document.querySelector('.todo-sec');
const toolBtn = document.querySelector('.tool-btn')
const todoCancel = document.querySelector("#todo-cancel");
const inp = document.querySelector('#input-text');
const addTask = document.querySelector('#add-Task');
const todos = document.querySelector('.todos');
const planner = document.querySelector(".main-planner");
const plannerSec = document.querySelector('.planner-sec')
const completedCount = document.querySelector("#completedCount");
const plannerBtn = document.querySelector("#planner-btn")
const cancelPlanner = document.querySelector('.cancel-planner')
const goalSec = document.querySelector('.goal-sec')
const cancelGoal = document.querySelector('.cancel-goal')
const goalTitle = document.querySelector("#goalTitle");
const goalDescription = document.querySelector("#goalDescription");
const goalDate = document.querySelector("#goalDate");
const addGoalBtn = document.querySelector("#addGoalBtn");
const goalList = document.querySelector("#goalList");
const addGoalSec = document.querySelector("#addGoalSec");
const circle = document.querySelector("#circle");
const progressPercent = document.querySelector("#progressPercent");
const completed = document.querySelector("#completed");
const pending = document.querySelector("#pending");
const total = document.querySelector("#total");
const plannerDate = document.querySelector("#planner-date")

let getMode = localStorage.getItem("mode")

if (getMode && getMode === "dark") {
  body.classList.add("dark")
  toggle.classList.add("active")
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  toggle.classList.toggle("active");

  localStorage.setItem(
    "mode",
    body.classList.contains("dark") ? "dark" : "light"
  );
});

const defaultTasks = [
  {
    time: "06:00 - 07:00",
    title: "Morning Walk",
    description: "30 mins walk"
  },
  {
    time: "07:00 - 08:00",
    title: "DSA Practice",
    description: "Solve Arrays"
  },
  {
    time: "08:00 - 09:00",
    title: "Breakfast",
    description: "Healthy meal"
  },
  {
    time: "09:00 - 11:00",
    title: "Coding Practice",
    description: "LeetCode Problems"
  },
  {
    time: "11:00 - 12:00",
    title: "Frontend Project",
    description: "Build Daily Planner"
  },
  {
    time: "12:00 - 01:00",
    title: "College Study",
    description: "Read DBMS Notes"
  },
  {
    time: "01:00 - 02:00",
    title: "Lunch Break",
    description: "Take a break"
  },
  {
    time: "02:00 - 03:00",
    title: "JavaScript",
    description: "DOM Practice"
  },
  {
    time: "03:00 - 04:00",
    title: "React Learning",
    description: "Hooks Practice"
  },
  {
    time: "04:00 - 05:00",
    title: "Assignment",
    description: "Complete MCA Work"
  },
  {
    time: "05:00 - 06:00",
    title: "Tea Break",
    description: "Relax for a while"
  },
  {
    time: "06:00 - 08:00",
    title: "Gym",
    description: "Strength Training"
  },
  {
    time: "08:00 - 09:00",
    title: "Portfolio",
    description: "Update Projects"
  },
  {
    time: "09:00 - 10:00",
    title: "Dinner",
    description: "Family Time"
  },
  {
    time: "10:00 - 11:00",
    title: "Revision",
    description: "Review Today's Learning"
  },
  {
    time: "11:00 - 12:00",
    title: "Plan Tomorrow",
    description: "Set Goals & Sleep"
  }
];

let tasks = JSON.parse(localStorage.getItem("planner")) || defaultTasks;
let todoList = JSON.parse(localStorage.getItem("todos")) || [];
let editIndex = -1;

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const days = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
]

// Timezone
function time() {
  let date = new Date();
  let hr = date.getHours();
  let min = String(date.getMinutes()).padStart(2, "0");
  let sec = String(date.getSeconds()).padStart(2, "0");

  let period = hr >= 12 ? "PM" : "AM";

  if (hr >= 5 && hr < 12) {
    greet.textContent = "Good Morning 👋🏻";
    // hero.style.backgroundImage = `url("https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`;
  } else if (hr >= 12 && hr < 17) {
    greet.textContent = `Good Afternoon ☀️`
    // hero.style.backgroundImage = `url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=3132&auto=format&fit=crop")`;
  } else if (hr >= 17 && hr < 21) {
    greet.textContent = `Good Evening 🍂`
    // hero.style.backgroundImage = `url("https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`;
  } else {
    greet.textContent = `Good Night 🌙`
    // hero.style.backgroundImage = `https://images.unsplash.com/photo-1488866022504-f2584929ca5f?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
  }

  hr = hr % 12 || 12;

  timezone.innerHTML = `${hr}:${min}:${sec} ${period}`;
  cardTime.textContent = `${hr}:${min}`;
  cardPeriod.textContent = period;
}

time()
setInterval(time, 1000)

// Date
function date() {
  let today = new Date();

  let day = today.getDate();
  let month = months[today.getMonth()];
  let year = today.getFullYear();
  let week = days[today.getDay()];

  dateElement.innerHTML = `${day} ${month} ${year}`;
  cardDate.textContent = `${week}, ${day} ${month} ${year}`;
  plannerDate.innerHTML = `<i class="ri-calendar-line"></i> ${day} ${month}  ${year}`
}

date();

// motivation quotes
async function getQuote() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();
    quote.textContent = `"${data.quote}"`;
    author.textContent = `- ${data.author}`;
  } catch (error) {
    quote.textContent = "Unable to load quote.";
    author.textContent = "";
  }
}

setTimeout(getQuote, 100)

qutBtn.addEventListener('click', () => {
  getQuote();
})

// Weather API

const apiKey = "d3314c381c86a6a6ce8c93fce656420c";

async function getData(lat, long) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
  );
  return await response.json()
}

async function gotLocation(position) {
  const result = await getData(
    position.coords.latitude,
    position.coords.longitude
  );
  weatherContent.innerHTML = `
  <div class="weather-content">
      <div>
          <h2 class="temperature">${Math.round(result.main.temp)}°C</h2>
          <h3 class="feel-like">${result.weather[0].main}</h3>
          <span class="location">${result.name}, ${result.sys.country}</span>
      </div>

      <div>
          <img src="https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png"
               alt="${result.weather[0].description}">
      </div>
  </div>`

  btmContent.innerHTML = `
      <div class= "humidity-container">
         <div class="humidity-img">
                  <img src="assests/humidity.png" alt="Humidity">
          </div>
          <div>
              <h3 class="humidity-percent">${result.main.humidity}%</h3>
              <span class="humidity">Humidity</span>
          </div>
      </div>

      <div class="wind-container">
          <div class="wind-img">
                <img src="assests/wind.png" alt="Wind">
          </div>
          <div>
              <h3 class="wind-speed">${Math.round(result.wind.speed)} km/h</h3>
              <span class="wind">Wind</span>
          </div>
      </div>
  </div>
`;
}

function failedToGet() {
  weatherContent.innerHTML = 'There was an some issue';
}

window.addEventListener("load", () => {
  navigator.geolocation.getCurrentPosition(
    gotLocation,
    failedToGet
  );
});

//Todo Section

function toggleModal(button, modal, closeBtn) {

  button.addEventListener("click", () =>
    modal.style.display = "flex"
  );

  closeBtn.addEventListener("click", () =>
    modal.style.display = "none"
  );

}

toggleModal(toolBtn, todoSec, todoCancel);
toggleModal(plannerBtn, plannerSec, cancelPlanner);
toggleModal(pomodoro, pomodoroSec, cancelPomodoro);
toggleModal(addGoalSec, goalSec, cancelGoal);

todos.addEventListener("click", (e) => {
  deleteList(e);
  editTodo(e);
});

todos.addEventListener("click", deleteList);

addTask.addEventListener("click", addTodo);

function addTodo() {
  let today = new Date();

  let day = today.getDate();
  let month = months[today.getMonth()];

  let val = inp.value.trim();

  if (val === "") return;

  if (editIndex == -1) {
    todoList.push({
      text: val,
      date: `${month} ${day}`,
      completed: false
    });
  } else {
    todoList[editIndex].text = val;
    editIndex = -1;
  }

  saveTodos();
  renderTodos();
  inp.value = "";
}

function renderTodos() {
  todos.innerHTML = "";

  todoList.forEach((todo, index) => {
    todos.innerHTML += `
      <div class="list ${todo.completed ? "completed" : ""}" data-index="${index}">
        <div class="list-txt">
          <input
            type="checkbox"
            class="todo-checkbox"
            ${todo.completed ? "checked" : ""}
          >
          <p>${todo.text}</p>
        </div>

        <div class="list-date">

          ${
            todo.completed
              ? `<span class="completed-status">Completed</span>`
              : `
                <span class="todo-date">
                  <i class="ri-calendar-line"></i>
                  ${todo.date}
                </span>

                <div class="edit">
                  <i class="ri-pencil-line"></i>
                </div>

                <div class="dlt-btn">
                  <i class="ri-delete-bin-line"></i>
                </div>
              `
          }

        </div>
      </div>
    `;
  });

  updateTaskCount();
}

todos.addEventListener("change", (e) => {

  if (!e.target.classList.contains("todo-checkbox")) return;

  const index = e.target.closest(".list").dataset.index;

  todoList[index].completed = e.target.checked;

  saveTodos();
  renderTodos();
});

function deleteList(e) {
  const deleteBtn = e.target.closest(".dlt-btn");

  if (!deleteBtn) return;

  const index = deleteBtn.closest(".list").dataset.index;

  todoList.splice(index, 1);

  saveTodos();
  renderTodos();
}

function updateTaskCount() {
  const totalTasks = document.querySelectorAll(".list").length;
  const counts = document.querySelector('#count');
  counts.textContent = totalTasks
}

function editTodo(e) {
  const editBtn = e.target.closest(".edit");

  if (!editBtn) return;

  const index = editBtn.closest(".list").dataset.index;

  inp.value = todoList[index].text;

  editIndex = index;
}

renderTodos()

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todoList));
}

//pomodoro timer

let interval;
let timeLeft = 1500;

function updateTime() {
  let min = Math.floor(timeLeft / 60)
  let sec = timeLeft % 60
  let formattedTime = `${min.toString().padStart(2, 0)} : ${sec.toString().padStart(2, 0)}`
  timeelm.textContent = formattedTime
}

updateTime()

function setTime() {
  if (interval) return;

  interval = setInterval(() => {
    timeLeft--
    updateTime();

    if (timeLeft <= 0) {
      clearInterval(interval)
      interval = null
      alert("Time's up!")
      timeLeft = 1500;
      updateTime();
    }
  }, 1000);
}

function stopTime() {
  clearInterval(interval)
  interval = null
}

function resetTime() {
  clearInterval(interval);
  interval = null;
  timeLeft = 1500;
  updateTime();
}

start.addEventListener('click', setTime)
stop.addEventListener('click', stopTime)
reset.addEventListener('click', resetTime)

//Daily-planner
function renderPlanner() {
  planner.innerHTML = "";

  tasks.forEach((task, index) => {
    planner.innerHTML += `
      <div class="task-card" data-index="${index}">
          <div class="task">

              <div class="time">${task.time}</div>

              <div class="content">
                  <div class="content-text">
                      <h3 contenteditable="true">${task.title}</h3>
                      <p contenteditable="true">${task.description}</p>
                  </div>
              </div>

              <input
                  class="planner-checkbox"
                  type="checkbox"
                  ${task.completed ? "checked" : ""}
              >
          </div>
      </div>
      `;
  });
}

function updateCompletedCount() {
  const checked = tasks.filter(task => task.completed).length;
  completedCount.textContent = checked;
}

renderPlanner();
updateCompletedCount();
refreshProgress();

planner.addEventListener("change", (e) => {

  if (!e.target.classList.contains("planner-checkbox")) return;

  const card = e.target.closest(".task-card");
  const index = card.dataset.index;

  tasks[index].completed = e.target.checked;

  savePlanner();
  updateCompletedCount();
  refreshProgress();
});

function savePlanner() {
  localStorage.setItem("planner", JSON.stringify(tasks));
}

//Goal Section
let goals = JSON.parse(localStorage.getItem("goals")) || [];

// Load Goals
displayGoals();

// Add Goal
addGoalBtn.addEventListener("click", () => {

  const title = goalTitle.value.trim();
  const description = goalDescription.value.trim();
  const date = goalDate.value;

  if (title === "" || description === "") {
    alert("Please fill all fields.");
    return;
  }

  const goal = {
    id: Date.now(),
    title,
    description,
    date,
    completed: false
  };

  goals.push(goal);

  saveGoals();
  displayGoals();

  goalTitle.value = "";
  goalDescription.value = "";
  goalDate.value = "";
});

// Display Goals
function displayGoals() {

  goalList.innerHTML = "";

  goals.forEach(goal => {

    const card = document.createElement("div");
    card.className = "goal-card";

    card.innerHTML = `
            <div class="card-content">
                <h3 style="${goal.completed ? 'text-decoration:line-through;color:gray;' : ''}">
                    ${goal.title}
                </h3>

                <p style="${goal.completed ? 'text-decoration:line-through;color:gray;' : ''}">
                    ${goal.description}
                </p>
            </div>

            <div class="goal-checkbox">

                <span>${goal.date || "No Date"}</span>

                <input
                    type="checkbox"
                    ${goal.completed ? "checked" : ""}
                    onchange="toggleGoal(${goal.id})"
                >

                <i
                    class="ri-delete-bin-line"
                    onclick="deleteGoal(${goal.id})">
                </i>

            </div>
        `;

    goalList.appendChild(card);

  });

}


// Delete Goal
function deleteGoal(id) {

  goals = goals.filter(goal => goal.id !== id);

  saveGoals();
  displayGoals();

}


// Complete Goal
function toggleGoal(id) {

  goals = goals.map(goal => {

    if (goal.id === id) {
      goal.completed = !goal.completed;
    }

    return goal;

  });

  saveGoals();
  displayGoals();

}


// Save Local Storage
function saveGoals() {

  localStorage.setItem("goals", JSON.stringify(goals));

}

//progree bar
function updateProgress(completedTasks, totalTasks) {

  const pendingTasks = totalTasks - completedTasks;
  const percent = totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100);

  completed.textContent = completedTasks;
  pending.textContent = pendingTasks;
  total.textContent = totalTasks;

  progressPercent.textContent = `${percent}%`;

  localStorage.setItem("progressPercent", percent);

  circle.style.background = `
      conic-gradient(
          var(--purple) ${percent * 3.6}deg,
          #e5e7eb 0deg
      )
  `;
}

function refreshProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  updateProgress(completedTasks, totalTasks);
}