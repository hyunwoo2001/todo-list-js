const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodo() {

  todoList.innerHTML = "";

  todos.forEach((todo, index) => {

    const li = document.createElement("li");

    if(todo.completed){
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.innerText = todo.text;

    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");

    const completeBtn = document.createElement("button");
    completeBtn.innerText = "완료";
    completeBtn.classList.add("completeBtn");

    completeBtn.onclick = () => {
      todos[index].completed = !todos[index].completed;
      saveTodo();
      renderTodo();
    };

    const editBtn = document.createElement("button");
    editBtn.innerText = "수정";
    editBtn.classList.add("editBtn");

    editBtn.onclick = () => {

      const newText = prompt("수정할 내용 입력", todo.text);

      if(newText !== null && newText.trim() !== ""){
        todos[index].text = newText;
        saveTodo();
        renderTodo();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "삭제";
    deleteBtn.classList.add("deleteBtn");

    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      saveTodo();
      renderTodo();
    };

    btnGroup.appendChild(completeBtn);
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);

    todoList.appendChild(li);

  });

}

function saveTodo(){
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(){

  const text = todoInput.value.trim();

  if(text === ""){
    alert("할 일을 입력하세요.");
    return;
  }

  const todoObj = {
    text:text,
    completed:false
  };

  todos.push(todoObj);

  saveTodo();
  renderTodo();

  todoInput.value = "";

}

addBtn.onclick = addTodo;

todoInput.addEventListener("keydown", function(e){

  if(e.key === "Enter"){
    addTodo();
  }

});

renderTodo();