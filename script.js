let todos = JSON.parse(localStorage.getItem("todos")) || [];

showList();

function addTodo() {

  let input = document.querySelector("#todoInput");
  let text = input.value.trim();

  if(text == ""){
    alert("할 일을 입력하세요");
    return;
  }

  let todo = {
    text : text,
    completed : false
  };

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));

  input.value = "";

  showList();
}

function doneTodo(i){

  todos[i].completed = !todos[i].completed;

  localStorage.setItem("todos", JSON.stringify(todos));

  showList();
}

function editTodo(i){

  let newText = prompt("수정할 내용 입력", todos[i].text);

  if(newText != null && newText.trim() != ""){

    todos[i].text = newText;

    localStorage.setItem("todos", JSON.stringify(todos));

    showList();
  }
}

function deleteTodo(i){

  todos.splice(i, 1);

  localStorage.setItem("todos", JSON.stringify(todos));

  showList();
}

function showList(){

  let list = document.querySelector("#todoList");

  let html = "";

  for(let i = 0; i < todos.length; i++){

    let doneClass = "";

    if(todos[i].completed){
      doneClass = "completed";
    }

    html += `
      <li class="${doneClass}">
        ${todos[i].text}

        <button onclick="doneTodo(${i})">완료</button>

        <button onclick="editTodo(${i})">수정</button>

        <button onclick="deleteTodo(${i})">삭제</button>
      </li>
    `;
  }

  list.innerHTML = html;
}

document.querySelector("#addBtn").onclick = addTodo;

document.querySelector("#todoInput").onkeydown = function(e){

  if(e.key == "Enter"){
    addTodo();
  }

};
