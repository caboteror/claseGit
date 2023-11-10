const username = "Usuario1";
const password = "admin";
let loggedIn = false;
let tasks = [];
const taskUl = document.getElementById("task-ul");

function login() {
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    if (enteredUsername === username && enteredPassword === password) {
        loggedIn = true;
        document.querySelector(".login-form").style.display = "none";
        document.querySelector(".task-list").style.display = "block";
        document.getElementById("welcome-message").textContent = "Bienvenido, " + username + "!";
        document.getElementById("welcome-message").style.display = "block";
    } else {
        window.alert("son incorrectas las credenciales");
    }
}

function addTask() {
    if (loggedIn) {
        const taskText = document.getElementById("task").value;
        tasks.push({ text: taskText, completed: false });
        displayTasks();
        document.getElementById("task").value = "";
    }
}

function displayTasks() {
    taskUl.innerHTML = "";
    const filterValue = document.getElementById("filter").value;
    tasks.forEach((task, index) => {
        if (filterValue === "all" || (filterValue === "completed" && task.completed) || (filterValue === "pending" && !task.completed)) {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="${task.completed ? "completed" : ""}">${task.text}</span>
                <button onclick="completeTask(${index})">Completar</button>
                <button onclick="deleteTask(${index})">Eliminar</button>
            `;
            taskUl.appendChild(li);
        }
    });
}

function completeTask(index) {
    tasks[index].completed = true;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function filterTasks() {
    displayTasks();
}

function logout() {
    loggedIn = false;
    tasks = [];
    document.querySelector(".login-form").style.display = "block";
    document.querySelector(".task-list").style.display = "none";
    document.getElementById("welcome-message").style.display = "none";
    taskUl.innerHTML = "";
}
