let tasksInput = document.querySelector(".input");
let submitButton = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let delAll = document.querySelector(".delAll")
let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    console.log("yes");
    getArrayfromLocal();
}

//Submit Tasks
submitButton.onclick = function (e) {
    e.preventDefault();
    if (tasksInput.value !== "") {
        addTaskToArray(tasksInput.value);
        tasksInput.value = "";
    }
}

//Delete Task
tasks.addEventListener("click", function(e) {

    if (e.target.className == "delete") {
        
        deleteItem(e.target.parentElement.getAttribute("data-id"));
    }
    if (e.target.classList.contains("task")) {
        
        e.target.classList.toggle("done");
        toggleStatusTask(e.target.getAttribute("data-id"));
        
    }
    else if (e.target.classList.contains("task-text")) {
        e.target.parentElement.classList.toggle("done");
        toggleStatusTask(e.target.parentElement.getAttribute("data-id"));
    }
    else if (e.target.classList.contains("icon")) {
        e.target.parentElement.parentElement.classList.toggle("done");
        toggleStatusTask(e.target.parentElement.parentElement.getAttribute("data-id"));
    }
})


//Delete All Tasks
delAll.onclick = function() {
    tasks.innerHTML = "";
    localStorage.clear();
    arrayOfTasks = [];
    
}

function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false
    }

    arrayOfTasks.push(task);

    addTasksToPage(arrayOfTasks);
    addArrayToLocal(arrayOfTasks);

}


function addTasksToPage(arrayOfTasks) {
    tasks.innerHTML = "";
    arrayOfTasks.forEach(task => {
        let taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "task");
        taskDiv.setAttribute("data-id", task["id"]);
        let taskTitle = document.createElement("span");
        taskTitle.className = "task-text";
        let icon = document.createElement("span");
        icon.className = "icon";
        taskTitle.appendChild(icon);
        taskTitle.appendChild(document.createTextNode(task.title));
        let delBtn = document.createElement("button");
        delBtn.className = "delete";
        delBtn.appendChild(document.createTextNode("Delete"));
        taskDiv.appendChild(taskTitle)
        taskDiv.appendChild(delBtn);
        tasks.appendChild(taskDiv);
        if (task.completed) {
            taskDiv.classList.add("done");
        }
        else {
            taskDiv.classList.remove("done");
        }
    })
}

function addArrayToLocal(arrayOfTasks) {
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getArrayfromLocal() {
    if (localStorage.getItem("tasks")) {

        arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
        addTasksToPage(arrayOfTasks);

    }
}
let arr = [1,2];
function deleteItem(id) {
    arrayOfTasks = arrayOfTasks.filter((ele) => ele.id != id)
    addTasksToPage(arrayOfTasks);
    addArrayToLocal(arrayOfTasks);
}


function toggleStatusTask(taskId) {
    arrayOfTasks.forEach(ele => {
        if (ele.id == taskId) {
            ele.completed === true ? ele.completed = false : ele.completed = true;
        }
    })
    addArrayToLocal(arrayOfTasks);
}