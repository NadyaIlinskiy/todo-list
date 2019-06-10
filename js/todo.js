'use strict';
////////known bugs ////// 

// 1. if there're tasks with same name - they all gonna be deleted on deleteTask action 
// (that's how 'filter' method works)


let allTasks = []; 
let ulEl = document.getElementById('todo');
let usrForm = document.getElementById('usrInput'); 

function Task (name, points){ 

    this.name = name;
    this.points = points;
    this.isDone = false; //"done / not done" flag. I might need it to summarise points on done tasks
    allTasks.push(this);
      
} 

Task.prototype.renderNew = function(){
    addElement('li', this.name, ulEl);
    console.log('render new', this);
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
    if (points===''){
        points = 1;
    }
    let userError = document.getElementById('points-error');
    //validation error on points if user enters something that not number btween 1 and 5
    let validPoints = [1,2,3,4,5];
    if(!(validPoints.includes(+points))){
        userError.textContent = 'Invalid enrty';
        userError.style.color = 'red';
        event.target[1].style.borderColor = 'red';
        event.target[1].focus();
    } else{

        let newTask = new Task (name, points);
        console.log(newTask);
        newTask.renderNew();
        localStorage.setItem ('allTasks', JSON.stringify(allTasks));
    }
}

function deleteTask(event){
    event.preventDefault();
    let liText = event.path[1].textContent; // textContent is better then innerHTML :)
    console.log('path: ', event.path[2]);
    let taskName = liText.slice(1); //1 is better then 28 :D 
    console.log(taskName);

    //homeWork
    let storedTasks = localStorage.getItem ('allTasks');
    let parsedTasks = JSON.parse(storedTasks);

    // DELETE ONE TASK -> array.filter - method use to delete 
    let newTasks = parsedTasks.filter(el => el.name !== taskName);
         
    localStorage.setItem ('allTasks', JSON.stringify(newTasks));
    checkLocalStorage(); 
    location.reload();
  
}
usrForm.addEventListener('submit', createTask);


function checkLocalStorage (){
    let storedTasks = localStorage.getItem('allTasks');
    let parsedTasks = JSON.parse(storedTasks);

    console.log ('parsed tasks', parsedTasks);

    parsedTasks.forEach(el => {
        allTasks.push(el);
        render(el.name);
    });
    
    console.log ('All tasks', allTasks);
   

   
}
checkLocalStorage();
