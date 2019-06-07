'use strict';

// eslint-disable-next-line no-unused-vars
let allTasks = []; 
let ulEl = document.getElementById('todo');
let usrForm = document.getElementById('usrInput'); 
function Task (name, points){ 
    
    this.name = name;
    this.points = points;
    allTasks.push(this);
} 

Task.prototype.renderNew = function(){
    addElement('li', this.name, ulEl);
};

function addElement (element, text, parent){
    let newElement = document.createElement(element);
    let newText =document.createTextNode(text);
    let span = document.createElement('span');
    let txt = document.createTextNode('\u00D7');
    span.append(txt);
    newElement.append(span);
    newElement.append(newText);
    span.className = 'close';
    parent.append(newElement);
    span.addEventListener('click', deleteTask);
    return newElement;
}

function render (name){
    addElement('li', name, ulEl);
}

function createTask(event){
    event.preventDefault();
    let name = event.target[0].value;
    let points = event.target[1].value;
    let newTask = new Task (name, points);
    console.log(newTask);
    newTask.renderNew();
    localStorage.setItem ('allTasks', JSON.stringify(allTasks));

}

function deleteTask(event){
    event.preventDefault();
    let path = event.path[1].innerHTML;
    console.log(path.path);
    let slicedPath = path.slice(28);
    console.log(slicedPath);

    //homeWork
    let a = localStorage.getItem ('allTasks');
    let parsedTasks = JSON.parse(a);
      
    // DELETE ONE TASKS -> array.filter - method use to delete 
         
    localStorage.setItem ('allTasks');
    checkLocalStorage(); 
    document.reload();


    //
   
}
usrForm.addEventListener('submit', createTask);


function checkLocalStorage (){
    let storedTasks = localStorage.getItem('allTasks');
    let parsedTasks = JSON.parse(storedTasks);
    console.log ('parsed tasks', parsedTasks);

    for(let i=0; i < parsedTasks.length; i++ ){
        allTasks.push(parsedTasks[i]);
        render(parsedTasks[i].name);

    }
}
checkLocalStorage();


// /////////////// should waiting for DOM loading be part of every func (no need for EL)
// document.addEventListener("DOMContentLoaded", function() {
//     addTodo();
//     loadTodo();
//     deleteTodo();
//   });




// // on click Add button -  add new todo (text from input to the todo list)

//  function addTodo(){

// ////////////////per book (p223)
 
//     let submitButton = document.getElementById("add");
//     submitButton.addEventListener ("click", function() {

//         let newLi = document.createElement("Li");
//         let userInput = document.getElementById("usrInput").value;
//         let newTask = document.createTextNode(userInput);
        
//         console.log(newTask);
//         newLi.appendChild(newTask);
//         document.getElementById("todo").appendChild(newLi);

// //saving updated list to localStorage
//         let myList = document.querySelector("ul");
//         localStorage.setItem ("myToDoList", myList.innerHTML);
        
//     });
//    document.getElementById("usrInput").value = "";
   
//  }

//  //loading my ToDo list from localStorage (if exists)
//  function loadTodo(){
//     let myList = document.querySelector("ul");    
//     if(localStorage.getItem("myToDoList")){   
//         myList.innerHTML = localStorage.getItem("myToDoList");
//     }
//     let toDolist = document.getElementsByTagName("Li");
//     //adding "X" to every Li as "close" icon
//         for (let i = 0; i < toDolist.length; i++) {
//         let span = document.createElement("span");
//         let txt = document.createTextNode("\u00D7");
//         span.className = "close";
//         span.appendChild(txt);
//         toDolist[i].appendChild(span);
//         }
    

// }


// //on click Delete "X" button remove item from the todo list. Book p225
// // function deleteTodo(){

// //     let removeToDo = document.getElementsByClassName("close");
// //     removeToDo.addEventListener ("click", function() {
// //     for (let i = 0; i < removeToDo.length; i++) {     
// //         let removeLi = i.parentElement;
// //        // let conteinter
// //     }
// //     })
// // }


