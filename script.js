// Get elements from DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const tasksList = document.getElementById('tasks');

// Array to store tasks
let tasks = [];

// Function to add new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const task = {
        text: taskText,
        completed: false,
        priority: false,
        dueDate: null,
    };

    tasks.push(task);
    saveTasks();
    updateTaskList();
    taskInput.value = '';
}
// Function to remove task
function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    updateTaskList();
}

// Function to mark a task as completed
function toggleCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    updateTaskList();
}

// Function to prioritize task
function togglePriority(index) {
    tasks[index].priority = !tasks[index].priority;
    saveTasks();
    updateTaskList();
}

// Function to update the task list in the DOM
function updateTaskList() {
    tasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task', task.completed ? 'completed' : '', task.priority ? 'priority' : '');

        taskItem.innerHTML = `
            <span>${task.text}</span>
            <span>
                <button class="remove" onclick="removeTask(${index})">Remove</button>
                <button class="completed" onclick="toggleCompleted(${index})">Complete</button>
                <button class="priority" onclick="togglePriority(${index})">Priority</button>
            </span>
        `;
        tasksList.appendChild(taskItem);
    });
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    updateTaskList();
}

// Add event listeners
addTaskButton.addEventListener('click', addTask);

// Load tasks from local storage on page load
loadTasks();
