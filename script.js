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
const tr = document.querySelectorAll(".allTodo tr")
search.addEventListener("input", (e) => {
     let searchVal = e.target.value.toLocaleLowerCase()
     allTodo.innerHTML = "";
     tr.forEach((val,index)=> {
        let td_val = val.querySelectorAll("td")[0]
        if(td_val.innerText.toLocaleLowerCase().indexOf(searchVal) > -1){
            allTodo.appendChild(val)
        }
     })
     if(allTodo.innerHTML === ""){
        allTodo.innerHTML = `<h2 class="p-3">todo search for not match ...</h2>`;
     }

})



// pagination
const tr2 = document.querySelectorAll(".allTodo tr")
let pageNum = 1;
let record_per_page = 10;
let  totalTodoLength = tr2.length
let totalpage = Math.ceil(totalTodoLength / record_per_page)
pegination()
displayPagination()
function displayPagination (){
    let start =  (pageNum - 1) * record_per_page ;
    let endIndex = start + (record_per_page - 1)
    if(endIndex >= totalTodoLength){
        endIndex = totalTodoLength - 1;
    }
    let statement = "";
    for(i = start; i<= endIndex; i++){
        statement += `<tr> ${tr2[i].innerHTML} </tr>`;
    }
    allTodo.innerHTML = statement
    document.querySelectorAll(".daynamic").forEach(val => {
        val.classList.remove("active");
    })
    document.getElementById(`page${pageNum}`).classList.add("active");
    if(pageNum == 1){
        document.getElementById("prev").classList.add("disabled")
    }else{
        document.getElementById("prev").classList.remove("disabled")

    }
    if(pageNum == totalpage){
        document.getElementById("next").classList.add("disabled")
    }else{
        document.getElementById("next").classList.remove("disabled")

    }
    
    document.getElementById("allTodoShow").innerHTML = `Showing ${start + 1} of ${endIndex+1} total > ${totalTodoLength}`;
}

function pegination(){
  let prev = `<li class="page-item"><a class="page-link" id="prev" onclick="prevBtn()" href="#">Previous</a></li>`
  let next =`<li class="page-item"><a class="page-link" id="next" onclick="nextBtn()" href="#">Next</a></li>`
  let btn = "";
  let activity = "";

   for(i = 1; i <= totalpage; i++){
    if(i == 1){
        activity = "active";
    }else{
        activity ="";
    }
    btn +=`<li class="page-item daynamic ${activity}" id="page${i}"><a class="page-link" href="#">${i}</a></li>`
   }
    const paginationId = document.getElementById("paginationId")
    paginationId.innerHTML = `${prev} ${btn} ${next}`
}

function nextBtn (){
    pageNum++;
    displayPagination()
}
function prevBtn (){
    pageNum--;
    displayPagination()
}
const selectedOption = document.getElementById("selectedOption")

selectedOption.addEventListener("change",(val,index) => {
    // if(totalTodoLength >= 5 || totalTodoLength >= 10 || totalTodoLength > 20){
    // }
    record_per_page = +selectedOption.value

    totalpage = Math.ceil(totalTodoLength / record_per_page)
    pegination()
    displayPagination()
})