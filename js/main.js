const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const removeDoneTasks = document.querySelector("#removeDoneTasks");

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach( (task) => renderTasks(task));
}

form.addEventListener('submit', addTask);

checkEmptyList();

tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

function checkEmptyList() {
    const checkTheme = checkbox.checked ? "list-group-item empty-list darkLi" :
                                                "list-group-item empty-list";

    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="${checkTheme}">
                                        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                                        <div class="empty-list__title">Список справ пустий</div>
                                     </li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }
    if (tasks.length > 0) {
        const emptyListElement = document.querySelector("#emptyList");
        emptyListElement ? emptyListElement.remove() : null;

    }
}

function addTask(event) {
    // event.preventDefault() - забороняє автоматично оновлюватись сторінці
    event.preventDefault();
    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }
    tasks.push(newTask);

    renderTasks(newTask);
    taskInput.value = '';
    taskInput.focus();

    checkEmptyList();
    saveToLocalStorage();
}

function deleteTask(event) {
    if (event.target.dataset.action !== "delete") return;

    // Щоб івент клік нам не повертав img, нам потрібно в css прописати (.btn-action img {pointer-event: none;})
    const parentNode = event.target.closest('.list-group-item');
    const id = Number(parentNode.id);

    // const index = tasks.findIndex((task) => task.id === id)
    // tasks.splice(index, 1);
    tasks = tasks.filter( (task) => task.id !== id);

    parentNode.remove();

    checkEmptyList();
    saveToLocalStorage();
}

function doneTask(event) {
    if (event.target.dataset.action !== "done") return;

    const parentNode = event.target.closest('.list-group-item');
    const id = Number(parentNode.id);

    const taskStatus = tasks.find((task) => task.id === id);
    taskStatus.done = !taskStatus.done;


    // classList.toggle додає клас, а якщ він вже є, то забирає його
    parentNode.querySelector("span").classList.toggle('task-title--done');
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(task) {
    const cssClass = task.done ? "task-title task-title--done" : "task-title";
    const checkTheme = checkbox.checked ? "list-group-item d-flex justify-content-between task-item darkLi" :
                                                 "list-group-item d-flex justify-content-between task-item";

    tasksList.insertAdjacentHTML('beforeend', `
                                                <li id="${task.id}" class="${checkTheme}">
                                                    <span class="${cssClass}">${task.text}</span>
                                                    <div class="task-item__buttons">
                                                        <button type="button" data-action="done" class="btn-action">
                                                            <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                                        </button>
                                                        <button type="button" data-action="delete" class="btn-action">
                                                            <img src="./img/cross.svg" alt="Done" width="18" height="18">
                                                        </button>
                                                    </div>
                                                </li>`);
}

removeDoneTasks.addEventListener('click', () => {
    const removeTasks = tasks.filter( (task) => task.done === true);

    if (removeTasks.length === 0) {
        alert("Виконаних завдань не має!)");
        return;
    }

    tasks = tasks.filter( (task) => task.done === false);
    saveToLocalStorage();

    for (let key in removeTasks) document.getElementById(`${removeTasks[key].id}`).remove();
    checkEmptyList();
});
