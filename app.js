// Selectors
const todoInput = document.querySelector('#todo-input');
const todoButton = document.querySelector('#todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('#filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

// Functions
function createTodoElement(todoText) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoText;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const doneButton = document.createElement('button');
    doneButton.innerHTML = '<i class="fas fa-check"></i>';
    doneButton.classList.add('complete-btn');
    todoDiv.appendChild(doneButton);

    const delButton = document.createElement('button');
    delButton.innerHTML = '<i class="fas fa-trash"></i>';
    delButton.classList.add('delete-btn');
    todoDiv.appendChild(delButton);

    return todoDiv;
}

function addTodo(event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    const todoDiv = createTodoElement(todoText);
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoText);
    todoInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;
    if (item.classList.contains('delete-btn')) {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => todo.remove());
    } else if (item.classList.contains('complete-btn')) {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo() {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        if (todo.nodeType === 1) {
            const isCompleted = todo.classList.contains('completed');
            switch (filterOption.value) {
                case 'all':
                    todo.style.display = 'flex';
                    break;
                case 'completed':
                    todo.style.display = isCompleted ? 'flex' : 'none';
                    break;
                case 'uncompleted':
                    todo.style.display = isCompleted ? 'none' : 'flex';
                    break;
            }
        }
    });
}

function saveLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });
}

function removeLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoIndex = todo.children[0].innerText;
    todos = todos.filter(t => t !== todoIndex);
    localStorage.setItem('todos', JSON.stringify(todos));
}
