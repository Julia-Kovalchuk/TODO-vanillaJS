const form = document.getElementById("form");
const taskInput = document.getElementById("taskInput");
const tasksList = document.getElementById("list");

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach((task) => renderTask(task));

checkEmptyList();

function addTask(event) {
  event.preventDefault();

  const taskValue = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskValue,
    done: false,
  };

  tasks.push(newTask);

  renderTask(newTask);

  taskInput.value = "";
  taskInput.focus();

  checkEmptyList();
  saveToLocalStorage();
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") {
    return;
  }

  const parentNode = event.target.closest("li");
  const id = Number(parentNode.id);

  tasks = tasks.filter((task) => task.id !== id);

  parentNode.remove();

  checkEmptyList();
  saveToLocalStorage();
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") {
    return;
  }
  const parentNode = event.target.closest("li");

  const id = Number(parentNode.id);

  const task = tasks.find((task) => task.id === id);
  task.done = !task.done;

  const taskTitle = parentNode.querySelector("p");
  taskTitle.classList.toggle("list__task-title--done");

  const doneButton = parentNode.querySelector("button > span");
  doneButton.classList.toggle("list__emoji--done");

  saveToLocalStorage();
}

function checkEmptyList() {
  console.log(tasks.length);
  if (tasks.length === 0) {
    const emptyListHTML = `
          <li class="empty-box" id="empty-box">
            <img
              src='./images/empty-list.svg'
              class="empty-box__picture"
              alt="empty list"
            />
            <p class="empty-box__phrase">Your to-do list is still empty!</p>
          </li>
  `;
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }

  if (tasks.length > 0) {
    const emptyListElement = document.querySelector("#empty-box");
    emptyListElement ? emptyListElement.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const cssClass = task.done
    ? "list__task-title list__task-title--done"
    : "list__task-title";

  const taskHTML = `
      <li class="list__item" id=${task.id}>
        <div class="list__container">
          <button class="list__button list__button-done button" data-action="done">
            <span class="list__emoji">✔️</span>
          </button>
          <p class="${cssClass}">${task.text}</p>
        </div>
        <button class="list__button list__button-delete button" data-action="delete">
          ❌
        </button>
      </li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}
