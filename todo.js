const toDoForm = document.querySelector(".toDoLists form");
const toDoInput = toDoForm.querySelector("input");

function getSavedToDos() {
    if (localStorage.getItem("toDos") == null) {
        localStorage.setItem("toDos", "{}");
    }
    const toDos = JSON.parse(localStorage.getItem("toDos"));
    return toDos;
}

function addToDoinList(event) {
    event.preventDefault();
    const toDo = toDoInput.value;
    const toDosOrder = Object.keys(toDos).length;
    toDos[toDosOrder] = toDo;
    localStorage.setItem("toDos", JSON.stringify(toDos));
    toDos = JSON.parse(localStorage.getItem("toDos"));
/*     showToDoList(); */
}

/* function showToDoList() {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
} */

let toDos = getSavedToDos();
toDoForm.addEventListener("submit", addToDoinList);
