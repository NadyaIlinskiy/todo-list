'use strict';

let allTasks = []; 
let ulEl = document.getElementById('todo');
let usrForm = document.getElementById('usrInput'); 
let points = document.getElementById('points');

usrForm.addEventListener('submit', createTask);


function Task (name, points){ 
    this.name = name;
    this.points = points;
    this.isDone = false; 
    allTasks.push(this);    
} 

Task.prototype.renderNew = function(){
    addElement('li', this.name, ulEl);
    location.reload();
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
    checkbox.checked = true;
}

function createTask(event){
    event.preventDefault();
    let name = event.target[0].value;
    let points = event.target[1].value; 
    let dupeError = document.getElementById('dupe-error');
    let taskNames = allTasks.map(el => el.name); 
    let pointsError = document.getElementById('invalid-points-error');
    let taskError = document.getElementById('empty-name-error');
    //validation error on points if user enters something that not number between 1 and 5
    let validPoints = [1,2,3,4,5];
    if (points===''){ //setting default points
        points = 1;
    }
    if(!(validPoints.includes(+points))){
        pointsError.textContent = 'Points obly can be numbers between 1 and 5. ';     
    }else if (name==='') {      
        taskError.textContent = 'Task name can\'t be empty. ';      
    } else if (taskNames.includes(name)){
        dupeError.textContent = '"'+name+'" already exists in your ToDo list';     
    }
    else{   
        let newTask = new Task (name, points);
        newTask.renderNew();
        localStorage.setItem ('allTasks', JSON.stringify(allTasks));
        usrForm.reset(); //clear the input form
        document.getElementById('errors').style.display = 'none'; //hide validations
    }     
}

function getTaskName(ev){
    let liText = ev.path[1].textContent; // x[taskname]
    let taskName = liText.slice(1); //get rid of "x"
    return taskName;
}

function getStoredTasks(){
    let storedTasks = localStorage.getItem ('allTasks'); //JSON string
    let parsedTasks = JSON.parse(storedTasks); //Array of task objects
    return parsedTasks;
}

function deleteTask(event){
    event.preventDefault();
    let taskName = getTaskName(event);
    let tasks = getStoredTasks();
    let newTasks = tasks.filter(el => el.name !== taskName);
         
    localStorage.setItem ('allTasks', JSON.stringify(newTasks));
    location.reload();  
}

function getDoneTasks(){
    let doneTasks = allTasks.filter(el => el.isDone === true);
    return doneTasks;
}

function changeTaskSate(event){
    let taskName = getTaskName(event);
    let tasks = getStoredTasks();
    
    let doneTaskIndex = tasks.findIndex(el => el.name === taskName);
    let doneTask = tasks.find(el => el.name === taskName);
    if (doneTask.isDone === true){
        doneTask.isDone = false;
        event.path[1].className = 'not-checked';
        location.reload();
    } else{
        doneTask.isDone = true;
        event.path[1].className = 'checked';
        event.path[0].checked;
        location.reload();
    }
    tasks[doneTaskIndex] = doneTask;
    localStorage.setItem ('allTasks', JSON.stringify(tasks));   
}

function pointsSum (tasks){
    let points = tasks.map(el => +el.points);
    let sum = points.reduce((a,b) => a+b, 0); 
    return sum;
}

function addPoints(){
    let doneTasks = getDoneTasks();
    let doneTasksPointsSum = pointsSum (doneTasks);
    let allTasksPointsSum = pointsSum (allTasks);
    let txt = 'You\'ve earned '+ doneTasksPointsSum +' points, out of '+allTasksPointsSum;
    points.append(txt);
}

function checkLocalStorage (){  
    let parsedTasks = getStoredTasks();
  
    if (parsedTasks !== null) { //check to prevent JS error if localStorage is empty 
        parsedTasks.forEach(el => {
            allTasks.push(el);
        
            if (el.isDone === true){
                renderDone(el.name);
            } else {
                render(el.name);
            }
        });    
    }
}

checkLocalStorage();
addPoints();
