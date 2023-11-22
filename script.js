const allTodo = document.querySelector(".allTodo")
const addTodo = document.getElementById("addTodo")
let addTodoBtn2 = addTodo.innerText
const inputVal = document.getElementById("inputVal")
let allTodoObj = [];
let edit = null;

let localget = localStorage.getItem("user")
if(localget != null){
    allTodoObj = JSON.parse(localget)
}

addTodo.addEventListener("click", (e) => {
   let value = inputVal.value
   if(edit != null){
    allTodoObj.splice(edit,1,{"name" : value});
    edit = null;
   }else{
    allTodoObj.push({"name" : value})
   }
    saveTodo(allTodoObj)
    inputVal.value = "";
    displayTodo()
    addTodo.innerText = addTodoBtn2
})


displayTodo()
function displayTodo (){
    let html = "";
    allTodoObj.forEach((val,index) => {
        html += `<tr class="text-center">
                    <th scope="row">${index+1}</th>
                    <td class="border">${val.name}</td>
                    <td class="d-flex justify-content-between">
                    <i class="fa-solid fa-delete-left" onclick="deleteFun(${index})"></i>
                    <i class="fa-solid fa-pen-to-square" onclick="editTodo(${index})"></i></td>
                </tr>`
    })
    allTodo.innerHTML = html
}
function saveTodo (todoList){
    let localSet = JSON.stringify(todoList)
    localStorage.setItem("user",localSet)
    displayTodo()
}
function deleteFun (id){
    allTodoObj.splice(id,1)
    saveTodo(allTodoObj)
}
function editTodo (id){
    edit = id;
    let editval = allTodoObj[id].name;
    inputVal.value = editval;
    addTodo.innerText = "Edit Toto";
}


// seacrch
const search = document.querySelector("#search")
let tr = document.querySelectorAll(".allTodo tr")
search.addEventListener("input", (e) => {
     let searchVal = e.target.value.toLocaleLowerCase()
     allTodo.innerHTML = "";
     tr.forEach((val,index)=> {
        let td_val = val.querySelectorAll("td")[0]
        if(td_val.innerText.toLocaleLowerCase().indexOf(searchVal) > -1){
            allTodo.appendChild(val)
        }
     })

})