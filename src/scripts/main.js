console.log("Heo!");

let tasks = [];

const form = document.getElementById("form");
const taskInput = document.getElementById("taskInput");
const tasksList = document.getElementById("list");
const emptyState = document.getElementById("empty-box");

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

function addTask(event) {
  event.preventDefault();

  const taskValue = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskValue,
    done: false,
  };

  tasks.push(newTask);

  const cssClass = newTask.done
    ? "list__task-title list__task-title--done"
    : "list__task-title";

  const taskHTML = `
      <li class="list__item" id=${newTask.id}>
        <div class="list__container">
          <button class="list__button list__button-done button" data-action="done">
            <span class="list__emoji">✔️</span>
          </button>
          <p class="${cssClass}">${newTask.text}</p>
        </div>
        <button class="list__button list__button-delete button" data-action="delete">
          ❌
        </button>
      </li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  taskInput.value = "";
  taskInput.focus();

  if (tasksList.children.length > 1) {
    emptyState.classList.add("none");
  }
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") {
    return;
  }

  const parentNode = event.target.closest("li");
  const id = parentNode.id;

  tasks = tasks.filter((task) => {
    return task.id !== id;
  });

  parentNode.remove();

  if (tasksList.children.length === 1) {
    emptyState.classList.remove("none");
  }
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") {
    return;
  }
  const parentNode = event.target.closest(".list__container");
  const taskTitle = parentNode.querySelector("p");

  taskTitle.classList.toggle("list__task-title--done");

  const doneButton = parentNode.querySelector("button > span");
  doneButton.classList.toggle("list__emoji--done");
}
