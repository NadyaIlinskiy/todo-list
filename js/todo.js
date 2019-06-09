'use strict';

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
    let path = event.path[1].textContent; // textContent is better then innerHTML :)
    console.log('path: ', path);
    let slicedPath = path.slice(1); //1 is better then 28 :D 
    console.log(slicedPath);

    //homeWork
    let a = localStorage.getItem ('allTasks');
    let parsedTasks = JSON.parse(a);

    // DELETE ONE TASK -> array.filter - method use to delete 
         
    // localStorage.setItem ('allTasks');
    // checkLocalStorage(); 
    // document.reload();

   
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
