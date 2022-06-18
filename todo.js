const toDoSection = document.querySelector(".toDoLists");
const toDoForm = document.querySelector(".toDoLists form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = toDoSection.querySelector("ul");

function LoadSavedToDos() {
    if (localStorage.getItem("toDos") == null) {
        localStorage.setItem("toDos", "{}");
    }
    const toDos = JSON.parse(localStorage.getItem("toDos"));
    for (toDoId in toDos) {
        const toDo = toDos[toDoId];
        paintToDo(toDoId, toDo);
    }
    return toDos;
}

function addToDoinList(event) {
    event.preventDefault();
    const toDo = toDoInput.value;
    toDoInput.value = "";
    const toDoId = Object.keys(toDos).length;
    toDos[toDoId] = toDo;
    paintToDo(toDoId, toDo);
    localStorage.setItem("toDos", JSON.stringify(toDos));
    toDos = JSON.parse(localStorage.getItem("toDos"));
}

function paintToDo(id, toDo) {
    const li = document.createElement("li");
    const span1 = document.createElement("span");
    span1.innerText = toDo;
    const span2 = document.createElement("span");
    span2.addEventListener("click", deleteToDo);
    span2.innerText = "❌";
    li.setAttribute("id", id);
    li.append(span1, span2);
    toDoList.appendChild(li);
}

function deleteToDo(event) {
    const toDoId = event.target.parentNode.id;
    delete toDos[toDoId];
/*     const deleteToDoDOM = document.getElementById(toDoId);
    toDoList.removeChild(deleteToDoDOM); */
    const toDoValueList = Object.values(toDos);
    let emptyDic = {};
    let i = 0;
    toDoValueList.forEach(function (value) {
        emptyDic[i] = value;
        i++;
    });
    toDos = emptyDic;
    localStorage.setItem("toDos", JSON.stringify(toDos));
    while (toDoList.hasChildNodes() ){
        toDoList.removeChild(toDoList.firstChild);       
    }
    LoadSavedToDos();
}

let toDos = LoadSavedToDos();
toDoForm.addEventListener("submit", addToDoinList);