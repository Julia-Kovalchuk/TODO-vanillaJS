console.log("Heo!");

const form = document.getElementById("form");
const taskInput = document.getElementById("taskInput");

const addTask = function (event) {
  event.preventDefault();

  const taskValue = taskInput.value;
  //   const taskHTML
};

form.addEventListener("submit", addTask);
