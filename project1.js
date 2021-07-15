const tasksString = localStorage.getItem("tasks");  // both save() and load() need to getItem and parse
const tasksArr = JSON.parse(tasksString);  // so I put both in the global scope

function save(inputTaskArr) {          // the task the user clicked to save    
    if (validate()===false) {
        return;
    }
    const newTask = {              // gets a new task object out of the input array
        title: inputTaskArr[0].value,
        priority: "",                       
        category: inputTaskArr[2].value,
        date: inputTaskArr[3].value,
        time: inputTaskArr[4].value,
        text: inputTaskArr[5].value
    };
    if (inputTaskArr[1].checked === true) {newTask.priority = "&ensp;top priority&ensp;";}  // turns priority (if checked) into string to print
    if (tasksString === null) {
        const newArr =[];  
        newArr.push(newTask);
        const stringToStore = JSON.stringify(newArr); 
        localStorage.setItem("tasks", stringToStore); 
    }
    else {
        tasksArr.push(newTask);
        const stringToStore = JSON.stringify(tasksArr); 
        localStorage.setItem("tasks", stringToStore); 
    }
}

// after save() new task is loaded/written in HTML automatically (onLoad="loadTasks") 

// i needed to enter JS validation because even if it's "required" on HTML the local storage is saving it

function validate() {
    const titleToValidate = document.getElementById("title");
    if (titleToValidate.value === "") {             // validates required title
        alert("title is missing");
        titleToValidate.focus();
        return false;
    }
    const dateToValidate = document.getElementById("date");
    if (dateToValidate.value === "") {             // validates required date
        alert("date is missing");
        dateToValidate.focus();
        return false;
    }
    const startDate = new Date(document.getElementById("date").value);
    const today = new Date();
    if (startDate.getTime() < today.getTime()) {    // validates if the date is a future date
        alert("you can only set a future date");
        dateToValidate.focus();
        event.preventDefault();     // so that the form won't be reset, and user can just change the date
        return false;
    }
}

function loadTasks() { 
    for (i=0; i<tasksArr.length;i++) {      // loads tasks from local storage and write them in designated area in HTML
    document.getElementById("tasksGrid").innerHTML+=`<div class="oldTasks">     
                                                <i class="bi bi-x-circle" id="${i}" onClick="deleteTask(this)"></i>
                                                <h2> ${tasksArr[i].title} </h2>
                                                <p> <span category="${tasksArr[i].category}"> &ensp;${tasksArr[i].category} </span>&ensp;
                                                    <span category="priority"> ${tasksArr[i].priority} </span> <p>
                                                <div class="taskText">${tasksArr[i].text}</div>
                                                <div class="taskDate"> ${tasksArr[i].date} <br/>
                                                 ${tasksArr[i].time} </div> </div>`;
    }
}


function deleteTask(thisTask) {                 // deletes a specific task from local storage
    var taskConfirm = confirm("do you really want to delete this task?");   // confirmation
    if (taskConfirm == false) {
       return ; }
    i=Number(thisTask.id);      // turning id-string into id-number
    tasksArr.splice(i,1);       // deletes this-task-object from array
    const stringToStore = JSON.stringify(tasksArr); 
    localStorage.setItem("tasks", stringToStore); 
    document.getElementById("tasksGrid").innerHTML="";  
    for (i=0; i<tasksArr.length;i++) {      // loads tasks from local storage but this time with different class, so no fade-in
        document.getElementById("tasksGrid").innerHTML+=`<div class="oldTasksAfterDelete">     
                                                    <i class="bi bi-x-circle" id="${i}" onClick="deleteTask(this)"></i>
                                                    <h2> ${tasksArr[i].title} </h2>
                                                    <p> <span category="${tasksArr[i].category}"> &ensp;${tasksArr[i].category} </span>&ensp;
                                                        <span category="priority"> ${tasksArr[i].priority} </span> <p>
                                                    <div class="taskText">${tasksArr[i].text}</div>
                                                    <div class="taskDate"> ${tasksArr[i].date} <br/>
                                                     ${tasksArr[i].time} </div> </div>`;
        }
}