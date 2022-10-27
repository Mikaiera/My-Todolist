//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//functions
function addTodo(event){
    // console.log("clicked")
    //prevent the form from refresing and deleting everything with every refresh
    event.preventDefault();

    //create the todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo'); 

    //create the li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    // add todo to local storage
    saveLocalTodos(todoInput.value)  
      
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //clear todoinput value
    todoInput.value ='';

    //checkmark button
    const doneButton = document.createElement('button');
    doneButton.innerHTML = `<i class="fas fa-check"></i>`;
    doneButton.classList.add("complete-btn");
    todoDiv.appendChild(doneButton);

    //delete button
    const delButton = document.createElement('button');
    delButton.innerHTML = `<i class="fas fa-trash"></i>`;
    delButton.classList.add("delete-btn");
    todoDiv.appendChild(delButton);

    //Append to list 
    todoList.appendChild(todoDiv);
}

function deleteCheck(event){
    // console.log(event.target)
    const item = event.target

    if(item.classList[0] === 'delete-btn'){
        const todo =item.parentElement;
        //animation 
        todo.classList.add('fall')
        removeLocalTodos(todo);
        todo.addEventListener('transitioned', e => {
            todo.remove() 
        });
    }

    //checkmark for completed tasks 
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;
    // console.log(todos)
    todos.forEach(function(todo) {
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;

            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                // break;
        }
    });
}

function saveLocalTodos(todo){
    //check if there are already stuff saved 
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
     //create the todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo'); 

    //create the li
    const newTodo = document.createElement('li');
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //checkmark button
    const doneButton = document.createElement('button');
    doneButton.innerHTML = '<i class="fas fa-check"></i>';
    doneButton.classList.add("complete-btn");
    todoDiv.appendChild(doneButton);

    //delete button
    const delButton = document.createElement('button');
    delButton.innerHTML = '<i class="fas fa-trash"></i>';
    delButton.classList.add("delete-btn");
    todoDiv.appendChild(delButton);

    //Append to list 
    todoList.appendChild(todoDiv);
    })
}

//remove the items from your local storage 
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}