const toggleBtn = [...document.querySelectorAll(".toggle-btn")];
const container = document.querySelector(".container");

toggleBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    container.classList.toggle("container-2");
  });
});

//PSEUDO CODE FOR TODO APP
/*
1. Start 
2. Accept Input from the user
3. Form button should send the todo text to the array of Object
4. Display todo text on the UI
5. number of todo task should appear
6. mark button as completed by giving the button a BG color and reduce the number by how many completed task have been done 
7. All Button should show all task(comleted or not)
8. Active button should show all task that have not been completed 
9. completed button should show all tasks that have been completed 

*/

const inputTask = document.querySelector(".create-task");
const addTaskBtn = document.querySelector(".btn-task");
const taskContainer = document.querySelector(".list-container");
const completeBtn = document.querySelector(".completed-task");

let currentID = 1;
let tasks = [];

const updateTask = function () {
  taskContainer.textContent = "";

  const mapText = tasks.map((arrText) => arrText.text);

  mapText.forEach((arrText, index) => {
    const html = `<li class="list-item">
    <span class="btn-list"></span>
    <p>
      ${arrText}
    </p>
  </li>`;

    taskContainer.insertAdjacentHTML("beforeend", html);
  });

  markTaskCompleted();
};

const renderTask = function () {
  if (inputTask.value !== "") {
    tasks.push({
      id: currentID,
      status: false,
      text: inputTask.value.trim(),
    });
    currentID++;
  }
  inputTask.value = "";
  updateTask();
};

const markTaskCompleted = function () {
  const taskItems = document.querySelectorAll(".list-item");
  const taskCompletedBtn = [...document.querySelectorAll(".btn-list")];

  taskItems.forEach((task, index) => {
    task.addEventListener("click", () => {
      tasks[index].status = true;
      taskCompletedBtn[index].classList.add("btn-list-change");
    });
  });
};

const completedTask = function () {
  const newTask = tasks.filter((item) => item?.status === true);
  console.log(newTask);
  tasks = newTask;
  updateTask();

  const taskCompletedBtn = [...document.querySelectorAll(".btn-list")];
  taskCompletedBtn.forEach((item) => {
    item.classList.add("btn-list-change");
  });
};

//EVENT HANDLLERS
addTaskBtn.addEventListener("click", renderTask);

completeBtn.addEventListener("click", completedTask);
