const textInp = document.querySelector("#textInp");
const btnInp = document.querySelector("#btnInp");
const toDoList = document.querySelector(".todoList");

let edit = null;

const addToDo = () => {
    let inputVal = textInp.value.trim();
    if (btnInp.value === "Add") {

        if (inputVal != "") {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.textContent = inputVal;
            li.appendChild(p);

            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            toDoList.appendChild(li);
            textInp.value = "";

            saveLocalStorage(inputVal);
        } else {
            alert("Enter something!");
        }
    }
    else {
        editLocalStorage(edit.target.previousSibling.innerText);
        edit.target.previousSibling.innerText = inputVal;
        btnInp.value = "Add";
        textInp.value = "";
    }
}
const deleteToDo = (e) => {
    if (e.target.innerText === "Remove") {
        toDoList.removeChild(e.target.parentElement);
        deleteLocalStorage(e.target.parentElement);
    }
}
const editToDo = (e) => {
    if (e.target.innerText === "Edit") {
        textInp.value = e.target.previousSibling.innerText;
        textInp.focus();
        btnInp.value = "Edit";
        edit = e;
    }
}

// Local Storage
const saveLocalStorage = (todo) => {
    let todos;
    if (localStorage.getItem("taskName") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("taskName"));
    }
    todos.push(todo);
    localStorage.setItem("taskName", JSON.stringify(todos));
}
const getLocalStorage = () => {
    let todos;
    if (localStorage.getItem("taskName") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("taskName"));
        todos.forEach(item => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.textContent = item;
            li.appendChild(p);

            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            toDoList.appendChild(li);
        });

    }
}
const deleteLocalStorage = (todo) =>{
    let todos;
    if (localStorage.getItem("taskName") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("taskName"));
    }
    let todoText = todo.children[0].innerText;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem("taskName",JSON.stringify(todos));
}
const editLocalStorage = (todo) =>{
    let todos = JSON.parse(localStorage.getItem("taskName"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = textInp.value;
    localStorage.setItem("taskName", JSON.stringify(todos));
}

btnInp.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteToDo);
toDoList.addEventListener("click", editToDo);
document.addEventListener("DOMContentLoaded", getLocalStorage);