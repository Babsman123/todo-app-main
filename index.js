"use strict";

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
const taskNumber = document.querySelector(".number");
const clearCompletedBtn = document.querySelector(".clear-completed");

//FOR deSKTOP DESIGN
const allBtn = document.querySelector(".all-task");
const activeBtn = document.querySelector(".active-task");
const completeBtn = document.querySelector(".completed-task");

//FOR MOBILE DESIGN
const allBtnMobile = document.querySelector(".all-task-mobile");
const activeBtnMobile = document.querySelector(".active-task-mobile");
const completeBtnMobile = document.querySelector(".completed-task-mobile");

let currentID = 1;
let tasks = [];

const udateTaskCount = function () {
  taskNumber.textContent = tasks.length;
};
const updateTask = function () {
  taskContainer.textContent = "";

  const mapText = tasks.map((arrText) => arrText.text);

  mapText.forEach((arrText, index) => {
    const html = ` <li class="list-item">
                <div class="list-item--task">
                  <span class="btn-list"></span>
                  <p>
                    ${arrText}
                  </p>
                </div>

                <img src="./images/icon-cross.svg" alt="icon-cross">
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
  udateTaskCount();
};

const markTaskCompleted = function () {
  const taskItems = document.querySelectorAll(".list-item");
  const taskCompletedBtn = [...document.querySelectorAll(".btn-list")];

  taskItems.forEach((task, index) => {
    let isClicked = false;

    task.addEventListener("click", () => {
      if (!isClicked) {
        tasks[index].status = true;
        taskNumber.textContent--;
        taskCompletedBtn[index].classList.add("btn-list-change");
        isClicked = true;
        console.log(taskNumber.textContent);
      } else {
        tasks[index].status = false;
        taskNumber.textContent++;
        taskCompletedBtn[index].classList.remove("btn-list-change");
        isClicked = false;
        console.log(taskNumber.textContent);
      }
    });
  });
};

const allTask = function () {
  const allTheTask = tasks.filter((item) => item.id).map((item) => item.text);

  taskContainer.textContent = "";

  allTheTask.forEach((arrText, index) => {
    const html = `<li class="list-item">
      <span class="btn-list"></span>
      <p>
        ${arrText}
      </p>
    </li>`;

    taskContainer.insertAdjacentHTML("beforeend", html);

    if (tasks[index].status === true) {
      completedTask();
    }
  });
  if (tasks.length === 0) {
    console.log("task is zeroe");
    const emptyComplete = document.createElement("p");
    emptyComplete.classList.add("enter-task");

    emptyComplete.textContent = "No New Task Available";
    taskContainer.appendChild(emptyComplete);
  }
  markTaskCompleted();
};

const activeTask = function () {
  const actTask = tasks
    .filter((item) => !item?.status)
    .map((item) => item.text);

  taskContainer.textContent = "";

  if (actTask.length === 0) {
    const emptyActive = document.createElement("p");
    emptyActive.classList.add("enter-task");

    emptyActive.textContent = "No Active Tasks";
    taskContainer.appendChild(emptyActive);
  } else {
    actTask.forEach((arrText) => {
      const html = `<li class="list-item">
    <span class="btn-list"></span>
    <p>
      ${arrText}
    </p>
  </li>`;

      taskContainer.insertAdjacentHTML("beforeend", html);
    });
  }
  // completedTask();
  markTaskCompleted();
};

const completedTask = function () {
  let completeTask = tasks
    .filter((item) => item?.status)
    .map((item) => item.text);

  taskContainer.textContent = "";

  if (completeTask.length === 0) {
    const emptyComplete = document.createElement("p");
    emptyComplete.classList.add("enter-task");

    emptyComplete.textContent = "No Completed Tasks";
    taskContainer.appendChild(emptyComplete);
  } else {
    completeTask.forEach((arrText, index) => {
      const html = `<li class="list-item">
  <span class="btn-list"></span>
  <p>
    ${arrText}
  </p>
</li>`;

      taskContainer.insertAdjacentHTML("beforeend", html);
    });

    const taskCompletedBtn = [...document.querySelectorAll(".btn-list")];
    taskCompletedBtn.forEach((item) => {
      item.classList.add("btn-list-change");
    });
  }
};

const clearCompletedTask = function () {
  let index = tasks.findIndex((item) => item.status);

  tasks.splice(index, 1);
  updateTask();

  if (tasks.length === 0) {
    const NewTask = document.createElement("p");
    NewTask.classList.add("enter-task");
    NewTask.textContent = `No Task Available`;

    taskContainer.appendChild(NewTask);
  } else {
    updateTask();
  }
};

//EVENT HANDLLERS
addTaskBtn.addEventListener("click", renderTask);
clearCompletedBtn.addEventListener("click", clearCompletedTask);

//DESKTOP EVENT
activeBtn.addEventListener("click", activeTask);
completeBtn.addEventListener("click", completedTask);
allBtn.addEventListener("click", allTask);

//MOBILE EVENT HANDLERS
activeBtnMobile.addEventListener("click", activeTask);
completeBtnMobile.addEventListener("click", completedTask);
allBtnMobile.addEventListener("click", allTask);
