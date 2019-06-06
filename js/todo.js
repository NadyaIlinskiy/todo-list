 
/////////////// should waiting for DOM loading be part of every func?
document.addEventListener("DOMContentLoaded", function() {
    addTodo();
    loadTodo();
  });

// on click Add button -  add new todo (text from input to the todo list)

 function addTodo(){

////////////////per book (p223)
 
    let submitButton = document.getElementById("add");
    submitButton.addEventListener ("click", function() {

        let newLi = document.createElement("Li");
        let userInput = document.getElementById("usrInput").value;
        let newTask = document.createTextNode(userInput);
        
        console.log(newTask);
        newLi.appendChild(newTask);
        document.getElementById("todo").appendChild(newLi);

//saving updated list to localStorage
        let myList = document.querySelector("ul");
        localStorage.setItem ("myToDoList", myList.innerHTML);
        
    });
   document.getElementById("usrInput").value = "";
   
 }

 //loading my ToDo list from localStorage (if exists)
 function loadTodo(){
    let myList = document.querySelector("ul");    
    if(localStorage.getItem("myToDoList")){   
        myList.innerHTML = localStorage.getItem("myToDoList");
    }
    let toDolist = document.getElementsByTagName("Li");
    //adding "X" to every Li as "close" icon
        for (let i = 0; i < toDolist.length; i++) {
        let span = document.createElement("span");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        toDolist[i].appendChild(span);
        }
    

}


//on click Delete "X" button remove item from the todo list
function deleteTodo(){
   
}

