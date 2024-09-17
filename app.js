// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo); // Changed to 'change' event

// Functions
function addTodo(event) {
    event.preventDefault();
    const inputValue = todoInput.value.trim();

    if (inputValue === '') return; // Prevent empty todos

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo'); 

    const newTodo = document.createElement('li');
    newTodo.innerText = inputValue;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    saveLocalTodos(inputValue);

    todoInput.value = '';

    const doneButton = document.createElement('button');
    doneButton.innerHTML = '<i class="fas fa-check"></i>';
    doneButton.classList.add("complete-btn");
    todoDiv.appendChild(doneButton);

    const delButton = document.createElement('button');
    delButton.innerHTML = '<i class="fas fa-trash"></i>';
    delButton.classList.add("delete-btn");
    todoDiv.appendChild(delButton);

    todoList.appendChild(todoDiv);
}

function deleteCheck(event) {
    const item = event.target;

    if (item.classList.contains('delete-btn')) {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => todo.remove());
    }

    if (item.classList.contains('complete-btn')) {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo() {
    const todos = Array.from(todoList.children);

    todos.forEach(todo => {
        switch (filterOption.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case 'completed':
                todo.style.display = todo.classList.contains('completed') ? "flex" : "none";
                break;
            case "uncompleted":
                todo.style.display = !todo.classList.contains('completed') ? "flex" : "none";
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    if (!todos.includes(todo)) { // Check for duplicates
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

function getTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo'); 

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const doneButton = document.createElement('button');
        doneButton.innerHTML = '<i class="fas fa-check"></i>';
        doneButton.classList.add("complete-btn");
        todoDiv.appendChild(doneButton);

        const delButton = document.createElement('button');
        delButton.innerHTML = '<i class="fas fa-trash"></i>';
        delButton.classList.add("delete-btn");
        todoDiv.appendChild(delButton);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoIndex = todo.children[0].innerText;
    todos = todos.filter(item => item !== todoIndex);
    localStorage.setItem("todos", JSON.stringify(todos));
}
