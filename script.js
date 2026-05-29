// localStorage에 저장된 todos 데이터를 가져옴

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 화면에 리스트 출력
showList();


// 할 일 추가 함수
function addTodo() {

  // 입력창 가져오기
  let input = document.querySelector("#todoInput");

  // 입력값 가져오고 앞뒤 공백 제거
  let text = input.value.trim();

  // 빈 값이면 경고 후 종료
  if(text == ""){
    alert("할 일을 입력하세요");
    return;
  }

  // 새로운 할 일 객체 생성
  let todo = {
    text : text,        // 할 일 내용
    completed : false   // 완료 여부 (기본 false)
  };

  // 배열에 추가
  todos.push(todo);

  // localStorage에 저장
  localStorage.setItem("todos", JSON.stringify(todos));

  // 입력창 초기화
  input.value = "";

  // 화면 다시 출력
  showList();
}


// 완료 토글 함수
function doneTodo(i){

  // 해당 항목의 completed값 변경
  todos[i].completed = !todos[i].completed;

  // 저장
  localStorage.setItem("todos", JSON.stringify(todos));

  // 화면 업데이트
  showList();
}


// 수정 함수
function editTodo(i){

  // 기존 값을 기본값으로 prompt 창 띄움
  let newText = prompt("수정할 내용 입력", todos[i].text);

  // 취소가 아니고, 빈값이 아니면 수정
  if(newText != null && newText.trim() != ""){

    // 값 변경
    todos[i].text = newText;

    // 저장
    localStorage.setItem("todos", JSON.stringify(todos));

    // 화면 업데이트
    showList();
  }
}


// 삭제 함수
function deleteTodo(i){

  // 해당 index 1개 삭제
  todos.splice(i, 1);

  // 저장
  localStorage.setItem("todos", JSON.stringify(todos));

  // 화면 업데이트
  showList();
}


// 화면 출력 함수
function showList(){

  // ul 요소 가져오기
  let list = document.querySelector("#todoList");

  // HTML 문자열 초기화
  let html = "";

  // 배열 전체 반복
  for(let i = 0; i < todos.length; i++){

    // 완료 여부에 따라 CSS 클래스 결정
    let doneClass = "";

    if(todos[i].completed){
      doneClass = "completed";
    }

    // HTML 동적으로 생성
    html += `
      <li class="${doneClass}">
        ${todos[i].text}

        <!-- 완료 버튼 -->
        <button onclick="doneTodo(${i})">완료</button>

        <!-- 수정 버튼 -->
        <button onclick="editTodo(${i})">수정</button>

        <!-- 삭제 버튼 -->
        <button onclick="deleteTodo(${i})">삭제</button>
      </li>
    `;
  }

  // 완성된 HTML을 화면에 출력
  list.innerHTML = html;
}


// 추가 버튼 클릭 이벤트
document.querySelector("#addBtn").onclick = addTodo;



// Enter 키 입력 이벤트
document.querySelector("#todoInput").onkeydown = function(e){

  // Enter 키를 누르면 할 일 추가
  if(e.key == "Enter"){
    addTodo();
  }

};
