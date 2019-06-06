 
/////////////// should waiting for DOM loading be part of every script?
document.addEventListener("DOMContentLoaded", function() {
    addTodo();
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
    });
   document.getElementById("usrInput").value = "";
 }


//on click Delete "X" button remove item from the todo list
function deleteTodo(){
   
}