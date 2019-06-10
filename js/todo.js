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
    let newText = document.createTextNode(text);
    let span = document.createElement('span');
    let txt = document.createTextNode('\u00D7');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    span.append(txt);  
    newElement.append(span);
    newElement.append(newText);
    newElement.append(checkbox);
    span.className = 'close';
    checkbox.className = 'check';
    parent.append(newElement);
    span.addEventListener('click', deleteTask);
    checkbox.addEventListener('change', changeTaskSate);
    return newElement;
}

function render (name){
    addElement('li', name, ulEl);
}
function renderDone(name){
    let li = addElement('li', name, ulEl);
    li.className = 'checked';
    let checkbox = li.childNodes[2];
    console.log('RENDER DONE', checkbox);
    checkbox.checked = true;
}

function createTask(event){
    event.preventDefault();
    let name = event.target[0].value;
    let points = event.target[1].value;
    if (points===''){
        points = 1;
    }
  
    let userError = document.getElementById('entery-error');
    //validation error on points if user enters something that not number btween 1 and 5
    let validPoints = [1,2,3,4,5];
    if(!(validPoints.includes(+points)) || name===''){
        userError.textContent = 'Invalid enrty';
    } else{
        let newTask = new Task (name, points);
        console.log(newTask);
        newTask.renderNew();
        localStorage.setItem ('allTasks', JSON.stringify(allTasks));
        location.reload();
    }
   
}

function deleteTask(event){
    event.preventDefault();
    let liText = event.path[1].textContent; 
    console.log('path: ', event.path[2]);
    let taskName = liText.slice(1); 
    console.log(taskName);

    //homeWork
    let storedTasks = localStorage.getItem ('allTasks');
    let parsedTasks = JSON.parse(storedTasks); 
    let newTasks = parsedTasks.filter(el => el.name !== taskName);
         
    localStorage.setItem ('allTasks', JSON.stringify(newTasks));
    checkLocalStorage(); 
    location.reload();
  
}

function changeTaskSate(event){

    let liText = event.path[1].textContent; 
    let taskName = liText.slice(1); 
    console.log(taskName);
    let storedTasks = localStorage.getItem ('allTasks');
    let parsedTasks = JSON.parse(storedTasks);
    
    let doneTaskIndex = parsedTasks.findIndex(el => el.name === taskName);
    let doneTask = parsedTasks.find(el => el.name === taskName);
    if (doneTask.isDone === true){
        doneTask.isDone = false;
        event.path[1].className = 'not-checked';
    } else{
        doneTask.isDone = true;
        event.path[1].className = 'checked';
        event.path[0].checked;
    }
    parsedTasks[doneTaskIndex] = doneTask;
    localStorage.setItem ('allTasks', JSON.stringify(parsedTasks));
    console.log(parsedTasks); 
}

usrForm.addEventListener('submit', createTask);

function checkLocalStorage (){
    let storedTasks = localStorage.getItem('allTasks');
    let parsedTasks = JSON.parse(storedTasks);

    console.log ('parsed tasks', parsedTasks);

    parsedTasks.forEach(el => {
        allTasks.push(el);
        
        if (el.isDone === true){
            renderDone(el.name);
        } else {
            render(el.name);
        }
    });
    
    console.log ('All tasks', allTasks);
  
}
checkLocalStorage();
