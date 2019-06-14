'use strict';

//////TODO//////
//1. Render sum of done tasks points somewhere
//2. Update sum of done tasks points on delete
//3. Update sum of done tasks points on mark task done


let allTasks = []; 
let ulEl = document.getElementById('todo');
let usrForm = document.getElementById('usrInput'); 
usrForm.addEventListener('submit', createTask);
checkLocalStorage();

function Task (name, points){ 

    this.name = name;
    this.points = points;
    this.isDone = false; //"done / not done" flag. I might need it to summarise points on done tasks
    allTasks.push(this);
      
} 

Task.prototype.renderNew = function(){
    addElement('li', this.name, ulEl);
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
    // The map() method creates a new array with the results of calling
    // a provided function on every element in the calling array.
    let taskNames = allTasks.map(el => el.name); 
    let pointsError = document.getElementById('invalid-points-error');
    let taskError = document.getElementById('empty-name-error');
    //validation error on points if user enters something that not number btween 1 and 5
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

function deleteTask(event){
    event.preventDefault();
    let liText = event.path[1].textContent; 
    let taskName = liText.slice(1); 
    let storedTasks = localStorage.getItem ('allTasks');
    let parsedTasks = JSON.parse(storedTasks); 
    let newTasks = parsedTasks.filter(el => el.name !== taskName);
         
    localStorage.setItem ('allTasks', JSON.stringify(newTasks));
    location.reload();
   
}

// find a way to get rid of repeted parts of the code in deleteTask & changeTaskState functions

function changeTaskSate(event){

    let liText = event.path[1].textContent; 
    let taskName = liText.slice(1); 
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
}



function checkLocalStorage (){  
    let storedTasks = localStorage.getItem('allTasks');
    let parsedTasks = JSON.parse(storedTasks);

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

